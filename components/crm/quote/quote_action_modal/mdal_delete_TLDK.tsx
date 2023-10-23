import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  record: any;
  onClose: any;
}
const DelTLDK: React.FC<MyComponentProps> = ({
  isModalCancel,
  onClose,
  record,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa tài liệu đính kèm"}
        centered
        open={isModalCancel}
        onCancel={() => onClose()}
        className={"mdal_cancel"}
        onOk={() => (setIsMdalSuccess(true), onClose())}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa tài liệu đính kèm {`${record}`}</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Xóa tài liệu đính kèm ${record} thành công!`}
        link={"#"}
      />
    </>
  );
};

export default DelTLDK;
