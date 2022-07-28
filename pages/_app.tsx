import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

interface props {
  session:any
}

function MyApp({ Component, pageProps }: AppProps, {session}:props) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
