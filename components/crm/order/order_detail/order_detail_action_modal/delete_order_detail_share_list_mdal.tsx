import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../order.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    // router.push("order/detail");
  };

  return (
    <>
      <Modal
        title={"Xác nhận gỡ bỏ chia sẻ"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?</div>
        
      </Modal>
    </>
  );
};

export default DelActionModal;
