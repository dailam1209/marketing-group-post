import React, { useState } from 'react'
import styles from '../../sidebar.module.css'
import Link from 'next/link'
import Cookies from "js-cookie";

export interface SalaryAndBenefits { }

export default function SalaryAndBenefits({ children }: any) {
  const [activeButton, setActiveButton] = useState(null)
  const handleClick = (buttonIndex: number) => {
    // @ts-ignore
    setActiveButton(buttonIndex);
  };
  const role = Cookies.get("role");
  const link = "phan-mem-nhan-su"
  const submenu = [
    {
      img: '	/vn_chamcong.svg',
      title: 'Chấm công',
      href: 'https://hungha365.com/cham-cong',
      target: 'blank',
    },
    {
      img: '	/vn_tinhluong.svg',
      title: 'Tính lương',
      href: role === "1" ? "/tinh-luong/cong-ty/trang-chu" : "/tinh-luong/quan-ly/nhan-vien",
      target: 'blank',
    },
    {
      img: '	/vn_kpi.svg',
      title: 'KPI',
      href: '#',
      target: 'blank'
    },
    {
      img: '	/thanhtich.svg',
      title: 'Khen thưởng',
      href: `/${link}/luong-thuong-phuc-loi/khen-thuong`,
    },
    {
      img: '	/vipham.svg',
      title: 'Kỷ luật( Vi phạm )',
      href: `/${link}/luong-thuong-phuc-loi/ky-luat`,
    },
    {
      img: '	/vn_phucloi.svg',
      title: 'Phúc lợi',
      href: role === "1" ? "/tinh-luong/cong-ty/trang-chu" : "/tinh-luong/quan-ly/nhan-vien",
      target: 'blank',
    },
  ]

  return (
    <>
      {submenu.map((item, index) => (
        <div key={index}>
          <div className={`${styles.subMenu}`}>
            <Link
              className={` ${activeButton === 1 ? styles.clicked : ''}`}
              onClick={() => handleClick(index)}
              href={item.href}
              target={item.target}>
              <div className={`${styles.sidebar_home}`}>
                <div className={`${styles.button2}`}>
                  <img
                    src={item.img}
                    className={`${styles.img_1}`}
                    alt='Index'
                  />
                </div>
                <div
                  className={`${styles.sidebar_text} ${styles.sidebar_text2} ${activeButton === index ? styles.clicked2 : ''
                    }`}>
                  {item.title}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
