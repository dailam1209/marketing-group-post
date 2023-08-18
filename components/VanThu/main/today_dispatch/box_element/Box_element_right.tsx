import React from "react";
import styles from "./Box_element_right.module.css";
import Image from "next/image";
import Link from "next/link";
interface MyComponentBox {
  id?: number;
  element_number?: number;
  name_box?: string;
  temp?: number;
}
const Box_element_right: React.FC<MyComponentBox> = (props) => {
  return (
    <div className={`${styles.box_important}`}>
      <div className={`${styles.element_part}`}>
        <h2 className={`${styles.element_number}`}>{props.element_number}</h2>
        <p className={`${styles.element_title}`}>Văn bản cần được duyệt</p>
        <div className={`${styles.element_success}`}>
          <p className={`${styles.element_temp}`}>Hoàn thành : {props.temp}%</p>
          <div className={`${styles.progress}`}>
            <div
              className={`${styles.progress_bar}`}
              style={{ width: `${props.temp}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className={`${styles.element_part}`}>
        <div className={`${styles.element_part_top}`}>
          <Image
            src={"/icon/top_warning.png"}
            width={50}
            height={50}
            alt="warning"
          />
          <p className={`${styles.text_top}`}>Truy cập duyệt văn bản ngay!</p>
        </div>
        <Link href="/van-ban-den/van-ban-can-duyet">
          <div className={`${styles.element_part_bottom}`}>
            <Image
              src={"/icon/icon_document.png"}
              width={50}
              height={50}
              alt="Avatar"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Box_element_right;
