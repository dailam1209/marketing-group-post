import style from "./sidebar.module.css";
import Image from "next/image";

export default function HeaderBar({ isOpen }: any) {
  return (
    <div className={style.header_bar}>
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
        <img
          src="https://chamcong.24hpay.vn/upload/employee/ep931547/app_1688728219772.jpg"
          alt="logo"
          className={style.img_icon}
        />
      </div>
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <p className={style.nav_text}>Tran Quang Duc Dung</p>
        <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p>
      </div>
    </div>
  );
}
