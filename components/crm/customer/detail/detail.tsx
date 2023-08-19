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
import WriteBillRowInforText2 from "./thongtingiaohang";
const Cookies = require("js-cookie");
interface ComponentProps {
  cccd: boolean;
}

const DetailInformation: React.FC<ComponentProps> = ({ cccd = true }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [listData, setListData] = useState([]);
  const router = useRouter();
  console.log("check", router.query.id);
  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const handleGetInfoCus = async () => {
    const res = await fetch(
      "http://210.245.108.202:3007/api/crm/customerdetails/detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: `${router.query.id}` }),
      }
    );
    const data = await res.json();
    if ((data && data.data.data1) || (data && data.data.data2))
      setListData(data.data.data1 || data.data.data2);
  };
  console.log("check dada", listData);
  useEffect(() => {
    handleGetInfoCus();
  }, []);

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
                    <GeneralRowInforText formData={listData} />

                    {/* Thoong tin hoa don */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin viết hóa đơn
                    </p>
                    <WriteBillRowInforText formData={listData} />

                    {/* Thong tin giao hang */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin giao hàng
                    </p>
                    <WriteBillRowInforText2 formData={listData} />

                    {/* Thong tin bo sung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin bổ sung
                    </p>
                    <BonusInfoRow formData={listData} />

                    {/* Thong tin CCCD */}
                    {cccd && (
                      <>
                        <p
                          style={{ marginTop: "20px" }}
                          className={styles["main__body__type"]}
                        >
                          Thông tin CMND/CCCD
                        </p>
                        <CCCDInforRow formData={listData} />
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
                          {listData[0]?.thong_tin_mo_ta
                            ? listData[0]?.thong_tin_mo_ta
                            : "Chưa cập nhật"}
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

      <SystemCustomerInfo formData={listData} />
    </>
  );
};

export default DetailInformation;
