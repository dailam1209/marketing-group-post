import { useState } from "react";
import styles from "./set_up_role.module.css";
import TableOptions from "./table_options";
export default function OptionRole({ checkboxState, setCheckboxState }) {
  const handleSelectAllCheckbox = (event: any) => {
    const { checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      selectAll: checked,
      checkboxItems: {
        custom_1: checked,
        custom_2: checked,
        custom_3: checked,
        custom_4: checked,
        provider_1: checked,
        provider_2: checked,
        provider_3: checked,
        provider_4: checked,
        mkt_1: checked,
        mkt_2: checked,
        mkt_3: checked,
        mkt_4: checked,
        mange_1: checked,
        mange_2: checked,
        mange_3: checked,
        mange_4: checked,
        care_1: checked,
        care_2: checked,
        care_3: checked,
        care_4: checked,
        cost_1: checked,
        cost_2: checked,
        cost_3: checked,
        cost_4: checked,
        report_1: checked,
        report_2: checked,
        report_3: checked,
        report_4: checked,
        general_1: checked,
        general_2: checked,
        general_3: checked,
        general_4: checked,
      },
    }));
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <div className={styles.check_box}>
        <div className={styles.form_check}>
          <input
            name="all"
            className={styles.checkbox_all}
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            onChange={(e) => handleSelectAllCheckbox(e)}
          />
          <div className={styles.text_checkbox}>Chọn toàn quyền</div>
        </div>
      </div>
      <TableOptions
        checkboxState={checkboxState}
        setCheckboxState={setCheckboxState}
      />
    </div>
  );
}
