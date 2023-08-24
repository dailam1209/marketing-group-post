import { Key, useState } from "react";
import styles from "../../potential/potential.module.css";

export default function ContractDropDownDataStep({
  data,
  value,
  setSelectedDepartment,
}: any) {
  const [selectedValue, setSelectedValue] = useState(value);
  const handleOptionSelect = (selectedItem: string) => {
    setSelectedDepartment(selectedItem);
  };
  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{ width: "100%", display: "block" }}
      >
        <span
          className={`${styles.select2_search} ${styles.select2_search__dropdown}`}
        >
          <input
            className={styles.select2_search__field}
            type="search"
            tabIndex={0}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            role="textbox"
            style={{ height: "34px" }}
          />
        </span>
        <span className={styles.select2_results}>
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
          >
            <li
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
            >
              {selectedValue}
            </li>
            {data?.map((item: any, i: Key | null | undefined) => (
              <li
                key={i}
                className={styles.select2_results__option}
                style={{
                  marginTop: "10px",
                  padding: "5px 0",
                  paddingLeft: "18px",
                }}
                onClick={() => handleOptionSelect(item.department)}
              >
                {item.department}
              </li>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
}
