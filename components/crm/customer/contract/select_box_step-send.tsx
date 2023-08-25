// ContractSelectBoxStep.js
import React, { useEffect, useRef, useState } from "react";
import styles from "../../potential/potential.module.css";
import ContractDropDownDataStep from "./select_box_dropdown_send";

export default function ContractSelectBoxStep({
  title = "",
  value,
  placeholder,
  data,
  setSelectedDepartment,
  setSelectedPosition,
  setSelectedEmployee,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedData, setSelectedData] = useState<any>(null);

  
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  const handleChangeDepartment = (selectedDepartment: string) => {
    const newData = data.find((item: any) => item.department === selectedDepartment);
    setSelectedData(newData);
    setSelectedDepartment(selectedDepartment);}

    const handleChangePosition = (selectedDepartment: string) => {
      const newData = data.find((item: any) => item.department === selectedDepartment);
      setSelectedData(newData);
      setSelectedDepartment(selectedDepartment);}
  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item_box_step} flex_align_center_item`}
    >
      <label htmlFor="" className="">
        {title}
      </label>

      <span
        className={`select2 ${styles.select2_container_step}`}
        dir="ltr"
        data-select2-id={2}
        style={{ width: "100%" }}
        onClick={handleClickSelectoption}
      >
        <span className={`${styles.selection}`}>
          <span
            className={`${styles.select2_selection} select2_selection_single`}
          >
            <span
              className={styles.select2_selection__rendered}
              id="select2-g0q1-container"
              role="textbox"
              aria-readonly="true"
            >
              {value}
            </span>
            <span
              className={styles.select2_selection__arrow}
              role="presentation"
            >
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && (
          <ContractDropDownDataStep
            setSelectedDepartment={handleChangeDepartment}
            data={data}
            value={value}
            selectedData={selectedData}
            placeholder={placeholder}
          />
        )}
      </span>
    </div>
  );
}
