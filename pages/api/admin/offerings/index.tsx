import { truncate } from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../../lib/db'

export default async function offerings(
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

  const { slug } = req.query
  if(typeof slug !== 'string'){
    return res.status(404).json({ message: "No slug received"})
  }

  const offering = await prisma.offering.findUnique({
    where: {
        slug: slug,
      },
      include : {
        sections: true,
        offeringParameters: true,
        offeringHistory: true
      }
  })

  if (!offering) {
    return res.status(404).json({ message: "No slug received"})
  }

  return res.status(200).json(offering)
}
