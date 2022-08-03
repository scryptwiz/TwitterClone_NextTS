// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Likes } from '../../typings'

const likesQuery = groq`
*[_type == "likes" && references(*[_type=='tweet' && _id == $tweetId]._id)] {
    _id,
    ...
} | order(_createdAt desc)
`

type Data = Likes[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId}=req.query
    const likes:Likes[] = await sanityClient.fetch(likesQuery, {
        tweetId,
    })
    console.log(likes);
  res.status(200).json(likes)
}
