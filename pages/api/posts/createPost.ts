import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import { INewPostForm } from '../../../types/typings'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-10-21',    
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: INewPostForm = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'post',
          body: data.body,
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
