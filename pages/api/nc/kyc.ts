import { Profile } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { normalizeConfig } from 'next/dist/server/config-shared'
import { prisma } from '../../../lib/db'
import {
  BasicKYCAMLResponse,
  CreatePartyResponse,
  PartyDetail,
} from '../../../types/typings'
import { BASE_URL } from '../../../nc'
import { convertDateToSimpleString } from '../../../utils/mappers'
import { getPartyNumberFromResult } from '../../../lib/nc'
import { AUTO_APPROVED } from '../../../lib/consts'
export default async function handleNorthCapital(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'Session not found.' })
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

  const { userId } = req.query

  var idToQuery = ""
  if (typeof userId !== 'string' && !session.user.uid) {
    return res.status(400).json({ message: 'Nobody to perform KYC on'})
  } else if (typeof userId == 'string') {
    idToQuery = userId
  } else if (session.user.uid) {
    idToQuery = session.user.uid
  }

  // use prisma to get user information
  const profile = await prisma.profile.findUnique({
    where: {
      userId: idToQuery,
    },
    include: {
      userKYCAML: {
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
  })
  if (!profile) {
    return res.status(404).json({ message: 'User profile not found.' })
  }

  switch (req.method) {
    case 'GET':
      if (profile.userKYCAML.length == 0) {
        return res.status(200).json({
          kycStatus: 'Not Started',
          amlStatus: 'Not Started',
        })
      }
      return res.status(200).json({
        kycStatus: profile.userKYCAML[0].kycStatus,
        amlStatus: profile.userKYCAML[0].amlStatus,
      })

    case 'PUT':
      // #1 verify user profile has required fields for KYC/AML
      if (!isProfileComplete(profile)) {
        return res.status(400).json({ message: 'User profile is incomplete.' })
      }

      var currentKYCStatus = ''
      var currentAMLStatus = ''

      if (profile.userKYCAML.length > 0) {
        currentKYCStatus = profile.userKYCAML[0].kycStatus!
        currentAMLStatus = profile.userKYCAML[0].amlStatus!
      }
      // #2 check for party id
      let partyId = profile.ncPartyId
      // Not started means party has not been created
      if (currentKYCStatus == 'Not Started' || !currentKYCStatus || !partyId) {
        console.log('Attempting to create party.')
        try {
          // create North Capital party
          const createPartyURL = new URL(
            'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createParty'
          )
          const data = new URLSearchParams()
          data.append('clientID', CLIENT_ID)
          data.append('developerAPIKey', DEVELOPER_KEY)
          data.append('domicile', profile.residence!)
          data.append('firstName', profile.firstName!)
          data.append('lastName', profile.lastName!)
          data.append('dob', convertDateToSimpleString(profile.dob!))
          data.append('primCountry', profile.country!)
          data.append('primAddress1', profile.address1!)
          data.append('primCity', profile.city!)
          data.append('primState', profile.state!)
          data.append('primZip', profile.zipCode!)
          data.append('emailAddress', profile.email!)
          console.log('CreateParty request with parameters: ', data)

          const response = await fetch(createPartyURL, {
            method: 'PUT',
            body: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          if (!response.ok) {
            return res.status(500).json({ message:`Error creating party! status: ${response.status}`})
          }

          const result = (await response.json()) as CreatePartyResponse
          console.log(
            'createParty result is: ',
            JSON.stringify(result, null, 4)
          )

          // add north capital party ID to user profile
          if (result.statusCode == '101') {
            let partyIdAsNumber = getPartyNumberFromResult(result)
            if (!partyIdAsNumber) {
              return res.status(500).json({ message: 'No party ID was found.' })
            } else {
              console.log('Party ID obtained ', partyIdAsNumber)
            }
            console.log(
              "Updating Profile with NC Party ID and new KYC Status: 'Party Created'"
            )
            // update statuses
            const userKYCAMLRecord = await prisma.userKYCAML.create({
              data: {
                kycStatus: 'Party Created',
                amlStatus: 'Not Started',
                profileId: profile.id,
                timestamp: new Date(),
              },
            })

            // update party id
            const userWithParty = await prisma.profile.update({
              where: {
                userId: session?.user?.uid,
              },
              data: {
                ncPartyId: partyIdAsNumber,
              },
            })
            if (!userWithParty || !userWithParty.ncPartyId) {
              console.log(
                'This Profile object caused an issue: ',
                userWithParty
              )
              return res.status(500).json({
                message:
                  'Something went wrong when trying to update the party ID on ChainRaise DB.',
              })
            }
            partyId = userWithParty.ncPartyId
          } else {
            return res.status(500).json({
              message:
                'Something went wrong when trying to contact NC for a party ID.',
            })
          }
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
        currentKYCStatus != AUTO_APPROVED
      ) {
        const performKYCURL =
          'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/performKycAmlBasic'
        const data = new URLSearchParams()
        data.append('clientID', CLIENT_ID)
        data.append('developerAPIKey', DEVELOPER_KEY)
        data.append('partyId', partyId)
        const response = await fetch(performKYCURL, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        if (!response.ok) {
          return res.status(400).json({
            message: 'shit, something broke',
            body: await response.json(),
          })
        }
        const result = (await response.json()) as BasicKYCAMLResponse
        console.log('basicKYCAML result is: ', JSON.stringify(result, null, 4))
        // TODO: Add logging to track which calls are being made where and what their results are
        if (result.statusCode == '101') {
          let KYCresult = result?.kyc?.kycstatus
          let AMLresult = result?.kyc?.amlstatus

          if (!KYCresult || !AMLresult) {
            return res.status(500).json({
              message: `One of these didn't return something valid. KYCresult: ${KYCresult} and AMLresult: ${AMLresult}`,
            })
          }
          console.log(
            `Updating Profile with NC KYC Status: ${KYCresult} and AML Status: ${AMLresult}`
          )
          const userKYCAMLRecord = await prisma.userKYCAML.create({
            data: {
              kycStatus: KYCresult,
              amlStatus: AMLresult,
              profileId: profile.id,
              timestamp: new Date(),
              response: result.kyc,
            },
          })

          return res.status(200).json({
            kycStatus: userKYCAMLRecord.kycStatus,
            amlStatus: userKYCAMLRecord.amlStatus,
          })
        } else {
          return res.status(500).json({
            message:
              'Something went wrong when trying to contact NC to do basic KYC/AML.',
          })
        }
      }

      return res
        .status(400)
        .json({message: 'No actions were taken on the account.'})

    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

// helper function
function isProfileComplete(profile: Profile): boolean {
  if (
    !profile.residence ||
    !profile.firstName ||
    !profile.lastName ||
    !profile.dob ||
    !profile.country ||
    !profile.address1 ||
    !profile.phone ||
    !profile.city ||
    !profile.state ||
    !profile.zipCode ||
    !profile.email
  ) {
    return false
  }
  return true
}
