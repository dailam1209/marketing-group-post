import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  handlePause?: (value: number) => void;
  id?: number;
}
const PauseActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  handlePause,
  id,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    handlePause(id);
    // router.push("/list");
  };

  return (
    <>
      <Modal
        title={"Xác nhận tạm dừng chiến dịch"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn tạm dừng chiến dịch này không?</div>
      </Modal>
    </>
  );
};

export default PauseActionModal;
