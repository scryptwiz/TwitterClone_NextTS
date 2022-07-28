import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { fetchTweets } from '../utils/fetchTweets'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import Feed from '../components/Feed'
import Login from '../components/Login'
import Widget from '../components/Widget'
import Router from 'next/router'
import { Tweet } from '../typings'
import { Toaster } from 'react-hot-toast'
import { getSession, getProviders, useSession, signIn, signOut } from "next-auth/react";

interface props {
  tweets: Tweet[]
}

const Home = ({tweets}:props, providers:any) => {
  const { data: session } = useSession()
  console.log(session?.user);
  
  if (!session) {
    return (
      <>
      <div className='flex flex-col items-center w-full h-screen absolute top-0 left-0 justify-center'>
          <button className="" onClick={()=> signIn()}>
                  <a href="#_" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Sign in with Google</span>
                  </a>
          </button>
      </div>
      </>
    )
  }
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
      <Toaster/>
      <main className='grid grid-cols-9'>
        
        {/* Side bar */}
        <div className='col-span-2 overflow-y-auto flex flex-col items-center border-r border-gray-500 h-screen justify-between'>
          <Sidebar/>
          <label className="mt-7 inline-flex relative items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" id="default-toggle-size" className="sr-only peer" onClick={reload}/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-100 dark:after:bg-gray-700 after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 hidden lg:inline">{theme === 'light' ? 'Light' : 'Dark'} mode</span>
          </label>
          <div className="flex items-center gap-2 px-3 cursor-pointer rounded-full hover:bg-gray-700  dark:hover:bg-gray-200 dark:hover:bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 py-2 group max-w-fit mb-5" onClick={()=> signOut()}>
            <img src={session?.user?.image||"https://links.papareact.com/gll"} className='w-7 h-7 rounded-full object-cover' alt="ProfileImage"/>
            <div className='flex flex-col'>
              <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-semibold">{session?.user?.name}</p>
              <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-light text-xs">@{session?.user?.name?.replace(/\$+/g, '').toLocaleLowerCase()}</p>
            </div>
          </div>
        </div>
        {/* Feed */}
        <Feed tweets={tweets}/>
        {/* Widget */}
        <Widget themes={theme}/>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
      providers: await getProviders(),
      session: await getSession(context),
    }
  }
}