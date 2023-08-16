import styles from "./chat.module.css";

export default function SaveBtnChat() {
  return (
    <div className={`${styles.business_assistant_item} ${styles.business_assistant_save}`}>
      <button id={`${styles.business_assistant_save}`}>Lưu</button>
    </div>
  );
}
