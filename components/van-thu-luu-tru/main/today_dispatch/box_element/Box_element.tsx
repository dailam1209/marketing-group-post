import React from "react";
import styles from "./Box_element.module.css";
interface MyComponentBox {
  id?: number;
  element_number: number;
  name_box: string;
  temp: number;
}
const Box_element: React.FC<MyComponentBox> = (props) => {
  return (
    <div className={`${styles.body_row_box_element}`}>
      <h2 className={`${styles.element_number}`}>{props.element_number}</h2>
      <p className={`${styles.element_title}`}>{props.name_box}</p>
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
  );
};

export default Box_element;
