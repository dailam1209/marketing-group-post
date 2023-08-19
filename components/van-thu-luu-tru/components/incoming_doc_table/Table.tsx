import React from "react";
import styles from "./Table.module.css";
import Image from "next/image";
import Link from "next/link";

interface ListDocs {
  listdocs?: any[];
  href_url?: string;
}
const Table: React.FC<ListDocs> = ({ listdocs, href_url }) => {
  const Listdocs = listdocs?.map((item, index) => {
    const textContent: any = new DOMParser().parseFromString(
      item?.nd_vb,
      "text/html"
    ).documentElement.textContent;
    const lowercaseText = textContent.toLowerCase();
    return (
      <div className={`${styles.table_row} ${styles.row_color}`} key={index}>
        <p className={`${styles.table_element} ${styles.size_14}`}>
          {index + 1}
        </p>
        <p className={`${styles.table_element} ${styles.size_14}`}>
          {item?.so_vb}
        </p>
        <div className={`${styles.table_element}`}>
          <Link
            href={`/van-thu-luu-tru/van-ban-den/${href_url}/${item?._id}`}
            // onClick={() => {
            //   router.push({
            //     ...router,
            //     pathname: `/van-ban-den/${href_url}/${item?.id}`,
            //   });
            // }}
            className={`${styles.text_xanh_kochan} ${styles.size_14}`}
          >
            {item?.title_vb}
          </Link>
        </div>
        <p className={`${styles.table_element} ${styles.size_14}`}>
          {item?.time_ban_hanh}
        </p>
        <div className={styles.table_element}>
          <p className={styles.size_14}>{item?.name_user_send}</p>
          <p className={`${styles.text_xanh_kochan} ${styles.size_14}`}>
            {item?.position}
          </p>
        </div>
        <div
          className={`${styles.table_element} ${styles.text_xanh_kochan} ${styles.size_14} ${styles.congty}`}
        >
          <p>{lowercaseText}</p>
        </div>
        <div className={`${styles.table_element}`}>
          <div style={{ width: "70%", textAlign: "center" }}>
            <p style={{ color: "#63b814", fontSize: "14px" }}>
              {item?.trang_thai_vb}
            </p>
          </div>
          <button className={`${styles.table_btn}`}>
            <Image
              src={"/icon/i_share.png"}
              width={21}
              height={23}
              alt="Chuyen tiep"
            />
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className={`${styles.incoming_doc_table}`}>
      <div className={`${styles.table}`}>
        <div className={`${styles.table_row} ${styles.table_top}`}>
          <p className={`${styles.table_element}`}>Stt</p>
          <p className={`${styles.table_element}`}>Số văn bản</p>
          <p className={`${styles.table_element}`}>Tên văn bản</p>
          <p className={`${styles.table_element}`}>Ngày nhận</p>
          <p className={`${styles.table_element}`}>Nơi gửi</p>
          <p className={`${styles.table_element}`}>Trích yếu</p>
          <p className={`${styles.table_element}`}>Trạng thái</p>
        </div>
        {Listdocs}
      </div>
    </div>
  );
};

export default Table;
