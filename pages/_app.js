// // import React from "react"
// // import type { AppProps } from 'next/app'
// // import Header from  "../components/header/Header";
// // import Head from 'next/head'
import Layout from '../components/Layout'
// // import '../Styles/globals.css'
// // import Test from '../components/test'
// // import localFont from '@next/font/local'
// // import '../public/fonts'

// // const poppins = localFont({
// //   src: [
// //     {
// //       path: '../public/fonts/Roboto-Bold.woff2',
// //       weight: '400'
// //     },
// //     {
// //       path: '../public/fonts/Roboto-Medium.woff2',
// //       weight: '700'
// //     }
// //   ],
// //   variable: '--font-Roboto'
// // })
// // Font files can be colocated inside of `pages`

// // export default
export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      {/* <Layout>

        <Component {...pageProps} />

      </Layout> */}
    </div >
  )
}
