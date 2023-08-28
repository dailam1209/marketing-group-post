import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import FieldSelectBoxStep from "../../potential/potential_steps/select_box_step";
import FieldDefaultEditCOntract from "../../potential/potential_steps/field_default_edit_contract";
// import PotentialSelectBoxStep from "../potential_steps/select_box_step";
// import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  handleReplaceValues: any;
}

const CreatFieldDefaultModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  handleReplaceValues,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [value, setValue] = useState("");
  const data = [
    "@Tên công ty",
    "@Địa chỉ",
    "@Số điện thoại",
    "@ngày",
    "@tháng",
    "@năm",
    "@mã số thuế",
    "@Tên chuyên viên",
    "@Số điện thoại chuyên viên",
    "@Email chuyên viên",
    "@Ngân hàng nhận tiền",
    "@Số tài khoản ngân hàng",
    "@Chủ tài khoản",
  ];

  const handleOK = () => {
    if (value) {
      setIsModalCancel(false);
      handleReplaceValues(value);
    } else {
      alert("Bạn chưa chọn trường");
    }
  };

  return (
    <>
      <Modal
        title={"Trường hệ thống xây dựng mặc định"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Lưu"
        cancelText="Đóng lại"
      >
        <div className={styles.row_mdal} style={{ minHeight: "fit-content" }}>
          <div className={styles.choose_obj}>
            <FieldDefaultEditCOntract
              value={value || "Chọn trường mặc định"}
              placeholder="Chọn trường mặc định"
              data={data}
              setValue={setValue}
              handleReplaceValues={handleReplaceValues}
            />
          </div>
        </div>
      </Modal>
      {/* <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        link={"/potential/list"}
      /> */}
    </>
  );
};

export default CreatFieldDefaultModal;
