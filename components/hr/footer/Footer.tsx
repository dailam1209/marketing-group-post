import React from 'react';
import styles from './Footer.module.css'
export interface FooterProp {

}

export default function Footer (props : FooterProp){
    return (
        <div className={`${styles.footer}`}>
             <h1> Footer </h1>
        </div>
    )
}