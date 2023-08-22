import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ChatBusinessBody from "@/components/crm/chat/chat_body";
import styleCustomer from "../customer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  cusId: any;
}

const CallModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  cusId,
}) => {
  const [content, setContent] = useState();
  const [datae, setDate] = useState<any>();
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [isOpenMdalZoom, setIsOpenModalZoom] = useState(false);
  const currentTime = new Date();

  // Định dạng thời gian theo chuỗi "YYYY-MM-DD HH:mm:ss"
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const handleOK = () => {
    setDate(formattedTime);
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setIsOpenModalZoom(false);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };
  const router = useRouter();
  return (
    <>
      <Modal
        title={"Trợ lý kinh doanh"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => (
          setIsModalCancel(false)
        )}
        className={"mdal_cancel email_add_mdal ctent_call_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ textAlign: "left" }}
        centered
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
                  src="/crm/zoom_out.svg"
                />
                <p style={{ color: "#4C5BD4" }}> Phóng to</p>
              </button>
            </div>
            <div style={{ paddingTop: 10 }}>
              <fieldset
                style={{
                  display: "block",
                  border: "1px solid #d6cece",
                  padding: 10,
                  borderRadius: 10,
                  height: 100,
                  borderBottom: "90%",
                }}
              >
                <div style={{ display: "block" }}>
                  <div style={{ float: "left" }}> {datae}</div> <br />
                  <div style={{ float: "left" }}> {content}</div>
                </div>
              </fieldset>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                textAlign: "left",
                fontSize: "15px",
                paddingLeft: "20px",
                textDecoration: "underline",
              }}
            >
              Thông tin khách hàng
            </div>
            <ChatBusinessBody
              cusId={cusId}
              setContent={setContent}
              setDate={setDate}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title={"Trợ lý kinh doanh"}
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
                  src="/crm/zoom_out.svg"
                />
                Thu nhỏ
              </button>
            </div>
            <div style={{ paddingTop: 10 }}>
              <fieldset
                style={{
                  display: "block",
                  border: "1px solid #d6cece",
                  padding: 10,
                  borderRadius: 10,
                  height: 100,
                  borderBottom: "90%",
                  width: "90%",
                }}
              >
                <div style={{ display: "block" }}>
                  <div style={{ float: "left" }}> {datae}</div> <br />
                  <div style={{ float: "left" }}> {content}</div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CallModal;
