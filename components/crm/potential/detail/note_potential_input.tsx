import React, { useState } from "react";
import styles from "../../potential/potential2.module.css";
import Link from "next/link";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import HandeOverModal from "@/components/crm/potential/potential_action_modal/hand_over_mdal";
import NoteModalAddOrEdit from "@/components/crm/customer/note/note_mdal_add";
export default function NoteDetailBtnsGroup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          style={{ height: "40px", minWidth: "300px" }}
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian thực hiện
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" />
          </div>
          -
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" />
          </div>
        </div>
        <PotentialSelectBox title="Người ghi chú:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              style={{ height: "46px" }}
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên ghi chú"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </button>
        </div>
      </div>
      <NoteModalAddOrEdit
        isModalCancel={isOpen}
        setIsModalCancel={setIsOpen}
        title={"Thêm ghi chú"}
        content={"Thêm mới ghi chú thành công"}
      />
    </div>
  );
}
