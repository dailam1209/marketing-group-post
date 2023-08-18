import React from "react";
import styles from "./Report.module.css";
const Report = ({ children }: any) => {
  return (
    <div className={styles.container_body}>
      <div className={styles.wrapper_body}>{children}</div>
    </div>
  );
};

export default Report;
