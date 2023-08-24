import styles from "./ThirdPage.module.css";
export default function ThirdPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  return (
    <div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Đi muộn về sớm</p>
          <p onClick={() => handleClick(2)}>Cài đặt đi muộn về sớm</p>
          <p onClick={() => handleClick(3)} className={styles.active}>
            Hướng dẫn
          </p>
        </div>
      </div>
    </div>
  );
}
