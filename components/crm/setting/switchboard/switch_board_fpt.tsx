import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SwitchFooter from "./switch_board_footer";

const SwitchFPTTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Cài đặt/ Tổng đài/ FPT");
    setShowBackButton(true);
    setCurrentPath("/crm/setting/switch_board");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <div className="main_form">
          <div className={style.main__title}>FPT</div>
          <div className={style.main__body}>
            <div className="main__body_item">
              <p className={style.main__body__type}>Cấu hình kết nối</p>
              <div className={style.body__connect_system_row}>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Account</label>
                  <br></br>
                  <input
                    type="text"
                    className={style.form_control}
                    name="server_mail"
                    id="server_mail"
                    placeholder="Nhập tên máy chủ mail"
                    value=""
                  />
                  <input type="hidden" name="id" value="13" />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Password</label>
                  <input
                    type="password"
                    className={style.form_control}
                    name="port_number"
                    id="port_number"
                    placeholder="Nhập"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Domain</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="address_send_mail"
                    id="address_send_mail"
                    placeholder="Nhập địa chỉ email gửi"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SwitchFooter />
      </div>
    </>
  );
};

export default SwitchFPTTable;
