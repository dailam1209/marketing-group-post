import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ConvertModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const [isOpenMdalComplete, setIsOpenMdalConplete] = useState(false)
  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalConplete(true)
    setTimeout(()=>{
      setIsOpenMdalConplete(false)
    }, 2000)
  };

  return (
    <>
      <Modal
        title={"Chuyển đổi tiềm năng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className="type_convert " style={{ textAlign: "left" }}>
          <p className="d-flex-radio-mdal">
            <input type="radio" name="type" className="company" />
            Thành Khách hàng doanh nghiệp{" "}
          </p>
          <p className="d-flex-radio-mdal">
            <input type="radio" name="type" className="personal" />
            Thành Khách hàng cá nhân{" "}
          </p>
        </div>
      </Modal>

      <ModalCompleteStep modal1Open={isOpenMdalComplete} setModal1Open={setIsOpenMdalConplete} title={"Chuyển đổi tiềm năng thành khách hàng thành công!"} link={"/potential/list"} />
    </>
  );
};

export default ConvertModal;
