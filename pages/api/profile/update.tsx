import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/db'
import { UpdateUser } from '../../../types/typings'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    return res.status(500).json({ message: 'No user id found.' })
  }

  const variables = req.query
  console.log(variables)

  var data = {} as UpdateUser

  if (variables['firstName'] && typeof variables['firstName'] == 'string') {
    data['firstName'] = variables['firstName']
  }
  if (variables['middleName'] && typeof variables['middleName'] == 'string') {
    data['middleName'] = variables['middleName']
  }
  if (variables['lastName'] && typeof variables['lastName'] == 'string') {
    data['lastName'] = variables['lastName']
  }
  if (variables['phone'] && typeof variables['phone'] == 'string') {
    data['phone'] = variables['phone']
  }
  if (variables['address1'] && typeof variables['address1'] == 'string') {
    data['address1'] = variables['address1']
  }
  if (variables['address2'] && typeof variables['address2'] == 'string') {
    data['address2'] = variables['address2']
  }
  if (variables['unit'] && typeof variables['unit'] == 'string') {
    data['unit'] = variables['unit']
  }
  if (variables['city'] && typeof variables['city'] == 'string') {
    data['city'] = variables['city']
  }
  if (variables['state'] && typeof variables['state'] == 'string') {
    data['state'] = variables['state']
  }

  if(!data){
    return res.status(400).json({statusCode: '400', statusDesc: 'No data received. No updates made.', body: {}})
  }


  const profile = await prisma.profile.update({
    where: {
      userId: session?.user?.uid,
    },
    data: data,
  })

  return res.status(200).json({statusCode: '200', statusDesc: `Profile updated with data: ${data}.`, body: profile})
}
