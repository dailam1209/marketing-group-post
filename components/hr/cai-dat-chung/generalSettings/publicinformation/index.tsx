import React, { useEffect, useState } from "react";
import styles from "./PublicInformation.module.css";

export default function PublicInformation({dataDisplay}) {
  console.log(dataDisplay)

  return (
    <>
      <div className={`${styles.l_thongtincongty}`}>
        <div className={`${styles.l_thongtincongty_item}`}>
          <div className={`${styles.l_thongtincongty_text}`}>
            <p>{ dataDisplay?.com_name}</p>
          </div>

          <div className={`${styles.l_thongtincongty_text}`}>
            <p>Điện thoại: {dataDisplay?.com_phone}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.l_thongtincongty}`}>
        <div className={`${styles.l_thongtincongty_item}`}>
          <div className={`${styles.l_thongtincongty_text}`}>
            <p>Lĩnh vực hoạt động: {dataDisplay?.com_description} </p>
          </div>

          <div className={`${styles.l_thongtincongty_text}`}>
            <p>Quy mô nhân sự: {dataDisplay?.com_size}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.l_thongtincongty}`}>
        <div className={`${styles.l_thongtincongty_item}`}>
          <div className={`${styles.l_thongtincongty_text}`}>
            <p>Địa chỉ liên lạc: {dataDisplay?.com_address} </p>
          </div>

          <div className={`${styles.l_thongtincongty_text}`}>
            <p>Email: {dataDisplay?.com_email} </p>
          </div>
        </div>
      </div>
    </>
  );
}
