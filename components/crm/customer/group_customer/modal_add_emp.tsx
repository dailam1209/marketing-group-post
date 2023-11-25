import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useState } from "react";
import stylesBtn from "@/styles//crm/button.module.css";
import styles from "./customer_group.module.css";
function ModalGroupCustomerAddEmp({ isOpenModalAddEmp, setIsOpenModalAddEmp }) {
  const [formData, setFormData] = useState({});
  let data = [];
  for (let i = 1; i < 20; i++) {
    data.push({ value: i, label: `Nhân viên ${i}` });
  }
  return (
    <Modal
      title={"Thêm cán bộ vào nhóm"}
      centered
      footer={null}
      open={isOpenModalAddEmp}
      onCancel={() => setIsOpenModalAddEmp(false)}
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
          title="Chọn nhóm"
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
        <button className={stylesBtn.back_button}>Thêm</button>
      </div>{" "}
    </Modal>
  );
}

export default ModalGroupCustomerAddEmp;
