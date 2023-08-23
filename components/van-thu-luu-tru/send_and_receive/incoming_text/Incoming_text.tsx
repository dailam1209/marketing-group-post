import React from "react";
import styles from "./Incoming_text.module.css";
const Incoming_text = ({ ...props }) => {
  return <div className={styles.wrapper_body}>{props.children}</div>;
};

export default Incoming_text;
