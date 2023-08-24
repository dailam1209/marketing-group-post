import styles from "./chat.module.css";
export default function InputNameCustomer({infoCus}:any) {
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={`${styles.lbl_title} required`}>Tên khách hàng</label>
      <input value={infoCus?.name} name="" type=" text" placeholder="Nhập tên khách hàng" />
    </div>
  );
}
