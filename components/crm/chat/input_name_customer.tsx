import { useState } from "react";
import styles from "./chat.module.css";
export default function InputNameCustomer({
  infoCus,
  refName,
  setChange,
}: any) {
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={`${styles.lbl_title} required`}>Tên khách hàng</label>
      <input
        ref={refName}
        defaultValue={infoCus?.name}
        name=""
        disabled
        type=" text"
        placeholder="Nhập tên khách hàng"
        onChange={(e) => setChange(e.target.value)}
      />
    </div>
  );
}
