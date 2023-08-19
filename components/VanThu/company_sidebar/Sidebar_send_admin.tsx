"use client";
import React, { useState } from "react";
import { menuData } from "../sidebar/list_document/Array_sub_item";
import { List_document } from "../sidebar/list_document/List_document";
import Sidebar_btn from "../sidebar/sidebar_btn/Sidebar_btn";
import styles from "./Sidebar.module.css";


const Sidebar_admin = () => {
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
            href="https://chamcong.timviec365.vn/quan-ly-cong-ty/phong-ban.html"
            image="sidebar/qlphongban.png"
            title="Quản lý phòng ban"
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
            href="https://chamcong.timviec365.vn/quan-ly-cong-ty/nhan-vien.html"
            image="sidebar/thanhvien.png"
            title="Quản lý nhân viên"
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
            href="/VanThu/quanly-cong-van/thiet-lap-quyen"
            image="sidebar/thietlapquyen.png"
            title="Thiết lập quyền"
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
            href="/VanThu/quanly-cong-van/tuy-chinh"
            image="icon_set_sidebar.png"
            title="Tùy chỉnh"
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
            href="https://quanlychung.timviec365.vn/quan-ly-ung-dung-cong-ty.html"
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

export default Sidebar_admin;
