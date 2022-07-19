import { Comment, Tweet } from "../typings"
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { fetchComments } from "../utils/fetchComments"

interface props {
    tweet:Tweet
}
const TweetsComponent = ({tweet}:props) => {
    const [comments, setcomments] = useState<Comment[]>([])
    const refreshComments= async () => {
        const comments:Comment[] = await fetchComments(tweet._id)
        setcomments(comments)
    }
    useEffect(() => {
        refreshComments()
    }, [])
    console.log(comments)
  return (
    <div className="flex flex-col gap-3 border-y p-5 border-gray-500">
        <div className="flex gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src={tweet.profileImg} alt="Profile Image" />
            <div>
                <div className="flex gap-1 items-center">
                    <p className="mr-1 font-bold">{tweet.username}</p>
                    <p className="hidden text-sm lg:inline text-gray-500">@{tweet.username.replace(/\$+/g, '').toLocaleLowerCase()}</p>
                    <TimeAgo className='text-sm text-gray-500' date={tweet._createdAt}/>
                </div>
                <p className="p-1">{tweet.text}</p>
                {tweet.image && <img src={tweet.image} className='m-5 ml-0 mb-0 max-h-60 rounded-lg object-cover shadow-sm' alt="Tweet Image"/>}
            </div>
        </div>
        <div className="mt-5 flex justify-between px-10">
            <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                <ChatAlt2Icon className="h-5 w-5"/>
                <p>{comments.length}</p>
            </div>
            <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                <SwitchHorizontalIcon className="h-5 w-5"/>
            </div>
            <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                <HeartIcon className="h-5 w-5"/>
            </div>
            <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                <UploadIcon className="h-5 w-5"/>
            </div>
        </div>
        {comments?.length > 0 && (
            <div className="my-2 mt-2max-h-44 space-y-5 overflow-y-auto border-t border-gray-500 p-5">
                {comments.map((comment)=> (
                    <div key={comment._id} className='relative flex space-x-2'>
                        <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                        <img src={comment.profileImage} className='mt-2 w-7 h-7 object-cover rounded-full' alt="Profile Image" />
                        <div>
                            <div className="flex items-center space-x-1">
                                <p className="mr-1 font-bold">{comment.username}</p>
                                <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\$+/g, '').toLocaleLowerCase()}</p>
                                <TimeAgo className='text-sm text-gray-500' date={comment._createdAt}/>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TweetsComponent