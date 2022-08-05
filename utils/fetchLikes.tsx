import { Likes } from "../typings"

export const fetchLikes = async (tweetId: string) => {
    const res = await fetch(`/api/getLikes?tweetId=${tweetId}`)
    const likes:Likes[] = await res.json()
    return likes    
    
}