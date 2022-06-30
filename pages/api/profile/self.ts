import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ContactInformationForm } from '../../../types/typings'
import { prisma } from '../../../lib/db'
import { convertInputDateToDateTime } from '../../../utils/mappers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session or user id not found.')
    return res.status(500).json({ message: 'No user id found.' })
  }

  switch (req.method) {
    case 'GET':
      console.log("Fetching user with ID: ", session.user.uid)
      const profile = await prisma.profile.findUnique({
        where: {
          userId: session.user.uid 
        },
        include: {
          userKYCAML: true
        }
      })
      if(!profile) {
        return res.status(404).json( {message: "Profile not found."} )
      }
      return res.status(200).json(profile)
      
    case 'POST':
      console.log("Updating user with ID: ", session.user.uid)
      console.log("Received req, ", req.body)
      const data: ContactInformationForm = req.body
      const profileUpdate = await prisma.profile.update({
        where: {
          userId: session.user.uid,
        },
        data: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          address1: data.address1,
          unit: data.unit,
          address2: data.address2,
          city: data.city,
          country: data.country,
          state: data.state,
          zipCode: data.zipCode,
          email: data.email,
          phone: data.phone,
          dob: convertInputDateToDateTime(data.dob),
          residence: data.residence,
        },
      })
      console.log("Profile Update ", profileUpdate)
      if (!profileUpdate) {
        return res.status(500).json( {message: "Something went wrong while updating"})
      }
      console.log("Looks like a good return")
      return res.status(200).json({profileUpdate})
      
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}
