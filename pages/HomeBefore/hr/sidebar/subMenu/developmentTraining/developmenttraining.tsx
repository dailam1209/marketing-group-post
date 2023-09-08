/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from '../../sidebarHomeBefore.module.css'
import Link from "next/link";

export interface DevelopmentTraining {

}

export default function DevelopmentTraining({ children }: any) {
    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (buttonIndex: number) => {
        // @ts-ignore
        setActiveButton(buttonIndex);
    };
    const link = "phan-mem-nhan-su"

    const submenu = [
        {
            img: "/vn_vitricongviec.svg",
            title: 'Vị trí công việc',
            href: `/${link}/dao-tao-phat-trien/vi-tri-cong-viec`,
            target: ''
        },
        {
            img: "/vn_quytrinhdaotao.svg",
            title: 'Quy trình đào tạo',
            href: `/${link}/dao-tao-phat-trien/quy-trinh-dao-tao`,
            target: ''
        },
        {
            img: "/vn_danhgianangluc.svg",
            title: 'Đánh giá năng lực nhân viên',
            href: '#',
            target: 'blank'
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