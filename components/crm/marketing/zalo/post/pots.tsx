import React from "react";
import styleCampaignInput from "@/components/crm/campaign/campaign.module.css";
import GroupFormInputGroup from "./post_form_input";
import styles from './post.module.css'
import TableDataZaloPost from "@/components/crm/table/table_marketing_zalo_post";
import CurrentGroup from "../group/current_group";

const PostZalo = () => {
  return (
    <div id="page_post" className={styles.post__module}>
      <div style={{ marginBottom: '1.25rem'}}>
       <CurrentGroup numberCurrentDetailForGroup={0} />
      </div>
      {/* date */}
      <div
       
        className={`${styleCampaignInput.select_item} flex_align_center_item ${styleCampaignInput.select_item_time} ${styles.post_date} `}
      >
        <label htmlFor="" className={styles.post_hidden}>
          Ngày đặt hàng:
        </label>
        <label htmlFor="" className={`styles.post_hidden_notmobile ${styles.custom_fontdate}`}>
          Ngày tạo:
        </label>
        <div className={`${styleCampaignInput.input_item_time} flex_between ${styles.date_nowrap}`}>
          <input
          className={styles.custom_fontdate}
            type="date"
            name=""
            id="start_time"
            //   onChange={(el) => {
            //     setBody((prev) => {
            //       return {
            //         ...prev,
            //         fromDate: stringToDateNumber(el.target.value) / 1000,
            //       };
            //     });
            //   }}
          />{" "}
          - {" "}
          <input
          className={styles.custom_fontdate}
            type="date"
            name=""
            id="end_time"
            onChange={(el) => {
              // setBody((prev) => {
              //   return {
              //     ...prev,
              //     toDate: stringToDateNumber(el.target.value) / 1000,
              //   };
              // });
            }}
          />
        </div>
      </div>
      <div>
        <GroupFormInputGroup isSelectedRow={false}/>
      </div>
      <TableDataZaloPost changeNumberPage={function (e: number) {
              throw new Error("Function not implemented.");
          } }/>
    </div>
  );
};

export default PostZalo;
