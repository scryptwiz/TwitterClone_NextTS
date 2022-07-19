import { useState } from 'react'
import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
const TweetBox = () => {
  const [tweet, setTweet] = useState<string>('')
  return (
    <div className='flex gap-2 px-5'>
        <img src="https://links.papareact.com/gll" className="mt-4 h-14 w-14 rounded-full object-cover" alt="profile logo"/>
        <div className='flex flex-1 items-center pl-2'>
          <form className='flex flex-col flex-1'>
            <input type="text" value={tweet} onChange={(e)=>setTweet(e.target.value)} placeholder="What's Happening" className='h-24 w-full text-xl outline-none bg-transparent'/>
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
              <button disabled={!tweet} className='disabled:opacity-40 bg-twitter py-2 px-5 font-bold text-white rounded-full'>Tweet</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default TweetBox