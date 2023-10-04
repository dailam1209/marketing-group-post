/** @format */

import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ModalLogin({ setOpenModalLogin }) {
  const router = new useRouter();

  useEffect(() => {
    const query = router.query;
    if (query.url && query.urlRedeict) {
      const urlGet = "?url=" + query.url + "&urlRedeict=" + query.urlRedeict;
      setUrl(urlGet);
    }
  }, []);

  return (
    <div>
      <div className={styles.modal_login_register}>
        <div
          className={styles.close}
          onClick={() => {
            setOpenModalLogin(false);
          }}
        >
          <img src="/crm/qlc_close.png" alt="hungha365.com" />
        </div>
        <div className={styles.content}>
          <div
            className={styles.text}
          >{`Để tiếp tục đăng nhập bạn vui lòng chọn loại tài khoản.`}</div>
          <div className={styles.khoi}>
            <Link href={`https://hungha365.com/dang-nhap-cong-ty.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/Home_fill.png" alt="hungha365.com" />
                <span>Công ty</span>
              </div>
            </Link>
            <Link href={`https://hungha365.com/dang-nhap-nhan-vien.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/User_alt_fill.png" alt="hungha365.com" />
                <span>Nhân viên</span>
              </div>
            </Link>
            <Link href={`https://hungha365.com/dang-nhap-ca-nhan.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/User_circle.png" alt="hungha365.com" />
                <span>Cá nhân</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.dark_overlay}></div>
    </div>
  );
}
