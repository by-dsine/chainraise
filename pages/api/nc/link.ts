import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { BASE_URL } from '../../../nc'
import { prisma } from '../../../lib/db'
import { NCResponse } from '../../../types/typings'

export default async function onboardNorthCapital(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session not found.')

    return res.status(500).json({ message: 'Session not found.' })
  }
  console.log('Session located.')

  const V3_URL = '/tapiv3/index.php/v3'

  if (!BASE_URL) {
    console.log('North Capital URL not loaded.')
    return res.status(500).json({ message: 'No NC URL found.' })
  }

  const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID
  const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY

  if (!CLIENT_ID || !DEVELOPER_KEY) {
    console.log('North Capital parameters not loaded.')
    return res.status(500).json({ message: 'No NC parameters found.' })
  }

  const { linkId } = req.query
  if (typeof linkId != 'string') {
    return res.status(500).json({ message: 'Invalid link ID returned' })
  }

  try {
    console.log(`Deleting link ${linkId} from North Capital`)
    // create North Capital party
    const deleteLinkURL = new URL(
      'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/deleteLink'
    )
    const data = new URLSearchParams()
    data.append('clientID', CLIENT_ID)
    data.append('developerAPIKey', DEVELOPER_KEY)
    data.append('id', linkId)

    const response = await fetch(deleteLinkURL, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const result = (await response.json()) as NCResponse
    if(result.statusCode != "101") {
        return res.status(500).json({ message: result.statusDesc })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message)
      return res.status(500).json({ message: error.message })
    } else {
      console.log('unexpected error: ', error)
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }
}
