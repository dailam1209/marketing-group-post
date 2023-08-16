import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
export default function AddGeneralInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Xưng hô</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Họ và đệm" placeholder="Nhập ho và tên" />
      </div>

      <div className={styles.row_input}>
        <InputText label="Tên" placeholder="Nhập tên khách hàng" />
        <InputText label="Họ và tên" placeholder="Họ và tên" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chức danh</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phòng ban</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Điện thoại cơ quan"
          placeholder="Nhập diện thoại cơ quan"
        />
        <InputText
          label="Điện thoại cá nhân"
          placeholder="Nhập điện thoại cá nhân"
        />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Email cơ quan"
          placeholder="Email cơ quan"
        />
        <InputText
          label="Email cá nhân"
          placeholder="Email cá nhân"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn gốc</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Mã số thuế" placeholder="Nhập mã số thuế" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại tiềm năng</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mạng xã hôi</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nhân viên phụ trách</label>
          <PotentialSelectBoxStep value="Chọn nhân viên phụ trách" placeholder="Chọn nhân viên phụ trách" />
        </div>
      </div>
    </div>
  );
}
