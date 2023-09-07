import React, { useEffect, useState } from "react";
import styles from "./CreateSampleNews.module.css";
import { setAsTemplate } from "@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment";

export default function CreateSampleNews({
  animation,
  handleCloseModal,
  newsId,
}) {
  const handleSetTemplate = async (e: any, recruitmentNewsId: number) => {
    const response = await setAsTemplate(recruitmentNewsId);
    if (response?.status !== 200) {
      alert("Thiết lập tin mẫu không thành công");
    } else {
      handleCloseModal();
    }
  };
  return (
    <>
      <>
        <div className={`${styles.overlay}`} onClick={handleCloseModal}></div>
        <div
          className={`${styles.modal} ${styles.modal_setting}  ${
            animation ? styles.fade_in : styles.fade_out
          }`}
          style={{ display: "block" }}
        >
          <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
            <div className={`${styles.modal_content} `}>
              {/* header */}
              <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
                <h5 className={`${styles.modal_title}`}>
                  THIẾT LẬP LÀM TIN MẪU
                </h5>
              </div>

              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.xoaquytrinh}`}>
                  Bạn có muốn thiết lập tin này thành tin mẫu tuyển dụng?
                  <span className={`${styles.t_recruitment_name}`}></span>
                </div>

                <div className={`${styles.xoaquytrinh}`}>
                  Các tin tuyển dụng sau sẽ có cùng nội dung tuyển dụng (vị trí
                  tuyển dụng, mức lương, mô tả công việc) nếu chọn mẫu tin này?
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}
              >
                <button
                  type="button"
                  className={`${styles.btn_huy}`}
                  onClick={handleCloseModal}
                >
                  <span>Hủy</span>
                </button>
                <button
                  type="button"
                  className={`${styles.update}`}
                  onClick={(e) => handleSetTemplate(e, newsId)}
                >
                  Thiết lập
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
