import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential.module.css";
import stylesCustomer from "../customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import InforText from "./text_info";
import TextAndIconInfo from "./text_and_icon_infor";

const SystemCustomerInfo: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <div style={{ paddingTop: 0 }} className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hệ thống</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <div className={stylesCustomer.row_input_text}>
                      <TextAndIconInfo
                        field="Người tạo:"
                        src="https://crm.timviec365.vn/assets/img/user_kh.png"
                      />
                      <InforText field="Ngày tạo:" value="12/12/2024" />
                      <TextAndIconInfo
                        field="Người sửa:"
                        src="https://crm.timviec365.vn/assets/img/user_kh.png"
                      />
                      <InforText field="Ngày sửa:" value="26/07/2023" />
                      <InforText field="Đơn vị:" />
                      <TextAndIconInfo
                        field="Loại hình:"
                        value="Khách hàng cá nhân"
                        src="https://crm.timviec365.vn/assets/icons/edit_blue.svg"
                      />
                      <InforText
                        field="Ngày giao dịch gần nhất:"
                        value="Chưa cập nhật"
                      />
                      <InforText
                        field="Ngày mua hàng gần nhất:"
                        value="Chưa cập nhật"
                      />
                      <TextAndIconInfo
                        field="Dùng chung:"
                        src="https://crm.timviec365.vn/assets/icons/dungchung_kh.svg"
                      />
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemCustomerInfo;
