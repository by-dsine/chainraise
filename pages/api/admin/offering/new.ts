import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { OFFERING_CREATED_STATUS, STANDARD_DISCLOSURE } from '../../../../constants/const'
import { prisma } from '../../../../lib/db'
import {
  IssuerDetails,
  IssuerResponse,
  OfferingDetails,
  OfferingResponse,
} from '../../../../types/typings'

export default async function newOffering(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID
  const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY

  if (!CLIENT_ID || !DEVELOPER_KEY) {
    console.log('North Capital parameters not loaded.')
    return res.status(500).json({ message: 'No NC parameters found.' })
  }

  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'No user id found.' })
  }

  if (!session.user.admin) {
    return res.status(404).json({ message: "You're not allowed in here." })
  }

  // if (req.method != 'POST') {
  //   return res.status(405).end(`Method ${req.method} not allowed`)
  // }

  const {
    organizationId,
    offeringName,
    startDate,
    endDate,
    targetAmount,
    minimumAmount,
    maximumAmount,
    issueType,
    description,
  } = JSON.parse(req.body)
  if (
    !offeringName ||
    !startDate ||
    !endDate ||
    !targetAmount ||
    !minimumAmount ||
    !maximumAmount ||
    !issueType ||
    !description
  ) {
    return res
      .status(405)
      .json({message:`Bad request. Please make sure all fields are complete.`})
  }

  // #1 Locate organization to be the owner of this offering
  var organization = await prisma.userProfile.findUnique({
    where: {
      id: organizationId,
    },
  })

  if (!organization) {
    return res.status(405).end('No valid organization found.')
  }

  // #2 Create offering with North Capital
  const createOfferingURL = new URL(
    'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createOffering'
  )
  const data = new URLSearchParams()
  data.append('clientID', CLIENT_ID)
  data.append('developerAPIKey', DEVELOPER_KEY)
  data.append('issuerId', organizationId)
  data.append('issueName', offeringName)
  data.append('issueType', issueType)
  data.append('targetAmount', formatAmountForNC(targetAmount))
  data.append('minimumAmount', formatAmountForNC(minimumAmount))
  data.append('maximumAmount', formatAmountForNC(maximumAmount))
  data.append('startDate', startDate)
  data.append('endDate', endDate)
  data.append('offeringText', description)
  data.append('stampingText', 'Confidential')

  const response = await fetch(createOfferingURL, {
    method: 'PUT',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    console.log(response)
    return res
      .status(500)
      .json({ message: `Error creating offering! status: ${response.status}` })
  }

  const result = (await response.json()) as OfferingResponse
  console.log('createOffering result is: ', JSON.stringify(result, null, 4))

  if (result.statusCode == '101') {
    let offeringIdFromResult = getOfferingIdFromResult(result)
    if (!offeringIdFromResult) {
      return res.status(500).json({ message: 'No offering ID was found.' })
    }
    // create offering
    const offering = await prisma.offering.create({
        data: {
          name: offeringName,
          ncOfferingId: offeringIdFromResult,
          organizationId: organizationId,
          startTimestamp: startDate,
          endTimestamp: endDate,
          minimumInvestment: minimumAmount,
          goal: targetAmount,
          pledged: 0,
          description: description,
          shortDescription: description,
          disclosure: STANDARD_DISCLOSURE,
          summary: "",
          statusId: OFFERING_CREATED_STATUS,
        },
      })
      if (!offering) {
        return res.status(500).json({ message: 'Organization was not created.' })
      }
      return res.status(200).json({message: "Offering officially created.", offeringId: offering.id})
  }
  return res.status(500).json({ message: 'Something went wrong' })

}

function getOfferingIdFromResult(result: OfferingResponse): string {
  var resultOfferingObject = result.offeringDetails[1] as OfferingDetails[]
  if (!resultOfferingObject || !resultOfferingObject[0].offeringId) {
    console.log('Failed to get offering ID', resultOfferingObject)
    return ''
  }
  return resultOfferingObject[0].offeringId
}

// returns string representation of number with decimals
function formatAmountForNC(amount: number): string {
  return amount.toFixed(2)
}
