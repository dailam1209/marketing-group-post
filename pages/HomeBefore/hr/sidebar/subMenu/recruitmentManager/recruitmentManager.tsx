/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from '../../sidebarHomeBefore.module.css'
import Link from "next/link";
import ModalLogin from '@/components/modal/ModalLogin';

export interface RecruitmentManager { }

export default function RecruitmentManager({ children }: any) {
    const [activeButton, setActiveButton] = useState(null);
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const handleClick = (buttonIndex: number) => {
        // @ts-ignore
        setActiveButton(buttonIndex);
        setOpenModalLogin(true)
    };
    const link = "phan-mem-nhan-su"
    const submenu = [
        {
            img: "/quytrinh_td.svg",
            title: 'Quy trình tuyển dụng',
            href: '#',
            target: '',
        },
        {
            img: "/thuchien_td.svg",
            title: 'Thực hiện tuyển dụng',
            href: '#',
            target: '',
        },
        {
            img: "/ds_ungvien.svg",
            title: 'Danh sách ứng viên',
            href: '#',
            target: '',
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
            {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
        </>
    )
}
