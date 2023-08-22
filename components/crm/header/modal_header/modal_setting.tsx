import style from "../header.module.css";
import LogoutCRM from "../../logout/index";
import { useState } from "react";
import Link from "next/link";

export default function SettingModal({ dataHeader }) {
  const [showLogout, setShowLogout] = useState(false);

  const show = () => {
    setShowLogout(true);
  };

  const no = () => {
    setShowLogout(false);
  };

  const yes = () => {
    document.cookie =
      "token_base365" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "rf_token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "role" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };
  return (
    <div className={style.setting_open}>
      <div className={style.avatar_staff}>
        <img
          src={
            dataHeader?.data?.avatarUser
              ? dataHeader?.data?.avatarUser
              : "/logo_com (2).png"
          }
          alt=""
        />
        {/* <img
          src="https://chamcong.24hpay.vn/upload/employee/ep931547/app_1688728219772.jpg"
          alt=""
        /> */}
        <div className={style.name_staff}>
          {dataHeader?.data?.com_name || ""}
        </div>
        {/* <p className={style.name_staff}>Tran Quang Duc Dung</p> */}
        {/* <p className={style.chuc_vu}>NHÂN VIÊN THỬ VIỆC </p> */}
      </div>

      <a className={style.selecter}>
        <div className={style.selecter_left}>
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-help.svg"
            alt=""
          />
          <p className={style.text_selecter}>Hướng dẫn sử dụng</p>
        </div>
        <img
          src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg"
          alt=""
        />
      </a>

      <Link
        className={style.selecter}
        href="/quan-ly-thong-tin-tai-khoan-cong-ty.html"
      >
        <div className={style.selecter_left}>
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-infor.svg"
            alt=""
          />
          <p className={style.text_selecter}>Thông tin cá nhân</p>
        </div>
        <img
          src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg"
          alt=""
        />
      </Link>

      <div className={style.selecter} onClick={show} style={{ width: "100%" }}>
        <div
          style={{ justifyContent: "space-between" }}
          className={style.selecter_left}
        >
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-logout.svg"
            alt=""
          />
          <div id={style.logout_acc} className={style.text_selecter}>
            Đăng xuất
          </div>
        </div>
        <img
          src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg"
          alt=""
        />
      </div>
      {showLogout && (
        <LogoutCRM showLogout={showLogout} setShowLogout={setShowLogout} />
      )}
    </div>
  );
}
