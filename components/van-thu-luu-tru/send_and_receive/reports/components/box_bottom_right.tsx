import React, { Children } from "react";
import styles from "./box_right.module.css";

const Box_bottom_right = ({ children }: any) => {
  return <div className={styles.box_bottom_right}>{children}</div>;
};

export default Box_bottom_right;
