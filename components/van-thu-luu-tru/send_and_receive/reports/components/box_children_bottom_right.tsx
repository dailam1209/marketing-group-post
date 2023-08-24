import React from "react";
import styles from "./box_right.module.css";
// type ModalProps = {
//   isOpen?: boolean;
//   onClose: () => void;
// };
const Box_children_bottom_right = ({ ...props }: any) => {
  return (
    <button className={styles.btn_choose} onClick={props?.onClick}>
      {props?.children}
    </button>
  );
};

export default Box_children_bottom_right;
