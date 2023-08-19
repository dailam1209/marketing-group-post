import React, { useEffect, useState } from 'react'
// import "@/styles/globals.css";
import { AccessContextComponent } from '@/components/crm/context/accessContext'
import { SidebarResize } from '@/components/crm/context/resizeContext'
import Header from '@/components/crm/header/header'
import useModal from '@/components/crm/hooks/useModal'
import Sidebar from '@/components/crm/sidebar/sidebar'
import { useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ConfigProvider, Spin } from 'antd'
import Bodyframe from '@/components/bodyFrameNs/bodyFrame.tsx'
import { useRouter } from 'next/router.js'
import ChatBusiness from '@/components/crm/chat/chat'
import { NavigateContextComponent } from '@/components/crm/context/navigateContext'
import TitleHeaderMobile from '@/components/crm/header/title_header_mobile'
import styles from '@/components/crm/sidebar/sidebar.module.css'
// import "@/styles/crm/stylecrm.css";
// import "@/styles/crm/styles.css"
// import "@/styles/crm/hight_chart.css"
import Layout from '@/components/hr/Layout'
import Head from 'next/head'
import Seo from '@/components/head'
import { Provider } from 'react-redux'
import { TongDaiContext } from '@/components/crm/context/tongdaiContext'
import store from '@/store'
import Layout_admin from '@/components/VanThu/Layout_admin'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Layout_user from '@/components/VanThu/Layout_user'
import { setCookie } from 'cookies-next'

export const LoadingComp = () => {
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

export default function App({ Component, pageProps }) {
  const { isOpen, toggleModal } = useModal('icon_menu_nav', [styles.sidebar])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
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
    if (!router.pathname.includes('hr')) {
      doLoading()
    } else {
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstLoad(false)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  const importGlobalStyles = () => {
    if (router.pathname?.includes('hr')) {
      import('../styles/globals_hr.css')
    } else if (router.pathname?.includes('crm')) {
      import('../styles/crm/stylecrm.css')
      import('../styles/crm/styles.css')
      import('../styles/crm/hight_chart.css')
    } else if (router.pathname?.includes('VanThu')) {
      import('../styles/globals_vanthu.css')
    } else if (router.pathname.includes('/cham-cong')) {
      import('@/styles/globals.css')
    }
  }

  useEffect(() => {
    importGlobalStyles()
  }, [router.pathname])

  const role = Cookies.get('role')
  const VanThu_token = Cookies.get('token_base365')
  if (VanThu_token) {
    const user_infor = jwtDecode(VanThu_token)
    sessionStorage.setItem('token', VanThu_token)
    const halfLength = Math.ceil(VanThu_token?.length / 2)
    const firstHalf = VanThu_token?.slice(0, halfLength)
    const secondHalf = VanThu_token?.slice(halfLength)
    setCookie('token_first', firstHalf, { maxAge: 60 * 60 * 1 })
    setCookie('token_hafl', secondHalf, { maxAge: 60 * 60 * 1 })
    setCookie('userName', user_infor?.data.userName)
    setCookie('userID', user_infor?.data.idQLC)
    setCookie('com_id', user_infor?.data.com_id)
  }

  return (
    <>
      <Seo />
      {loading ? (
        <LoadingComp />
      ) : !firstLoad ? (
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
          {router.pathname?.includes('cham-cong') ? (
            <Bodyframe>
              <Component {...pageProps} />
            </Bodyframe>
          ) : router.pathname?.includes('crm') ? (
            <Provider store={store}>
              <AccessContextComponent>
                <SidebarResize>
                  <NavigateContextComponent>
                    <Header toggleModal={toggleModal} />
                    <Sidebar isOpened={isOpen} />
                    <ChatBusiness />
                    <TitleHeaderMobile />
                    <TongDaiContext>
                      <Component {...pageProps} />
                    </TongDaiContext>
                  </NavigateContextComponent>
                </SidebarResize>
              </AccessContextComponent>
            </Provider>
          ) : router.pathname?.includes('hr') ? (
            <Layout>
              <DndProvider backend={HTML5Backend}>
                <Component {...pageProps} />
              </DndProvider>
            </Layout>
          ) : router.pathname?.includes('VanThu') ? (
            <Provider store={store}>
              {/* 
              -  Khi đăng nhập sẽ lưu session giá trị để duy trì các phiên trong site
              -  Giá trị này có thể thay đổi tùy theo tài khoản của công ty hoặc nhân viên
              */}
              {!VanThu_token ? (
                <>
                  <p>Vui lòng đăng nhập</p>
                </>
              ) : (
                <>
                  {role && role === '2' && (
                    <Layout_user>
                      <Component {...pageProps} />
                    </Layout_user>
                  )}
                  {role && role === '1' && (
                    <Layout_admin>
                      <Component {...pageProps} />
                    </Layout_admin>
                  )}
                </>
              )}
            </Provider>
          ) : (
            <Component {...pageProps} />
          )}
        </ConfigProvider>
      ) : (
        <LoadingComp />
      )}
    </>
  )
}
