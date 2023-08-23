import React from "react";
import styles from "./Report.module.css";

const Report_right = ({ children }: any) => {
  return <div className={styles.wrapper_right}>{children}</div>;
};

export default Report_right;
