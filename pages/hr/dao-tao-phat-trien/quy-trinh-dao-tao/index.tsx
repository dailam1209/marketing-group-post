import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import ListTrainingProcess from "@/components/hr/dao-tao-phat-trien/quy-trinh-dao-tao/listTrainingProcess/ListTrainingProcess";
import Head from "next/head";
import { getDataAuthentication } from "@/pages/hr/api/Home/HomeService";
import LoadingSpinner from "@/components/hr/loading";
import PageAuthenticator from "@/components/hr/quyen-truy-cap";

export default function JobPosition({ children }: any) {
  const [active, setActive] = useState(1);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleHNNV);
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
  const listTab = [
    {
      key: 1,
      header: "QUY TRÌNH ĐÀO TẠO",
      component: <ListTrainingProcess iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></ListTrainingProcess>,
    },
  ];

  return (
    <>
      <Head>
        <title>Quy trình đào tạo - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div className={`${styles.l_body}`}>
          <ul className={`${styles.nav} ${styles.nav_tabs}`}>
            {listTab.map((item) => (
              <div key={item.key} className={`${styles.w_480}`}>
                <li className={`${styles.li_tabs}`}>
                  <span
                    className={`${active === item?.key ? styles.active : styles.hover
                      } `}
                    onClick={() => setActive(item.key)}
                  >
                    {item.header}
                  </span>
                </li>
              </div>
            ))}
          </ul>
          {listTab.find((item) => item.key === active)?.component}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  );
}
