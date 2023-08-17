import React from "react";
import styles from "./contract.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ContractInputGroup({ isSelectedRow }: any) {
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
              placeholder="Tìm kiếm theo tên hợp đồng"
            />
            <button className={styles.kinh_lup}>
              <Image
                width={14}
                height={14}
                className={styles.img__search}
                src="https://crm.timviec365.vn/assets/icons/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/contract/add_contract">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                height={14}
                width={14}
                alt="..."
                src="/crm/add.svg"
              />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
