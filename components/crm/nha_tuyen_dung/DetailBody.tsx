import React, { useContext } from "react";
import styles from "@/components/crm/nha_tuyen_dung/detailNTD.module.css";
import { useDataContainer } from "../context/dataContainer";
import TextArea from "antd/es/input/TextArea";

export default function DetailBody() {
  const { dataContainer } = useContext(useDataContainer);
  return (
    <div className={styles.list_post_body}>
      <div className={styles.list_post_container}>
        <h3 className={styles.list_post_tilte}>Danh sách bài đăng</h3>
        <div className={styles.post_container}>
          <h4 className={styles.post_name}>Tên bài đăng</h4>
          <TextArea rows={5} placeholder={"Nội dung bài viết"} />
        </div>
      </div>
    </div>
  );
}
