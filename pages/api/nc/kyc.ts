import { UserProfile } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { normalizeConfig } from 'next/dist/server/config-shared'
import { prisma } from '../../../lib/db'
import { CreatePartyResponse, PartyDetail } from '../../../types/typings'
import { BASE_URL } from '../../../nc'
export default async function handleNorthCapital(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'No user id found.' })
  }
  console.log('Session located.')

  const V3_URL = '/tapiv3/index.php/v3'

  if (!BASE_URL) {
    console.log('North Capital URL not loaded.')
    return res.status(500).json({ message: 'No NC URL found.' })
  }

  const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID
  const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY

  if (!CLIENT_ID || !DEVELOPER_KEY) {
    console.log('North Capital parameters not loaded.')
    return res.status(500).json({ message: 'No NC parameters found.' })
  }

  if (!session?.user?.uid) {
    console.log('No user id found on session.')
    return res.status(500).json({ message: 'No user id found on session.' })
  }
  // use prisma to get user information

  switch (req.method) {
    case 'PUT':
      // #1 verify session userid
      const userProfile = await prisma.userProfile.findUnique({
        where: {
          userId: session?.user?.uid,
        },
      })
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found.' })
      }
      if (!isUserProfileComplete(userProfile)) {
        return res.status(400).json({ message: 'User profile is incomplete.' })
      }

      // #2 check for party id
      let partyId = userProfile.ncPartyId
      // Not started means party has not been created
      if (userProfile.kycStatus == 'Not Started' || !partyId) {
        console.log('Attempting to create party.')
        try {
          // create North Capital party
          const createPartyURL = new URL(
            'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createParty'
          )
          const data = new URLSearchParams()
          data.append('clientID', CLIENT_ID)
          data.append('developerAPIKey', DEVELOPER_KEY)
          data.append('domicile', userProfile.residence!)
          data.append('firstName', userProfile.firstName!)
          data.append('lastName', userProfile.lastName!)
          data.append('dob', convertDateToSimpleString(userProfile.dob!))
          data.append('primCountry', userProfile.country!)
          data.append('primAddress1', userProfile.address!)
          data.append('primCity', userProfile.city!)
          data.append('primState', userProfile.state!)
          data.append('primZip', userProfile.zipCode!)
          data.append('emailAddress', userProfile.email!)
          console.log('CreateParty request with parameters: ', data)

          const response = await fetch(createPartyURL, {
            method: 'PUT',
            body: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          if (!response.ok) {
            throw new Error(`Error creating party! status: ${response.status}`)
          }

          const result = (await response.json()) as CreatePartyResponse
          console.log('result is: ', JSON.stringify(result, null, 4))

          // add north capital party ID to user profile
          if (result.statusCode == '101') {
            let partyIdAsNumber = getPartyNumberFromResult(result)
            if (!partyIdAsNumber) {
              return res.status(500).json({ message: 'No party ID was found.' })
            } else {
              console.log('Party ID obtained ', partyIdAsNumber)
            }
            console.log(
              "Updating UserProfile with NC Party ID and new KYC Status: 'Party Created'"
            )
            const userWithParty = await prisma.userProfile.update({
              where: {
                userId: session?.user?.uid,
              },
              data: {
                ncPartyId: partyIdAsNumber,
                kycStatus: 'Party Created',
              },
            })
            if (!userWithParty || !userWithParty.ncPartyId) {
              console.log(
                'This UserProfile object caused an issue: ',
                userWithParty
              )
              return res
                .status(500)
                .json({
                  message:
                    'Something went wrong when trying to update the party ID on ChainRaise DB.',
                })
            }
            partyId = userWithParty.ncPartyId
          } else {
            return res
              .status(500)
              .json({
                message:
                  'Something went wrong when trying to contact NC for a party ID.',
              })
          }

          return res.status(200).json(result)
        } catch (error) {
          if (error instanceof Error) {
            console.log('error message: ', error.message)
            return res.status(500).json({ message: error.message })
          } else {
            console.log('unexpected error: ', error)
            return res.status(500).json({ message: 'Unexpected error' })
          }
        }
      }

      // #3 try basic kyc/aml auto verification
      if (
        partyId &&
        userProfile.kycStatus != 'Auto-Pass' &&
        userProfile.kycStatus != 'Auto-Fail'
      ) {
        const performKYCURL = 'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/performKycAmlBasic'
        const data = new URLSearchParams()
        data.append('clientID', CLIENT_ID)
        data.append('developerAPIKey', DEVELOPER_KEY)
        data.append('partyId', partyId)
        const response = await fetch(performKYCURL, {
          method: 'PUT',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        if (!response.ok) {
          throw new Error(`Error performing KYC! status: ${response.status}`)
        }
        return res.status(200).json({ message: `Received a ${response}` })
      }

    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

// helper function
function isUserProfileComplete(userProfile: UserProfile): boolean {
  if (
    !userProfile.residence ||
    !userProfile.firstName ||
    !userProfile.lastName ||
    !userProfile.dob ||
    !userProfile.country ||
    !userProfile.address ||
    !userProfile.city ||
    !userProfile.state ||
    !userProfile.zipCode ||
    !userProfile.email
  ) {
    return false
  }
  return true
}
function isUSCitizenOrResidentString(residenceStatus: string | null): string {
  if (residenceStatus == 'U.S. Citizen' || residenceStatus == 'U.S. Resident') {
    return 'true'
  }
  return 'false'
}

function convertDateToSimpleString(dbDate: Date): string {
  const month = dbDate.getMonth() + 1
  const day = dbDate.getUTCDate()
  const year = dbDate.getUTCFullYear()

  return (
    (month.toString().length == 1 ? '0' + month.toString() : month.toString()) +
    '-' +
    day.toString() +
    '-' +
    year.toString()
  )
}

function getPartyNumberFromResult(result: CreatePartyResponse): string {
  var resultPartyObject = result.partyDetails[1] as PartyDetail[]
  if (!resultPartyObject || !resultPartyObject[0].partyId) {
    console.log('Failed to get partyId', resultPartyObject)
    return ''
  }
  return resultPartyObject[0].partyId
}
