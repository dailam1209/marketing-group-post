import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ChatBusinessBody from "@/components/crm/chat/chat_body";
import styleCustomer from "../customer.module.css";
import Image from "next/image";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const CallModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [isOpenMdalZoom, setIsOpenModalZoom] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setIsOpenModalZoom(false);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Trợ lý kinh doanh"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal ctent_call_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ textAlign: "left" }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap" }}
          className={styleCustomer.wrapp}
        >
          <div className={styleCustomer.content_history}>
            <div className={styleCustomer.box_content_history_title}>
              <p className={styleCustomer.title_box_content}>
                Nội dung lịch sử chăm sóc
              </p>
              <button
                onClick={() => {
                  setIsModalCancel(false);
                  setIsOpenModalZoom(true);
                }}
                type="button"
                id="callAppointmentZoom"
                className=""
              >
                <Image
                  width={16}
                  height={16}
                  alt="zoom"
                  src="https://crm.timviec365.vn/assets/icons/crm/customer/zoom_out.svg"
                />
                Phóng to
              </button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{textAlign:'left', fontSize:'15px', paddingLeft:'20px', textDecoration:'underline'}}>Thông tin khách hàng</div>
            <ChatBusinessBody />
          </div>
        </div>
      </Modal>

      <Modal
        title={"Trợ lý kinh doanh"}
        centered
        open={isOpenMdalZoom}
        onOk={() => handleOK()}
        onCancel={() => {
          setIsOpenModalZoom(false);
          setIsModalCancel(false);
        }}
        className={"mdal_cancel email_add_mdal ctent_call_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ textAlign: "left" }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap" }}
          className={styleCustomer.wrapp}
        >
          <div className={styleCustomer.content_history_}>
            <div className={styleCustomer.box_content_history_title}>
              <p className={styleCustomer.title_box_content}>
                Nội dung lịch sử chăm sóc
              </p>
              <button
                onClick={() => {
                  setIsOpenModalZoom(false);
                  setIsModalCancel(true);
                }}
                type="button"
                id="callAppointmentZoom"
                className=""
              >
                <Image
                  width={16}
                  height={16}
                  alt="zoom"
                  src="	https://crm.timviec365.vn/assets/icons/crm/customer/zoom_in.svg"
                />
                Thu nhỏ
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CallModal;
