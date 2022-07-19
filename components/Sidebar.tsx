import {BellIcon,HashtagIcon,BookmarkIcon,CollectionIcon,DotsCircleHorizontalIcon,MailIcon,UserIcon,HomeIcon, TrendingUpIcon} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

function Sidebar() {
  return (
    <div className='flex flex-col gap-1 items-center lg:items-start'>
        <img src='/assets/logo.png' className='my-5 w-7 h-7 mx-3 cursor-pointer' alt='Twiter logo'/>
        <SidebarRow Icon={HomeIcon} title='Home'/>
        <SidebarRow Icon={HashtagIcon} title='Explore'/>
        <SidebarRow Icon={BellIcon} title='Notification'/>
        <SidebarRow Icon={MailIcon} title='Message'/>
        <SidebarRow Icon={BookmarkIcon} title='Bookmarks'/>
        <SidebarRow Icon={CollectionIcon} title='Lists'/>
        <SidebarRow Icon={UserIcon} title='Profile'/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title='More'/>
        <button className='px-3 py-3 rounded-full bg-blue-400 w-fit font-semibold text-xl transition-all duration-200 hover:bg-twitter text-white lg:hidden inline'><TrendingUpIcon className='w-5 h-5'/></button>
        <button className='px-4 py-2 rounded-full bg-blue-400 w-full font-semibold text-xl transition-all duration-200 hover:bg-twitter text-white hidden lg:inline'>Tweet</button>
    </div>
  )
}

export default Sidebar