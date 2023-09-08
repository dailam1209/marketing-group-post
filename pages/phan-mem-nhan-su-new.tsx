import React, { useEffect, useState } from 'react';
import styles from '@/styles/HomeBeforeLoginHr.module.css'
import HeaderHomeBeforeHr from './HomeBefore/hr/header';
import SidebarHomeBefore from './HomeBefore/hr/sidebar';
import FooterQLC from "@/components/footerQLC/FooterQLC.jsx";
import Cookies from 'js-cookie'

export default function HomeBeforeLoginHr() {

    const [openSidebar, setOpenSidebar] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [table_of_content2, setTable_of_content2] = useState(false)
    const [table_of_content3, setTable_of_content3] = useState(false)

    useEffect(() => {
        const acc_token = Cookies.get('token_base365')
        const rf_token = Cookies.get('rf_token')
        const role = Cookies.get('role')
        if (acc_token && rf_token && role) {
            window.location.href = "/phan-mem-nhan-su/quan-ly-chung"
        }
    }, [])

    const handleOpentableOfContent2 = () => {
        setTable_of_content2(pre => !pre)
    }
    const handleOpentableOfContent3 = () => {
        setTable_of_content3(pre => !pre)
    }

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
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.sidebar}`}>
                        <SidebarHomeBefore />
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.header}`}>
                            <HeaderHomeBeforeHr />
                        </div>
                        <div className={`${styles.content_body}`}>
                            <div className={`${styles.content_body_left}`}>
                                <div className={`${styles.table_of_content}`}>
                                    <img className={`${styles.table_of_content_img1}`} src="/Frame 1321315775.png" alt="" />
                                    <img className={`${styles.table_of_content_img2}`} src="/Frame 1321315775 (1).png" alt="" />
                                </div>
                                <div className={`${styles.numerical}`}>
                                    <ul>
                                        <li>
                                            <img src="/arrow-square-down.png" alt="" />
                                            <p>1. Vai trò của CV xin việc quan trọng ra sao ?</p>
                                        </li>
                                        <li onClick={handleOpentableOfContent2}>
                                            <img src={table_of_content2 ? "/hide.png" : "hide1.png"} alt="" />
                                            <p>2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên ?</p>
                                        </li>
                                        {table_of_content2 &&
                                            <div>
                                                <li>
                                                    <img src="/arrow-square-down.png" alt="" />
                                                    <p>2.1. CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp ?</p>
                                                </li>
                                                <li>
                                                    <img src="/arrow-square-down.png" alt="" />
                                                    <p>2.2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên ?</p>
                                                </li>
                                            </div>
                                        }
                                        <li onClick={handleOpentableOfContent3}>
                                            <img src={table_of_content3 ? "/hide.png" : "hide1.png"} alt="" />
                                            <p>3. CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp ?</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${styles.content_body_right}`}>

                            </div>
                        </div>
                    </div>

                </div>
                <FooterQLC />
            </div >
        </>
    )
}