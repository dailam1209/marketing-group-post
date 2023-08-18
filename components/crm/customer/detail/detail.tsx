import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential.module.css";
import stylesCustomer from "../customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import GeneralRowInforText from "./general_row_info";
import WriteBillRowInforText from "./write_data_row";
import BonusInfoRow from "./bonus_infor_row";
import CCCDInforRow from "./cccd_infor_row";
import SystemCustomerInfo from "./system_infor";
import { useRouter } from "next/router";
import { useApi } from "@/components/crm/hooks/useApi";

interface ComponentProps {
  cccd: boolean;
}

const DetailInformation: React.FC<ComponentProps> = ({ cccd = true }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  console.log("check", router.query.id);
  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const { data, loading, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/customer/list",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIyOTc4NjMsImV4cCI6MTY5MjM4NDI2M30.XMyMzNsvPn1yInnlVLO-XTnm9mDLMDohaSxQSOvtczo",
    "POST",
    { cus_id: router.query.id }
  );

  return (
    <>
      <div style={{ paddingTop: 0 }} className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin khách hàng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    {/* Image */}
                    <p className={styles["main__body__type"]}>Ảnh</p>
                    <div id="upload">
                      <img
                        src="/assets/img/crm/customer/upload_logo.png"
                        alt=""
                        className={styles["show_avatar"]}
                      />
                      <input
                        ref={imgRef}
                        type="file"
                        name="logo"
                        className=""
                        id="logo"
                        hidden
                        accept="image/png,image/gif,image/jpeg"
                      />
                    </div>

                    {/* Thong tin chung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin chung
                    </p>
                    <GeneralRowInforText formData={data?.data?.showCty[0]} />

                    {/* Thoong tin hoa don */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin viết hóa đơn
                    </p>
                    <WriteBillRowInforText />

                    {/* Thong tin giao hang */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin giao hàng
                    </p>
                    <WriteBillRowInforText />

                    {/* Thong tin bo sung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin bổ sung
                    </p>
                    <BonusInfoRow />

                    {/* Thong tin CCCD */}
                    {cccd && (
                      <>
                        <p
                          style={{ marginTop: "20px" }}
                          className={styles["main__body__type"]}
                        >
                          Thông tin CMND/CCCD
                        </p>
                        <CCCDInforRow />
                      </>
                    )}

                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin mô tả
                    </p>
                    <div className={styles.col_lg_input}>
                      <div
                        style={{ justifyContent: "flex-start", border: "0" }}
                        className={stylesCustomer.main_profile_body_item}
                      >
                        <div
                          className={
                            stylesCustomer.main__profile__body__item__title
                          }
                        >
                          Mô tả:
                        </div>
                        <div
                          className={
                            stylesCustomer.main__profile__body__item__value
                          }
                        >
                          ádsdasd
                        </div>
                      </div>
                    </div>

                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SystemCustomerInfo />
    </>
  );
};

export default DetailInformation;