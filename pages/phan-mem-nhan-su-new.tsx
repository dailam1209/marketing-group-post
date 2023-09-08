import React from 'react';
import styles from '@/styles/HomeBeforeLoginHr.module.css'
import HeaderHomeBeforeHr from './HomeBefore/hr/header';

export default function HomeBeforeLoginHr() {
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.sidebar}`}>
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.header}`}>
                            <HeaderHomeBeforeHr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}