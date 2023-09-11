import React, { useEffect, useState, useRef } from 'react';
import styles from './headerHomeBeforeHr.module.css'
import SidebarHomeBefore from '../sidebar';
import ModalLogin from '@/components/modal/ModalLogin';
import ModalRegsiter from '@/components/modal/ModalRegsiter';

export default function HeaderHomeBeforeHr() {

    const [openSidebar, setOpenSidebar] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const dropDownMenuRef = useRef(null);
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const [openModalRegister, setOpenModalRegister] = useState(false)

    const handleOutsideClick = (event: any) => {
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            setOpenSidebar(false)
        }
    };

    useEffect(() => {
        if (openSidebar) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openSidebar]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1024) {
                setOpenSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Xóa bỏ sự kiện lắng nghe khi component bị hủy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.content_left}`}>
                        <div className={`${styles.drop_down_sidebar}`} onClick={handleOpenSidebar}>
                            <img src="/Frame 635627.png" alt="" />
                        </div>
                    </div>
                    <div className={`${styles.content_right}`}>
                        <img src="/Frame 635630.png" alt="" />
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href='#'>Hướng dẫn</a></li>
                            <li><a target="_blank" href="">Tin tức</a></li>
                            <li><a target="_blank" href="/">Chuyển đổi số</a></li>
                        </ul>
                        <ul className={`${styles.li_form}`}>
                            <li className={`${styles.li_form_1}`} onClick={() => setOpenModalLogin(true)}>
                                <a >Đăng nhập</a>
                            </li>
                            <li className={`${styles.li_form_2}`} onClick={() => setOpenModalRegister(true)}>
                                <a >Đăng kí</a>
                            </li>
                        </ul>
                    </div>
                    <div ref={dropDownMenuRef}>
                        {openSidebar && <SidebarHomeBefore />}
                    </div>
                </div>
            </div>
            {openModalRegister && (
                <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
            )}
            {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
        </>
    )
}