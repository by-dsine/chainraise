import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../../sanity'
import { IPersonalInformationForm } from '../../../types/typings'
import { useSession } from 'next-auth/react'
import { prisma } from '../../../lib/db'

export default async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query
  if (!uid) {
      return res.status(500).json({ message: "No user id received."})
  }
  if (typeof uid !== 'string') {
      return res.status(500).json({ message: "User id was not received as a string. Please try reformatting."})
  }

  const user = await prisma.user.findUnique( {
      where: {
          id: uid,
      }
  })

  if (!user) {
    return res.status(404).json({message: "User not found."})
  }

  return res.status(201).json(user)
}