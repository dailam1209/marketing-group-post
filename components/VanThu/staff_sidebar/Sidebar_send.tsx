"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Sidebar_btn from "../sidebar/sidebar_btn/Sidebar_btn";
import { List_document } from "../sidebar/list_document/List_document";
import { menuData } from "../sidebar/list_document/Array_sub_item";

const Sidebar = () => {
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
            href="/VanThu/"
            image="icon_home.png"
            title="Trang chủ"
            active={active}
          />
        </li>
        <List_document
          menuItems={menuData.slice(0, 2)}
          sendDataToParent={handleReceiveDataFromChild}
          activeAcc={active}
        />
        <li
          onClick={() => {
            setActive(true);
          }}
        >
          <Sidebar_btn
            sendDataToParent={handleReceiveDataFromChild}
            href="https://quanlychung.timviec365.vn/quan-ly-ung-dung-nhan-vien.html"
            image="icon_set_sidebar.png"
            title="Cài đặt chung"
            active={true}
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

export default Sidebar;
