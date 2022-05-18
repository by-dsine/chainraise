import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NewHeader from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <div className="scrollbar-hide h-screen overflow-y-scroll bg-gray-50">
    //   <Head>
    //     <title>ChainRaise</title>
    //     <link rel="icon" href="/logomark.png" />
    //   </Head>
    //   <NewHeader/>
      <Component {...pageProps} />
    //</div>
  )
}

export default MyApp
