import React, { useRef, useState } from "react";
import { Modal, Select, notification } from "antd";
import styles from "../../potential/potential.module.css";
import styleCustomer from "../customer.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import type { SelectProps } from "antd";
import ModalCompleteStepDEl from "../../potential/potential_steps/mdaldel_completeCus";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  selectedCus: any;
}

const DelCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  selectedCus,
}) => {
  const [valueSharing, setValueSharing] = useState("");
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const options: SelectProps["options"] = [];
  let cus_id = [];
  selectedCus?.map((item) => {
    cus_id.push(item.cus_id);
  });
  const handleOK = async () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    try {
      await fetch("http://210.245.108.202:3007/api/crm/customer/deleteKH", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: cus_id }),
      });
    } catch (error) {
      console.log("error", error);
    }

  };

  return (
    <>
      <Modal
        title={"Xóa khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        Xác nhận xóa khách hàng đã chọn?
      </Modal>
      <ModalCompleteStepDEl
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
      />
    </>
  );
};

export default DelCustomerModal;
