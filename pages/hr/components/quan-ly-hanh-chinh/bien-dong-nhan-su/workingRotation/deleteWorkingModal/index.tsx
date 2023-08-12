import React, { useState, useEffect, useMemo } from "react";
import styles from './deleteWorkingModal.module.css'
import { DeleteWorkingRotation } from "@/pages/api/bien_dong_nhan_su";

export default function DeleteWorkingRotations({ onCancel, ep_id }: any) {

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('ep_id', ep_id);
            const response = await DeleteWorkingRotation(formData)
            setTimeout(() => {
                onCancel()
            }, 1500)
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <p className={`${styles.modal_title}`}>Luân chuyển công tác</p>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa bản ghi này không ? </p>
                            </div>
                            <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                <button className={`${styles.btn_add}`} onClick={handleSubmit}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}