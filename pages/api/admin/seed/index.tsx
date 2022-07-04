import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../../../lib/db'

export default async function newOffering(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'No user id found.' })
  }

  console.log('Checking admin status...')

  if (!session.user.admin) {
    return res.status(404).json({ message: "You're not allowed in here." })
  }
  console.log('Admin status verified!')

  if (req.method != 'POST') {
    return res.status(405).end(`Method ${req.method} not allowed.`)
  }

  await prisma.offering.deleteMany({})
  await prisma.status.deleteMany({})
  await prisma.organization.deleteMany({})

  const testOrganization = await prisma.organization.create({
    data: {
      name: 'ChainRaise Test',
      contact: {
        connect: {
          userId: session.user.uid,
        },
      },
    },
  })

  await prisma.status.createMany({
    data: [
        {value: 'Created'},
        {value: 'Ready to Launch'},
        {value: 'Active'}
    ]
  })

  await prisma.offering.create({
    data : {
        name: 'Test Offering',
        slug: 'test-offering',
        organizationId: testOrganization.id,
        startTimestamp: new Date(2022, 5, 14),
        endTimestamp: new Date(2022, 5, 21),
        minimumInvestment: 1000000, // $10K
        goal: 500000000, // $5M
        pledged: 0,
        maxRaise: 550000000, // $5.5M
        industry: 'Technology',
        description: 'This is a very long description for a test offering. My goodness it goes on. And wouldn\'t you know, it doesn\'t even say that much. Like wow this is a lot of words to say absolutely nothing. And here you are, at the end of the line, and no way to get all that time back.',
        shortDescription: 'This description isn\'t much but it\'s honest work.',
        disclosure: 'None of this means anything.',
        summary: 'Oh boy here we go again. Luckily it\'s not nearly as long but still it\'s annoying to go on and on when there\'s nothing to be gained by going on.',
        type: 'Equity',
        statusId: 3 // Active
    }
  })

  console.log('Database seeded.')
  return res.status(200).json({ message: 'Nice' })
}
