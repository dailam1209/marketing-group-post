import React from 'react'
import styles from '../khoi-phuc/Restore.module.css'
import { forceDelete } from '@/pages/api/api-hr/du-lieu-da-xoa-gan-day/DeletedDataComPonentService'

export default function DeleteData({
  animation,
  handleClose,
  handleData,
}: any) {
  const handleSubmit = (e) => {
    try {
      const fetchData = async () => {
        const response = await forceDelete(handleData)
        if (response?.status !== 200) {
          alert('Xóa thất bại')
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
              <p>Xóa dữ liệu</p>
            </div>

            <div className={`${styles.modal_body}`}>
              <p>
                Các dữ liệu đã chọn sẽ bị xóa vĩnh viễn và bạn không thể khôi
                phục mục này.
              </p>
            </div>

            <div className={`${styles.modal_footer}`}>
              <button
                className={`${styles.l_btn_cancel}`}
                onClick={handleClose}>
                Đóng
              </button>
              <form onSubmit={(e) => handleSubmit(e)}>
                <button type='submit' className={`${styles.btn_delete}`}>
                  Xóa
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
