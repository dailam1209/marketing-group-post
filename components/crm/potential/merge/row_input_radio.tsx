import { useEffect, useState } from "react";
import styles from "./merge.module.css";

export default function RowRadioInput({
  defaultCheckBox,
  setDefaultCheckBox,
  name,
  isSelectAll,
  isSelectAll2,
  title,
  value = ["a", "b"],
}: any) {
  const [valueRadioBox, setValueRadioBox] = useState(value[0]);
  const [isChecked, setIsChecked] = useState(true);
  const [defaultChecked, setDefaultChecked] = useState(false);
  console.log("ceck", value);

  const handleChange = (selectedValue: string) => {
    setValueRadioBox(selectedValue);
    setDefaultChecked(true);
    // Uncheck the opposite table
    if (isSelectAll) {
      setDefaultCheckBox(true);
    } else {
      setDefaultCheckBox(false);
    }
  };
  return (
    <tr>
      <td>
        <p className={styles.column_title}>{title}</p>
      </td>
      <td>{valueRadioBox}</td>
      {value?.map((item, index) => {
        return (
          <td>
            <div className={styles.td_ct}>
              <input
                onChange={() => handleChange(value[index])}
                checked={
                  (defaultCheckBox || defaultChecked) &&
                  valueRadioBox === value[index]
                }
                name={name}
                type="radio"
                value={value[index]}
                className={styles.radio}
              />
              <p>{value[index]}</p>
            </div>
          </td>
        );
      })}
    </tr>
  );
}
