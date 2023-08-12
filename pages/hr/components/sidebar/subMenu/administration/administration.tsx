import React, { useState } from 'react';
import styles from '../../sidebar.module.css'
import Link from "next/link";

export interface Administration {

}

export default function Administration({ children }: any) {
    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (buttonIndex: number) => {
        // @ts-ignore
        setActiveButton(buttonIndex);
    };

    const submenu = [
        {
            img: "		/vn_quanlynhanvien.svg",
            title: 'Quản lý nhân viên',
            href: '/hr/pages/quan-ly-hanh-chinh/thong-tin-nhan-su',
            target: '',
        },
        {
            img: "/vn_quydinhchinhsach.svg",
            title: 'Quy định - chính sách',
            href: '/hr/pages/quan-ly-hanh-chinh/quy-dinh-chinh-sach',
            target: '',
        },
        {
            img: "/vn_hopdong.svg",
            title: 'Hợp đồng và hồ sơ nhân viên',
            href: 'https://chamcong.timviec365.vn/quan-ly-cong-ty',
            target: 'blank',

        },
        {
            img: "/vn_biendongnhansu.svg	",
            title: 'Biến động nhân sự',
            href: '/hr/pages/quan-ly-hanh-chinh/bien-dong-nhan-su',
            target: '',
        },
        {
            img: "/vn_vanthuluutru.svg",
            title: 'Văn thư lưu trữ',
            href: 'https://vanthu.timviec365.vn/quanly-cong-van.html',
            target: 'blank',
        },
        {
            img: "/vn_dexuat.svg",
            title: 'Đề xuất',
            href: 'https://vanthu.timviec365.vn/trang-quan-ly-de-xuat.html',
            target: 'blank',
        },
        {
            img: "	/vn_dexuat.svg",
            title: 'Đề xuất cộng đồng',
            href: 'https://vanthu.timviec365.vn/trang-quan-ly-de-xuat.html',
            target: 'blank',
        },
        {
            img: "	/vn_truyenthongvanhoa.svg",
            title: 'Đề xuất nội bộ',
            href: 'https://truyenthongnoibo.timviec365.vn/quan-ly-chung.html',
            target: 'blank',
        },
        {
            img: "/vn_quanlytaisan.svg",
            title: 'Quản lý tài sản',
            href: 'https://phanmemquanlytaisan.timviec365.vn/',
            target: 'blank',
        },
        {
            img: "/vn_quanlykho.svg",
            title: 'Quản lý kho',
            href: 'https://phanmemquanlykho.timviec365.vn/tong-quan.html',
            target: 'blank',
        },
        {
            img: "	/vn_quanlytaichinh.svg",
            title: 'Quản lý tài chính',
            href: 'https://quanlychung.timviec365.vn/quan-ly-ung-dung-nhan-vien.html',
            target: 'blank',
        },
        {
            img: "	/vn_phiendich.svg",
            title: 'Phiên dịch',
            href: 'https://bienphiendich.timviec365.vn/',
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