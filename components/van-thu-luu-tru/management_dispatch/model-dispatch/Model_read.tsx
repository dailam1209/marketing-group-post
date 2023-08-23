import React from "react";
import styles from "./Model_del.module.css";
import Image from "next/image";

type ModalProps = {
  item: any;
  isOpen?: boolean;
  closeModal: () => void;
  title?: string;
};

const Modal_read: React.FC<ModalProps> = ({
  item,
  closeModal,
  isOpen,
  title,
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.wrapper_modal}>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <div className={styles.name_header}>{title}</div>
            <Image
              src={"/icon/dau_x.png"}
              width={17}
              height={17}
              alt=""
              className={styles.close_detl}
              onClick={closeModal}
            />
          </div>
          <div className={styles.modal_body}>
            <div className={styles.form_body}>
              <div className={styles.row_modal_del}>
                <p className={styles.content_modal_del}>{item?.cv_name} </p>
              </div>
              <div
                className={styles.form_buttom}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className={styles.btn_cancel}
                  onClick={closeModal}
                  style={{
                    width: "60%",
                    background: "#4C5BD4",
                    color: "#fff",
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_read;
