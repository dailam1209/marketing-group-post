import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./idRecruitment.module.css";
import BodyFrameFooter from "@/pages/hr/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import { DetailNews } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";

import Head from "next/head";
import { getTokenFromCookie } from "@/pages/hr/api/token";

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default function IdRecruitment({ query }) {
  const router = useRouter();
  const idRecruitment = query.idRecruitment;
  const [dataDetail, setDataDetail] = useState<any>()
  const getFormattedDate = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Cần thêm 1 vì tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    try {
      const fetchDataDetail = async () => {
        const response = await DetailNews(idRecruitment)
        setDataDetail(response?.data?.data)
      }
      fetchDataDetail()
    } catch (error) {

    }

  }, [idRecruitment])

  const dataRecruitment = dataDetail?.data?.recruitmentNews;
  const listCandidate = dataDetail?.data?.listCandidate;
  const listInterview = dataDetail?.data?.listInterview;
  const listInterviewFail = dataDetail?.data?.listInterviewFail;
  const listInterviewPass = dataDetail?.data?.listInterviewPass;
  const listOfferJob = dataDetail?.data?.listOfferJob;


  const [active, setActive] = useState(2);
  const handleClick = (item: any) => {
    router.back();

  };
  const handleBack = () => {
    router.back();
  };
  const listTab = [
    {
      key: 1,
      header: "TỔNG QUAN",
    },
    {
      key: 2,
      header: "TIN TUYỂN DỤNG",
    },
  ];
  const salary = {
    1: "Thỏa thuận",
    2: "1 - 3 triệu",
    3: "3 - 5 triệu",
    4: "5 - 7 triệu",
    5: "7 - 10 triệu",
    6: "10 - 15 triệu",
    7: "10 - 15 triệu",
    8: "15 - 20 triệu",
    9: "20 - 30 triệu",
    10: "Trên 30 triệu",
    11: "Trên 50 triệu",
    12: "Trên 100 triệu",
  };
  return (

    <>
      <Head>
        <title>Thực hiện tuyển dụng - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.l_body}`}>
        <ul className={`${styles.nav} ${styles.nav_tabs}`}>
          {listTab.map((item) => (
            <div key={item.key}>
              <li className={`${styles.li_tabs}`}>
                <span
                  className={`${active === item?.key ? styles.active : styles.hover
                    } `}
                  onClick={() => handleClick(item)}
                >
                  {item.header}
                </span>
              </li>
            </div>
          ))}
        </ul>

        {/* detail */}
        <div className={`${styles.tab_content}`}>
          <div style={{ display: "block" }}>
            <div className={`${styles.detail_tuyendung}`}>
              <div className={`${styles.back_tuyendung}`} onClick={handleBack}>
                <span className={`${styles.back_view}`}>
                  <picture>
                    <img src={`/left_arrow.png`} alt=""></img>
                  </picture>
                </span>

                <span className={`${styles.back_text}`}>Xem chỉ tiêu</span>
              </div>

              <div className={`${styles.detail_tuyendung1}`}>
                <h4 className={`${styles.tuyendung1_title}`}>
                  Tiêu đề tuyển dụng
                </h4>
                <p>Nhân viên phụ trách tuyển dụng: {dataRecruitment?.hrName}</p>
                <p>Số lượng tuyển: {dataRecruitment?.number} </p>
                <p>Mức lương: {salary[dataRecruitment?.salaryId]}</p>
                <p>
                  Thời gian tuyển: từ{" "}
                  {getFormattedDate(dataRecruitment?.timeStart)} đến:{" "}
                  {getFormattedDate(dataRecruitment?.timeEnd)}
                </p>
                <p>Người tạo tin: {dataRecruitment?.createdBy}</p>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className={`${styles.list_uv} ${styles.row} `}>
          <div className={`${styles.list_uv_cart}`}>
            <div className={`${styles.list_uv_header} ${styles.blue}`}>
              <p className={`${styles.text_center}`}>Ứng viên</p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listCandidate?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listCandidate?.map((item, index) => (
                  <div key={item.id}>
                    <div

                      className={`${styles.lst_uv_body__r} ${styles.blue__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`${styles.list_uv_cart}`}>
            <div className={`${styles.list_uv_header} ${styles.orange}`}>
              <p className={`${styles.text_center}`}>Ứng viên đủ tiêu chuẩn</p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listCandidate?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listCandidate?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`${styles.lst_uv_body__r} ${styles.orange__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`${styles.list_uv_cart}`}>
            <div className={`${styles.list_uv_header} ${styles.yellow}`}>
              <p className={`${styles.text_center}`}>Ứng viên đến phỏng vấn</p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listInterview?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listInterview?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`${styles.lst_uv_body__r} ${styles.yellow__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`${styles.list_uv_cart}`} style={{ marginTop: "3%" }}>
            <div className={`${styles.list_uv_header} ${styles.light_blue}`}>
              <p className={`${styles.text_center}`}>Ứng viên qua phỏng vấn</p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listInterviewPass?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listInterviewPass?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`${styles.lst_uv_body__r} ${styles.light_blue__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`${styles.list_uv_cart}`} style={{ marginTop: "3%" }}>
            <div className={`${styles.list_uv_header} ${styles.red}`}>
              <p className={`${styles.text_center}`}>
                Ứng viên trượt phỏng vấn
              </p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listInterviewFail?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listInterviewPass?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`${styles.lst_uv_body__r} ${styles.red__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={`${styles.list_uv_cart}`} style={{ marginTop: "3%" }}>
            <div className={`${styles.list_uv_header} ${styles.green}`}>
              <p className={`${styles.text_center}`}>Ứng viên hẹn đi làm</p>
            </div>
            <div className={`${styles.list_uv_body}`}>
              {listOfferJob?.length === 0 ? (
                <p className={`${styles.text_warring}`}>Dữ liệu trống</p>
              ) : (
                listOfferJob?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`${styles.lst_uv_body__r} ${styles.green__r}`}
                    >
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <BodyFrameFooter src="https://www.youtube.com/embed/v8FmUlUI1bs"></BodyFrameFooter>
    </>
  );
}

