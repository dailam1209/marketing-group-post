import React, { useCallback } from "react";
import styles from "./customer_group.module.css";
import Link from "next/link";
import GroupCustomerAction from "./group_customert_action";
export default function HeaderBtnsCustomerGroup({
  isSelectedRow,
  selectedRow,
  updateData,
  valFilter,
  setValFilter,
  handleClickSearch,
}: any) {
  const handleClickSelectoption = () => {};
  const handleChangeInput = useCallback((e: any) => {
    setValFilter(e.target.value);
  }, []);

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.wrapInput}>
          <form
            style={{
              position: "relative",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            className={styles.main__control_search}
            onSubmit={(e) => {
              e.preventDefault(), handleClickSearch();
            }}
          >
            <input
              type="text"
              className={styles.input__search}
              name="search"
              placeholder="Tìm kiếm theo tên nhóm khách hàng"
              value={valFilter}
              onChange={handleChangeInput}
            />
            <button onClick={handleClickSearch} className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/customer/group/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>

      <GroupCustomerAction
        isSelectedRow={isSelectedRow}
        selectedRow={selectedRow}
        updateData={updateData}
      />
    </div>
  );
}
