import React from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import GroupCustomerAction from "./group_customert_action";
export default function HeaderBtnsCustomerGroup({
  isSelectedRow,
  selectedRow,
  updateData,
}: any) {
  const handleClickSelectoption = () => {};

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên tiềm năng"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="https://crm.timviec365.vn/assets/icons/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/crm/customer/group/add">
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
