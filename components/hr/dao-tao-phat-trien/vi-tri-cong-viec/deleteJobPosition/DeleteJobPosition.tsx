import React, { useState } from "react";

import styles from "./DeleteJobPosition.module.css";
import { deleteDataJobPosition } from "@/pages/hr/api/dao-tao-phat-trien/JobPosition";
export interface DeleteJobPosition { }

export default function DeleteJobPosition({ animation, closeModal, id, deleteData }: any) {
  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await deleteDataJobPosition(id)
      if (response?.status !== 200) {
        alert('Xóa dữ liệu thất bại')
      }
      else {
        closeModal()
        deleteData(response?.data)
      }
    } catch (error) {

    }
  }


  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out}`}>
        <div className={`${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} ${styles.contentdel}`}>
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                XÓA VỊ TRÍ CÔNG VIỆC
              </h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
                Bạn có chắc muốn xóa vị trí công việc này không?
              </div>

              <div className={`${styles.xoaquytrinh}`}>
                Tất cả nội dung quy trình sẽ được lưu trữ ở
                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn.
              </div>
            </div>

            <form onSubmit={(e) => handleDelete(e)}>
              <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                <button type="button" className={`${styles.btn_huy}`} onClick={handleCancel}>
                  <span>Hủy</span>
                </button>
                <button type="submit" className={`${styles.delete}`}>
                  Xóa
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
