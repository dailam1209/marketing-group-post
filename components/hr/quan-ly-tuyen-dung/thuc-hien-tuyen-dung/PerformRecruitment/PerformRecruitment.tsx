/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styles from "./PerformRecruitment.module.css";
import Link from "next/link";
import BodyFrameFooter from "../../../bodyFrame/bodyFrame_footer/bodyFrame_footer";
import MyPagination from "../../../pagination/Pagination";
import {
  GetDataListNewActive,
  GetListSchedule,
} from "@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment";

export interface PerformRecruitment {}

export default function PerformRecruitment({ children, totalCandi }: any) {
  const [selectedButton, setSelectedButton] = useState("homnay");
  const [messIsOpen, setMessIsOpen] = useState<any>();
  const [listSchedule, setListSchedule] = useState<any>();
  const [currentPageListNewActive, setCurrentPageListNewActive] = useState(1);
  const [currentPageListSchedule, setCurrentPageLisSchedule] = useState(1);
  useEffect(() => {
    const getDataRecruitmentOverview = async () => {
      try {
        const responseListNewActive = await GetDataListNewActive(
          currentPageListNewActive,
          3
        );
        setMessIsOpen(responseListNewActive?.data.success);
      } catch (err) {}
    };
    getDataRecruitmentOverview();
  }, [currentPageListNewActive]);
  
  useEffect(() => {
    try {
      const GetDataListSchedule = async () => {
        const responseListSchedule = await GetListSchedule(
          currentPageListSchedule,
          3
        );
        setListSchedule(responseListSchedule?.data.success);
      };
      GetDataListSchedule();
    } catch (err) {}
  }, [currentPageListSchedule]);

  const dataDisplay = messIsOpen?.data?.data;
  
  const handleClickColor = (buttonId: any) => {
    setSelectedButton(buttonId);
  };

  const handlePageListNewActive = (page: any) => {
    setCurrentPageListNewActive(page);
  };

  const handlePageLisSchedule = (page: any) => {
    setCurrentPageLisSchedule(page);
  };

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
      <div className={`${styles.tab_content}`}>
        <div
          id="tongquan"
          className={`${styles.fade} ${styles.in} ${styles.active}`}
        >
          <>
            <div
              className={`${styles.tindangmo}`}
              id="tindangmo_left"
              style={{ minHeight: "500px" }}
            >
              {/* title */}
              <div className={`${styles.tin_title}`}>
                <h5>Tin đang mở</h5>
              </div>
              <hr></hr>
              {/* body map ở đây */}
              {dataDisplay?.length === 0 ? (
                <p className={`${styles.data_empty}`}>Không có dữ liệu</p>
              ) : (
                dataDisplay?.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={`${styles.tin_all} ${styles.tin_all_t_left}`}
                    >
                      <div className={`${styles.tin_item}`}>
                        <div className={`${styles.tin_item1}`}>
                          <span>{item.number}</span>
                          <p>ứng viên</p>
                        </div>

                        <div className={`${styles.tin_item2}`}>
                          <h3>
                            <span>
                              {`(TD${item.id})`}
                              {item.title}
                            </span>
                          </h3>
                          <div className={`${styles.tin_item3}`}>
                            <li>
                              <picture>
                                <img
                                  className={`${styles.tin_item33_img}`}
                                  src={`/calendar.png`}
                                ></img>
                                <span>
                                  {new Date(
                                    item.recruitment_time
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    item.recruitment_time_to
                                  ).toLocaleDateString()}
                                </span>
                              </picture>
                            </li>

                            <li>
                              <span>{item.address}</span>
                              <span>.</span>
                              <span>{salary[item.salary_id]}</span>
                            </li>
                          </div>
                          <hr></hr>
                        </div>

                        {/* Hồ sơ */}
                        <div className={`${styles.tin_item4}`}>
                          <li>
                            <span className={`${styles.blue} ${styles.text}`}>
                              {item.sohoso}
                            </span>
                            <p>Hồ sơ</p>
                          </li>
                          <li>
                            <span className={`${styles.yellow} ${styles.text}`}>
                              {item.henphongvan}
                            </span>
                            <p>Phỏng vấn</p>
                          </li>
                          <li>
                            <span className={`${styles.red} ${styles.text}`}>
                              {item.huyphongvan}
                            </span>
                            <p>Bị loại</p>
                          </li>
                          <li>
                            <span className={`${styles.green} ${styles.text}`}>
                              {item.quaphongvan}
                            </span>
                            <p>Thử việc</p>
                          </li>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  );
                })
              )}
              {/* end ở đây */}
              {messIsOpen?.data?.total > 0 && (
                <div className={`${styles.pagination}`}>
                  <MyPagination
                    current={currentPageListNewActive}
                    total={messIsOpen?.data?.total}
                    pageSize={3}
                    onChange={(page) => handlePageListNewActive(page)}
                  />
                </div>
              )}
            </div>

            <div className={`${styles.tindangmo}`}>
              <div className={`${styles.tin_title}`}>
                <h5>Tổng số ứng viên</h5>
              </div>
              <hr></hr>
              <div className={`${styles.h_today}`}>
                <li
                  className={`${
                    selectedButton === "homnay" ? styles.active_homnay : ""
                  }`}
                  onClick={() => handleClickColor("homnay")}
                >
                  <span className={`${styles.green} ${styles.candidate_today}`}>
                    {totalCandi?.data?.data?.candidateToday}
                  </span>
                  <p>Hôm nay</p>
                </li>
                <li
                  className={`${
                    selectedButton === "tuannay" ? styles.active_tuannay : ""
                  }`}
                  onClick={() => handleClickColor("tuannay")}
                >
                  <span className={`${styles.blue} ${styles.candidate_week}`}>
                    {totalCandi?.data?.data?.candidateMonth}
                  </span>
                  <p>Tuần này</p>
                </li>
                <li
                  className={`${
                    selectedButton === "thangnay" ? styles.active_thangnay : ""
                  }`}
                  onClick={() => handleClickColor("thangnay")}
                >
                  <span
                    className={`${styles.yellow} ${styles.candidate_month}`}
                  >
                    {totalCandi?.data?.data?.candidateWeek}
                  </span>
                  <p>Tháng này</p>
                </li>
              </div>
            </div>

            <div className={`${styles.tindangmo}`} style={{ marginTop: "3%" }}>
              <div className={`${styles.tin_title}`}>
                <h5>Đến phỏng vấn</h5>
              </div>
              <div className={`${styles.dom_schedule}`}>
                {listSchedule?.data?.data?.length === 0 ? (
                  <p className={`${styles.data_empty}`}>Không có dữ liệu</p>
                ) : (
                  listSchedule?.data?.data?.map((item, index) => {
                    const processTimeSendCv = item.thoigianphongvan;
                    const dateObj = new Date(processTimeSendCv);
                    const hour = dateObj.getHours();
                    const day = dateObj.getDay() + 1;
                    const date = dateObj.getDate();
                    const month = dateObj.getMonth() + 1;
                    return (
                      <div key={item.id}>
                        <div className={`${styles.h_phongvan}`}>
                          <hr />
                          <div className={`${styles.h_pv_item}`}>
                            <div className={`${styles.h_pvitem_1}`}>
                              <li className={`${styles.yellow2}`}>{hour}</li>
                              <li>Thứ {day}</li>
                              <li>
                                {date}/{month}
                              </li>
                            </div>
                            <div className={`${styles.h_pvitem_2}`}>
                              <Link
                                passHref
                                href={{
                                  pathname: `/phan-mem-nhan-su/quan-ly-tuyen-dung/danh-sach-ung-vien/chi-tiet-ung-vien/u${item.id}`,
                                }}
                              >
                                <h4>{item.name}</h4>
                              </Link>
                              <p>
                                {item.title}
                                <span> . </span>
                                {/* {salary[item.RecruitmentNews.salaryId]} */}
                              </p>
                              <p className={`${styles.green}`}>
                                01 người phỏng vấn
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {listSchedule?.data?.total > 0 && (
              <div
                className={`${styles.pagination}`}
                style={{ marginRight: "8%" }}
              >
                <MyPagination
                  current={currentPageListSchedule}
                  total={listSchedule?.data?.total}
                  pageSize={3}
                  onChange={(page) => handlePageLisSchedule(page)}
                />
              </div>
            )}
          </>
        </div>
        <BodyFrameFooter src="https://www.youtube.com/embed/v8FmUlUI1bs"></BodyFrameFooter>
      </div>
    </>
  );
}
