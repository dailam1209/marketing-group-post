import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "./setting.module.css";
import { useRouter } from "next/router";
import ModalCompleteStep from "./complete_modal";
import Cookies from "js-cookie";
import { base_url } from "../service/function";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  const handleAddElement = (condition: string) => {
    const newElement = <div className={styles.content_obj} key={label}></div>;
    if (label === condition) {
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      setElements([newElement]);
    }
  };

  const [listNv, setListNv] = useState([]);
  const handleGetNv = async () => {
    const res = await fetch(`${base_url}/api/qlc/managerUser/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ com_id: Cookies.get("com_id") }),
    });
    const data = await res.json();
    setListNv(data?.data?.items);
  };

  return (
    <>
      <Modal
        title={"Bàn giao công việc"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.btn_share}>
            <div className="mb-3 col-lg-12">
              <label className={styles.form_label} aria-required="true">
                Người bàn giao
              </label>
              <select className={styles.setting_select}>
                <option value="" data-select2-id="10">
                  Chọn người bàn giao
                </option>
                <option value="147976" data-name="Hà Quang Tuấn">
                  (147976) Hà Quang Tuấn -{" "}
                </option>
                <option value="146616" data-name="Triệu Thảo">
                  (146616) Triệu Thảo -{" "}
                </option>
                <option value="146512" data-name="Phạm Nhật Huy">
                  (146512) Phạm Nhật Huy - KỸ THUẬT
                </option>
              </select>
            </div>
          </div>

          <div className={styles.btn_share}>
            <div className="mb-3 col-lg-12">
              <label className={styles.form_label} aria-required="true">
                Người nhận công việc
              </label>
              <select className={styles.setting_select}>
                <option value="" data-select2-id="10">
                  Chọn người nhận công việc
                </option>
                <option value="147976" data-name="Hà Quang Tuấn">
                  (147976) Hà Quang Tuấn -{" "}
                </option>
                <option value="146616" data-name="Triệu Thảo">
                  (146616) Triệu Thảo -{" "}
                </option>
                <option value="146512" data-name="Phạm Nhật Huy">
                  (146512) Phạm Nhật Huy - KỸ THUẬT
                </option>
              </select>
            </div>
          </div>

          <div className={`${styles.mb_3} ${styles["col-lg-12"]}`}>
            <div>
              Chức năng này sẽ chuyển toàn bộ đối tượng (Tiềm năng, Khách hàng,
              Liên hệ) và toàn bộ công việc dở dang (Cơ hội, Báo giá, Đơn hàng,
              Hóa đơn, Trả lại hàng bán, Lịch hẹn, Lịch chăm sóc) của người bàn
              giao sang cho người được bàn giao.
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc thành công!"}
        link={"/crm/setting/main"}
      />
    </>
  );
};

export default ShareActionModal;
