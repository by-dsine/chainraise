import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { NOT_STARTED } from '../../../constants/const'
import { prisma } from '../../../lib/db'
import { DisplayAdminUser } from '../../../types/typings'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
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

  console.log("Fetching user profiles")
  const profiles = await prisma.profile.findMany({
    include: {
        userKYCAML: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
  })

  let usersForDisplay: DisplayAdminUser[] = []
  profiles.forEach((profile)=> {
    const userForDisplay = {
        uid: profile.userId,
        name: profile.firstName + " " + profile.lastName,
        accountType: profile.accountType,
    } as DisplayAdminUser

    if(!profile.ncPartyId || profile.userKYCAML.length == 0) {
        userForDisplay.kycStatus = NOT_STARTED
        userForDisplay.amlStatus = NOT_STARTED
    } else {
        profile.userKYCAML[0].kycStatus ? userForDisplay.kycStatus = profile.userKYCAML[0].kycStatus : userForDisplay.kycStatus = NOT_STARTED
        profile.userKYCAML[0].amlStatus ? userForDisplay.amlStatus = profile.userKYCAML[0].amlStatus : userForDisplay.amlStatus = NOT_STARTED
    }

    // TODO: add accreditation to display user
    usersForDisplay.push(userForDisplay)
  })

  return res.status(201).json(usersForDisplay)
}
