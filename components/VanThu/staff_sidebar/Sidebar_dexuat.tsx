"use client";
import React, { useState } from "react";
import styles from "./Sidebar_dexuat.module.css";
import Link from "next/link";
import Image from "next/image";
import Sidebar_btn from "../sidebar/sidebar_btn/Sidebar_btn";
import { List_document } from "../sidebar/list_document/List_document";
import { menuData } from "../sidebar/list_document/Array_sub_item";

const Sidebar_dexuat = () => {
  const [active, setActive] = useState(false);
  // const [receivedData, setreceivedData] = useState("");
  const handleReceiveDataFromChild = (data: boolean) => {
    setActive(data);
  };
  return (
    <div className={`${styles.menu}`}>
      <ul>
        <li className={styles.create_dexuat}>
          <Link href="/VanThu/tao-de-xuat">
            <div className={styles.new_create}>
              <Image
                src={"/icon/create_dexuat.png"}
                width={50}
                height={50}
                alt="Create đề xuất"
              />
              <p>Tạo mới đề xuất</p>
            </div>
          </Link>
        </li>
        <li
          onClick={() => {
            setActive(!active);
          }}
        >
          <Sidebar_btn
            sendDataToParent={handleReceiveDataFromChild}
            href="/VanThu/trang-quan-ly-de-xuat/de-xuat"
            image="icon_home.png"
            title="Trang chủ"
            active={active}
          />
        </li>
        <List_document
          menuItems={menuData.slice(2, 3)}
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
            href="/VanThu/trang-quan-ly-de-xuat/de-xuat-lich-lam-viec"
            image="dexuat_llv.png"
            title="Đề xuất lịch làm việc"
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
            href="/VanThu/trang-quan-ly-de-xuat/du-lieu-xoa-gan-day"
            image="delete_dx_time.png"
            title="Dữ liệu đã xóa gần đây"
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

export default Sidebar_dexuat;
