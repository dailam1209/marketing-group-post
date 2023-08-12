import React, { useState } from "react";
import styles from "./DeleteRecruitment.module.css";
import { SoftDeleteNews } from "@/pages/api/quan-ly-tuyen-dung/PerformRecruitment";
export interface DeleteRecruitment {}
export default function DeleteRecruitment({ animation, handleCloseModal,newsId, onDelete }: any) {
  const [deleteStatus, setDeleteStatus] = useState(false);

  const handleDelete = async (newsId) => {
    const deleteRecruitment = await SoftDeleteNews(newsId);
    if(deleteRecruitment?.status === 403 ) {
      alert('Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!')
    }
    else if( deleteRecruitment?.status !== 200) {
      alert(' Gỡ tin tuyển dụng thất bại')
    }
    else{
      setDeleteStatus(true);
      handleCloseModal()
      onDelete(deleteRecruitment?.data)
    }
  };
  
  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out }`} style={{display:'block'}}>
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
            <h5 className={`${styles.modal_title}`}>
               GỠ TIN TUYỂN DỤNG
               </h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
              Bạn có chắc muốn gỡ tin tuyển dụng này ?
                <span className={`${styles.t_recruitment_name}`}>
                  
                </span>
              </div>

              <div className={`${styles.xoaquytrinh}`}>
                Tất cả nội dung quy trình sẽ được lưu trữ ở
                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn và sẽ tự động đóng trên timviec365.vn
              </div>
            </div>

            <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
              <button
                type="button"
                className={`${styles.btn_huy}`}
                onClick={handleCloseModal}
              >
                <span>Hủy</span>
              </button>
              <button
                type="button"
                className={`${styles.delete}`}
                onClick={() => handleDelete(newsId)}
              >
                Xóa
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

