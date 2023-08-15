import { Modal, Input, Select, Button, Form, Avatar } from "antd"
import styles from "./modal-thiet-lap-nhan-su.module.css"
import Image from "next/image"
import React, { useState } from "react"
import { DaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su"
import { IconSelect } from "../anh"
const dataBaoThue = [
  {
    value: "",
    label: "Chọn loại bảo thuế"
  },
  {
    value: "luong co ban",
    label: "Thuế tính theo lương cơ bản"
  },
  {
    value: "luong nhap vao",
    label: "Thuế tính theo lương nhập vào"
  },
  {
    value: "moi",
    label: "Thuế mới"
  }
]
export function ModalThiepLapNhanSu(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  key: String
) {
  const [modalAdd, setModalAdd] = useState(false)
  const [modalNext, setModalNext] = useState(false)
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thuế nhân viên</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        {data.map((Data: any) => {
          if (key === Data.key) {
            const handleChange = (value: {
              value: string
              label: React.ReactNode
            }) => {
              // console.log(value) 
              // { value: "lucy", key: "lucy", label: "Lucy (101)" }
            }
            return (
              <div key={Data.key}>
                <div className={styles.info}>
                  <div>
                    <Avatar
                      src={Data.url}
                      style={{ width: "46px", height: "46px", margin: "auto" }}
                    />
                  </div>
                  <div style={{ margin: "0 0 0 10px" }}>
                    <p className={styles.name}>{Data.title}</p>
                    <p>ID: {Data.id}</p>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Áp dụng từ tháng
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Input type="month" />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Đến tháng (Không bắt buộc)
                    </p>
                  </div>
                  <Input type="month" />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ color: "#474747", marginRight: "4px" }}>
                      Loại thuế
                    </p>{" "}
                    <p style={{ color: "#FF5B4D" }}>*</p>
                  </div>
                  <Select
                    labelInValue
                    defaultValue={{ value: "", label: "Chọn loại thuế" }}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={dataBaoThue}
                    suffixIcon={<IconSelect/>}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={styles.huy}>
                    <p
                      className={styles.texthuy}
                      onClick={() => setOpen(false)}
                    >
                      Huỷ
                    </p>
                  </button>
                  <button className={styles.luu}>
                    <p className={styles.textluu}>Lưu</p>
                  </button>
                </div>
              </div>
            )
          }
        })}
      </div>
    </Modal>
  )
}
