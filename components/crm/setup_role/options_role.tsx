import { useState } from "react";
import styles from "./set_up_role.module.css";
import TableOptions from "./table_options";
export default function OptionRole() {
  const [checkboxState, setCheckboxState] = useState({
    selectAll: false,
    checkboxItems: {
      custom_1: false,
      custom_2: false,
      custom_3: false,
      custom_4: false,
      provider_1: false,
      provider_2: false,
      provider_3: false,
      provider_4: false,
      mkt_1: false,
      mkt_2: false,
      mkt_3: false,
      mkt_4: false,
      mange_1: false,
      mange_2: false,
      mange_3: false,
      mange_4: false,
      care_1: false,
      care_2: false,
      care_3: false,
      care_4: false,
      cost_1: false,
      cost_2: false,
      cost_3: false,
      cost_4: false,
      report_1: false,
      report_2: false,
      report_3: false,
      report_4: false,
      general_1: false,
      general_2: false,
      general_3: false,
      general_4: false,
    },
  });

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
