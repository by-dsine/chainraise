import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { BASE_URL } from '../../../nc'
import { prisma } from '../../../lib/db'
import {
  CreateAccountResponse,
  CreateLinkResponse,
  CreatePartyResponse,
} from '../../../types/typings'
import {
  getAccountIdFromResult,
  getEntryType,
  getLinkIdFromResult,
  getPartyNumberFromResult,
} from '../../../lib/nc'
import { convertDateToSimpleString } from '../../../utils/mappers'

export default async function onboardNorthCapital(
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

  switch (req.method) {
    case 'PUT':
      const userProfile = await prisma.userProfile.findUnique({
        where: {
          userId: session.user.uid,
        },
        include: {
          userKYCAML: {
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      })

      if (!userProfile) {
        return res.status(500).json({ message: 'Message not found.' })
      }

      let partyId = userProfile.ncPartyId

      if (!partyId) {
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
          data.append('primAddress1', userProfile.address1!)
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
            return res
              .status(500)
              .json({
                message: `Error creating party! status: ${response.status}`,
              })
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
              "Updating UserProfile with NC Party ID and new KYC Status: 'Party Created'"
            )
            // update statuses
            const userKYCAMLRecord = await prisma.userKYCAML.create({
              data: {
                kycStatus: 'Party Created',
                amlStatus: 'Not Started',
                userProfileId: userProfile.id,
                timestamp: new Date(),
              },
            })

            // update party id
            const userWithParty = await prisma.userProfile.update({
              where: {
                userId: session?.user?.uid,
              },
              data: {
                ncPartyId: partyIdAsNumber,
              },
            })
            if (!userWithParty || !userWithParty.ncPartyId) {
              console.log(
                'This UserProfile object caused an issue: ',
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

      let accountId = userProfile.ncAccountId

      if (!accountId) {
        console.log(
          'Attempting to create NC account for user ',
          session.user.uid
        )
        try {
          // create North Capital party
          const createAccountURL = new URL(
            'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createAccount'
          )
          const data = new URLSearchParams()
          data.append('clientID', CLIENT_ID)
          data.append('developerAPIKey', DEVELOPER_KEY)
          data.append('accountRegistration', userProfile.residence!)
          data.append('type', userProfile.accountType!)
          data.append('domesticYN', 'domestic_account')
          data.append('streetAddress1', userProfile.address1!)
          data.append('streetAddress2', userProfile.address2!)
          data.append('city', userProfile.city!)
          data.append('state', userProfile.state!)
          data.append('zip', userProfile.zipCode!)
          data.append('country', userProfile.country!)
          data.append('KYCstatus', userProfile.userKYCAML[0].kycStatus!)
          data.append('AMLstatus', userProfile.userKYCAML[0].amlStatus!)
          data.append('AccreditedStatus', 'pending')
          data.append('approvalStatus', 'pending')

          console.log('CreateAccount request with parameters: ', data)

          const response = await fetch(createAccountURL, {
            method: 'PUT',
            body: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          if (!response.ok) {
            return res
              .status(500)
              .json({
                message: `Error creating account! status: ${response.status}`,
              })
          }

          const result = (await response.json()) as CreateAccountResponse
          console.log(
            'createAccount result is: ',
            JSON.stringify(result, null, 4)
          )

          if (result.statusCode == '101') {
            accountId = getAccountIdFromResult(result)
            if (!accountId) {
              return res
                .status(500)
                .json({ message: 'No account ID was returned.' })
            }

            const userProfile = await prisma.userProfile.update({
              where: {
                userId: session.user.uid,
              },
              data: {
                ncAccountId: accountId,
              },
            })

            if (!userProfile) {
              return res.status(500).json({
                message:
                  'There was a problem adding the account ID to the user profile.',
              })
            }
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

      let linkId = userProfile.ncLinkId

      if(!linkId) {
        console.log("Creating link in NC for party and account")

        try {
          // create North Capital party
          const createLinkURL = new URL(
            'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createLink'
          )
          const data = new URLSearchParams()
          data.append('clientID', CLIENT_ID)
          data.append('developerAPIKey', DEVELOPER_KEY)
          data.append('firstEntryType', "Account")
          data.append('firstEntry', userProfile.ncAccountId!)
          data.append('relatedEntryType', getEntryType(userProfile.accountType!))
          data.append('relatedEntry', userProfile.ncPartyId!)
          data.append('linkType', 'owner')
          data.append('primary_value', "1")

          console.log('CreateLink request with parameters: ', data)

          const response = await fetch(createLinkURL, {
            method: 'PUT',
            body: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })

          if (!response.ok) {
            const result = (await response.json())
            console.log(result)

      
            return res
              .status(500)
              .json({
                message: `Error creating link! status: ${result}`,
              })
          }

          const result = (await response.json()) as CreateLinkResponse
          console.log(
            'createLink result is: ',
            JSON.stringify(result, null, 4)
          )

          if (result.statusCode == '101') {
            linkId = getLinkIdFromResult(result)
            if (!linkId) {
              return res
                .status(500)
                .json({ message: 'No link ID was returned.' })
            }

            const userProfile = await prisma.userProfile.update({
              where: {
                userId: session.user.uid,
              },
              data: {
                ncLinkId: linkId,
              },
            })

            if (!userProfile) {
              return res.status(500).json({
                message:
                  'There was a problem adding the account ID to the user profile.',
              })
            }
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


      return res.status(200).json({ partyId: partyId, accountId: accountId, linkId: linkId})


  }
}
