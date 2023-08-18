"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./general_header.module.css";
import Avartar from "@/components/VanThu/avatar/Avartar";
import Btn_header from "./icon-header/Btn_header";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/actions/actions";
import { useRouter } from "next/router";
import Profile_infor from "./profile_infor/Profile_infor";
import { fetchData } from "@/utils/BaseApi";
import { fetch_infor_account } from "@/utils/ShareApi";

interface ItemLink {
  id: string;
  href: string;
  title?: string;
}

const List_link: ItemLink[] = [
  {
    id: "1",
    href: "/VanThu/trang-chu-quan-ly-cong-van",
    title: "Quản lý công văn",
  },
  {
    id: "2",
    href: "/VanThu/quanly-cong-van",
    title: "Gửi và nhận công văn",
  },
  {
    id: "3",
    href: "/VanThu/trang-quan-ly-de-xuat/de-xuat",
    title: "Đề xuất",
  },
];
const General_header = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("2");
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = sessionStorage.getItem("link");
    if (storedData) {
      setActiveLink(storedData);
    }
  }, []);
  const [dataHome, setDataHome] = useState<any>(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const fetchGetDataStaff = async () => {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/guiNhanCongVan/home/getTotalVanBan"
          );
          setDataHome(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      };
      fetchGetDataStaff();
    }
  }, []);
  const listLink = List_link.map((item, index) => {
    return (
      <li
        key={index}
        style={{
          borderBottom: activeLink === item.id ? "3px solid #4c5bd4" : "",
          marginRight: item.id === "3" ? "20px" : "",
        }}
        onClick={() => {
          if (activeLink !== item.id) {
            setActiveLink(item.id);
          }
          if (typeof window !== "undefined") {
            sessionStorage.setItem("link", item.id);
          }
        }}
      >
        <Link href={item.href}>{item.title}</Link>
      </li>
    );
  });

  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  const handleComponentClick = (id: number) => {
    if (activeComponent === id) {
      setActiveComponent(null);
    } else {
      setActiveComponent(id);
    }
  };
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // xử lý phần hiện thị thông tin
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };
  const [info, setInfo] = useState<any>();
  useEffect(() => {
    try{
      setInfo(fetch_infor_account());
    }catch(e){
      console.log(e);
    }
  },[]);
  return (
    <div className={`${styles.header_content}`}>
      {/* None */}
      <div
        className={styles.open_sidebar}
        id="open_sidebar"
        onClick={handleToggleSidebar}
      >
        <Image
          src={"/icon/open_sidebar.png"}
          width={50}
          height={50}
          alt="Avatar"
        />
      </div>
      {/* >=1024px */}
      <div className={`${styles.header}`}>
        <ul>
          {listLink}
          <Btn_header
            image="/icon/icon_mesage.png"
            content="Tin nhắn"
            num_noti={10}
            id={1}
            isActive={activeComponent === 1}
            onClick={handleComponentClick}
          />
          <Btn_header
            image="/icon/icon_warning.png"
            content="Nhắc nhở"
            id={2}
            isActive={activeComponent === 2}
            onClick={handleComponentClick}
          />
          <Btn_header
            image="/icon/icon_notifi.png"
            content="Thông báo"
            id={3}
            isActive={activeComponent === 3}
            onClick={handleComponentClick}
          />
          <button className={`${styles.profile}`} onClick={handleOpenModal}>
            <a href="#" className={`${styles.a_profile}`}>
              <Avartar />
            </a>
            {/* {storedData === "user" ? ( */}
            <Profile_infor
              isOpen={modalOpen}
              fullname={info?.userName}
              id_staff={info?._id}
              img="/avatar.jpg"
              job={info?.type == 1 ? "Quản lý" : "Nhân viên"}
            />
            {/* ) : (
              <Profile_infor
                isOpen={modalOpen}
                fullname="Công ty Cổ phần Thanh toán Hưng Hà 2"
                id_staff="1213"
                img="/avata_company.jpg"
                job="Quản lý"
              />
            )} */}
          </button>
        </ul>
      </div>
      <div className={styles.sub_menu}>
        <Link className={styles.a_sub_menu} href="/VanThu/trang-chu-quan-ly-cong-van">
          Quản lý công văn
        </Link>
        <Link className={styles.a_sub_menu} href="/VanThu/quanly-cong-van">
          Gửi và nhận công văn{" "}
        </Link>
        <Link
          className={styles.a_sub_menu}
          href="/VanThu/trang-quan-ly-de-xuat/de-xuat"
        >
          Đề xuất
        </Link>
      </div>
    </div>
  );
};

export default General_header;
