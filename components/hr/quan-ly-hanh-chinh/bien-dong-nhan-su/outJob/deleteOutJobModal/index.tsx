import React, { useRef, useEffect } from "react";
import styles from '../../workingRotation/deleteWorkingModal/deleteWorkingModal.module.css'
import { DeleteOutJob } from "@/pages/hr/api/bien_dong_nhan_su";

export default function DeleteOutJobs({ onCancel, ep_id }: any) {
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
            const formData = new FormData();
            formData.append('ep_id', ep_id);
            const response = await DeleteOutJob(formData)
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
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <p className={`${styles.modal_title}`}>Giảm biên chế, nghỉ việc</p>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa bản ghi này không ? </p>
                            </div>
                            <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button style={{ cursor: 'pointer' }} className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                <button style={{ cursor: 'pointer' }} className={`${styles.btn_add}`} onClick={handleSubmit}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}