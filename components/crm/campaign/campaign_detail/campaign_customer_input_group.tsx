import React, { useState } from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
// import OrderDetailAction from "./campaign_action";
import CampaignDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import Link from "next/link";
import CustomerSelectModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/customer_select_action_mdal";
import CampaignCustomerAction from "@/components/crm/campaign/campaign_detail/campaign_customer_action";
import Image from "next/image";
export default function CampaignAppointmentInputGroups({ isSelectedRow }: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const handleClickSelectoption = () => {};

  return (
    <div>
      <div className={styles.main__control}>
        <div className={`${styles.main__control_select} flex_align_center`}>
          <div
            className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
          >
            <label htmlFor="" className="">
              Ngày gửi:{" "}
            </label>
            <div className={`${styles.input_item_time} flex_between`}>
              <input type="date" name="" id="start_time" /> -
              <input type="date" name="" id="end_time" />
            </div>
          </div>

          <CampaignDetailSelectBox title="Nhà cung cấp:" value="Tất cả" />
        </div>

        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form onSubmit={() => false}>
              <input
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng"
              />
              <button className={styles.kinh_lup}>
                <Image
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt=""
                  width={15}
                  height={15}
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsModalCancel(true);
                }}
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <i className="bi bi-check2-square"></i>
                Chọn vào
              </button>
            </div>
          </div>
        </div>
        <CampaignCustomerAction />
      </div>
      <CustomerSelectModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        title="Chọn khách hàng"
        // content="Hello"
      />
    </div>
  );
}
