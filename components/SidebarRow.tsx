import { SVGProps } from "react"

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
}
const SidebarRow = ({Icon, title}: Props) => {
  return (
    <div className="flex items-center gap-2 px-3 cursor-pointer rounded-full hover:bg-gray-700  dark:hover:bg-gray-200 dark:hover:bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 py-3 group max-w-fit">
        <Icon className="h-7 w-7" />
        <p className="group-hover:text-twitter dark:group-hover:text-white text-lg lg:inline-flex hidden font-semibold lg:text-xl">{title}</p>
    </div>
  )
}

export default SidebarRow