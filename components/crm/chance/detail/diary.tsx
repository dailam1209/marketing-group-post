import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential2.module.css";
import stylesCustomer from "../chance.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import InforText from "./text_info_diary";
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
                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />

                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />

                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />
                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />
                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />
                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />
                      {/*  */}
                      <InforText
                        field="10:10 - 10/10/2020"
                        value="Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam"
                      />
                    </div>
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
