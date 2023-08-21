/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { format } from "date-fns";
import styles from "./listRecruitmentProcess.module.css";
import EditRecruitmentProcess from "@/components/hr/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/editRecruitmentProcess/EditRecruitmentProcess";
import DeleteRecruitmentProcess from "@/components/hr/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/deleteRecruitmentProcess/DeleteRecruitmentProcess";
import { useRouter } from "next/router";
import MyPagination from "@/components/hr/pagination/Pagination";
import Link from "next/link";
import Head from "next/head";
export interface listRecruitmentProcess { }

export default function ListRecruitmentProcess({
  dataRecruitment,
  handlePage,
  currentPage,
  handleDelete,
  setData,
  iconAdd,
  iconEdit,
  iconDelete,
  newRecruitmentProcess
}: any) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(0);
  const [animateModal, setAnimateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePageChange = (page: any) => {
    handlePage(page);
  };

  const handleOpenModal = (type: any, item: any) => {
    setSelectedItem(item);
    setOpenModal(type);
    setAnimateModal(true);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    newRecruitmentProcess()
    setTimeout(() => {
      setOpenModal(0);
    }, 300);
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    router.push(`/phan-mem-nhan-su/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/danh-sach-quy-trinh/${id}`);
  };
  return (
    <>
      <Head>
        <title>Giai đoạn tuyển dụng - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.all_quytrinh}`} style={{ marginTop: "20px" }}>
        {dataRecruitment?.data?.map((item: any) => {
          const formattedDate = format(new Date(item.createdAt), "dd/MM/yyyy");
          return (
            <div key={item._id} style={{ width: "100%" }}>
              <div className={`${styles.quytrinh_item}`}>
                <div className={`${styles.quytrinh_item1}`}>
                  <div className={`${styles.quytrinh_item11}`}>
                    <a
                      href={`/phan-mem-nhan-su/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/danh-sach-quy-trinh/${item.id}`}
                      className={`${styles.quytrinh_item11_link}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                    >
                      (QTTD{item.id}) {item.name}
                    </a>
                  </div>
                  <div className={`${styles.quytrinh_item12}`}>
                    <span className={`${styles.qtrspan1}`}>
                      <p style={{ background: "#F1F9FC" }}>{formattedDate}</p>
                    </span>
                    <span>Tạo bởi công ty: {item.createdBy}.</span>
                    <span>Đối tượng áp dụng: {item.applyFor}</span>
                  </div>
                </div>
                {/* chi tiết */}
                <div className={`${styles.quytrinh_item2}`}>
                  <a
                    href={`/phan-mem-nhan-su/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/danh-sach-quy-trinh/${item.id}`}
                    className={`${styles.quytrinh_item11_link}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    <picture>
                      <img src={`${"/detail-quytrinh.svg"}`} alt=""></img>
                    </picture>
                    <span
                      className={`${styles.span_a} ${styles.span_a_detail}`}
                      style={{ cursor: "default" }}
                    >
                      Chi tiết
                    </span>
                  </a>
                  {/* edit */}
                  {iconEdit && (
                    <button
                      className={`${styles.button_option}`}
                      onClick={() => handleOpenModal(1, item)}
                    >
                      <picture>
                        <img src={`${"/icon-edit-quytrinh.svg"}`} alt=""></img>
                      </picture>
                      <span className={`${styles.span_a}`}>Sửa</span>
                    </button>
                  )}
                  {/* xóa */}
                  {iconDelete && (
                    <button
                      className={`${styles.button_option}`}
                      onClick={() => handleOpenModal(2, item)}
                    >
                      <picture>
                        <img
                          src={`${"/icon-remove-quytrinh.svg"}`}
                          alt=""
                        ></img>
                      </picture>
                      <span className={`${styles.span_a}`}>Xóa</span>
                    </button>
                  )}
                </div>
              </div>
              <hr className={`${styles.shr}`}></hr>
            </div>
          );
        })}

        {openModal === 1 && (
          <EditRecruitmentProcess
            animation={animateModal}
            onClose={handleCloseModal}
            data={selectedItem}
            setData={setData}
          />
        )}
        {openModal === 2 && (
          <DeleteRecruitmentProcess
            animation={animateModal}
            onClose={handleCloseModal}
            data={selectedItem}
            onDelete={handleDelete}
          />
        )}
      </div>
      {dataRecruitment?.totalCount > 5 && (
        <div className={`${styles.pagination}`}>
          <MyPagination
            current={currentPage}
            total={dataRecruitment?.totalCount}
            pageSize={5}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </>
  );
}
