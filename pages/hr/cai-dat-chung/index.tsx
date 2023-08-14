import React, { useState, useEffect } from "react";
import styles from "../quan-ly-hanh-chinh/thong-tin-nhan-su/administration.module.css";
import Link from "next/link";
import SecurityInfomation from "@/components/hr/cai-dat-chung/securityInformation";
import GeneralSettings from "@/components/hr/cai-dat-chung/generalSettings";
import ActivityLog from "@/components/hr/cai-dat-chung/activityLog";
import { getDataCompany } from "../api/cai-dat/generalSettings";
import Head from "next/head";
import { getToken } from "../api/token";
import jwt_decode from 'jwt-decode';
import PersonalInformation from "@/components/hr/cai-dat-chung/personalInformation";
export default function Setting({ children }: any) {
  const COOKIE_KEY = "user_365";

  const [active, setActive] = useState(1);
  const [dataCompany, setDataCompany] = useState<any>();
  const [tokenType, setTokenType] = useState<any>(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataCompany();
        setDataCompany(response);
      };
      fetchData();
    } catch (error) { }
  }, []);

  useEffect(() => {
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setTokenType(decodedToken?.data?.type);
    }

  }, []);
  return (
    <>
      <Head>
        <title>Cài đặt chung - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.wrapper}`}>
        <ul
          className={`${styles.nav_tab} ${styles.nav} ${styles.nav_tab_setting}`}
        >
          <li
            className={`${active === 1 ? styles.active : ""}`}
            onClick={() => setActive(1)}
          >
            <Link href="">CÀI ĐẶT CHUNG</Link>
          </li>

          {tokenType !== 1 ? (
            <li
              className={`${active === 4 ? styles.active : ""}`}
              onClick={() => setActive(4)}
            >
              <Link href="">THÔNG TIN CÁ NHÂN</Link>
            </li>
          ) : null}
          <li
            className={`${active === 2 ? styles.active : ""}`}
            onClick={() => setActive(2)}
          >
            <Link href="">THÔNG TIN BẢO MẬT</Link>
          </li>
          <li
            className={`${active === 3 ? styles.active : ""}`}
            onClick={() => setActive(3)}
          >
            <Link href="">NHẬT KÍ HOẠT ĐỘNG</Link>
          </li>
        </ul>
        {active === 1 && (
          <GeneralSettings dataCompany={dataCompany} tokenType={tokenType}></GeneralSettings>
        )}
        {active === 2 && <SecurityInfomation></SecurityInfomation>}
        {active === 3 && <ActivityLog></ActivityLog>}
        {active === 4 && <PersonalInformation />}
      </div>
    </>
  );
}
