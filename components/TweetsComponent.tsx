import { Comment, CommentBody, Likes, LikesBody, Tweet } from "../typings"
import TimeAgo from 'react-timeago'
import { CalendarIcon, ChatAlt2Icon, EmojiHappyIcon, HeartIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon, SwitchHorizontalIcon, UploadIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useEffect, useState } from "react"
import { fetchComments } from "../utils/fetchComments"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { fetchLikes } from "../utils/fetchLikes";

interface props {
    tweet:Tweet,
}
const TweetsComponent = ({tweet}:props) => {
    const [comments, setcomments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const { data:session } = useSession()
    const [selectedFile, setSelectedFile] = useState(null)
    const [likes, setLikes] = useState<Likes[]>([])
    const [liked, setLiked] = useState<boolean>(false)
    const [tweetIdRef, setTweetIdRef] = useState()
    const [tweetUseremail, setTweetUseremail] = useState()
    const refreshComments= async () => {
        const comments:Comment[] = await fetchComments(tweet._id)
        setcomments(comments)
    }
    const postComment= async ()=> {
        const commentBody: CommentBody = {
            comment: input,
            tweetId: tweet._id,
            username: session?.user?.name || 'Unknown User',
            profileImage: session?.user?.image || 'https://links.papareact.com/gll'
        }
        const result= await fetch(`/api/addComment`, {
            body: JSON.stringify(commentBody),
            method: 'POST'
        })
        const json = await result.json();
        const newComments = await fetchComments(commentBody.tweetId)
        setcomments(newComments)
        toast('Comment Posted')

        return json;
    }
    const likePosts = async () => {
        console.log(tweet._id);
        const likesInfo: LikesBody = {
            username: session?.user?.email || 'Unknown Email',
            tweetId: tweet._id
        }
        const result= await fetch(`/api/addLikes`, {
            body: JSON.stringify(likesInfo),
            method: 'POST'
        }) 
        
        const json = await result.json();
        const newLikes:any = await fetchLikes(likesInfo.tweetId)
        toast('Successfully liked')
        setLikes(newLikes)
        return json;
    }
    
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        postComment()
        
        setInput('');
        setCommentBoxVisible(false)
    }
    useEffect(() => {
        refreshComments()
        const showLike = async () => {
            const newLikes = await fetchLikes(tweet._id)
            setLikes(newLikes)
        }
        showLike()
    }, [])
    let tweetProfileImage = tweet.profileImg;
    const likePost= async ()=> {   
        let found =  likes.find((items:any,i:number)=>items.username==session?.user?.email && items.tweetId._ref == tweet._id );
        if (found) {
            toast('You no fit unlike')
        }else {
            likePosts();
            const newLikes = await fetchLikes(tweet._id)
            setLikes(newLikes)
        }
    }
    
    
  return (
    <>
           {commentBoxVisible && (
            <div className="w-full h-screen bg-gray-900/70 flex justify-center top-0 left-0 fixed z-40">
                <div className="mt-3 space-x-3 top-20 absolute bg-black z-40 w-80 sm:w-[32rem] rounded p-5">
                    <div className="my-2 mt-2 max-h-44 space-y-5 overflow-y-auto">
                        <div className='relative flex space-x-2'>
                            <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                            <img src={tweet.profileImg} className='mt-2 w-7 h-7 object-cover rounded-full' alt="Profile Image" />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold text-white">{tweet.username}</p>
                                    <p className="text-sm text-gray-500 lg:inline">@{tweet.username}</p>
                                    <TimeAgo className='text-sm text-gray-500' date={tweet._createdAt}/>
                                </div>
                                <div>
                                    <p className="text-white">{tweet.text}</p>
                                    <p className="break-all">{tweet.image}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <img src={session?.user?.image || 'https://links.papareact.com/gll'} className="mt-4 h-14 w-14 rounded-full object-cover" alt="profile logo"/>
                        <div className='flex flex-1 items-center pl-2'>
                        <form onSubmit={handleSubmit} className='flex flex-col flex-1'>
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Reply Tweets" className='h-24 w-full text-xl outline-none bg-transparent'/>
                            <div className='flex justify-between items-center'>
                            {/* icons */}
                              <div className='flex gap-2 text-twitter'>
                                <PhotographIcon className='w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                                <SearchCircleIcon className='w-5 h-5'/>
                                <EmojiHappyIcon className='w-5 h-5'/>
                                <CalendarIcon className='w-5 h-5'/>
                                <LocationMarkerIcon className='w-5 h-5'/>
                            </div>
                            {/* tweet button */}
                            <button disabled={!input} type="submit" className='disabled:opacity-40 bg-twitter py-2 px-5 font-bold text-white rounded-full'>Reply</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )}
    <div className="flex flex-col gap-3 border-y p-5 border-gray-500">
        <div className="flex gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src={tweetProfileImage} alt="Profile Image" />
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
        <div className="relative">
            <div className="mt-5 flex justify-between px-10">
                <div onClick={()=> session && setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                    <ChatAlt2Icon className="h-5 w-5"/>
                    <p>{comments.length}</p>
                </div>
                <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                    <SwitchHorizontalIcon className="h-5 w-5"/>
                </div>
                <div className='flex cursor-pointer items-center text-gray-400 space-x-3' onClick={likePost}>
                   <div className="group-hover:bg-pink-600/100">
                   {likes.length > 0 ? (
                       <HeartIconFilled className="h-5 w-5 text-pink-600"/>
                       )
                       : (
                        <HeartIcon className="h-5 w-5"/>
                    )
                   }
                   </div>
                   {likes.length > 0 && (
                        <span className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"}`}>{likes.length}</span>
                   )}
                </div>
                <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                    <UploadIcon className="h-5 w-5"/>
                </div>
            </div>
        
        </div>
        {/* ccomment box condition */}
     
        {comments?.length > 0 && (
            <div className="my-2 mt-2max-h-44 space-y-5 overflow-y-auto border-t border-gray-500 p-5">
                {comments.map((comment)=> (
                    <div key={comment._id} className='relative flex space-x-2'>
                        <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                        <img src={comment.profileImage || ''} className='mt-2 w-7 h-7 object-cover rounded-full' alt="Profile Image" />
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
    </>
  )
}

export default TweetsComponent