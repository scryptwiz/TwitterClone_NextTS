// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { LikesBody } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const likes: LikesBody = JSON.parse(req.body);
    const mutations = {
        mutations: [
            {
                create: {
                    _type: 'likes',
                    username: likes.username,
                    tweetId: {
                      _type: 'reference',
                      _ref: `${likes.tweetId}`
                    }
                }
            }
        ]
    }

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25//data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
    const result = await fetch(apiEndpoint, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      body: JSON.stringify(mutations),
      method: 'POST'  
    })
    const json = await result.json();

  res.status(200).json({ message: 'Liked!' })
}
