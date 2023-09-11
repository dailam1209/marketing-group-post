import React, { useState } from 'react'
import styles from '../../sidebarHomeBefore.module.css'
import Link from 'next/link'
import Cookies from "js-cookie";
import ModalLogin from '@/components/modal/ModalLogin';
export interface SalaryAndBenefits { }

export default function SalaryAndBenefits({ children }: any) {
  const [activeButton, setActiveButton] = useState(null)
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const handleClick = (buttonIndex: number) => {
    // @ts-ignore
    setActiveButton(buttonIndex);
    setOpenModalLogin(true)
  };
  const role = Cookies.get("role");
  const link = "phan-mem-nhan-su"
  const submenu = [
    {
      img: '	/vn_chamcong.svg',
      title: 'Chấm công',
      href: '#',
      target: '',
    },
    {
      img: '	/vn_tinhluong.svg',
      title: 'Tính lương',
      href: '#',
      target: '',
    },
    {
      img: '	/vn_kpi.svg',
      title: 'KPI',
      href: '#',
      target: '',
    },
    {
      img: '	/thanhtich.svg',
      title: 'Khen thưởng',
      href: '#',
      target: '',
    },
    {
      img: '	/vipham.svg',
      title: 'Kỷ luật( Vi phạm )',
      href: '#',
      target: '',
    },
    {
      img: '	/vn_phucloi.svg',
      title: 'Phúc lợi',
      href: '#',
      target: '',
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
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
    </>
  )
}
