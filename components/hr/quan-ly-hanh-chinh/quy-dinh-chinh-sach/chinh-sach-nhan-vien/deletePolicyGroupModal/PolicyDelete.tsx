import React, { useState, useRef, useEffect } from "react";
import styles from "../../../../quan-ly-tuyen-dung/quy-trinh-tuyen-dung/deleteRecruitmentProcess/DeleteRecruitmentProcess.module.css"
import { DeletePolicy } from "@/pages/hr/api/quy_dinh_chinh_sach";



export default function DeletePolicys({ onCancel, idGroup }: any) {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCancel()
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onCancel]);
    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('id', idGroup)
            const response = await DeletePolicy(formData)
            if (response) {
                onCancel()
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className={`${styles.overlay}`}></div>
            <div className={`${styles.modal} ${styles.modal_setting}  `}>
                <div className={`${styles.contentquytrinh}`}>
                    <div className={`${styles.modal_content} ${styles.contentdel}`} ref={modalRef}>
                        <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
                            <h5 className={`${styles.modal_title}`}>
                                XÓA NHÓM QUY ĐỊNH
                            </h5>
                        </div>

                        <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                            <div className={`${styles.xoaquytrinh}`}>
                                Bạn có chắc muốn xóa chính sách này không
                                <span className={`${styles.t_recruitment_name}`}>

                                </span>
                            </div>

                            <div className={`${styles.xoaquytrinh}`}>
                                Tất cả nội dung quy trình sẽ được lưu trữ ở
                                <span> DỮ LIỆU ĐÃ XÓA GẦN ĐÂY </span>
                                trong thời gian 5 ngày trước khi bị xóa vĩnh viễn.
                            </div>
                        </div>

                        <div className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                            <button type="button" className={`${styles.btn_huy}`} onClick={onCancel}>
                                <span>Hủy</span>
                            </button>
                            <button type="button" className={`${styles.delete}`} onClick={handleSubmit}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
