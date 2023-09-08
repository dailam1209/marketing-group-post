import React, { useState } from 'react';
import styles from '../../sidebarHomeBefore.module.css'
import Link from "next/link";
import Cookies from "js-cookie";

export interface Administration {

}

export default function Administration({ children }: any) {
    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (buttonIndex: number) => {
        // @ts-ignore
        setActiveButton(buttonIndex);
    };
    const role = Cookies.get("role");

    const link = "phan-mem-nhan-su"

    const submenu = [
        {
            img: "		/vn_quanlynhanvien.svg",
            title: 'Quản lý nhân viên',
            href: `/${link}/quan-ly-hanh-chinh/thong-tin-nhan-su`,
            target: '',
        },
        {
            img: "/vn_quydinhchinhsach.svg",
            title: 'Quy định - chính sách',
            href: `/${link}/quan-ly-hanh-chinh/quy-dinh-chinh-sach`,
            target: '',
        },
        {
            img: "/vn_hopdong.svg",
            title: 'Hợp đồng và hồ sơ nhân viên',
            href: '#',
            target: 'blank',

        },
        {
            img: "/vn_biendongnhansu.svg	",
            title: 'Biến động nhân sự',
            href: `/${link}/quan-ly-hanh-chinh/bien-dong-nhan-su`,
            target: '',
        },
        {
            img: "/vn_vanthuluutru.svg",
            title: 'Văn thư lưu trữ',
            href: '/van-thu-luu-tru/quanly-cong-van',
            target: 'blank',
        },
        {
            img: "/vn_dexuat.svg",
            title: 'Đề xuất',
            href: '/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat',
            target: 'blank',
        },
        {
            img: "	/vn_dexuat.svg",
            title: 'Đề xuất cộng đồng',
            href: '/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat',
            target: 'blank',
        },
        {
            img: "	/vn_truyenthongvanhoa.svg",
            title: 'Đề xuất nội bộ',
            href: '#',
            target: 'blank',
        },
        {
            img: "/vn_quanlytaisan.svg",
            title: 'Quản lý tài sản',
            href: '#',
            target: 'blank',
        },
        {
            img: "/vn_quanlykho.svg",
            title: 'Quản lý kho',
            href: '#',
            target: 'blank',
        },
        {
            img: "	/vn_quanlytaichinh.svg",
            title: 'Quản lý tài chính',
            href: '#',
            target: 'blank',
        },
        {
            img: "	/vn_phiendich.svg",
            title: 'Phiên dịch',
            href: '#',
            target: 'blank',
        },
    ]

    return (
        <>
            {submenu.map((item, index) => (
                <div key={index}>
                    <div className={`${styles.subMenu}`}>
                        <Link
                            className={` ${activeButton === 1 ? styles.clicked : ""}`}
                            onClick={() => handleClick(index)}
                            href={item.href}
                            target={item.target}
                        >
                            <div className={`${styles.sidebar_home}`}>
                                <div className={`${styles.button2}`}>
                                    <img
                                        src={
                                            item.img
                                        }
                                        className={`${styles.img_1}`}
                                        alt="Index"
                                    />
                                </div>
                                <div className={`${styles.sidebar_text} ${styles.sidebar_text2} ${activeButton === index ? styles.clicked2 : ""}`}>{item.title}</div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}