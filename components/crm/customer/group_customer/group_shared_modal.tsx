import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import TableSharedFactor from "@/components/crm/table/table-shared-factor";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const GroupSharedAFactorModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Đối tượng được chia sẻ"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal shared_factor"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ marginTop: "-40px" }}>
          <TableSharedFactor />
        </div>
      </Modal>
    </>
  );
};

export default GroupSharedAFactorModal;
