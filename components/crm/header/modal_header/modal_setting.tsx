import style from "../header.module.css";
import LogoutCRM from "../../logout/index";
import { useState } from "react";

export default function SettingModal({ dataHeader }) {
  const [showLogout, setShowLogout] = useState(false);
  
  return (
    <div className={style.setting_open}>
      <div className={style.avatar_staff}>
      <img src={dataHeader?.data?.avatarUser ? dataHeader?.data?.avatarUser : "/logo_com (2).png"} alt="" />
        {/* <img
          src="https://chamcong.24hpay.vn/upload/employee/ep931547/app_1688728219772.jpg"
          alt=""
        /> */}
             <div className={style.name_staff}>{dataHeader?.data?.userName || ''}</div>
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

      <a
        className={style.selecter}
        target="_blank"
        href="https://quanlychung.timviec365.vn/quan-ly-thong-tin-tai-khoan-cong-ty.html"
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
      </a>
      <div
        style={{ justifyContent: "space-between" }}
        className={style.selecter}
      >
        <button
          className={style.selecter_left}
          onClick={() => setShowLogout(true)}
        >
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-logout.svg"
            alt=""
          />
          <p id={style.logout_acc} className={style.text_selecter}>
            {showLogout && (
              <LogoutCRM
                showLogout={showLogout}
                setShowLogout={setShowLogout}
              />
            )}
            Đăng xuất
          </p>
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
