import styles from "./setting.module.css";
import Image from "next/image";
import { BiSkipNext } from "react-icons/bi";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const index = () => {
  return (
    <div className={styles.app}>
      <div className={styles.scrollMobile}>
        <div className={styles.header}>
          <Link href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh" style={{ color: "black" }}>
            Sổ văn bản
          </Link>
          <Link
            href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh/bo-phan-phong-ban"
            style={{ color: "black" }}
          >
            Bộ phận phòng ban
          </Link>
          <Link
            href="/van-thu-luu-tru/quanly-cong-van/tuy-chinh/cai-dat-chung"
            style={{ color: "4c5bd4" }}
          >
            Cài đặt chung
          </Link>
        </div>
      </div>

      <div className={styles.scrollMobile}>
        <div className={styles.content_table}>
          <div className={styles.content_header}>
            <p>Cài đặt chung</p>
          </div>
          <div className={styles.content}>
            <div className={styles.body_content}>
              <p>Ngôn ngữ:</p>
              <div className={styles.content_setting}>
                <input type="checkbox" />
                <p>Tiếng Việt (Vietnamese)</p>
                <Image
                  src={"/icon/VN_icon.png"}
                  width={20}
                  height={20}
                  alt="Avatar"
                />
              </div>
              <div className={styles.content_setting}>
                <input type="checkbox" />
                <p>Tiếng Anh (English)</p>
                <Image
                  src={"/icon/england_icon.png"}
                  width={20}
                  height={20}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className={styles.body_content}>
              <p>Giao diện:</p>
              <div
                className={styles.content_setting}
                style={{ display: "block", color: "#4c5bd4" }}
              >
                <p>Mặc định</p>
              </div>
              <div
                className={styles.content_setting}
                style={{
                  color: "#4c5bd4",
                  justifyContent: "flex-start",
                  padding: "0 12px",
                }}
              >
                <p>Tùy chỉnh</p>
                <Image
                  src={"/icon/Up_text.png"}
                  width={14}
                  height={14}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className={styles.body_content}>
              <p style={{ width: "100px" }}>Thông báo:</p>
              <div className={styles.tag}>
                <div className={styles.div_tag}>
                  <p>Văn bản đến</p>
                  <Image
                    src={"/icon/X-den.png"}
                    width={10}
                    height={10}
                    alt="Avatar"
                  />
                </div>
                <div className={styles.div_tag}>
                  <p>văn bản chỉnh sửa</p>
                  <Image
                    src={"/icon/X-den.png"}
                    width={10}
                    height={10}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div
                className={styles.content_setting}
                style={{ color: "#4c5bd4", justifyContent: "flex-start" }}
              >
                <p>Tùy chỉnh</p>
                <Image
                  src={"/icon/Up_text.png"}
                  width={14}
                  height={14}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className={styles.body_content}>
              <p style={{ width: "100px" }}>Nhắc nhở:</p>
              <div className={styles.tag}>
                <div className={styles.div_tag}>
                  <p>Văn bản đến</p>
                  <Image
                    src={"/icon/X-den.png"}
                    width={10}
                    height={10}
                    alt="Avatar"
                  />
                </div>
                <div className={styles.div_tag}>
                  <p>văn bản chỉnh sửa</p>
                  <Image
                    src={"/icon/X-den.png"}
                    width={10}
                    height={10}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div
                className={styles.content_setting}
                style={{ color: "#4c5bd4", justifyContent: "flex-start" }}
              >
                <p>Tùy chỉnh</p>
                <Image
                  src={"/icon/Up_text.png"}
                  width={14}
                  height={14}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className={styles.footer}>
              <p>Văn bản khẩn cấp</p>
              <div className={styles.footer_content}>
                <p>Thời gian phê duyệt</p>
                <input type="text" placeholder="Nhập thời gian / Giờ" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
