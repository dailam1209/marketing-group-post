import React from 'react';
import styles from './headerHomeBeforeHr.module.css'

export default function HeaderHomeBeforeHr() {
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.content_left}`}>

                    </div>
                    <div className={`${styles.content_right}`}>
                        <ul>
                            <li>Trang chủ</li>
                            <li>Hướng dẫn</li>
                            <li>Tin tức</li>
                            <li>Chuyển đổi số</li>
                        </ul>
                        <ul>
                            <li>
                                <a href="">Đăng nhập</a>
                            </li>
                            <li>
                                <a href="">Đăng kí</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}