import React, { useCallback, useState } from "react";
import styles from "./customer_group.module.css";
import Link from "next/link";
import GroupCustomerAction from "./group_customert_action";
import { ModalGroupCustomerShare } from "./modal_share";
import { ModalGroupCustomerDelete } from "./modal_delete";
import ModalGroupCustomerMove from "./modal_move";
import ModalGroupCustomerAddEmp from "./modal_add_emp";

export default function HeaderBtnsCustomerGroup({
  isSelectedRow,
  selectedRow,
  updateData,
  valFilter,
  setValFilter,
  handleClickSearch,
}: any) {
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);
  const [isOpenModalMove, setIsOpenModalMove] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalAddEmp, setIsOpenModalAddEmp] = useState(false);
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
          <button
            type="button"
            onClick={() => setIsOpenModalShare(true)}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            Đối tượng được chia sẻ
          </button>
          <button
            type="button"
            onClick={() => setIsOpenModalDelete(true)}
            className={`${styles.dropbtn_delete} flex_align_center`}
          >
            Xóa
          </button>{" "}
          <button
            onClick={() => setIsOpenModalMove(true)}
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            Chuyển giỏ
          </button>
          <button
            onClick={() => setIsOpenModalAddEmp(true)}
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm cán bộ
          </button>
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
      <ModalGroupCustomerShare
        isOpenModalShare={isOpenModalShare}
        setIsOpenModalShare={setIsOpenModalShare}
      />
      <ModalGroupCustomerDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
      />
      <ModalGroupCustomerMove
        isOpenModalMove={isOpenModalMove}
        setIsOpenModalMove={setIsOpenModalMove}
      />{" "}
      <ModalGroupCustomerAddEmp
        isOpenModalAddEmp={isOpenModalAddEmp}
        setIsOpenModalAddEmp={setIsOpenModalAddEmp}
      />
      <GroupCustomerAction
        isSelectedRow={isSelectedRow}
        selectedRow={selectedRow}
        updateData={updateData}
      />
    </div>
  );
}
