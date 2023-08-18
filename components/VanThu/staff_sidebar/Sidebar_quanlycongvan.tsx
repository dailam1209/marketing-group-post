"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Sidebar_btn from "../sidebar/sidebar_btn/Sidebar_btn";
const Sidebar_quanlycongvan = () => {
  const [active, setActive] = useState(false);
  // const [receivedData, setreceivedData] = useState("");
  const handleReceiveDataFromChild = (data: boolean) => {
    setActive(data);
  };
  return (
    <div className={`${styles.menu}`}>
      <ul>
        <li
          onClick={() => {
            setActive(!active);
          }}
        >
          <Sidebar_btn
            sendDataToParent={handleReceiveDataFromChild}
            href="/VanThu/quanly-cong-van"
            image="icon_home.png"
            title="Trang chủ"
            active={active}
          />
        </li>
        <li
          onClick={() => {
            setActive(true);
          }}
        >
          <Sidebar_btn
            sendDataToParent={handleReceiveDataFromChild}
            href="https://quanlychung.timviec365.vn/quan-ly-ung-dung-nhan-vien.html"
            image="icon_num.png"
            title="Chuyển đổi số"
            active={true}
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar_quanlycongvan;
