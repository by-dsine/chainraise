import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../../sanity'
import { INewPostForm } from '../../../types/typings'
import { useSession } from 'next-auth/react'

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: session } = useSession()
  if (!session) {
    return res.status(401).json({ message: 'Not logged in (Unauthenticated)' })
  }

  const getUserQuery = `*[_type == "user" && uid == $uid][0]{
    _id, 
  }`
  const user = await sanityClient.fetch(getUserQuery, {
    _id: session.user.uid,
  })

  if (!user) {
    return res.status(500).json({ message: "Server error: User could not be located in CMS."})
  }

  const data: INewPostForm = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'article',
          body: data.body,
          author: {
            _type: 'reference',
            _ref: session.user.uid
          }
        }
      }
    ]
  }

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  
  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
    },
    body: JSON.stringify(mutations),
    method: 'POST'
  })

  const json = await result.json()
  
  
  return res.status(201).json(json)
}
