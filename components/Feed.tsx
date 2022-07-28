import { RefreshIcon } from "@heroicons/react/outline"
import { useState } from "react"
import toast from "react-hot-toast"
import { Tweet } from "../typings"
import { fetchTweets } from "../utils/fetchTweets"
import TweetBox from "./TweetBox"
import TweetsComponent from './TweetsComponent'

interface props {
  tweets:Tweet[]
}
const Feed = ({tweets: tweetsProp }:props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets();
    setTweets(tweets)
    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 max-h-screen overflow-y-auto border-r border-gray-500">
      <div className="flex justify-between items-center py-3 px-4">
          <p>Home</p>
          <RefreshIcon className="text-twitter w-7 h-7 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 cursor-pointer" onClick={handleRefresh}/>
      </div>
      <div className="pb-5">
        <TweetBox setTweets={setTweets}/>
      </div>
      {/* Feed */}
      <div>
        {tweets.map((tweet)=>(
          <TweetsComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed