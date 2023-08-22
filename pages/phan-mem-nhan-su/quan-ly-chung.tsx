import BodyFrameSection1 from '@/components/hr/bodyFrame/bodyFrame_section1/bodyFrame_section1'
import BodyFrameSection2 from '@/components/hr/bodyFrame/bodyFrame_section2/bodyFrame_section2'
import BodyFrameSection3 from '@/components/hr/bodyFrame/bodyFrame_section3/bodyFrame_section3'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import styles from '@/components/hr/bodyFrame/bodyFrame.module.css'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Head from 'next/head'
import { getHomeData } from '../api/api-hr/Home/HomeService'

export default function Home() {
  const [dataHome, setDataHome] = useState<any>(null)

  console.log(dataHome)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = getCookie('token_base365')
        if (token) {
          console.log(1);
          const response = await getHomeData()
          console.log(response);

          setDataHome(response?.data.data)
        } else {
          console.log(2);
          const interval = setInterval(() => {
            const updatedToken = getCookie('token_base365')
            if (updatedToken) {
              clearInterval(interval)
              fetchHomeData()
            }
          }, 1000)
        }
      } catch (error) {
        console.error('Error fetching home data:', error)
      }
    }
    fetchHomeData()
  }, [])

  return (
    <>
      <Head>
        <title>Quản lý chung - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.wrapper}`}>
        <BodyFrameSection1></BodyFrameSection1>
        <BodyFrameSection2 dataHome={dataHome}></BodyFrameSection2>
        <BodyFrameSection3></BodyFrameSection3>
        <BodyFrameFooter src='https://www.youtube.com/embed/2wS-x1li7QQ'></BodyFrameFooter>
      </div>
    </>
  )
}
