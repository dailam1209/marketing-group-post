import styles from "./chat.module.css";

export default function   InputEmailCustomer({infoCus}:any) {
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={`${styles.lbl_title}`}>Email khách hàng</label>
      <input value={infoCus?.email?.info} name="" type=" text" placeholder="Nhập email khách hàng" />
    </div>
  );
}
