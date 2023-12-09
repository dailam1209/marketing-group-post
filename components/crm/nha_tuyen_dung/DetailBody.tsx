import React, { useContext } from "react";
import styles from "@/components/crm/nha_tuyen_dung/detailNTD.module.css";
import { useDataContainer } from "../context/dataContainer";
import Link from 'next/link'
import TextArea from "antd/es/input/TextArea";

export default function DetailBody() {
  const { dataContainer } = useContext(useDataContainer);
  return (
    <div className={styles.list_post_body}>
      <div className={styles.list_post_container}>
        <h3 className={styles.list_post_tilte}>Danh sách bài đăng</h3>
        <div className={styles.post_container}>
          {dataContainer?.list_post?.reverse()?.map((post, index) => (
            <div key={index} className={styles.post_item}>
              {/* <h4 className={styles.post_name}>Tên bài đăng</h4> */}
              <Link href={post.link_user_post !== '' ? post.link_user_post : 'https://www.facebook.com'} style={{ margin: '0 16px', display: 'block' }} target="_blank">Link Facebook người đăng bài</Link>
              <div style={{ margin: '8px 16px' }}>Nội dung tin đăng:</div>
              <p style={{ margin: '8px 16px' }}>{post.description}</p>
            </div>
          ))}
        </div>
        {/* <TextArea rows={5} placeholder={"Nội dung bài viết"} /> */}
        {/* <textarea rows={5} placeholder={'Nội dung bài viết'}></textarea> */}
      </div>
    </div>
  );
}
