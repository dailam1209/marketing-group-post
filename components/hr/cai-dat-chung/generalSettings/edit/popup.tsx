import React, { useEffect, useState } from "react";
import styles from "./popup.module.css";

export default function Popup({ onClosePopup }) {
  const closePopup = () => {
    onClosePopup();
  };
  return (
    <center>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modal} ${styles.modal_setting}`}>
        <div className={`${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} ${styles.contentdel}`}>
            <div className={`${styles.modal_header}`}>
              <button className={styles.close} onClick={closePopup}>
                x
              </button>
              <picture className={styles.img}>
                <img src={`${"/icon_tichxanh.svg"}`}></img>
              </picture>
            </div>

            <div className={`${styles.modal_body} ${styles.l_modal_body}`}>
              <p className={`${styles.l_text_modal_success}`}>
                Bạn đã cập nhật thông tin thành công
              </p>
            </div>

            <div className={`${styles.modal_footer} ${styles.l_modal_footer}`}>
              <button
                type="button"
                className={`${styles.l_btn_logout}`}
                onClick={closePopup}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}
