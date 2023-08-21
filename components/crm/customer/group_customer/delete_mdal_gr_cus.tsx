import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";
import Cookies from "js-cookie";
import { random } from "lodash";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  link: string;
  id?: any;
  updateData?: any;
  keyDeleted?: any;
  setChange: any;
}
const CancelModalDelGroup: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy nhập tiềm năng từ file, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy nhập tiềm năng từ file",
  link = "/potential/list",
  id,
  updateData,
  keyDeleted,
  setChange,
}) => {
  console.log(typeof keyDeleted);
  const router = useRouter();
  const accessToken = Cookies.get("token_base365");
  console.log(keyDeleted);
  const handleOK = async () => {
    setIsModalCancel(false);
    if (typeof keyDeleted === "number") {
      updateData(
        `${base_url}/api/crm/group/delete_khach_hang`,
        `${Cookies.get("token_base365")}`,
        "POST",
        { listDeleteId: [keyDeleted] }
      );
    } else {
      const delArray = keyDeleted?.map((keyDel) => {
        updateData(
          `${base_url}/api/crm/group/delete_khach_hang`,
          `${Cookies.get("token_base365")}`,
          "POST",
          { listDeleteId: [keyDel] }
        );
      });
      await Promise.all(delArray);
    }
    setChange(Math.random());
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

export default CancelModalDelGroup;
