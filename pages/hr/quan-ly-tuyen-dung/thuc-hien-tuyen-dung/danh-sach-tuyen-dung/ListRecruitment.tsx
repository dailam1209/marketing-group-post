import React, { useState } from "react";
import styles from "./ListRecruitment.module.css";
import EditPerformRecruitment from "@/pages/hr/components/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/EditPerformRecruitment/EditPerformRecruitment";
import DeleteRecruitment from "@/pages/hr/components/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/DeletePerformRecruitment/DeleteRecruitment";
import Link from "next/link";
import { setAsTemplate } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";
import Head from "next/head";
import { useRouter } from "next/router";

export interface ListRecruitment { }

export default function ListRecruitment({
  data,
  onDelete,
  editData,
  iconEdit,
  iconDelete,
  tokenType,
}: any) {
  const router = useRouter();
  const idRecruitment = data?.id;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpenModalEdit(false);
      setOpenModalDelete(false);
    }, 300);
  };
  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    setAnimateModal(true);
  };
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
    setAnimateModal(true);
  };

  const typeOfWork = {
    1: "Toàn thời gian cố định",
    2: "Toàn thời gian tạm thời",
    3: "Bán thời gian",
    4: "Bán thời gian tạm thời",
    5: "Hợp đồng",
    6: "Khác",
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

  const dateBelieveTime = (timeEnd: any) => {
    const currentDate = new Date();
    const endDate = new Date(timeEnd);
    if (currentDate < endDate) {
      return (
        <>
          <p
            className={`${styles.new_r_t_left_tin}`}
            style={{ backgroundColor: "#5cb85c" }}
          >
            Tin còn hạn
          </p>
        </>
      );
    } else {
      return (
        <>
          <p
            className={`${styles.new_r_t_left_tin}`}
            style={{ backgroundColor: " #EB5757" }}
          >
            Tin quá hạn
          </p>
        </>
      );
    }
  };

  const getFormattedDate = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Cần thêm 1 vì tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const handleSetTemplate = async (e: any, recruitmentNewsId: number) => {
    const response = await setAsTemplate(recruitmentNewsId);
    if (response?.status !== 200) {
      alert("Thiết lập tin mẫu không thành công");
    }
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    router.push(
      `/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/danh-sach-tuyen-dung/${id}`
    );
  };
  return (
    <>
      <div className={`${styles.new_r_t}`}>
        <div className={`${styles.new_r_t_left}`}>
          <div className={`${styles.new_r_t_header} ${styles.row}`}>
            <div className={`${styles.new_r_t_header_content} `}>
              <h3 className={`${styles.new_r_t_left_h3}`}>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                >
                  <p
                    style={{ cursor: "default" }}
                    className={`${styles.new_r_t_left_link}`}
                  >
                    <a
                      href={`/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/danh-sach-tuyen-dung/${data?.id}`}
                      className={`${styles.quytrinh_item11_link}`}
                      onClick={(e) => handleLinkClick(e, data.id)}
                    >
                      <span>
                        (TD{data?.id}) {data?.title}
                      </span>
                    </a>
                  </p>
                </button>
              </h3>
            </div>

            <div>
              <p className={`${styles.t_ita}`}>Tạo bởi: {data?.createdBy}</p>
            </div>

            <div className={`${styles.t_new_type}`}>
              {dateBelieveTime(data?.timeEnd)}
            </div>

            <div
              className={`${styles.new_r_top_right}`}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              <div className={`${styles.pull_right} ${styles.hover_t}`}>
                <picture className={`${styles.pull_right_img}`}>
                  <img src={`/3cham.png`} alt=""></img>
                </picture>
                {visible && (
                  <div className={`${styles.settings}`}>
                    <button
                      className={`${styles.detail_new}`}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        padding: "0",
                      }}
                    >
                      <li
                        style={{ paddingRight: "102px" }}
                        className={`${styles.detail_new}`}
                      >
                        <a
                          href={`/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/danh-sach-tuyen-dung/${data?.id}`}
                          className={`${styles.quytrinh_item11_link}`}
                        >
                          Chi tiết
                        </a>
                      </li>
                    </button>

                    {tokenType === 1 ? (
                      <button
                        style={{ paddingRight: "55px" }}
                        className={`${styles.edit_new}`}
                        onClick={handleOpenModalEdit}
                      >
                        Chỉnh sửa tin
                      </button>
                    ) : !iconEdit ? (
                      <></>
                    ) : (
                      <button
                        style={{ paddingRight: "55px" }}
                        className={`${styles.edit_new}`}
                        onClick={handleOpenModalEdit}
                      >
                        Chỉnh sửa tin
                      </button>
                    )}
                    <hr style={{ marginTop: "0", marginBottom: "0" }}></hr>
                    {tokenType === 1 ? (
                      <li onClick={handleOpenModalDelete}>Gỡ tin tuyển dụng</li>
                    ) : !iconDelete ? (
                      <></>
                    ) : (
                      <li onClick={handleOpenModalDelete}>Gỡ tin tuyển dụng</li>
                    )}
                    {tokenType === 1 ? (
                      <li onClick={(e) => handleSetTemplate(e, idRecruitment)}>
                        Thiết lập làm tin mẫu
                      </li>
                    ) : !iconEdit ? (
                      <></>
                    ) : (
                      <li onClick={(e) => handleSetTemplate(e, idRecruitment)}>
                        Thiết lập làm tin mẫu
                      </li>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {openModalEdit && (
            <EditPerformRecruitment
              animation={animateModal}
              handleCloseModal={handleCloseModal}
              data={data}
              editData={editData}
            ></EditPerformRecruitment>
          )}
          {openModalDelete && (
            <DeleteRecruitment
              animation={animateModal}
              handleCloseModal={handleCloseModal}
              newsId={data.id}
              onDelete={onDelete}
            ></DeleteRecruitment>
          )}

          <div className={`${styles.new_r_t_body}`}>
            <ul className={`${styles.new_r_t_body_content}`}>
              <li>
                <span className={`${styles.text}`}>
                  {typeOfWork[data?.posApply]}. {salary[data?.salaryId]}
                </span>
              </li>
              <li>
                <picture className={`${styles.icon}`}>
                  <img src={`/calendar.png`} alt=""></img>
                </picture>
                <span className={`${styles.text}`}>
                  {getFormattedDate(data?.timeStart)} -{" "}
                  {getFormattedDate(data?.timeEnd)}
                </span>
              </li>
              <li>
                <picture className={`${styles.icon}`}>
                  <img src={`/house.png`} alt=""></img>
                </picture>
                <span className={`${styles.text}`}>{data?.address} </span>
              </li>
            </ul>

            <ul className={`${styles.new_r_t_body_content}`}>
              <li>
                <span className={`${styles.text}`}>
                  Cần tuyển: {data?.number}
                </span>
              </li>

              <li>
                <span className={`${styles.text}`}>
                  Người phụ trách: {data?.nameHR[0]}
                </span>
              </li>
              <li>
                <span className={`${styles.text}`}>
                  Mã quy trình tuyển dụng áp dụng: QTTD{data?.recruitmentId}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
