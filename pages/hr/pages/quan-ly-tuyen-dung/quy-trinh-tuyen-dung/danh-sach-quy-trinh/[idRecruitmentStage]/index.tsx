/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./detailRecruitmentStage.module.css";
import { useRouter } from "next/router";
import AddRecruitmentStage from "@/components/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/chi-tiet-quy-trinh/addRecruitmentStage/them-giai-doan";
import ListRecruitmentStage from "@/components/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/chi-tiet-quy-trinh/listRecruitmentStage/listRecruitmentStage";
import { DataRecruitmentStage } from "@/pages/api/quan-ly-tuyen-dung/RecruitmentManagerService";
import { getToken } from "@/pages/api/token";
import { getDataAuthentication } from "@/pages/api/Home/HomeService";
import jwt_decode from "jwt-decode";

export interface listRecruitmentProcess {}

export default function listRecruitmentProcess({dataDetail}) {
  
  const router = useRouter();
  const { idRecruitmentStage } = router.query;
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [recruitmentStage, setRecruitmentStage] = useState<any>(dataDetail)
  const [newData, setNewData] = useState<any>();
  const recruitment = recruitmentStage?.data.recruitment
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [tokenType, setTokenType] = useState<any>(null);
  
  const COOKIE_KEY = "user_365";

  useEffect(() => {
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setTokenType(decodedToken?.data?.type);
    }
  }, []);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleTD);
      };
      fetchData();
    } catch (error) {}
  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);



  useEffect(() => {
    const fetchDataRecruitmentStage = async (idRecruitmentStage: any) => {
      try {
        const response = await DataRecruitmentStage(idRecruitmentStage);
        setRecruitmentStage(response?.data.data);
      } catch (error) {
      }
    };
    fetchDataRecruitmentStage(idRecruitmentStage);
  }, [newData]);

  const handleBack = () => {
    router.back();
  };
  
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
    setAnimateModal(true);
  };

  const handleCloseModalAdd = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpenModalAdd(false);
    }, 300);
  };

  return (
    <>
      <div className={`${styles.l_body}`}>
        <div className={`${styles.add_quytrinh}`}>
          <div className={`${styles.back_quytrinh}`}>
            <span onClick={handleBack}>
              <picture>
                <img src={`${"/left_arrow.png"}`} alt="Back"></img>
              </picture>
              Danh sách quy trình tuyển dụng
            </span>
          </div>
          {tokenType === 1 ? (
            <div className={`${styles.add_quytrinh1}`}>
            <button className={`${styles.adds}`} onClick={handleOpenModalAdd}>
              <picture>
                <img src={`${"/add.png"}`} alt=""></img>
              </picture>
              Thêm giai đoạn tuyển dụng
            </button>
          </div>
          ):(
            ( !iconAdd) ? <></> : (
              <div className={`${styles.add_quytrinh1}`}>
            <button className={`${styles.adds}`} onClick={handleOpenModalAdd}>
              <picture>
                <img src={`${"/add.png"}`} alt=""></img>
              </picture>
              Thêm giai đoạn tuyển dụng
            </button>
          </div>
            )
          )}
        </div>
        {openModalAdd && (
          <AddRecruitmentStage
            recruitmentId={idRecruitmentStage}
            animation={animateModal}
            onCloseModal={handleCloseModalAdd}
            setData= {setNewData}
          ></AddRecruitmentStage>
        )}

        <div className={`${styles.giaidoans}`}>
        <div className={`${styles.title_giaidoans}`}>
        <h4>
          ({`QTTD ${idRecruitmentStage}`}) {recruitment}
        </h4>
      </div>
          {recruitmentStage?.data?.listStage?.map((item, index) => (
            <div key={index}>
              <ListRecruitmentStage
                item={item}
                recruitment={dataDetail?.data.recruitment}
                index={index}
                onDelete = {setNewData}
                onEdit = {setNewData}
                iconEdit = {iconEdit}
                iconDelete = {iconDelete}
                tokenType = {tokenType}
              ></ListRecruitmentStage>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { idRecruitmentStage } = params;
  try {
    const response = await DataRecruitmentStage(idRecruitmentStage)
    const dataDetail = response?.data.data; 
    return {
      props: {
        dataDetail, 
      },
    };
  } catch (error) {
    return { props: {} };
  }
};


