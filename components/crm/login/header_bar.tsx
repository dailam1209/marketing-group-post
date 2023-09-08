import style from "./sidebar.module.css";
import Image from "next/image";

export default function HeaderBar({ dataHeader, isOpen }: any) {
  return (
    <div className={style.header_bar}>
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
        <Image
          width={250}
          height={45}
          sizes="20vw"
          className={style.img_icon}
          src={
            dataHeader?.data?.avatarUser === null
              ? dataHeader?.data?.avatarUser
              : "/crm/hunghalogo.png"
          }
          alt=""
        />
      </div>
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <div className={style.name_staff}>
          {dataHeader?.data?.userName || ""}
        </div>
        {/* <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p> */}
      </div>
    </div>
  );
}
