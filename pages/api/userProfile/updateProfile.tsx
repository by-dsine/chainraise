import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/db'
import { PersonalInformationForm } from '../../../types/typings'

export default async function postUpdateToUserProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: PersonalInformationForm = JSON.parse(req.body)

  const session = await getSession({ req })

  if (!session?.user?.uid) {
    return res.status(500).json({ message: 'No user id found.' })
  }

  const userProfile = await prisma.userProfile.update({
    where: {
      userId: session?.user?.uid
    },
    data: {
        username: data.username,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        phone: data.phone,
        email: data.email,
        dob: new Date(Date.parse(data.dob!)),
        residence: data.residence
    }
  })

  if (!userProfile) {
    return res.status(404).json({ message: 'User not found.' })
  }
  return res.status(201).json(userProfile)
}
