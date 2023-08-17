import React, { useState } from 'react'

import styles from './deleteRecruitmentStage.module.css'
import { DeleteDataRecruitmentStage } from '@/pages/api/api-hr/quan-ly-tuyen-dung/RecruitmentManagerService'
export interface DeleteRecruitmentStage {}

export default function DeleteRecruitmentStage({
  data,
  recruitment,
  animation,
  onCloseModal,
  newDataDelete,
}: any) {
  const id = data.id

  const handleDelete = async (id: number) => {
    try {
      const response = await DeleteDataRecruitmentStage(id)
      if (response?.status === 403) {
        alert(
          'Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!'
        )
      } else if (response?.status !== 200) {
        alert('Xóa giai đoạn thất bại')
      } else {
        onCloseModal()
        newDataDelete(response?.data)
      }
    } catch (error) {}
  }
  const handleCancel = () => {
    onCloseModal()
  }

  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleCancel}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${
          animation ? styles.fade_in : styles.fade_out
        }`}>
        <div className={`${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} ${styles.contentdel}`}>
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>XÓA GIAI ĐOẠN</h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
                Bạn có chắc muốn xóa giai đoạn {` `}
                <span className={`${styles.t_recruitment_name}`}>
                  ({`QTTD ${data.id}`}) {recruitment}
                </span>
              </div>

              <div className={`${styles.xoaquytrinh}`}>
                Tất cả nội dung giai đoạn sẽ được lưu trữ ở
                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn.
              </div>
            </div>

            <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
              <button
                type='button'
                className={`${styles.btn_huy}`}
                onClick={handleCancel}>
                <span>Hủy</span>
              </button>
              <button
                type='button'
                className={`${styles.delete}`}
                onClick={() => handleDelete(id)}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
