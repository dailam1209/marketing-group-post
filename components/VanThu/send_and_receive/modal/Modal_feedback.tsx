import React, { useState } from "react";
import styles from "./Modal_internal.module.css";
import Image from "next/image";
import { Custom_input_textarea } from "@/components/VanThu/components/Input/Input_text/Input_text";
import { handleCreate } from "@/utils/BaseApi";

type ModalProps = {
  isOpen?: boolean;
  _id: any;
  onClose: () => void;
};
const Modal_feedback: React.FC<ModalProps> = ({ isOpen, onClose, _id }) => {
  const [id, setid] = useState(_id);
  const [show, setshow] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAddFeedback = async () => {
    if (feedback === "") {
      setshow(true);
    } else {
      onClose();
      try {
        const api = "/api/vanthu/guiNhanCongVan/vanBanDen/sendFeedback";
        if (feedback !== "") {
          await handleCreate(api, { id_vb: id, feedback: feedback });
        }
        setFeedback("");
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi ý kiến:", error);
      }
    }
  };
  if (isOpen === false) return <></>;
  return (
    <div className={styles.wrapper_modal}>
      <div className={styles.modal}>
        <div className={styles.modal_title}>
          <p className={styles.title}> Nội dung phản hồi </p>
          <div className={styles.close_modal}>
            <Image
              src={"/icon/X-trang.png"}
              width={38}
              height={38}
              alt=""
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.modal_body}>
          <label htmlFor="">Ý kiến phản hồi</label>
          <br />
          <Custom_input_textarea
            placeholder="Nhập ý kiến phản hồi..."
            inputclass="modal_feedback"
            handleChange={(e: any) => {
              setFeedback(e.target.value);
            }}
          />

          {show ? (
            <>
              <p style={{ color: "red", margin: "0" }}>
                Vui lòng nhập ý kiến phản hồi...
              </p>
            </>
          ) : (
            <></>
          )}

          <div className={styles.btn_process}>
            <p className={styles.btn_close} onClick={onClose}>
              Đóng
            </p>
            <p className={styles.btn_save} onClick={handleAddFeedback}>
              Gửi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_feedback;
