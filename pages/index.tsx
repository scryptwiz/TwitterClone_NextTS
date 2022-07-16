import type { NextPage } from 'next'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import Feed from '../components/Feed'
import Widget from '../components/Widget'
import Router from 'next/router'

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme()
  const reload = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    Router.reload();
  }
  useEffect(() => setMounted(true), [])
  if(!mounted) return null;
  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
      <Head>
        <title>Home / Twiter</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <main className='grid grid-cols-9'>
        {/* Side bar */}
        <div className='col-span-2 flex flex-col items-center border-r border-gray-500 h-screen'>
          <Sidebar/>
          <label className="mt-7 inline-flex relative items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" id="default-toggle-size" className="sr-only peer" onClick={reload}/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-100 dark:after:bg-gray-700 after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden lg:inline">{theme === 'light' ? 'Light' : 'Dark'} mode</span>
          </label>
        </div>
        {/* Feed */}
        <Feed/>
        {/* Widget */}
        <Widget themes={theme}/>
      </main>
    </div>
  )
}

export default Home
