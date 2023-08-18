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
import { Provider } from "react-redux";
import store from "@/store";
import Layout_admin from "@/components/VanThu/Layout_admin";
import { setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import Layout_user from "@/components/VanThu/Layout_user";

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
    } else if(router.pathname?.includes('VanThu')){
      import('../styles/globals_vanthu.css')
    }
     else {
      import('@/styles/globals.css')
    }
  }

  useEffect(() => {
    importGlobalStyles()
  }, [router.pathname])

  const [layout, setLayout] = useState("");
  const token_staff =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTQxNzU2MCwiaWRUaW1WaWVjMzY1IjoxMDgzODYxLCJpZFFMQyI6MzQ1NTQsImlkUmFvTmhhbmgzNjUiOjMyLCJlbWFpbCI6bnVsbCwicGhvbmVUSyI6IjA5ODk4Nzg3NDEiLCJjcmVhdGVkQXQiOjE2OTIyMzUyMDIsInR5cGUiOjIsImNvbV9pZCI6MTIxNTk3LCJ1c2VyTmFtZSI6IkJWNDEifSwiaWF0IjoxNjkyMjU3MDgxLCJleHAiOjE2OTIzNDM0ODF9.5Cnou9Ihe4haEghZHokqhx2byx6BQkhhht4Zs7D91Jc";
  const token_company =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTQxNzUzMCwiaWRUaW1WaWVjMzY1IjoyNDU1NTgsImlkUUxDIjoxMjE1OTcsImlkUmFvTmhhbmgzNjUiOjEsImVtYWlsIjpudWxsLCJwaG9uZVRLIjoiMDk4OTg3ODcxNCIsImNyZWF0ZWRBdCI6MTY5MDkzODY4NCwidHlwZSI6MSwiY29tX2lkIjoxMjE1OTcsInVzZXJOYW1lIjoiY29uZyB0eSBCaW5oVkgifSwiaWF0IjoxNjkyMjYyNTgyLCJleHAiOjE2OTIzNDg5ODJ9.JAp3bQZQ9A6KUouTeIuLNxxvPk1B5tX8mx2x_fBa05I";
  useEffect(() => {
    const storedData = sessionStorage.getItem("layout");
    if (storedData) {
      setLayout(storedData);
    }
  }, []);
  // Chia đoạn string thành 2 nửa và lưu vào 2 cookies
  const handleClick = (layout, newToken) => {
    setLayout(layout);
    const user_infor = jwtDecode(newToken);
    sessionStorage.setItem("layout", layout);
    sessionStorage.setItem("token", newToken);
    const halfLength = Math.ceil(newToken?.length / 2);
    const firstHalf = newToken?.slice(0, halfLength);
    const secondHalf = newToken?.slice(halfLength);
    setCookie("token_first", firstHalf, { maxAge: 60 * 60 * 1 });
    setCookie("token_hafl", secondHalf, { maxAge: 60 * 60 * 1 });
    setCookie("userName", user_infor?.data.userName);
    setCookie("userID", user_infor?.data.idQLC);
    setCookie("com_id", user_infor?.data.com_id)
    router.push("/VanThu/quanly-cong-van");
  };

  return loading ? (
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
      {router.pathname?.includes('quan-ly-nhan-luc') ? (
        <Bodyframe>
          <Component {...pageProps} />
        </Bodyframe>
      ) : router.pathname?.includes('crm') ? (
        <AccessContextComponent>
          <SidebarResize>
            <NavigateContextComponent>
              <Header toggleModal={toggleModal} />
              <Sidebar isOpened={isOpen} />
              <ChatBusiness />
              <TitleHeaderMobile />
              <Component {...pageProps} />
            </NavigateContextComponent>
          </SidebarResize>
        </AccessContextComponent>
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
          {layout === "" ? (
            <>
              <button onClick={() => handleClick("user", token_staff)}>
                Nhân viên
              </button>
              <button onClick={() => handleClick("admin", token_company)}>
                Công ty
              </button>
            </>
          ) : (
            <>
              {layout && layout !== "" && layout === "user" ? (
                <Layout_user>
                  <Component {...pageProps} />
                </Layout_user>
              ) : (
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
  )
}
