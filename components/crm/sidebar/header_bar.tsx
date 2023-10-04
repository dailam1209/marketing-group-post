import style from "./sidebar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { base_url } from "../service/function";
import Cookies from "js-cookie";

export default function HeaderBar({ dataHeader, isOpen }: any) {
  return (
    <div className={style.header_bar}>
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
        <Image
          width={120}
          height={60}
          className={style.img_icon}
          src={
            dataHeader?.data?.avatarUser === null
              ? dataHeader?.data?.avatarUser
              : "/crm/logo_com.png"
          }
          alt=""
        />
      </div>
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <div className={style.name_staff}>
          {dataHeader?.data?.userName || dataHeader?.data?.com_name || ""}
        </div>
        {/* <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p> */}
      </div>
    </div>
  );
}
