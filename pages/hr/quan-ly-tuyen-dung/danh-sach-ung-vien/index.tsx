import React, { useEffect, useState } from "react";
import styles from "./candidateList.module.css";
import Link from "next/link";
import CandidateListDetail from "./candidateListDetail";
import CandidateRepo from "@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateRepo";
import { getDataAuthentication } from "@/pages/hr/api/Home/HomeService";
import LoadingSpinner from "@/components/hr/loading";
import PageAuthenticator from "@/components/hr/quyen-truy-cap";

export interface CandidateList { }

export default function CandidateList({ children }: any) {
  const [active, setActive] = useState(1);
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleTD);
      };
      fetchData();
    } catch (error) {
    } finally {
      setIsDataLoaded(true);
      setIsLoading(false);
    }
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);

  return (
    <>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen === false ? (
        <PageAuthenticator />
      ) : (
        <div className={`${styles.wrapper}`}>
          <ul className={`${styles.nav_tab} ${styles.nav}`}>
            <li
              className={`${active === 1 ? styles.active : ""}`}
              onClick={() => setActive(1)}
            >
              <Link href="">Danh sách ứng viên</Link>
            </li>
            <li
              className={`${active === 2 ? styles.active : ""}`}
              onClick={() => setActive(2)}
            >
              <Link href="">Kho ứng viên</Link>
            </li>
          </ul>
          {active === 1 ? (
            <CandidateListDetail iconAdd={iconAdd} iconEdit={iconEdit} iconDelete={iconDelete}></CandidateListDetail>
          ) : (
            <CandidateRepo></CandidateRepo>
          )}
        </div>
      )}
    </>
  )
}
