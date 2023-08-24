import React from "react";
import styles from "./Model_del.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;

type ModalProps = {
  item: any;
  closeModal: () => void;
  href: string;
};
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const Modal_del: React.FC<ModalProps> = ({ item, closeModal, href }) => {
  const router = useRouter();

  const handleDeleteItem = async (id: number) => {
    try {
      const formData = new FormData();
      formData.append("action", "delete");
      formData.append("id", id.toString());
      const response = await axios.post(
        `${baseURL}api/vanthu/listVanBan/synthesisFunction`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        alert(`Xóa thành công ${item.cv_name}`);
      }
      closeModal();
      if (href) {
        router.push(href);
      }
    } catch (error) {
      alert(`Xóa thất bại ${item?.cv_name}`);
    }
  };

  return (
    <div className={styles.wrapper_modal}>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <div className={styles.name_header}>Xóa văn bản</div>
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
                <p className={styles.content_modal_del}>
                  Bạn có chắc chắn xóa văn bản <br />
                  {item?.cv_name}{" "}
                </p>
              </div>
              <div className={styles.form_buttom}>
                <button className={styles.btn_cancel} onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className={styles.btn_del}
                  onClick={() => {
                    handleDeleteItem(item._id);
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_del;
