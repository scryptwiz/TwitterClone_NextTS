import { RefreshIcon } from "@heroicons/react/outline"

const Feed = () => {
  return (
    <div className="col-span-7 lg:col-span-5">
      <div className="flex justify-between items-center py-3 px-4">
          <p>Home</p>
          <RefreshIcon className="text-twitter w-7 h-7"/>
      </div>
    </div>
  )
}

export default Feed