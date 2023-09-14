import React, { useState } from "react";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignAction from "@/components/crm/campaign/campaign_action";
import CampaignSelectBox from "@/components/crm/campaign/campaign_selectt";
import Link from "next/link";
import ShowCampaignPOMD from "../mdal_action/mdal_show_campaignPO";
export default function CampaignInputGroupsPO({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};
  const [isModalCancelPO, setIsModalCancelPO] = useState(false);
  const datas = [
    {
      STT: "TN001",
      "Tên chiến dịch": "abc",
      "Tình trạng": "John Doe",
      Loại: "Manager",
      "Ngày bắt đầu": "123-456-7890",
      "Ngày kết thúc": "john.doe@example.com",
      "Doanh sô kỳ vọng (VNĐ)": "098-765-4321",
      "Ngân sách (VNĐ)": "john.doe@company.com",
      "Chức năng": "123 Main St",
    },
    // Add more sample data objects here if needed
  ];
  const onClose = () => {
    setIsModalCancelPO(false);
  };
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <CampaignSelectBox title="Tình trạng:" value="Tất cả" />
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian tạo:{" "}
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
        <CampaignSelectBox title="Người phụ trách:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên chiến dịch"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            onClick={() => setIsModalCancelPO(true)}
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/choose_white.svg" />
            Chọn vào
          </button>
          <ShowCampaignPOMD
            isModalCancelPO={isModalCancelPO}
            onClose={onClose}
          />
        </div>
      </div>

      <CampaignAction />
    </div>
  );
}
