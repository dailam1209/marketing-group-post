import React from "react";
import { Popover, Space } from "antd";
import styles from "../login/header.module.css";

const content = (
  <div id="myMenu-nav" className={`${styles["menu-nav-content"]}`}>
    <a href="/crm" className={`${styles["menu__item"]}`}>
      <img src="/crm/icon-home.png" alt="" />
      <p className={`${styles["text_menu"]}`}>Trang chủ</p>
    </a>
    <a href="#" className={`${styles["menu__item"]}`}>
      <img src="/crm/icon-huongdan.png" alt="" />
      <p className={`${styles["text_menu"]}`}>Hướng dẫn</p>
    </a>
    <a
      target="_blank"
      href="https://timviec365.vn/blog/c242/quan-ly-quan-he-khach-hang"
      className={`${styles["menu__item"]}`}
    >
      <img src="/crm/icon-tintuc.png" alt="" />
      <p className={`${styles["text_menu"]}`}>Tin tức</p>
    </a>
    <a
      target="_blank"
      href="https://quanlychung.timviec365.vn/"
      className={`${styles["menu__item"]}`}
    >
      <img src="/crm/icon-tintuc.png" alt="" />
      <p className={`${styles["text_menu"]}`}>Chuyển đổi số</p>
    </a>
    <a
      href="https://quanlychung.timviec365.vn/lua-chon-dang-nhap.html"
      target="_blank"
      className={`${styles["menu__item"]}`}
    >
      <img src="/crm/icon-login.png" alt="" />
      <p className={`${styles["text_menu"]}`}>Đăng nhập </p>
    </a>
  </div>
);

const App: React.FC = () => (
  <Space wrap>
    <Popover
      placement="bottomLeft"
      content={content}
      trigger="click"
      overlayClassName={styles["custom-popover"]}
    >
      <button className={`${styles["dropbtn"]}`}>
        <img src="/crm/sel.png" alt="icon-menu-nav" />
      </button>
    </Popover>
  </Space>
);

export default App;
