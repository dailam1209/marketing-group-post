import React, { useState } from "react";

import styles from "./DeleteTrainingProcess.module.css";
import { deleteDataTrainingPosition } from "@/pages/api/dao-tao-phat-trien/TrainingProcess";
export interface DeleteTrainingProcess {}

export default function DeleteTrainingProcess({animation,closeModal, id, handleNewData }: any) {
  
  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = async(e: any) => {
    e.preventDefault();
    try {
      const response = await deleteDataTrainingPosition(id)
      if( response?.status !== 200) {
        alert('Xóa dữ liệu thất bại')
      }
      else{
        closeModal()
        handleNewData(response?.data)
      }
    }catch(error) {

    }
  }
  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleCancel}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${
          animation ? styles.fade_in : styles.fade_out
        }`}
      >
        <div className={`${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} ${styles.contentdel}`}>
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>XÓA QUY TRÌNH ĐÀO TẠO</h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
                Bạn có chắc muốn xóa quy trình đào tạo này không?
              </div>

              <div className={`${styles.xoaquytrinh}`}>
                Tất cả nội dung quy trình sẽ được lưu trữ ở
                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn.
              </div>
            </div>

            <form onSubmit={(e) => handleDelete(e)}>
              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}
              >
                <button
                  type="button"
                  className={`${styles.btn_huy}`}
                  onClick={handleCancel}
                >
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
