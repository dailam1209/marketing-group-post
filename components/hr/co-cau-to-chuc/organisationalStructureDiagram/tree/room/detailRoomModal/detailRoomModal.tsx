import React, { useState, useEffect, useRef } from "react";
import styles from './detailRoomModal.module.css'
import Select from 'react-select';
import { OrganizationalStructureDetail } from "@/pages/hr/api/co_cau_to_chuc";

export default function DetailsRoomModal({ depId, onCancel }: any) {

    const [isTitle, setIsTitle] = useState<any | null>(null)
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('depId', depId)

                const response = await OrganizationalStructureDetail(formData)
                setIsTitle(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHI TIẾT MÔ TẢ PHÒNG BAN</h5>
                            </div>
                            <div>
                                <form action="">
                                    <div style={{ padding: 20 }}>
                                        <p style={{ textAlign: 'left' }}>{isTitle?.info?.description}</p>
                                    </div>
                                    <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                        <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}