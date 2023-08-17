import React, { useEffect, useState } from 'react'
import styles from './quy-dinh-chinh-sach.module.css'
import Link from 'next/link'
import RegulationsWork from '@/components/hr/quan-ly-hanh-chinh/quy-dinh-chinh-sach/quy-dinh-lam-viec'
import EmployeePolicy from '@/components/hr/quan-ly-hanh-chinh/quy-dinh-chinh-sach/chinh-sach-nhan-vien'
import Head from 'next/head'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'

export default function RegulationsPolicy() {
  const [active, setActive] = useState(1)
  const [displayIcon, setDisplayIcon] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleTTNS)
        setIsDataLoaded(true)
        setIsLoading(false)
      }
      fetchData()
    } catch (error) {}
  }, [])

  const perIdArray = displayIcon?.map((item) => item.perId)
  const authen = perIdArray?.includes(1)
  const iconAdd = perIdArray?.includes(2)
  const iconEdit = perIdArray?.includes(3)
  const iconDelete = perIdArray?.includes(4)
  return (
    <>
      <Head>
        <title>Quy định - Chính sách - Quản lý nhân sự - Timviec365.vn</title>
      </Head>

      <div className={`${styles.wrapper}`}>
        <ul className={`${styles.nav_tab} ${styles.nav}`}>
          <li
            className={`${active === 1 ? styles.active : ''}`}
            onClick={() => setActive(1)}>
            <Link href=''>Quy định làm việc</Link>
          </li>
          <li
            className={`${active === 2 ? styles.active : ''}`}
            onClick={() => setActive(2)}>
            <Link href=''>Chính sách nhân viên</Link>
          </li>
        </ul>
        {active === 1 ? (
          <RegulationsWork
            iconAdd={iconAdd}
            iconEdit={iconEdit}
            iconDelete={iconDelete}></RegulationsWork>
        ) : (
          <EmployeePolicy
            iconAdd={iconAdd}
            iconEdit={iconEdit}
            iconDelete={iconDelete}></EmployeePolicy>
        )}
      </div>
    </>
  )
}
