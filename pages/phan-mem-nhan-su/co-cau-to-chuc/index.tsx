import React, { useState, useEffect } from 'react'
import styles from '../quan-ly-hanh-chinh/thong-tin-nhan-su/administration.module.css'
import Link from 'next/link'
import OrganisationalStructureDiagram from '@/components/hr/co-cau-to-chuc/organisationalStructureDiagram'
import SealAndSignature from '@/components/hr/co-cau-to-chuc/sealAndSignature'
import LeaderBiography from './leaderBiography'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import LoadingSpinner from '@/components/hr/loading'
import PageAuthenticator from '@/components/hr/quyen-truy-cap'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'
import { useRouter } from "next/router.js";
import { ConfigProvider, Spin } from "antd";
const PostionCharTree = dynamic(
  () => import('@/components/hr/co-cau-to-chuc/postionChar'),
  {
    ssr: false,
  }
)

export const LoadingComp = () => {
  return (
    <Spin
      // indicator={<LoadingOutlined rev={null} />}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
      }}
    />
  );
};

export default function OrganizationalStructure({ children }: any) {
  const [active, setActive] = useState(1)
  const [displayIcon, setDisplayIcon] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const doLoading = () => {
      const start = () => {
        setLoading(true);
      };
      const end = () => {
        setLoading(false);
      };
      setTimeout(() => {
        router.events.on("routeChangeStart", start);
      }, 200);
      setTimeout(() => {
        router.events.on("routeChangeComplete", end);
      }, 200);
      router.events.on("routeChangeError", end);
      return () => {
        router.events.off("routeChangeStart", start);
        router.events.off("routeChangeComplete", end);
        router.events.off("routeChangeError", end);
      };
    };
    doLoading();
  }, []);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstLoad(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleHNNV)
        setIsDataLoaded(true)
        setIsLoading(false)
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
        <title>Sơ đồ chức vụ - Quản lý nhân sự - Timviec365.vn</title>
      </Head>

      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div className={`${styles.wrapper}`}>
          <ul className={`${styles.nav_tab} ${styles.nav}`}>
            <li
              className={`${active === 1 ? styles.active : ''}`}
              onClick={() => setActive(1)}>
              <Link href=''>SƠ ĐỒ CƠ CẤU TỔ CHỨC</Link>
            </li>
            <li
              className={`${active === 2 ? styles.active : ''}`}
              onClick={() => setActive(2)}>
              <Link href=''>SƠ ĐỒ CHỨC VỤ</Link>
            </li>
            <li
              className={`${active === 3 ? styles.active : ''}`}
              onClick={() => setActive(3)}>
              <Link href=''>QUYỀN SỬ DỤNG CON DẤU VÀ MẪU CHỮ KÝ</Link>
            </li>
            <li
              className={`${active === 4 ? styles.active : ''}`}
              onClick={() => setActive(4)}>
              <Link href=''>TIỂU SỬ LÃNH ĐẠO</Link>
            </li>
          </ul>
          {active === 1 && (
            <OrganisationalStructureDiagram
              iconAdd={iconAdd}
              iconEdit={iconEdit}></OrganisationalStructureDiagram>
          )}
          {active === 2 && (
            <PostionCharTree iconEdit={iconEdit}></PostionCharTree>
          )}
          {active === 3 && (
            <SealAndSignature
              iconAdd={iconAdd}
              iconEdit={iconEdit}
              iconDelete={iconDelete}></SealAndSignature>
          )}
          {active === 4 && (
            <LeaderBiography
              iconAdd={iconAdd}
              iconEdit={iconEdit}></LeaderBiography>
          )}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  )
}
