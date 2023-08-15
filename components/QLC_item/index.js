/** @format */

import React from 'react'
import Link from 'next/link'
import styles from './QLCitem.module.scss'
import { CheckLogin } from '../../utils/function'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
export default function QLC_item({ img, title, desc, url = '/' }) {
  const router = useRouter()
  const checkLoginAndRedirect = () => {
    const acc_token = Cookies.get('token_base365')
    const rf_token = Cookies.get('rf_token')
    const role = Cookies.get('role')

    if (acc_token && rf_token && role) {
      router.push(url)
    }
    // else {
    //   alert('Làm ơn hãy đăng ký/đăng nhập')
    // }
  }
  return (
    <div
      className={styles.QLC_item_wrap}
      onClick={() => checkLoginAndRedirect()}>
      <div className={styles.QLC_item}>
        <div className={styles.img}>
          <img src={img} alt='' />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.detail}>
            <div className={styles.desc}>{desc}</div>
            <img src='../img/right.png' alt='' />
            <span>Xem chi tiết</span>
          </div>
        </div>
      </div>
    </div>
  )
}