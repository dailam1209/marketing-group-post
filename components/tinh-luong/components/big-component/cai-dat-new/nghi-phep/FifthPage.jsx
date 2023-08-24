import styles from "./FifthPage.module.css";
export default function FifthPage({ handleSelected }) {
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
          <p onClick={() => handleClick(1)}>Chính sách nghỉ phép</p>
          <p onClick={() => handleClick(2)}>Nghỉ sai quy định</p>
          <p onClick={() => handleClick(3)}>
            Nghỉ vào ngày không được phép nghỉ
          </p>
          <p onClick={() => handleClick(4)}>Theo dõi nghỉ phép</p>
          <p onClick={() => handleClick(5)} className={styles.active}>
            Hướng dẫn
          </p>
        </div>
      </div>
    </div>
  );
}
