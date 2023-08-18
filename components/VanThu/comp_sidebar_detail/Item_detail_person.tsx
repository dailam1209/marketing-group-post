import Image from "next/image";
import React from "react";
import styles from "./Item_detail.module.css";

export const Item_details_person = ({ img, username, id }: any) => {
  return (
    <div className={styles.infor_check_user}>
      <img
        className="lazyloaded"
        src={img ? img : "/icon/create_propose/ep_logo.png"}
        width={300}
        height={300}
        alt="ảnh đại diện"
      />
      <div className={styles.check_user_box}>
        <p
          className={`${styles.user_name} ${styles.text_primary} ${styles.bold}`}
        >
          {username}
        </p>
        <p className={styles.user_id}>ID: {id}</p>
      </div>
    </div>
  );
};

export default Item_details_person;
