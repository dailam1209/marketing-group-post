import Image from "next/image";
import styles from "./recent_dispatch.module.css";
import React from "react";
import Link from "next/link";
interface Recent_dispatchProps {
  _id?: number;
  link: string;
  title_vb?: string;
}
interface ArrayTemps {
  dataArray: Recent_dispatchProps[]; // Kiểu dữ liệu của mảng là string
}
const Recent_dispatch: React.FC<ArrayTemps> = ({ dataArray }) => {
  const listDispatch = dataArray
    ? dataArray.map((item, index) => {
        return (
          <li className={styles.li_box} key={index}>
            <Link
              className={`${styles.body_row_box_list_item1}`}
              // href={dataArray.link}
              href={`/van-thu-luu-tru/quanly-cong-van/${item?._id}`}
            >
              <Image
                src={"/icon/google-docs.png"}
                width={38}
                height={50}
                alt="box"
                className={styles.img_box}
              />
              <p className={`${styles.body_row_box_list_item_text1}`}>
                {item.title_vb}
              </p>
            </Link>
          </li>
        );
      })
    : "";
  return (
    <>
      <h3 className={`${styles.body_row_title}`}>Công văn gần đây</h3>
      <div className={`${styles.body_row_box}`}>
        <div className={`${styles.body_row_box_list}`}>
          <ul className={styles.ul_box}>{listDispatch}</ul>
        </div>
      </div>
    </>
  );
};

export default Recent_dispatch;
