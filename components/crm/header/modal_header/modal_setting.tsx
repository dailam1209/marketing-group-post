import style from "../header.module.css";
export default function SettingModal() {
  return (
    <div className={style.setting_open}>
      <div className={style.avatar_staff}>
        <img
          src="https://chamcong.24hpay.vn/upload/employee/ep931547/app_1688728219772.jpg"
          alt=""
        />
        <p className={style.name_staff}>Tran Quang Duc Dung</p>
        <p className={style.chuc_vu}>NHÂN VIÊN THỬ VIỆC </p>
      </div>

      <a className={style.selecter}>
        <div className={style.selecter_left}>
          <img src="https://crm.timviec365.vn/assets/icons/icon-help.svg" alt="" />
          <p className={style.text_selecter}>Hướng dẫn sử dụng</p>
        </div>
        <img src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg" alt="" />
      </a>

      <a
        className={style.selecter}
        target="_blank"
        href="https://quanlychung.timviec365.vn/quan-ly-thong-tin-tai-khoan-cong-ty.html"
      >
        <div className={style.selecter_left}>
          <img src="https://crm.timviec365.vn/assets/icons/icon-infor.svg" alt="" />
          <p className={style.text_selecter}>Thông tin cá nhân</p>
        </div>
        <img src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg" alt="" />
      </a>

      <a className={style.selecter}>
        <div className={style.selecter_left}>
          <img src="https://crm.timviec365.vn/assets/icons/icon-logout.svg" alt="" />
          <p id={style.logout_acc} className={style.text_selecter}>
            Đăng xuất
          </p>
        </div>
        <img src="https://crm.timviec365.vn/assets/icons/icon-arrow-right.svg" alt="" />
      </a>
    </div>
  );
}
