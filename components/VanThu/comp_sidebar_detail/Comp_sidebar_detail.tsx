import Image from "next/image";
import React from "react";
import styles from "./Comp_sidebar_detail.module.css";
import Item_detail_person from "./Item_detail_person";

const Comp_sidebar_detail = ({ children }: any) => {
  return (
    <div className={styles.offerlist_right}>
      <div className={styles.offerlist_right_info}>
        <div className={styles.right_title}>
          <Image
            src={"/icon/create_propose/canhbao.png"}
            width={25}
            height={25}
            alt="icon_print"
          />
          <h3 className={styles.infor_title}>Thông tin đề xuất</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Comp_sidebar_detail;
