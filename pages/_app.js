import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
// import '../public/css/style.css'
import { ConfigProvider, Spin } from 'antd'
import Bodyframe from '@/components/bodyFrameNs/bodyFrame.tsx'
import { useRouter } from 'next/router.js'
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const doLoading = () => {
      const start = () => {
        setLoading(true)
      }
      const end = () => {
        setLoading(false)
      }
      setTimeout(() => {
        router.events.on('routeChangeStart', start)
      }, 200)
      setTimeout(() => {
        router.events.on('routeChangeComplete', end)
      }, 200)
      router.events.on('routeChangeError', end)
      return () => {
        router.events.off('routeChangeStart', start)
        router.events.off('routeChangeComplete', end)
        router.events.off('routeChangeError', end)
      }
    }

    doLoading()
  }, [])

  const LoadingComp = () => {
    return (
      <Spin
        // indicator={<LoadingOutlined rev={null} />}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      />
    )
  }

  return !loading ? (
    <ConfigProvider
      theme={{
        token: {
          screenLG: 1025,
          screenLGMin: 1025,
          screenLGMax: 1025,
          screenMD: 769,
          screenMDMin: 769,
        },
      }}>
      {router.pathname?.includes('quan-ly-nhan-luc') ? (
        <Bodyframe>
          <Component {...pageProps} />
        </Bodyframe>
      ) : (
        <Component {...pageProps} />
      )}
    </ConfigProvider>
  ) : (
    <div>{LoadingComp()}</div>
  )
}
