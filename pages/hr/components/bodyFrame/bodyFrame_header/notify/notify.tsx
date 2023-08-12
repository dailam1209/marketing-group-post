import React, { Fragment } from "react";
import styles from './notify.module.css'
import Link from "next/link";

export interface Notify {

}

export default function Notify() {
    const listNoti = [
        {
            userName_noti: 'Nguyễn Hồng Lịchh',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },
        {
            userName_noti: 'Nguyễn Hồng Lịch',
            text_noti: 'có lịch hẹn phỏng vấn vào ngày hôm nay',
            time_noti: 'vào lúc 09:00:00'
        },



    ]
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.remind}`}>
                    {listNoti.map((item, index) => (
                        <div key={index}>
                            <div className={`${styles.height_noti}`}>
                                <div className={`${styles.text_noti}`}>
                                    <div className={`${styles.collapse}`}>
                                        <Link className={`${styles.userName_noti}`} href='' target="blank">{item.userName_noti}
                                        </Link>
                                        {item.text_noti}
                                    </div>
                                    <div className={`${styles.time_noti}`}>{item.time_noti}</div>
                                </div>
                                <div className={`${styles.close_remind}`}>
                                    <img src={`/close_noti.svg`} alt="" />
                                </div>
                            </div>
                        </div>)
                    )}
                </div>
            </div>
        </>
    )
}