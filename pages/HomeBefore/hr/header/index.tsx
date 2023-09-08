import React, { useEffect, useState, useRef } from 'react';
import styles from './headerHomeBeforeHr.module.css'
import SidebarHomeBefore from '../sidebar';

export default function HeaderHomeBeforeHr() {

    const [openSidebar, setOpenSidebar] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const dropDownMenuRef = useRef(null);

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
                            <li>Trang chủ</li>
                            <li>Hướng dẫn</li>
                            <li>Tin tức</li>
                            <li>Chuyển đổi số</li>
                        </ul>
                        <ul className={`${styles.li_form}`}>
                            <li className={`${styles.li_form_1}`}>
                                <a href="">Đăng nhập</a>
                            </li>
                            <li className={`${styles.li_form_2}`}>
                                <a href="">Đăng kí</a>
                            </li>
                        </ul>
                    </div>
                    <div ref={dropDownMenuRef}>
                        {openSidebar && <SidebarHomeBefore />}
                    </div>
                </div>
            </div>
        </>
    )
}