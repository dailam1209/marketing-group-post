import React, { useState } from "react";
import styles from "../../sidebar.module.css";
import Link from "next/link";

export interface SalaryAndBenefits { }

export default function SalaryAndBenefits({ children }: any) {
  const [activeButton, setActiveButton] = useState(null);
  const handleClick = (buttonIndex: number) => {
    // @ts-ignore
    setActiveButton(buttonIndex);
  };

  const submenu = [
    {
      img: "	/vn_chamcong.svg",
      title: 'Chấm công',
      href: 'https://chamcong.timviec365.vn/quan-ly-cong-ty.html',
      target: 'blank'
    },
    {
      img: "	/vn_tinhluong.svg",
      title: 'Tính lương',
      href: 'https://tinhluong.timviec365.vn/',
      target: 'blank'
    },
    {
      img: "	/vn_kpi.svg",
      title: 'KPI',
      href: 'https://kpi.timviec365.vn/quan-ly-chung.html',
      target: 'blank'
    },
    {
      img: "	/thanhtich.svg",
      title: 'Khen thưởng',
      href: '/luong-thuong-phuc-loi/khen-thuong',
    },
    {
      img: "	/vipham.svg",
      title: 'Kỷ luật( Vi phạm )',
      href: '/hr/pages/luong-thuong-phuc-loi/ky-luat',
    },
    {
      img: "	/vn_phucloi.svg",
      title: 'Phúc lợi',
      href: 'https://tinhluong.timviec365.vn/quan-ly-phuc-loi.html',
      target: 'blank'
    },
  ]

  return (
    <>
      {submenu.map((item, index) => (
        <div key={index}>
          <div className={`${styles.subMenu}`}>
            <Link
              className={` ${activeButton === 1 ? styles.clicked : ""}`}
              onClick={() => handleClick(index)}
              href={item.href}
              target={item.target}
            >
              <div className={`${styles.sidebar_home}`}>
                <div className={`${styles.button2}`}>
                  <img
                    src={
                      item.img
                    }
                    className={`${styles.img_1}`}
                    alt="Index"
                  />
                </div>
                <div className={`${styles.sidebar_text} ${styles.sidebar_text2} ${activeButton === index ? styles.clicked2 : ""}`}>{item.title}</div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>


  )
}
