import React, { useState, useEffect } from "react";
import styles from "../quan-ly-hanh-chinh/thong-tin-nhan-su/administration.module.css";
import Link from "next/link";
import OrganisationalStructureDiagram from "@/components/co-cau-to-chuc/organisationalStructureDiagram";
import SealAndSignature from "@/components/co-cau-to-chuc/sealAndSignature";
import LeaderBiography from "./leaderBiography";
import dynamic from "next/dynamic";
import Head from "next/head";
import { getDataAuthentication } from "../api/Home/HomeService";
import LoadingSpinner from "@/components/loading";
import PageAuthenticator from "@/components/quyen-truy-cap";
const PostionCharTree = dynamic(
  () => import("@/components/co-cau-to-chuc/postionChar"),
  {
    ssr: false,
  }
);

export default function OrganizationalStructure({ children }: any) {
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
    } catch (error) {}
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);

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
              className={`${active === 1 ? styles.active : ""}`}
              onClick={() => setActive(1)}
            >
              <Link href="">SƠ ĐỒ CƠ CẤU TỔ CHỨC</Link>
            </li>
            <li
              className={`${active === 2 ? styles.active : ""}`}
              onClick={() => setActive(2)}
            >
              <Link href="">SƠ ĐỒ CHỨC VỤ</Link>
            </li>
            <li
              className={`${active === 3 ? styles.active : ""}`}
              onClick={() => setActive(3)}
            >
              <Link href="">QUYỀN SỬ DỤNG CON DẤU VÀ MẪU CHỮ KÝ</Link>
            </li>
            <li
              className={`${active === 4 ? styles.active : ""}`}
              onClick={() => setActive(4)}
            >
              <Link href="">TIỂU SỬ LÃNH ĐẠO</Link>
            </li>
          </ul>
          {active === 1 && (
            <OrganisationalStructureDiagram iconAdd = {iconAdd} iconEdit = {iconEdit}></OrganisationalStructureDiagram>
          )}
          {active === 2 && <PostionCharTree  iconEdit = {iconEdit}></PostionCharTree>}
          {active === 3 && <SealAndSignature iconAdd = {iconAdd} iconEdit = {iconEdit} iconDelete = {iconDelete}></SealAndSignature>}
          {active === 4 && <LeaderBiography iconAdd = {iconAdd} iconEdit = {iconEdit}></LeaderBiography>}
        </div>
      ) : (
        <PageAuthenticator />
      )}
    </>
  );
}
