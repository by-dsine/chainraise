import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { PersonalInformationForm } from '../../../types/typings'

export default async function getUserProfileByUserId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: PersonalInformationForm = JSON.parse(req.body)

  if (!data.userId || data.userId === '') {
    return res.status(500).json({ message: 'No user id received.' })
  }

  console.log("data ", data)
  
  const userProfile = await prisma.userProfile.update({
    where: {
      userId: data.userId
    },
    data: {
        username: data.username,
        bio: data.bio,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
    }
  })

  if (!userProfile) {
    return res.status(404).json({ message: 'User not found.' })
  }
  return res.status(201).json(userProfile)
}
