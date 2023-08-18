import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  link: string;
  id?:any,
  updateData?:any
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy nhập tiềm năng từ file, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy nhập tiềm năng từ file",
  link = "/potential/list",
  id,
  updateData
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    updateData(
      "http://210.245.108.202:3007/api/crm/customerStatus/delete",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIxNTY1MTksImV4cCI6MTY5MjI0MjkxOX0.1M55PZxSpovkNVmdGkd10pz-a7D0ApuqLOmsmBghh7w",      "POST",
      {stt_id:id}
    );
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>{content}</div>
      </Modal>
    </>
  );
};

export default CancelModal;
