import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
interface props {
    themes: any
}
const Widget = ({themes}:props) => {
    return (
        <div className="col-span-2 hidden lg:inline mt-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-200 dark:bg-opacity-10 rounded-full p-3 mb-5">
                <SearchIcon className="w-5 h-5 text-gray-400"/>
                <input type="text" placeholder="Search Twitter" className="flex-1 outline-none bg-transparent"/>
            </div>
            {/* timeline */}
            <TwitterTimelineEmbed sourceType="profile" screenName="twitter" options={{height: 1000}} theme={themes === 'light' ? 'light' : 'dark'} />
        </div>
    )
}

export default Widget