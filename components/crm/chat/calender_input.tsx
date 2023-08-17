import styles from "./chat.module.css";

export default function CalenderInput() {
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray} ${styles.business_assistant_calendar_care}`}
    >
      <div
        className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
      >
        <label className={styles.lbl_title}>Lịch hẹn từ ngày</label>
        <input
          type="datetime-local"
          className={styles.business_assistant_start_date}
        />
      </div>
      <div
        className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
      >
        <label className={styles.lbl_title}>Đến ngày</label>
        <input
          type="datetime-local"
          className={styles.business_assistant_start_date}
        />
      </div>
    </div>
  );
}
