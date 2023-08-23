import styles from "./FourthPage.module.css";
export default function FourthPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Ca làm việc</p>
          <p onClick={() => handleClick(2)}>Lịch Làm Việc</p>
          <p onClick={() => handleClick(3)}>Cài đặt Công Chuẩn</p>
          <p onClick={() => handleClick(4)} className={styles.active}>
            Hướng dẫn
          </p>
        </div>
      </div>
    </div>
  );
}
