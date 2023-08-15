import { Modal, Input, Select, Button, Form, Avatar } from "antd";
import styles from "./modal-chinh-sua.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { DaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su";
import { IconSelect } from "../../danh-sach-nhan-su-chua-thiet-lap/anh";
import moment from "moment";
const dataBaoThue = [
  {
    value: "",
    label: "Chọn loại thuế",
  },
  {
    value: "luong co ban",
    label: "Thuế tính theo lương cơ bản",
  },
  {
    value: "luong nhap vao",
    label: "Thuế tính theo lương nhập vào",
  },
  {
    value: "moi",
    label: "Thuế mới",
  },
];
export function ModalChinhSua(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  key: String,
  info: any
) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Chỉnh sửa thuế nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        {data.map((Data: any, index: number) => {
          if (key === Data.key) {
            const handleChange = (value: {
              value: string;
              label: React.ReactNode;
            }) => {};
            return (
              <div key={index}>
                <div>
                  <div>
                    <div className={styles.info} key={index}>
                      <div className={styles.khungavata}>
                        <Avatar
                          src={info.url}
                          style={{
                            width: "46px",
                            height: "46px",
                            margin: "auto",
                          }}
                        />
                      </div>
                      <div className={styles.infotext}>
                        <p className={styles.title}>{info.title}</p>
                        <p>ID: {info.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Áp dụng từ tháng
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Input type="month" defaultValue={moment(Data?.ADTN).format("YYYY-MM")} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Đến tháng (Không bắt buộc)
                    </p>
                  </div>
                  <Input type="month" defaultValue={moment(Data?.DN).format("YYYY-MM")} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Loại Thuế
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Select
                    labelInValue
                    defaultValue={{ value: "", label: "Chọn loại thuế" }}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={dataBaoThue}
                    suffixIcon={<IconSelect />}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={styles.huy} onClick={() => setOpen(false)}>
                    <p className={styles.texthuy}>Huỷ</p>
                  </button>
                  <button className={styles.luu}>
                    <p className={styles.textluu}>Lưu</p>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </Modal>
  );
}
