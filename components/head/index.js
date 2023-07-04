import React from "react"
export default function Head(props) {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{props.title}</title>
      {(props.seo == 'true') && (
        <meta name="description" content={props.des} />,
        <meta name="twitter:card" content="summary" />,
        <meta name="twitter:title" content={props.title} />,
        <meta name="twitter:description" content={props.des} />,
        <meta property="og:title" content={props.title} />,
        <meta property="og:type" content="website" />,
        <meta property="og:locale" content="vi_VN" />,
        <meta property="og:description" content={props.des} />,
        <meta property="og:image" content="https://quanlychung.timviec365.vn/img/bgr_nentang.png" />,
        <meta property="og:url" content={props.url} />
      )
      }
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
      <link
        rel="stylesheet"
        href="/css/style.css"
      />
      <link
        rel="stylesheet"
        href="../css/login_qr.css"
      />
    </>
  )
}
