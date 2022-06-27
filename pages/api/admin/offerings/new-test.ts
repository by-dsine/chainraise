import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../../lib/db'

export default async function newOffering(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'No user id found.' })
  }

  if (!session.user.admin) {
    return res.status(404).json({ message: "You're not allowed in here." })
  }

  if (req.method == 'POST') {
    return res.status(405).end(`Method ${req.method} not allowed.`)
  }
}
