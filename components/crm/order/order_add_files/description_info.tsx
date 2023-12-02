import { ChangeEvent, useContext } from "react";
import styles from "./add_file_order.module.css";
import { QuoteContext } from "../../quote/quoteContext";
export default function AddDesriptionAndSystemInfo() {
  return (
    <>
      <div>
        <p className={styles.main__body__type}>Thông tin mô tả</p>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} `}>
            <label className={`${styles["form-label"]}`}>Mô tả</label>
            <textarea
              name="description"
              id="address_contact"
              className={styles["form-control"]}
              placeholder="Nhập mô tả"
              style={{ height: "82px" }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className={styles.main__body__type}>Thông tin hệ thống</p>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <p className={`${styles.info_system}`}>
              <input
                type="checkbox"
                defaultValue={1}
                name="use_system_info"
                id="share_all"
              />
              Dùng chung
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
