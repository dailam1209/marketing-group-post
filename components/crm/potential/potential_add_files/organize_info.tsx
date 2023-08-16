import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
export default function AddOrganizeInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin tổ chức</p>

      <div className={styles.row_input}>
      <InputText label="Tổ chức" placeholder="Nhập tổ chức" />
        <InputText label="Tài khoản ngân hàng" placeholder="Nhập số tài khoản" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mở tại ngân hàng</label>
          <PotentialSelectBoxStep value="Chọn ngân hàng" placeholder="Chọn ngân hàng" />
        </div>
        <InputText label="Ngày thành lập" placeholder="Nhập ho và tên" type="date"/>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại hình</label>
          <PotentialSelectBoxStep value="Chọn loại hình" placeholder="Chọn loại hình" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Lĩnh vực</label>
          <PotentialSelectBoxStep value="Chọn lĩnh vực" placeholder="Chọn lĩnh vực" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Ngành nghề</label>
          <PotentialSelectBoxStep value="Chọn ngành nghề" placeholder="Chọn ngành nghề" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Doanh thu</label>
          <PotentialSelectBoxStep value="Chọn doanh thu" placeholder="Chọn doanh thu" />
        </div>
      </div>
     
    </div>
  );
}
