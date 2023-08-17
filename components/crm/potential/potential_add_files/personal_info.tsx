import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
export default function AddPersonalInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin cá nhân</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Giới tính</label>
          <PotentialSelectBoxStep value="Chọn giới tính" placeholder="Chọn giới tính" />
        </div>
        <InputText label="Ngày sinh" placeholder="Nhập ho và tên" type="date" />
      </div>

     
    </div>
  );
}
