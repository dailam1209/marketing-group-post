import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./check_merge.module.css";
import styleParent from "../potential.module.css";

export default function CheckMergeInputGroup({
  type = "",
  label,
  defaultValue = "",
  placeholder = "Nhập họ và tên",
}: any) {
  const dataSelect = ["Là", "Không là", "Chứa", "Không chứa"];
  return (
    <div className={styles.main__body_item}>
      <div className={`${styles.row_content} ${styles.flex_align_center}`}>
        <div className={styles.row_item_left}>
          <label className={styles.form_label}>
            <span className={styles.span_or}>{type}</span>
            {label}
          </label>
        </div>
        <div className={styles.row_item_center}>
          <div className={styleParent.wrap_select}>
            {" "}
            <PotentialSelectBoxStep
              value="Chọn điều kiện"
              placeholder="Chọn điều kiện"
              data={dataSelect}
            />
          </div>
        </div>
        <div className={styles.row_item_right}>
          <input
            type="text"
            className={styles.form_control}
            name=""
            id=""
            placeholder="Nhập họ và tên"
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </div>
  );
}
