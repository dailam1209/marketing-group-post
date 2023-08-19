"use client";
import React, { useState } from "react";
import styles from "./Sidebar_dexuat.module.css";
import Link from "next/link";
import Image from "next/image";
interface ItemChoose {
  id: number;
  href: string;
  image: string;
  title: string;
}

const listMenu: ItemChoose[] = [
  {
    id: 1,
    href: "/VanThu/trang-quan-ly-de-xuat/de-xuat",
    image: "icon_home.png",
    title: "Trang chủ",
  },
  {
    id: 2,
    href: "/VanThu/trang-quan-ly-de-xuat/ql-mau-de-xuat",
    image: "sidebar/quanly.png",
    title: "Quản lý mẫu đề xuất",
  },
  {
    id: 3,
    href: "/VanThu/trang-quan-ly-de-xuat/danh-sach-de-xuat",
    image: "sidebar/dexuat_me.png",
    title: "Danh sách đề xuất",
  },
  {
    id: 4,
    href: "/VanThu/trang-quan-ly-de-xuat/ds-de-xuat-nghi-phep",
    image: "sidebar/dexuat_me.png",
    title: "TK nghỉ - không LLV",
  },
  {
    id: 5,
    href: "/VanThu/trang-quan-ly-de-xuat/thong-ke-de-xuat-np",
    image: "sidebar/dexuat_me.png",
    title: "Thống kê nghỉ phép",
  },
  {
    id: 6,
    href: "/VanThu/trang-quan-ly-de-xuat/thanh-vien-de-xuat",
    image: "sidebar/thanhvien.png",
    title: "Thành viên",
  },
  {
    id: 7,
    href: "/VanThu/trang-quan-ly-de-xuat/cai-dat-de-xuat",
    image: "sidebar/thanhvien.png",
    title: "Cài đặt",
  },
  {
    id: 8,
    href: "/VanThu/trang-quan-ly-de-xuat/da-xoa-gan-day",
    image: "delete_dx_time.png",
    title: "Dữ liệu đã xóa gần đây",
  },
  {
    id: 9,
    href: "https://quanlychung.timviec365.vn/quan-ly-ung-dung-cong-ty.htmlt",
    image: "sidebar/thanhvien.png",
    title: "Cài đặt chung",
  },
  {
    id: 10,
    href: "https://quanlychung.timviec365.vn/quan-ly-ung-dung-cong-ty.html",
    image: "icon_num.png",
    title: "Chuyển đổi số",
  },
];
const Sidebar_dexuat_admin = () => {
  const [active, setActive] = useState(0);
  const listMenuSidebar = listMenu.map((item, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          setActive(item.id);
        }}
      >
        <Link
          className={`${styles.link_sidebar} ${
            active !== item.id ? "" : styles.active
          }`}
          href={item.href}
        >
          <Image
            src={`/icon/${item.image}`}
            width={50}
            height={50}
            alt={item.title}
          />
          <p className={`${styles.title}`}>{item.title}</p>
        </Link>
      </li>
    );
  });
  return (
    <div className={`${styles.menu}`}>
      <ul>{listMenuSidebar}</ul>
    </div>
  );
};

export default Sidebar_dexuat_admin;
