import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { NOT_STARTED } from '../../../constants/const'
import { prisma } from '../../../lib/db'
import { DisplayAdminUser, DisplayAdminOffering } from '../../../types/typings'

export default async function display(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'No user id found.' })
  }

  if (!session.user.admin) {
    return res.status(404).json({ message: "You're not allowed in here." })
  }

  if (req.method != 'GET') {
    return res.status(405).end(`Method ${req.method} not allowed`)
  }

  console.log('Fetching user profiles')
  const userProfiles = await prisma.userProfile.findMany({
    include: {
      userKYCAML: {
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
  })

  let usersForDisplay: DisplayAdminUser[] = []
  userProfiles.forEach((userProfile) => {
    const userForDisplay = {
      uid: userProfile.userId,
      name: userProfile.firstName + ' ' + userProfile.lastName,
      accountType: userProfile.accountType,
    } as DisplayAdminUser

    if (!userProfile.ncPartyId || userProfile.userKYCAML.length == 0) {
      userForDisplay.kycStatus = NOT_STARTED
      userForDisplay.amlStatus = NOT_STARTED
    } else {
      userProfile.userKYCAML[0].kycStatus
        ? (userForDisplay.kycStatus = userProfile.userKYCAML[0].kycStatus)
        : (userForDisplay.kycStatus = NOT_STARTED)
      userProfile.userKYCAML[0].amlStatus
        ? (userForDisplay.amlStatus = userProfile.userKYCAML[0].amlStatus)
        : (userForDisplay.amlStatus = NOT_STARTED)
    }

    // TODO: add accreditation to display user
    usersForDisplay.push(userForDisplay)
  })

  console.log('Fetching offerings')
  const offerings = await prisma.offering.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      goal: true,
      pledged: true,
      startTimestamp: true,
      endTimestamp: true,
    },
  })

  let offeringsForDisplay: DisplayAdminOffering[] = []
  offerings.forEach((offering) => {
    const offeringForDisplay = {
      offeringId: offering.id,
      name: offering.name,
      slug: offering.slug,
      status: offering.status.value,
      goal: offering.goal,
      pledged: offering.pledged,
      startDate: offering.startTimestamp.toISOString(),
      endDate: offering.endTimestamp.toISOString(),
    } as DisplayAdminOffering

    offeringsForDisplay.push(offeringForDisplay)
  })

  const transactions = await prisma.transaction.findMany({
    select: {
      id: true,
      totalAmount: true,
      transactionType: true,
      transactionUnits: true,
      userProfile: {
        select: {
          firstName: true,
          lastName: true,
        }
      },
      offering: {
        select: {
          name: true,
        }
      }
    }
  })

  // TODO: convert transactions to display model and add to response object

  const organizations = await prisma.organization.findMany({
    select : {
      id: true,
      ncIssuerId: true,
      owner: true,
      offerings: {
        select: {
          name: true,
          slug: true
        }
      }
    }
  })

  // TODO: convert organizations to display model and add to response object

  return res.status(201).json({offerings: offeringsForDisplay, users: usersForDisplay})
}
