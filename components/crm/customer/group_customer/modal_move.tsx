import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useState } from "react";
import stylesBtn from "@/styles//crm/button.module.css";
import styles from "./customer_group.module.css";
function ModalGroupCustomerMove({ isOpenModalMove, setIsOpenModalMove }) {
  const [formData, setFormData] = useState({});
  let data = [];
  for (let i = 1; i < 20; i++) {
    data.push({ value: i, label: `Nhân viên ${i}` });
  }
  return (
    <Modal
      title={"Chuyển giỏ"}
      centered
      footer={null}
      open={isOpenModalMove}
      onCancel={() => setIsOpenModalMove(false)}
      className={"mdal_cancel"}
    >
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Chọn nhân viên"
          data={data}
          formData={formData}
          setFormData={setFormData}
          name={"TRường cần chọn"}
        />
      </div>
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Chọn nhân viên"
          data={data}
          formData={formData}
          setFormData={setFormData}
          name={"TRường cần chọn"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className={stylesBtn.back_button}>Chuyển giỏ</button>
      </div>{" "}
    </Modal>
  );
}

export default ModalGroupCustomerMove;
