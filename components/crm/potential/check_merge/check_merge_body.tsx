import { type } from "os";
import styles from "./check_merge.module.css";

// ...

export default function CheckMergeBody({ type, setType }: any) {
  return (
    <div className={styles.main__body_item}>
      <div className={styles.row + " " + styles.row_one}>
        <div className={styles["col-lg-4"]}>
          <label className={styles.label_radio + " " + styles.d_flex}>
            <input
              type="radio"
              defaultValue="và"
              name="condition"
              checked={type === "và"}
              onChange={() => setType("và")}
            />
            Thỏa mãn tất cả các điều kiện bên dưới
          </label>
        </div>
        <div className={styles["col-lg-4"]}>
          <label className={`${styles.label_radio} ${styles.d_flex}`}>
            <input
              type="radio"
              defaultValue="hoặc"
              name="condition"
              checked={type === "hoặc"}
              onChange={() => setType("hoặc")}
            />
            Thỏa mãn với bất kỳ điều kiện nào bên dưới
          </label>
        </div>
      </div>
    </div>
  );
}
