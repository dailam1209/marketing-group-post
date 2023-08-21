import React from "react";
import styles from "../login/header.module.css";
import MenuBar from "./menu-bar";
import Link from "next/link";
const HeaderHomePage: React.FC = () => {
  return (
    <div className={`${styles["tasbar"]}`}>
      <div className={`${styles["menu-nav"]}`}>
        <MenuBar />
      </div>
      <Link href="https://timviec365.vn/" target="_blank">
        <img src="/crm/logo.png" alt="timviec365.vn" />
      </Link>
      <div className={`${styles["menu"]}`}>
        <Link href="/crm">Trang Chủ</Link>
        <Link href="#">Hướng Dẫn</Link>
        <Link href="https://timviec365.vn/blog/c242/quan-ly-quan-he-khach-hang">
          Tin Tức
        </Link>
        <Link href="/">Chuyển đổi số</Link>
        <div className={`${styles["login_create"]}`}>
          <Link className={`${styles["dk"]}`} href="/lua-chon-dang-ky.html">
            Đăng ký
          </Link>
          <span className={`${styles["center"]}`}>/</span>
          <Link
            className={`${styles["dn"]}`}
            id="login"
            href="/lua-chon-dang-nhap.html"
          >
            Đăng Nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderHomePage;
