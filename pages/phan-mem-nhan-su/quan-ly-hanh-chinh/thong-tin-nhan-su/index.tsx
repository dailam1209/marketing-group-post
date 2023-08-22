import React, { useEffect, useState } from 'react'
import styles from './administration.module.css'
import Link from 'next/link'
import TabEmployeeManagement from '@/components/hr/quan-ly-hanh-chinh/thong-tin-nhan-su/tab'
import Head from 'next/head'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'
import LoadingSpinner from '@/components/hr/loading'
import PageAuthenticator from '@/components/hr/quyen-truy-cap'

export interface EmployeeManagement { }

export default function EmployeeManagement({ children }: any) {
  const [active, setActive] = useState(1)
  const [displayIcon, setDisplayIcon] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleTTNS)
        setIsDataLoaded(true) // Move this line here
        setIsLoading(false) // Move this line here
      }
      fetchData()
    } catch (error) { }
  }, [])

  const perIdArray = displayIcon?.map((item) => item.perId)
  const authen = perIdArray?.includes(1)
  const iconAdd = perIdArray?.includes(2)
  const iconEdit = perIdArray?.includes(3)
  const iconDelete = perIdArray?.includes(4)

  return (
    <>
      <Head>
        <title>Quản lý nhân viên - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div className={`${styles.wrapper}`}>
          <ul className={`${styles.nav_tab} ${styles.nav}`}>
            <li
              className={`${active === 1 ? styles.active : ''}`}
              onClick={() => setActive(1)}>
              <Link href=''>Danh sách nhân viên</Link>
            </li>
            <li
              className={`${active === 2 ? styles.active : ''}`}
              onClick={() => setActive(2)}>
              <Link
                target='blank'
                href='/cham-cong/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi'>
                Nhân viên chờ duyệt
              </Link>
            </li>
          </ul>
          {active === 1 && (
            <TabEmployeeManagement
              iconAdd={iconAdd}
              iconEdit={iconEdit}></TabEmployeeManagement>
          )}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  )
}
