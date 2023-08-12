import React, { useState, useEffect } from 'react';
import styles from '../quan-ly-hanh-chinh/thong-tin-nhan-su/administration.module.css'
import Link from 'next/link';
import TabHRReport from '@/components/bao-cao-nhan-su/hrReport';
import RecruitmentReport from '@/components/bao-cao-nhan-su/recruitmentReport';
import { addDays, format } from 'date-fns';
import Head from 'next/head';
import { getDataAuthentication } from '../api/Home/HomeService';
import LoadingSpinner from '@/components/loading';
import PageAuthenticator from '@/components/quyen-truy-cap';



export default function HRReport({ children }: any) {
  const [active, setActive] = useState(1)
  const [dateRangeData, setDateRangeData] = useState<String[]>([]);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const defaultStartDate = format(addDays(new Date(), -12), 'yyyy-MM-dd');
  const defaultEndDate = format(new Date(), 'yyyy-MM-dd');

  const datesInRange: String[] = [];

  useEffect(() => {
    const start = new Date(defaultStartDate);
    const end = new Date(defaultEndDate);
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const formattedDate = format(new Date(date), 'dd/MM/yyyy');
      datesInRange.push(formattedDate);
    }
    setDateRangeData(datesInRange)

  }, [])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleBCNS);
        setIsDataLoaded(true);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) { }
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);

  return (
    <>
      <Head>
        <title>Báo cáo nhân sự - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div className={`${styles.wrapper}`}>
          <ul className={`${styles.nav_tab} ${styles.nav}`}>
            <li className={`${active === 1 ? styles.active : ""}`} onClick={() => setActive(1)}>
              <Link href=''>Báo cáo nhân sự</Link>
            </li>
            <li className={`${active === 2 ? styles.active : ""}`} onClick={() => setActive(2)}>
              <Link href=''>Báo cáo tuyển dụng</Link>
            </li>
          </ul>
          {active === 1 && <TabHRReport dateRangeDatas={dateRangeData} />}
          {active === 2 && <RecruitmentReport />}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  )
}

