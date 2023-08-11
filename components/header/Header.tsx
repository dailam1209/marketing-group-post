import React, { useContext } from 'react'
import styles from './Header.module.css'
import Image from 'next/image'
import { url } from 'inspector'
import { Button, Row, Col } from 'antd'
import { COLOR_WHITE, HEAVY_BLUE } from '@/constants/style-constants'
import { Banner } from '../bodyFrame/banner/banner'
import {
  ADMIN_ROLE,
  CurrentRoleContext,
  EMP_ROLE,
  ROLE_CURRENT,
} from '@/pages/_app'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { COOKIE_KEY } from '@/pages'
import { useRouter } from 'next/router'

export interface HeaderProp {}

const LIST_TITLE = [
  {
    url: '',
    title: 'Trang chủ',
  },
  {
    url: '',
    title: 'Tin tức',
  },
  {
    url: '',
    title: 'Hướng dẫn',
  },
]

export default function Header() {
  const { currentRole, setCurrentRole } = useContext(CurrentRoleContext)
  const currentUrl = process.env.NEXT_PUBLIC_BASE_URL_QLC
  const router = useRouter()
  const handleChangeRole = async () => {
    if (currentRole === ADMIN_ROLE) {
      setCurrentRole(EMP_ROLE)
      //call api
      const body = {
        // account: '0776458824',
        account: '0151515151',
        password: 'Shit23112001',
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
    } else if (currentRole === EMP_ROLE) {
      setCurrentRole(ADMIN_ROLE)
      const body = {
        // account: '0989878718',
        // password: 'Shit23112001',
        // type: 1,
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
  return (
    <div className={styles.main}>
      <div className={styles.hamburger}>
        <Image alt='/' src={'/hamburger.png'} width={30} height={30} />
      </div>
      <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        <Image alt='/' src={'/logo.png'} width={129} height={30} />
      </div>

      <div className={styles.rightWrapper}>
        {LIST_TITLE.map((item, index) => (
          <p
            style={{ color: '#fff', marginRight: '20px' }}
            key={index}
            className={styles.titleTxt}>
            {item.title}
          </p>
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}>
          <Image
            alt='/'
            src={'/chat.png'}
            width={30}
            height={30}
            className={styles.chat}
          />
          <p
            className={styles.titleTxt}
            style={{ color: '#fff', marginLeft: '5px' }}>
            Chat
          </p>
        </div>
        <Image
          className={styles.noti}
          alt='/'
          src={'/bell.png'}
          width={24}
          height={24}
          style={{ marginRight: '20px' }}
        />
        <Image
          className={styles.userSection}
          alt='/'
          src={'/user-section.png'}
          width={300}
          height={30}
          onClick={handleChangeRole}
        />
      </div>
    </div>
  )
}
