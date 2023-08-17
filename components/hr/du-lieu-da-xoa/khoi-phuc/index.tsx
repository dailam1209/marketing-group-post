import React, { useState } from 'react'
import styles from './Restore.module.css'
import { restoreDelete } from '@/pages/api/api-hr/du-lieu-da-xoa-gan-day/DeletedDataComPonentService'

export default function Restore({ animation, handleClose, handleData }: any) {
  const handleSubmit = (e) => {
    try {
      const fetchData = async () => {
        const response = await restoreDelete(handleData)
        if (response?.status !== 200) {
          alert('Khôi phục thất bại')
        } else {
          handleClose()
        }
      }
      fetchData()
    } catch (error) {}
  }

  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting} ${
          animation ? styles.fade_in : styles.fade_out
        } `}
        style={{ display: 'block' }}>
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            <div className={`${styles.modal_header}`}>
              <p>Khôi phục</p>
            </div>

            <div className={`${styles.modal_body}`}>
              <p>
                Bạn có chắc chắn muốn khôi phục các dữ liệu đã chọn?
                <br />
                Toàn bộ thông tin về dữ liệu sẽ được khôi phục lại vị trí ban
                đầu.
              </p>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={`${styles.modal_footer}`}>
                <button
                  className={`${styles.l_btn_cancel}`}
                  onClick={handleClose}>
                  Đóng
                </button>

                <button type='submit' className={`${styles.btn_restore}`}>
                  Khôi phục
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
