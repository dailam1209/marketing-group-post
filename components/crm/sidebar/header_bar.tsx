import style from "./sidebar.module.css";
import Image from "next/image";
import { useState } from "react";

export default function HeaderBar({ dataHeader, isOpen }: any) {
  return (
    <div className={style.header_bar}>
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
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
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <div className={style.name_staff}>
          {dataHeader?.data?.com_name || ""}
        </div>
        {/* <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p> */}
      </div>
    </div>
  );
}
