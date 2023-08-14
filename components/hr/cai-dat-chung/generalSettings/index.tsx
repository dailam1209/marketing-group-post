import React, { useEffect, useState } from "react";
import styles from "./GeneralSettings.module.css";
import { Space } from "antd";
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import CustomCollapse from "@/components/hr/collapse/CustomCollapse";
import PublicInformation from "./publicinformation";
import Edit from "./edit";
import NotificationSetting from "./notification/Notification";
import Remind from "./remind/Remind";
import Decentralization from "./decentralization";

export default function GeneralSettings({ dataCompany, tokenType }) {
  const dataDisplay = dataCompany?.data.data;

  const componentObj2 = {
    city: <PublicInformation dataDisplay={dataDisplay} />,
    edit: (
      <Edit
        dataDisplay={dataDisplay}
        onClickButton={(e) => handleButtonClick(e)}
      />
    ),
  };
  const componentObj = {
    notification: <NotificationSetting />,
    remind: <Remind />,
  };

  const [page, setPage] = useState(1);
  const [currentComponents, setCurrentComponents] = useState<string[]>([]);
  const [component, setComponent] = useState<string>("");

  const handleButtonClick = (e: any) => {
    setComponent("");
    e.stopPropagation();
  };

  const handleClick = (typeCollapse: string) => {
    setCurrentComponents((prev) => {
      if (prev.includes(typeCollapse)) {
        return prev.filter((component) => component !== typeCollapse);
      } else {
        return [...prev, typeCollapse];
      }
    });
  };

  return (
    <>
      <div className={`${styles.tab_content}`}>
        <div className={`${styles.l_content_setting}`}>
          {page === 1 && (
            <>
              {tokenType === 1 ? (
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  onClick={(e) => e.stopPropagation}
                >
                  <div className={`${styles.content}`}>
                    <CustomCollapse
                      label={
                        <>
                          <div
                            className={`${styles.content_1_left}`}
                            onClick={(e) => {
                              // e.stopPropagation()
                              setComponent("city");
                            }}
                          >
                            <p style={{ lineHeight: "36px" }}>
                              THÔNG TIN CÔNG TY
                            </p>
                            <picture
                              style={{ marginTop: "-3px", lineHeight: "36px" }}
                            >
                              <img src={`${"/icon_down.svg"}`} alt=""></img>
                            </picture>
                          </div>
                          <div
                            className={`${styles.content_1_right}`}
                            onClick={(e) => {
                              setComponent("edit");
                            }}
                          >
                            <button>Chỉnh sửa</button>
                          </div>
                        </>
                      }
                    >
                      {componentObj2[component]}
                    </CustomCollapse>
                  </div>
                </Space>
              ) : null}

              {tokenType === 1 ? (
                <div className={`${styles.box}`} style={{ height: "60px" }}>
                  <div
                    className={`${styles.content2}`}
                    onClick={() => setPage(2)}
                  >
                    <div className={`${styles.content_1_left}`}>
                      <p style={{ lineHeight: "36px" }}>Phân quyền người dùng</p>
                      <picture style={{ lineHeight: "56px" }}>
                        <img src={`${"/icon_right.svg"}`} alt=""></img>
                      </picture>
                    </div>
                  </div>
                </div>
              ) : null}

              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: "15px" }}
                onClick={(e) => handleClick("notification")}
              >
                <div className={`${styles.content}`}>
                  <CustomCollapse
                    label={
                      <>
                        <div className={`${styles.content_3_left}`}>
                          <p style={{ lineHeight: "36px" }}>THÔNG BÁO</p>
                          <picture
                            style={{ marginTop: "-3px", lineHeight: "36px" }}
                          >
                            <img src={`${"/icon_down.svg"}`} alt=""></img>
                          </picture>
                        </div>
                      </>
                    }
                  >
                    {currentComponents.includes("notification") &&
                      componentObj.notification}
                  </CustomCollapse>
                </div>
              </Space>

              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: "15px" }}
                onClick={(e) => handleClick("remind")}
              >
                <div className={`${styles.content}`}>
                  <CustomCollapse
                    label={
                      <>
                        <div className={`${styles.content_4_left}`}>
                          <p style={{ lineHeight: "36px" }}>NHẮC NHỞ</p>
                          <picture
                            style={{ marginTop: "-3px", lineHeight: "36px" }}
                          >
                            <img src={`${"/icon_down.svg"}`} alt=""></img>
                          </picture>
                        </div>
                      </>
                    }
                  >
                    {currentComponents.includes("remind") &&
                      componentObj.remind}
                  </CustomCollapse>
                </div>
              </Space>

              <div className={`${styles.box}`} style={{ height: "auto" }}>
                <div
                  className={`${styles.content2}`}
                  style={{ paddingBottom: 10 }}
                >
                  <div className={`${styles.content_1_left}`}>
                    <p style={{ lineHeight: "36px" }}>NGÔN NGỮ</p>
                    <div
                      className={`${styles.button_language}`}
                      style={{ marginTop: 8 }}
                    >
                      <button>Tiếng Việt(VI)</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.box}`} style={{ height: "auto" }}>
                <div
                  className={`${styles.content2}`}
                  style={{ paddingBottom: 10 }}
                >
                  <div className={`${styles.content_1_left}`}>
                    <p style={{ lineHeight: "36px" }}>GIAO DIỆN</p>
                    <div className={`${styles.flex}`}>
                      <div className={`${styles.l_backgroung}`}></div>
                      <div className={`${styles.l_border_left}`}></div>
                      <div className={`${styles.content_1_right}`}>
                        <button style={{ padding: "9px 28px" }}>
                          Mặc định
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {page === 2 && (
            <>
              <div
                className={`${styles.l_quyennguoidung}`}
                style={{ cursor: "default" }}
              >
                <div style={{ display: "flex" }} onClick={() => setPage(1)}>
                  <picture>
                    <img src={`${"/icon_cancel.svg"}`} alt=""></img>
                  </picture>
                  <div>Phân quyền người dùng</div>
                </div>
              </div>
              <Decentralization></Decentralization>
            </>
          )}
        </div>
      </div>
      <BodyFrameFooter src="https://www.youtube.com/embed/tsMJjyUxJFs"></BodyFrameFooter>
    </>
  );
}
