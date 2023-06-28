import React from "react"
// import "../../Styles/globals.css"
import Link from 'next/link'
import router from "../../utils/router"
// import { useRouter } from 'next/navigation'
export default function Head() {
  // const router = useRouter()
  return (
    <>
    
    <>
  <meta charSet="UTF-8" />

  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
  <link
    rel="preload"
    href="../fonts/Roboto-Bold.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="../fonts/Roboto-Medium.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="../fonts/Roboto-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link rel="preload" as="style" href="../css/style.css" />
  <link
    rel="stylesheet"
    media="all"
    href="../css/style.css"
    onload="if (media != 'all')media='all'"
  />
</>

      </>

  
)
}
