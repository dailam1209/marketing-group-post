import React, { useEffect, useRef } from "react";
import styles from './dropdownHeader.module.css'

export default function DropDownHeaderHr({ onCancel }: any) {
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

    return (
        <>
            <div className={`${styles.modal} ${styles.fade}`}>
                <div className={`${styles.modal_dialong}`}>
                    <div className={`${styles.modal_content}`} ref={modalRef}>
                        <div className={`${styles.modal_body}`}>
                            <ul>
                                <li>
                                    <a href="/">Trang chủ</a>
                                </li>
                                <li>
                                    <a href="https://phanmemnhansu.timviec365.vn/huong-dan.html">Hướng dẫn</a>
                                </li>
                                <li>
                                    <a href="https://timviec365.vn/blog/c153/quan-tri-nhan-luc">Tin tức</a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://quanlychung.timviec365.vn/">Chuyển đổi số</a>
                                </li>
                            </ul>
                            <a href="/lua-chon-dang-nhap.html" className={`${styles.btn_mb_login}`}>Đăng nhập</a>
                            <a href="/lua-chon-dang-ky.html" className={`${styles.btn_mb_register}`}>Đăng ký</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}