import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { number } from "prop-types";
import Link from "next/link";
import RecruitmentManager from "./subMenu/recruitmentManager/recruitmentManager";
import SalaryAndBenefits from "./subMenu/salaryAndBenefits/salaryAndBenefits";
import Administration from "./subMenu/administration/administration";
import DevelopmentTraining from "./subMenu/developmentTraining/developmenttraining";


export interface SideBarProp { }

export default function Sidebar(props: SideBarProp) {
  const [activeButton, setActiveButton] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [subMenuShown, setSubMenuShown] = useState(null);

  const handleClick = (buttonIndex: number) => {
    if (subMenuShown === buttonIndex) {
      setShowSubMenu(!showSubMenu);
    } else {
      setShowSubMenu(true);
    }
    // @ts-ignore
    setActiveButton(buttonIndex);
    // @ts-ignore
    setSubMenuShown(buttonIndex);
  };
  const sidebarItems = [
    {
      label: "Trang chủ",
      icon: "/home.svg",
      href: '/phan-mem-nhan-su/quan-ly-chung',
      submenu: null,
      imgWithd: 20,
      imgheight: 17,
      target: ''

    },
    {
      label: "Quản lý tuyển dụng",
      icon: "/tuyendung.svg",
      href: '#',
      submenu: <RecruitmentManager />,
      imgWithd: 20,
      imgheight: 18,
      target: ''
    },
    {
      label: "Lương thưởng và phúc lợi",
      icon: "/thanhtich_vipham.svg",
      href: '#',
      submenu: <SalaryAndBenefits />,
      imgWithd: 20,
      imgheight: 20,
      target: ''
    },
    {
      label: "Quản lý hành chính",
      icon: "	/vn-hanhchinh.svg",
      href: '#',
      submenu: <Administration />,
      imgWithd: 20,
      imgheight: 18,
      target: ''
    },
    {
      label: "Đào tạo phát triển",
      icon: "	/vn_daotao.svg",
      href: '#',
      submenu: < DevelopmentTraining />,
      imgWithd: 21,
      imgheight: 21,
      target: ''
    },
    {
      label: "Sơ đồ tổ chức",
      icon: "/vn_sodotochuc.svg",
      href: '/phan-mem-nhan-su/co-cau-to-chuc',
      submenu: '',
      imgWithd: 20,
      imgheight: 20,
      target: ''
    },
    {
      label: "Báo cáo nhân sự",
      icon: "		/baocao_ns.svg",
      href: '/phan-mem-nhan-su/bao-cao-nhan-su',
      submenu: '',
      imgWithd: 18,
      imgheight: 18,
      target: ''
    },
    {
      label: "Cài đặt",
      icon: "		/vn_icon_setting.svg",
      href: '/phan-mem-nhan-su/cai-dat-chung',
      submenu: '',
      imgWithd: 20,
      imgheight: 20,
      target: ''
    },
    {
      label: "Dữ liệu gần đây đã xóa",
      icon: "		/daxoa.svg",
      href: '/phan-mem-nhan-su/du-lieu-da-xoa',
      submenu: '',
      imgWithd: 14,
      imgheight: 18,
      target: ''
    },
    {
      label: "Chuyển đổi số",
      icon: "/vn_chuyendoiso.svg",
      href: 'https://hungha365.com/',
      submenu: '',
      imgWithd: 20,
      imgheight: 20,
      target: 'blank'
    },
  ];

  return (
    <>
      <div className={`${styles.sidebar_wrapper}`}>
        <div className={`${styles.logo}`}>
          <a target="_blank" href="https://timviec365.vn/">
            <img
              src={`/logo.svg`}
              alt="icon"
            />
          </a>
        </div>
        <div className={`${styles.sidebar_item}`}>
          {sidebarItems.map((item, index) => (
            <div key={index} >
              <Link
                key={index}
                onClick={() => handleClick(index)}
                href={item.href}
                replace={true}
                target={item.target}
              >
                <div className={`${styles.sidebar_home} `}>
                  <div className={`${styles.button1}`}>
                    <img style={{ width: item.imgWithd, height: item.imgheight }} src={item.icon} className={`${styles.img_1}`} alt="Index" />
                  </div>
                  <div className={`${styles.sidebar_text} ${styles.sidebar_text1} ${activeButton === index ? styles.clicked : ""}`}>{item.label}</div>
                </div>
              </Link>
              {showSubMenu && activeButton === index && item.submenu}
            </div>
          ))}
        </div>
        <div className={`${styles.footer_sidebar} ${styles.sidebar_item}`}>
          <div className={`${styles.sidebar_home_img}`}>

          </div>
        </div>
      </div>
    </>
  );
}
