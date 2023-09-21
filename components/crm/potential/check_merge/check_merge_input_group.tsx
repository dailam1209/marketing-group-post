import PotentialSelectBoxStep1 from "../potential_steps/select_box_step_1";
import styles from "./check_merge.module.css";
import styleParent from "../potential_steps/potential_main.module.css";
import { useState } from "react";

export default function CheckMergeInputGroup({
  type = "",
  label,
  value = [],
  name,
  placeholder = "",

}: any) {
  const dataSelect = ["Là", "Không là", "Chứa", "Không chứa"];
  const [editableValue, setEditableValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedValue = [...editableValue];
    updatedValue[name] = value;
    setEditableValue(updatedValue);
  };
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
            <PotentialSelectBoxStep1
              value="Chọn điều kiện"
              placeholder="Chọn điều kiện"
              data={dataSelect}

            />
          </div>
        </div>
        {value?.map((item, index) => {
          return (
            <div className={styles.row_item_right}>
              <input
                name={index.toString()}
                value={item}
                placeholder={placeholder}
                className={styles.form_control}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
