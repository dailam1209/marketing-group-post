/** @format */

/** @format */

import React, { useState } from 'react'
import styles from './SidebarQLC.module.scss'
export default function SidebarQLC({ narrow, setNarrow, openSB }) {
  return (
    <div
      className={
        narrow ? `${styles.sidebar} ${styles.sb_narrow}` : styles.sidebar
      }>
      <div
        className={styles.btn_narrow_extend}
        onClick={() => setNarrow(!narrow)}>
        <img
          src={narrow ? '../img/arrow_right.png' : '../img/arrow-up.png'}
          alt=''
        />
      </div>
      <div className={styles.logo}>
        <img
          src={narrow ? '../img/sb_logo.png' : '../img/logo_hh.png'}
          alt=''
          className={styles.img_logo}
        />
      </div>
      <div className={styles.list}>
        <div className={styles.title}>
          <img src='../img/sb_title.png' alt='' className={styles.img_item} />
          {!narrow && <span className={styles.text}>Ứng dụng </span>}
        </div>
        <div className={`${styles.item} ${styles.item_register}`}>
          <div className={styles.item_img_text}>
            <img
              src='../User_add_light.png'
              alt=''
              className={styles.img_item}
            />
            <span className={styles.text}>Đăng ký</span>
          </div>
        </div>
        <div className={`${styles.item} ${styles.item_login}`}>
          <div className={styles.item_img_text}>
            <img
              src='../User_cicrle_light.png'
              alt=''
              className={styles.img_item}
            />
            <span className={styles.text}>Đăng nhập</span>
          </div>
        </div>
        <div className={`${styles.item} ${styles.item_app}`}>
          <div className={styles.item_img_text}>
            <img src='../app.png' alt='' className={styles.img_item} />
            <span className={styles.text}>Ứng dụng</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_1.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Lịch làm việc/ca làm việc </span>
            )}
          </div>
          {!narrow && (
            <div className={styles.icon_down}>
              <img src='../img/down.png' alt='' />
            </div>
          )}
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_2.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Nhân lịch làm việc </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_3.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Thiết lập công ty </span>}
          </div>
          {!narrow && (
            <div className={styles.icon_down}>
              <img src='../img/down.png' alt='' />
            </div>
          )}
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_4.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Cài đặt vị trí và wifi</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_5.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Chế độ phê duyệt chấm công</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_6.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Cài đặt lương cơ bản</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_7.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Giới hạn IP</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_8.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Quyền truy cập phần mềm</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_9.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Đổi loại tài khoản</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_10.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>
                Thêm người dùng vào phần quản trị hệ thống
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_11.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Thêm dự án</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_12.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>
                Tách dòng chấm công của nhân sự
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_13.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Hệ số làm tròn</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_14.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Ứng trước ngày công</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_15.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Chốt đơn từ</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_16.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>
                Ngày chốt tự động công sau kỳ công
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_17.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Cài hàm tính lương</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_18.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>
                Thời gian duyệt đề xuất của lãnh đạo
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_19.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>
                Cài đặt ngày bắt đầu nhận lương cho nhân viên
              </span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_20.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Quản lý phòng ban</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_21.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Quản lý nhân viên</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_22.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Quản lý công ty con</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_23.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Sơ đồ cơ cấu tổ chức</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_24.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && (
              <span className={styles.text}>Thông tin tài khoản</span>
            )}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item_img_text}>
            <img
              src='../img/sb_item_25.png'
              alt=''
              className={styles.img_item}
            />
            {!narrow && <span className={styles.text}>Báo lỗi</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
