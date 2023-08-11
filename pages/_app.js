import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import { ConfigProvider } from 'antd'
import { LayoutNs } from '../components/LayoutNs.tsx'
import Bodyframe from '@/components/bodyFrameNs/bodyFrame.tsx'
import { hasCookie, setCookie } from 'cookies-next'
import { COOKIE_KEY } from './nhan-su/index.tsx'
import axios from 'axios'
import { useRouter } from 'next/router.js'
export default function App({ Component, pageProps }) {
  const SignIn = async () => {
    const currentCookie = hasCookie(COOKIE_KEY)
    const currentUrl = process.env.NEXT_PUBLIC_BASE_URL_QLC

    if (currentCookie === false) {
      const body = {
        account: 'duonghiepit1@gmail.com',
        password: '123123a',
        type: 1,
      }
      try {
        const res = await axios.post(
          `${currentUrl}/api/qlc/employee/login`,
          body
        )

        if (res?.status === 200) {
          const userInfo = res?.data?.data?.data
          setCookie(COOKIE_KEY, userInfo)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    SignIn()

    // save role to local storage - temp
    // window.localStorage.setItem(ROLE_CURRENT, ADMIN_ROLE)
  }, [])

  const router = useRouter()

  return (
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
      {router.pathname?.includes('nhan-su') ? (
        <Bodyframe>
          <Component {...pageProps} />
        </Bodyframe>
      ) : (
        <Component {...pageProps} />
      )}
    </ConfigProvider>
  )
}
