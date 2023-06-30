 // import React from "react"
import Layout from '../components/Layout'
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
