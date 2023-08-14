import React, { useEffect, useState } from "react";
import styles from "../thong-tin-nhan-su/administration.module.css";
import Link from "next/link";
import TabSalary from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/salary";
import TabPlaningAppointment from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/planningAppointment";
import TabWorkingRotation from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/workingRotation";
import TabPayrollDown from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/payrollDown";
import TabOutJob from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/outJob";
import TabChart from "@/pages/hr/components/quan-ly-hanh-chinh/bien-dong-nhan-su/chart";
import Head from "next/head";
import { getDataAuthentication } from "@/pages/hr/api/Home/HomeService";
import LoadingSpinner from "@/pages/hr/components/loading";
import PageAuthenticator from "@/pages/hr/components/quyen-truy-cap";

export default function PersonnalChange({ children }: any) {
  const [active, setActive] = useState(1);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [iconTGL, setIconTGL] = useState<any>([])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleTTNS);
        setIconTGL(response?.data?.data?.infoRoleTGL)
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

  const perIdArray2 = iconTGL?.map((item) => item.perId)
  const authenTGL = perIdArray2?.includes(1)

  return (
    <>
      <Head>
        <title>Biến động nhân sự - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div
          className={`${styles.wrapper} ${styles.wrapper_personnal_change} `}
        >
          <ul
            style={{ marginTop: 0 }}
            className={`${styles.nav_tab} ${styles.nav} ${styles.nav_tab_personnal_change} `}
          >
            <li
              className={`${active === 1 ? styles.active : ""}`}
              onClick={() => setActive(1)}
            >
              <Link href="">Tăng/giảm lương</Link>
            </li>
            <li
              className={`${active === 2 ? styles.active : ""}`}
              onClick={() => setActive(2)}
            >
              <Link href="">Bổ nhiệm, quy hoạch</Link>
            </li>
            <li
              className={`${active === 3 ? styles.active : ""}`}
              onClick={() => setActive(3)}
            >
              <Link href="">Luân chuyển công tác</Link>
            </li>
            <li
              className={`${active === 4 ? styles.active : ""}`}
              onClick={() => setActive(4)}
            >
              <Link href="">Giảm biên chế</Link>
            </li>
            <li
              className={`${active === 5 ? styles.active : ""}`}
              onClick={() => setActive(5)}
            >
              <Link href="">Nghỉ việc sai quy định</Link>
            </li>
            <li
              className={`${active === 6 ? styles.active : ""}`}
              onClick={() => setActive(6)}
            >
              <Link href="">Biểu đồ</Link>
            </li>
          </ul>
          {authenTGL && active === 1 && <TabSalary></TabSalary>}
          {active === 2 && <TabPlaningAppointment iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></TabPlaningAppointment>}
          {active === 3 && <TabWorkingRotation iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></TabWorkingRotation>}
          {active === 4 && <TabPayrollDown iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></TabPayrollDown>}
          {active === 5 && <TabOutJob iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></TabOutJob>}
          {active === 6 && <TabChart></TabChart>}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  );
}
