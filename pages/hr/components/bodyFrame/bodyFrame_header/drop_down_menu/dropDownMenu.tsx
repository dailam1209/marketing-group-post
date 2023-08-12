import React, { useState } from "react";
import styles from './dropDownMenu.module.css'
import Link from "next/link";
import { deleteCookie } from 'cookies-next';
export interface DropDownMenu {}

export default function DropDownMenu({dataHeader}) {
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [shouldOpenInNewTab, setShouldOpenInNewTab] = useState(true); // Thêm trạng thái
    const ListMenu = [
        {
            img: '/huongdan.svg',
            text: 'Hướng dẫn',
            href: 'https://phanmemnhansu.timviec365.vn/huong-dan.html',
            icon: '	/iconmenu.svg'

        },
        {
            img: '	/vn_icon_tttk.svg',
            text: 'Thông tin tài khoản',
            href: 'https://quanlychung.timviec365.vn/quan-ly-thong-tin-tai-khoan-cong-ty.html',
            icon: '	/iconmenu.svg'
        },
        {
            img: '	/vn_icon_baoloi.svg',
            text: 'Báo lỗi',
            href: 'https://chamcong.timviec365.vn/quan-ly-cong-ty/gui-loi.html',
            icon: '	/iconmenu.svg'
        },
        {
            img: '	/vn_icon_danhgia.svg',
            text: 'Đánh giá',
            href: 'https://chamcong.timviec365.vn/quan-ly-cong-ty/danh-gia.html',
            icon: '	/iconmenu.svg'
        },
        {
            img: '	/dangxuat.svg',
            text: 'Đăng xuất',
            href: 'https://phanmemnhansu.timviec365.vn/',
            icon: '	/iconmenu.svg'
        },

    ]

    const handleClearCookies = () => {
        if( logoutClicked ) {
            deleteCookie('user_365');
        }
    }
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.avatar}`}><img className={`${styles.img_avatar}`} src={`/app_1686633773283.jpg`} alt="" /></div>
                <div className={`${styles.menu_cpn}`}>{dataHeader?.data.userName}</div>
                <div className={`${styles.menu_id}`}>{dataHeader?.data.idQLC || ''}</div>
                {ListMenu.map((item, index) => (
                    <div key={index}>
                        <Link 
                         target={item.text === 'Đăng xuất' || item.img === '	/dangxuat.svg' && shouldOpenInNewTab ? "" : "_blank"}
                         href={item.href}
                               onClick={() => {
                                if (item.text === 'Đăng xuất' || item.img === '	/dangxuat.svg') {
                                    setLogoutClicked(true); 
                                } else {
                                    setLogoutClicked(false); 
                                }
                                handleClearCookies();
                            }}
                        >
                            <div className={`${styles.menu}`}>
                                <div className={`${styles.menu_icon}`}>
                                    <img className={`${styles.img_icon}`} src={item.img} alt="icon" />
                                </div>
                                <div className={`${styles.text_menu}`}>
                                    {item.text}
                                </div>
                                <div className={`${styles.next_icon}`}>
                                    <img src={item.icon} alt="" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}