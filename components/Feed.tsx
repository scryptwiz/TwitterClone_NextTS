import { RefreshIcon } from "@heroicons/react/outline"
import { Tweet } from "../typings"
import TweetBox from "./TweetBox"
import TweetsComponent from './TweetsComponent'

interface props {
  tweets:Tweet[]
}
const Feed = ({tweets}:props) => {
  return (
    <div className="col-span-7 lg:col-span-5">
      <div className="flex justify-between items-center py-3 px-4">
          <p>Home</p>
          <RefreshIcon className="text-twitter w-7 h-7"/>
      </div>
      <div className="pb-5">
        <TweetBox/>
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