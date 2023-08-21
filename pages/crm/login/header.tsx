import React from "react";
import styles from "../login/header.module.css";
import MenuBar from "./menu-bar";
const HeaderHomePage: React.FC = () => {
  return (
    <div className={`${styles["tasbar"]}`}>
      <div className={`${styles["menu-nav"]}`}>
        <MenuBar />
      </div>
      <a href="https://timviec365.vn/" target="_blank">
        <img src="/crm/logo.png" alt="timviec365.vn" />
      </a>
      <div className={`${styles["menu"]}`}>
        <a href="/crm">Trang Chủ</a>
        <a href="#">Hướng Dẫn</a>
        <a
          href="https://timviec365.vn/blog/c242/quan-ly-quan-he-khach-hang"
          target="_blank"
        >
          Tin Tức
        </a>
        <a target="_blank" href="https://quanlychung.timviec365.vn/">
          Chuyển đổi số
        </a>
        <div className={`${styles["login_create"]}`}>
          <a
            className={`${styles["dk"]}`}
            href="https://quanlychung.timviec365.vn/lua-chon-dang-ky.html"
            target="_blank"
          >
            Đăng ký
          </a>
          <span className={`${styles["center"]}`}>/</span>
          <a
            className={`${styles["dn"]}`}
            id="login"
            href="https://quanlychung.timviec365.vn/lua-chon-dang-nhap.html"
            target="_blank"
          >
            Đăng Nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderHomePage;
