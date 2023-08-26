import React, { useState } from 'react'
import styles from './dropDownMenu.module.css'
import Link from 'next/link'
import LogoutHr from '@/components/hr/logout'
import ImageWithFallback from './imgFallBack'

export interface DropDownMenu { }

export default function DropDownMenu({ dataHeader, tokenType }: any) {
  const [logoutClicked, setLogoutClicked] = useState(false)
  const [shouldOpenInNewTab, setShouldOpenInNewTab] = useState(true) // Thêm trạng thái
  const ListMenu = [
    {
      img: '/huongdan.svg',
      text: 'Hướng dẫn',
      href: 'https://phanmemnhansu.timviec365.vn/huong-dan.html',
      icon: '	/iconmenu.svg',
    },
    {
      img: '	/vn_icon_tttk.svg',
      text: 'Thông tin tài khoản',
      href: '/quan-ly-thong-tin-tai-khoan-nhan-vien.html',
      icon: '	/iconmenu.svg',
    },
    {
      img: '	/vn_icon_baoloi.svg',
      text: 'Báo lỗi',
      href: '/bao-loi.html',
      icon: '	/iconmenu.svg',
    },
    {
      img: '	/vn_icon_danhgia.svg',
      text: 'Đánh giá',
      href: '/danh-gia.html',
      icon: '	/iconmenu.svg',
    },
    {
      img: '	/dangxuat.svg',
      text: 'Đăng xuất',
      href: '/',
      icon: '	/iconmenu.svg',
    },
  ]

  const [showLogout, setShowLogout] = useState(false)

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.avatar}`}>
          <ImageWithFallback
            src={dataHeader?.data?.com_logo || dataHeader?.data?.avatarUser}
            fallbackSrc="/logo_com.png"
          />
        </div>
        <div className={`${styles.menu_cpn}`}>{dataHeader?.data.com_name || dataHeader?.data.userName}</div>
        <div className={`${styles.menu_id}`}>
          {tokenType == 1 ? dataHeader?.data.com_id : dataHeader?.data.idQLC}
        </div>
        <div>
          <a
            href={ListMenu[0].href}
            target='_blank'
            style={{ cursor: 'pointer' }}>
            <div className={`${styles.menu}`}>
              <div className={`${styles.menu_icon}`}>
                <img
                  className={`${styles.img_icon}`}
                  src={ListMenu[0].img}
                  alt='icon'
                />
              </div>
              <div className={`${styles.text_menu}`}>{ListMenu[0].text}</div>
              <div className={`${styles.next_icon}`}>
                <img src={ListMenu[0].icon} alt='' />
              </div>
            </div>
          </a>
        </div>
        <div>
          <a
            href={ListMenu[1].href}
            target='_blank'
            style={{ cursor: 'pointer' }}>
            <div className={`${styles.menu}`}>
              <div className={`${styles.menu_icon}`}>
                <img
                  className={`${styles.img_icon}`}
                  src={ListMenu[1].img}
                  alt='icon'
                />
              </div>
              <div className={`${styles.text_menu}`}>{ListMenu[1].text}</div>
              <div className={`${styles.next_icon}`}>
                <img src={ListMenu[1].icon} alt='' />
              </div>
            </div>
          </a>
        </div>
        <div>
          <a
            href={ListMenu[2].href}
            target='_blank'
            style={{ cursor: 'pointer' }}>
            <div className={`${styles.menu}`}>
              <div className={`${styles.menu_icon}`}>
                <img
                  className={`${styles.img_icon}`}
                  src={ListMenu[2].img}
                  alt='icon'
                />
              </div>
              <div className={`${styles.text_menu}`}>{ListMenu[2].text}</div>
              <div className={`${styles.next_icon}`}>
                <img src={ListMenu[2].icon} alt='' />
              </div>
            </div>
          </a>
        </div>
        <div>
          <a
            href={ListMenu[3].href}
            target='_blank'
            style={{ cursor: 'pointer' }}>
            <div className={`${styles.menu}`}>
              <div className={`${styles.menu_icon}`}>
                <img
                  className={`${styles.img_icon}`}
                  src={ListMenu[3].img}
                  alt='icon'
                />
              </div>
              <div className={`${styles.text_menu}`}>{ListMenu[3].text}</div>
              <div className={`${styles.next_icon}`}>
                <img src={ListMenu[3].icon} alt='' />
              </div>
            </div>
          </a>
        </div>
        <div>
          <a onClick={() => setShowLogout(true)} style={{ cursor: 'pointer' }}>
            <div className={`${styles.menu}`}>
              <div className={`${styles.menu_icon}`}>
                <img
                  className={`${styles.img_icon}`}
                  src={ListMenu[4].img}
                  alt='icon'
                />
              </div>
              <div className={`${styles.text_menu}`}>{ListMenu[4].text}</div>
              <div className={`${styles.next_icon}`}>
                <img src={ListMenu[4].icon} alt='' />
              </div>
            </div>
          </a>
        </div>
      </div>
      {showLogout && (
        <LogoutHr showLogout={showLogout} setShowLogout={setShowLogout} />
      )}
    </>
  )
}
