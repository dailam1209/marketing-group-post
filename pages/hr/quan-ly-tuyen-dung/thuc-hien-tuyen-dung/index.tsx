import React, { useEffect, useState } from "react";
import styles from "./headerForm.module.css";
import PerformRecruitment from "@/components/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/PerformRecruitment/PerformRecruitment";
import Recruitment from "@/components/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/Recruitment/recruitment";
import { GetTotalCandi } from "../../api/quan-ly-tuyen-dung/PerformRecruitment";
import PageAuthenticator from "@/components/hr/quyen-truy-cap";
import LoadingSpinner from "@/components/hr/loading";
import Head from "next/head";
import jwt_decode from "jwt-decode";
import { getToken } from "../../api/token";

export default function HeaderForm({ children }: any) {
  const [totalCandi, setTotalCandi] = useState<any>();
  const [authentication, setAuthentication] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(1);
  const [tokenType, setTokenType] = useState<any>(null);
  const COOKIE_KEY = "token_base365";

  useEffect(() => {

    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setTokenType(decodedToken?.data?.type);
    }
  }, []);

  useEffect(() => {
    try {
      const GetDataTotalCandi = async () => {
        const responseTotalCandi = await GetTotalCandi();
        if (responseTotalCandi?.status === 403) {
          setAuthentication(true);
          setIsLoading(false);
        } else if (responseTotalCandi?.status === 200) {
          setAuthentication(false);
          setIsLoading(false);
          setTotalCandi(responseTotalCandi?.data.data);
        }
      };
      GetDataTotalCandi();
    } catch (error: any) {

    }
  }, []);

  const listTab = [
    {
      key: 1,
      header: "TỔNG QUAN",
      component: (
        <PerformRecruitment totalCandi={totalCandi}></PerformRecruitment>
      ),
    },
    {
      key: 2,
      header: "TIN TUYỂN DỤNG",
      component: <Recruitment tokenType={tokenType}></Recruitment>,
    },
  ];
  return (
    <>
      <Head>
        <title>Thực hiện tuyển dụng - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      {isLoading ? (
        <LoadingSpinner />
      ) : authentication ? (
        <PageAuthenticator />
      ) : (
        <div className={`${styles.l_body}`}>
          <ul className={`${styles.nav} ${styles.nav_tabs}`} style={{ marginBottom: 50 }}>
            {listTab.map((item) => (
              <div key={item.key} className={`${styles.mr_5}`} >
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
          {listTab?.find((item) => item.key === active)?.component}
        </div>
      )}
    </>
  );
}
