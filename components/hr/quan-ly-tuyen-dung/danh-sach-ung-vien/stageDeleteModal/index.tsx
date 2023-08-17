import React, { useState, useRef, useEffect } from 'react'
import styles from '@/components/hr/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/deleteRecruitmentProcess/DeleteRecruitmentProcess.module.css'
import { ProcessDelete } from '@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList'

export default function DeleteStage({ onCancel, process_id, animation }: any) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onCancel])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('processInterId', process_id)
      const response = await ProcessDelete(formData)
      if (response) {
        setTimeout(() => {
          onCancel()
        }, 1500)
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting} ${
          animation ? styles.fade_in : styles.fade_out
        }`}>
        <div className={`${styles.contentquytrinh}`}>
          <div
            className={`${styles.modal_content} ${styles.contentdel}`}
            ref={modalRef}>
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>XÓA GIAI ĐOẠN</h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
                Bạn có chắc muốn xóa giai đoạn này không
                <span className={`${styles.t_recruitment_name}`}></span>
              </div>
              <div className={`${styles.xoaquytrinh}`}>
                Dữ liệu liên quan đến giai đoạn phỏng vấn này sẽ bị xóa, Bạn có
                chắc muốn xóa giai đoạn phỏng vấn này không?
              </div>
            </div>

            <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
              <button
                type='button'
                className={`${styles.btn_huy}`}
                onClick={onCancel}>
                <span>Hủy</span>
              </button>
              <button
                type='button'
                className={`${styles.delete}`}
                onClick={handleSubmit}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
