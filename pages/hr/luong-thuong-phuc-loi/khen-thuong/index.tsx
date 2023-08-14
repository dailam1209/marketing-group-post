import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import PersonalReward from "@/pages/hr/components/luong-thuong-phuc-loi/khen-thuong/personalReward/PersonalReward";
import CommendationTeam from "@/pages/hr/components/luong-thuong-phuc-loi/khen-thuong/commendationTeam/CommendationTeam";
import AchievementList from "@/pages/hr/components/luong-thuong-phuc-loi/khen-thuong/achievementList/AchievementList";
import Head from "next/head";
import { getDataAuthentication } from "@/pages/hr/api/Home/HomeService";
import LoadingSpinner from "@/pages/hr/components/loading";
import PageAuthenticator from "@/pages/hr/components/quyen-truy-cap";


export default function NavBar({ children }: any) {
  const [active, setActive] = useState(1);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data.data.infoRoleTTVP);

      };
      fetchData();
    } catch (error) { }
    finally {
      setIsDataLoaded(true);
      setIsLoading(false);
    }

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
      component: (
        <PersonalReward iconAdd={iconAdd} iconEdit={iconEdit} ></PersonalReward>
      ),
    },
    {
      key: 2,
      header: "TẬP THỂ",
      component: (
        <CommendationTeam
          iconAdd={iconAdd}
          iconEdit={iconEdit}
        ></CommendationTeam>
      ),
    },
    {
      key: 3,
      header: "DANH SÁCH THÀNH TÍCH",
      component: <AchievementList iconEdit={iconEdit} ></AchievementList>,
    },
  ];

  return (
    <>
      <Head>
        <title>Khen thưởng - Quản lý nhân sự - Timviec365.vn</title>
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
          {NavBarList.find((item) => item.key === active)?.component}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  );

}
