import styles from "./index.module.css";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";

import HeadNavResCongTy from "../../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";

import { useState } from "react";
import { Tabs, Dropdown } from "antd";
import Cookies from "js-cookie";
import cookieCutter from "cookie-cutter";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

const { TabPane } = Tabs;

import axios from "axios";
import { render } from "react-dom";
import data from "../../../../../components/tinh-luong/components/api/BaseApi";

//todo: Hoi Dung Hoac Anh Long Cai Before After
export default function NgayNghiLe() {
  const role = Cookies.get("role");
  const VanThu_token = Cookies.get("token");

  // console.log(
  //   `Data lấy được từ base API là ${JSON.stringify(
  //     JSON.parse(localStorage.getItem("inforuserlogin"))?.data?.email
  //   )}`
  // );
  console.log("Dữ liệu lấy từ cookie: ", cookieCutter.get("com_id"));
  const items = [
    {
      label: (
        <div className={styles.editleavebtx}>
          <p> Chỉnh sửa</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className={styles.editleavebtx}>
          <p> Nhân viên áp dụng</p>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className={styles.editleavebtx}>
          <p> Xóa</p>
        </div>
      ),
      key: "3",
    },
  ];

  const handleDropDown = () => {
    console.log("Hello");
  };

  const [selected, setSelected] = useState(1);
  const handleSelected = (a) => {
    setSelected(a);
  };

  const a = [1, 2, 3, 4];
  return (
    <div className={styles.idx_ttnv}>
      <HeadNav></HeadNav>
      {/* <HeadNavRes></HeadNavRes> */}
      <HeadNavResCongTy></HeadNavResCongTy>
      <div className={styles.part_tax}>
        <div className={styles.tax_one}>
          <p className={styles.btn_new}>Tạo mới</p>
        </div>
        <div className={styles.tax_tow}>
          <Tabs
            activeTabBarStyle={{ color: "red" }}
            tabBarStyle={{ color: "red" }}
          >
            {a.map((item, index) => (
              <TabPane
                className={styles.customTabStyleBiggerOne}
                tab={<span className={styles.customTabStyle}>Tab {item}</span>}
                key={`${item}`}
              >
                {
                  <div className={styles.tax_three_ct}>
                    {a.map((item, index) => (
                      <div className={styles.tax_items}>
                        <div className={styles.tax_bg}>
                          <div className={styles.tax_top}>
                            <div
                              className={styles.tax_setting}
                              onClick={handleDropDown}
                            >
                              <Dropdown
                                menu={{
                                  items,
                                }}
                                placement="bottomLeft"
                                trigger={["click"]}
                              >
                                <p>
                                  <img src="/Group7508.png" alt="" />
                                </p>
                              </Dropdown>
                            </div>
                            <div className={styles.tax_title}>oo {item}</div>
                          </div>
                        </div>
                        <div className={styles.tax_bottom}>
                          <div className={styles.tax_bottom_1}>
                            <h4>
                              <p>Nghỉ từ ngày</p>
                            </h4>
                            <p>08/07/2023 - 27/07/2023</p>
                          </div>
                          <div className={styles.tax_bottom_2}>
                            <h4>
                              <p>Nghỉ từ ngày</p>
                            </h4>
                            <p>08/07/2023 - 27/07/2023</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
      <div className={styles.youtube_tong}>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/DihcKlS19WQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/D3448E0YSmA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className={styles.youtubes}>
          <iframe
            className={styles.video_hd}
            width="680"
            height="430"
            src="https://www.youtube.com/embed/vvZQdL7ihp0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
