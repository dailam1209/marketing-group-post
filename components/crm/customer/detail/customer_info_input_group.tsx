import React, { useState } from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import TableDataCampaign from "@/components/crm/table/table-order-detail-contact-select";
import CancelModal from "@/components/crm/order/order_detail/order_detail_action_modal/contact_order_detail_action_mdal";
export default function CustomerInforEngineInput({ id, isLink = false }: any) {
  const [isModalOpen, setIsModalCancel] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              style={{ height: "46px" }}
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên liên hệ"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <div>
            {isLink ? (
              <Link href={`customer/contact/add/${id}`}>
                <button
                  type="button"
                  // onClick={() => {
                  //   setIsModalCancel(true);
                  // }}
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsModalCancel(true);
                }}
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <i className="bi bi-check2-square"></i>
                Chọn vào
              </button>
            )}
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
        <TableDataCampaign
          setSelected={setSelected}
          setNumberSelected={setNumberSelected}
        />
      )} */}
      <CancelModal
        isModalCancel={isModalOpen}
        setIsModalCancel={setIsModalCancel}
        title={"Chọn khách hàng"}
      />
    </div>
  );
}
