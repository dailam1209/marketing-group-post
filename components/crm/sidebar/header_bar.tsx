import style from "./sidebar.module.css";
import Image from "next/image";
import { useState } from "react";

export default function HeaderBar({dataHeader}) {
  return (
    <div className={style.header_bar}>
      <div className={style.header_icon}>
        <img
          className={style.img_icon}
          src={
            dataHeader?.data?.avatarUser
              ? dataHeader?.data?.avatarUser
              : "/logo_com (2).png"
          }
          alt=""
        />
      </div>
      <div className={style.header_info}>
      <div className={style.name_staff}>{dataHeader?.data?.userName || ''}</div>
        {/* <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p> */}
      </div>
    </div>
  );
}
