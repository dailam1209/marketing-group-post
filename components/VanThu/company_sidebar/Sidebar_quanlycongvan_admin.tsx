"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Avartar from "../avatar/Avartar";
import { List_document } from "../sidebar/list_document/List_document";
import Sidebar_btn from "../sidebar/sidebar_btn/Sidebar_btn";
import { menuData } from "../sidebar/list_document/Array_sub_item";


const Sidebar_quanlycongvan_admin = () => {
  const [active, setActive] = useState(false);
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
            href="/VanThu/trang-chu-quan-ly-cong-van"
            image="icon_home.png"
            title="Trang chủ"
            active={active}
          />
        </li>

        <List_document
          menuItems={menuData.slice(-2)}
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
            href="/VanThu/trang-chu-quan-ly-cong-van/lich-su-cap-nhat"
            image="lichsu_quanly.png"
            title="Lịch sử cập nhật"
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
            href="/VanThu/trang-chu-quan-ly-cong-van/tra-nhanh-van-ban"
            image="img_qlphongban.png"
            title="Thanh tra văn bản"
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
            href="/VanThu/trang-chu-quan-ly-cong-van/cai-dat-quan-ly-cong-van"
            image="dexuat_setting.png"
            title="Cài đặt"
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
            href="/VanThu/trang-chu-quan-ly-cong-van/du-lieu-da-xoa"
            image="delete_dx_time.png"
            title="Dữ liệu đã xóa"
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
            image="icon_num.png"
            title="Chuyển đổi số"
            active={true}
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar_quanlycongvan_admin;
