import React, { useState } from "react";
import styles from "./DeleteRecruitmentProcess.module.css";
import { DeleteDataRecruitment } from "@/pages/hr/api/quan-ly-tuyen-dung/RecruitmentManagerService";

export interface DeleteRecruitmentProcess { }

export default function DeleteRecruitmentProcess({
  animation,
  onClose,
  data,
  onDelete
}: any) {

  const [deleteStatus, setDeleteStatus] = useState(false);
  const handleCancel = () => {
    onClose();
  };
  const handleDelete = async (recruitmentId) => {
    const response = await DeleteDataRecruitment(recruitmentId);
    if (response?.status === 403) {
      alert('Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!')
    }
    else if (response?.status !== 200) {
      alert('xóa thất bại');
      setDeleteStatus(false)
    } else {
      setDeleteStatus(true);
      onDelete()
      onClose();
    }
  };

  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
      >
        <div className={`${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} ${styles.contentdel}`}>
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                XÓA QUY TRÌNH TUYỂN DỤNG
              </h5>
            </div>

            <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
              <div className={`${styles.xoaquytrinh}`}>
                Bạn có chắc muốn xóa quy trình
                <span className={`${styles.t_recruitment_name}`}>
                  {" "}
                  {data.name}
                </span>
              </div>

              <div className={`${styles.xoaquytrinh}`}>
                Tất cả nội dung quy trình sẽ được lưu trữ ở
                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn.
              </div>
            </div>

            <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
              <button
                type="button"
                className={`${styles.btn_huy}`}
                onClick={handleCancel}
              >
                <span>Hủy</span>
              </button>
              <button
                type="button"
                className={`${styles.delete}`}
                onClick={() => handleDelete(data.id)}
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
