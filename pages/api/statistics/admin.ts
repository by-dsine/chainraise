import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/db'

export default async function adminStatistics(
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

  const userProfileCount = await prisma.userProfile.count()

  if (userProfileCount !=0 && !userProfileCount) {
    return res.status(500).json({ message: "No user count returned."})
  }

  const offeringsCount = await prisma.offering.count()

  if (offeringsCount != 0 && !offeringsCount) {
    return res.status(500).json({ message: "No offering count returned."})
  }

  return res.status(200).json({userCount: userProfileCount, offeringsCount: offeringsCount})
}
