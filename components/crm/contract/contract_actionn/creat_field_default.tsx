import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import FieldSelectBoxStep from "../../potential/potential_steps/select_box_step";
// import PotentialSelectBoxStep from "../potential_steps/select_box_step";
// import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const CreatFieldDefaultModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
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
        okText="Đóng lại"
        cancelText="Lưu"
      >
        <div className={styles.row_mdal} style={{minHeight: "fit-content"}}>
          <div className={styles.choose_obj}>
            <FieldSelectBoxStep
              value="Chọn trường mặc định"
              placeholder="Chọn trường mặc định"
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
