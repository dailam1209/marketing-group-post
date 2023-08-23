import React from "react";
import styles1 from "./Footer.module.css";
import Image from "next/image";
import { COLOR_WHITE } from "../constants/style-constants";
import { LIST_KEYWORDS, LIST_MENU, LIST_MXH } from "./constants";
import { Col, ListProps, Row } from "antd";
import { url } from "inspector";
import Phone from "../../public/phone.png";
export interface FooterProp {}

function DownloadButton() {
  return <div></div>;
}

export default function Footer(props: FooterProp) {
  const downloadButton = (txt: string) => (
    <button className={styles1.btnDownload}>
      <Image
        alt="/"
        src={"/tinhluong/download.png"}
        width={20}
        height={20}
        style={{}}
      />
      <p
        style={{
          color: "#474747",
          fontSize: "14px",
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
        }}
      >
        {txt}
      </p>
    </button>
  );

  interface ListProps {
    name: string;
    message: string;
  }

  const List: React.FC<ListProps> = ({ name, message }) => {
    return <li className={styles1[name]}>{message}</li>;
  };

  return (
    <div className={styles1.footer}>
      <div className={styles1.vieclam_container}>
        <div className={styles1.footer_left}>
          <ul className={styles1.foot_hid}>
            <li className={styles1.non_display}>
              <span style={{ fontSize: "14px" }}>Đơn vị chủ quản</span>
              <br />
              <p style={{ fontSize: "22px" }}>
                Công ty cổ phần thanh toán Hưng Hà{" "}
              </p>
            </li>
            <div className={styles1.foot_show_hid}>
              <div className={styles1.flex}>
                <div>
                  <Image
                    alt="/"
                    src={"/tinhluong/Building.png"}
                    width={30}
                    height={30}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div>
                  <li
                    className={styles1.non_display}
                    style={{ padding: "5px 0px 5px 0px" }}
                  >
                    <a>
                      VP1: Tầng 4, B50,Lô 6,KĐT Định Công - Hoàng Mai - Hà Nội{" "}
                    </a>
                  </li>
                  <li className={styles1.list} style={{ paddingLeft: "0px" }}>
                    VP2: Thôn Thanh Miếu,Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng
                    Yên
                  </li>

                  <li
                    className={styles1.list}
                    style={{ paddingLeft: "0px", paddingBottom: "5px" }}
                  >
                    VP3: Tầng 2,Số 1 đường Trần Nguyên Đán,Khu Đô Thị Định Công,
                    Hoàng Mai, Hà Nội
                  </li>
                </div>
              </div>

              <div className={styles1.flex}>
                <div>
                  <Image
                    alt="/"
                    src={"/tinhluong/Hotline.png"}
                    width={30}
                    height={30}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div>
                  <li
                    className={styles1.non_display2}
                    style={{ padding: "5px 0 5px 0px" }}
                  >
                    <span>Hotline: 0982.079.209</span>
                  </li>
                </div>
              </div>

              <div className={styles1.flex}>
                <div>
                  <Image
                    alt="/"
                    src={"/tinhluong/Email.png"}
                    width={30}
                    height={30}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div>
                  <li
                    className={styles1.non_display3}
                    style={{ padding: "7px 0 5px 0px" }}
                  >
                    <span>Email hỗ trợ: timviec365.vn@gmail.com</span>
                  </li>
                </div>
              </div>
            </div>
          </ul>
          <ul className={styles1.foot_show}>
            <li className={styles1.list}>
              <a>Giới thiệu chung</a>
            </li>
            <li className={styles1.list}>
              <a>Thông tin cần biết</a>
            </li>
            <li className={styles1.list}>
              <a>Thỏa thuận sử dụng</a>
            </li>
            <li className={styles1.list}>
              <a>Sơ đồ website</a>
            </li>
          </ul>
          <ul className={styles1.foot_show_right}>
            <li className={styles1.list}>
              <a>Quy định bảo mật</a>
            </li>
            <li className={styles1.list}>
              <a>Quy định giải quyết tranh chấp</a>
            </li>
            <li className={styles1.dcma_icon}>
              <p className={styles1.btc_icon}>
                <a className={styles1.abc}></a>
                <a className={styles1.abc}></a>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles1.footer_right}>
          <div className={styles1.footer_right_left}>
            <div className={styles1.footer_right_left_top}>
              <p>Tải app để tìm việc làm siêu tốc</p>
              <p>Tạo CV đẹp với 365+ mẫu CV xin việc</p>
            </div>
            <div className={styles1.footer_right_left_bot_1}>
              <div className={styles1.footer_right_left_bot_1_img1}>
                <img src="/tinhluong/qr1.png" width="100px" height="100px" />
                <p> App CV365</p>
              </div>
              <div className={styles1.footer_right_left_bot_1_img1}>
                <img src="/tinhluong/qr2.png" width="100px" height="100px" />
                <p> App Timviec365 NTD</p>
              </div>
              <div className={styles1.footer_right_left_bot_1_img1}>
                <img src="/tinhluong/qr3.png" width="100px" height="100px" />
                <p> App Timviec365 UV</p>
              </div>
            </div>
            <div className={styles1.footer_right_left_bot_2}>
              <div className={styles1.listBtns}>
                {downloadButton("Tải app Timviec365 UV")}
                {downloadButton("Tải app Timviec365 NTD")}
                {downloadButton("Tải app CV365")}
              </div>
            </div>
            <div className={styles1.footer_right_left_bot_3}></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles1.footer_right_right}>
            <img src="/tinhluong/phone.png" width="163px" height="280px" />
          </div>
        </div>
        <div className={styles1.foot_bot}>
          <div className={styles1.bot_from}>
            <p className={styles1.bot_from_p} style={{ marginRight: "5px" }}>
              Top ngành nghề:{" "}
            </p>
            <ul className={styles1.bot_from_ul}>
              {LIST_KEYWORDS.map((item, index) => (
                <li key={index} className={styles1.bot_from_li}>
                  <a>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles1.link_mxh}>
          <p className={styles1.link_mxh_p}>
            Hãy theo dõi chúng tôi qua mạng xã hội
          </p>
          {LIST_MXH.map((item, index) => (
            <div key={index} className={styles1.mxh}>
              <a style={{ textDecoration: "unset" }}>
                <Image
                  key={index}
                  alt="/"
                  src={`/tinhluong${item}`}
                  width={30}
                  height={30}
                  style={{ marginLeft: "10px", objectFit: "cover" }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
