import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import PersonalDiscipline from "@/components/luong-thuong-phuc-loi/ky-luat/personalDiscipline/PersonalDiscipline";
import DisciplineList from "@/components/luong-thuong-phuc-loi/ky-luat/disciplineList/DisciplineList";
import CollectiveDiscipline from "@/components/luong-thuong-phuc-loi/ky-luat/collectiveDiscipline/CollectiveDiscipline";
import Head from "next/head";
import { getDataAuthentication } from "@/pages/api/Home/HomeService";
import LoadingSpinner from "@/components/loading";
import PageAuthenticator from "@/components/quyen-truy-cap";


export default function NavBar({ children }: any) {
  const [active, setActive] = useState(1);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleTTVP);
        setIsDataLoaded(true); 
        setIsLoading(false); 
      };
      fetchData();
    } catch (error) {}
   
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);
  const NavBarList = [
    {
      key: 1,
      header: "CÁ NHÂN",
      component: <PersonalDiscipline iconAdd = {iconAdd} iconEdit = {iconEdit}></PersonalDiscipline>,
    },
    {
      key: 2,
      header: "TẬP THỂ",
      component: <CollectiveDiscipline iconAdd = {iconAdd} iconEdit = {iconEdit} ></CollectiveDiscipline>,
    },
    {
      key: 3,
      header: "DANH SÁCH VI PHẠM",
      component: <DisciplineList iconEdit = {iconEdit} ></DisciplineList>,
    },
  ];

  return (
    <>
     <Head>
      <title>Kỷ luật - Quản lý nhân sự - Timviec365.vn</title>
    </Head>
    {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <div className={`${styles.l_body}`}>
          <ul className={`${styles.nav} ${styles.nav_tabs}`}>
            {NavBarList.map((item) => (
              <div key={item.key}>
                <li className={`${styles.li_tabs}`}>
                  <span
                    className={`${
                      active === item?.key ? styles.active : styles.hover
                    } `}
                    onClick={() => setActive(item.key)}
                  >
                    {item.header}
                  </span>
                </li>
              </div>
            ))}
          </ul>
          {NavBarList.find((item) => item.key === active)?.component}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  );
}
