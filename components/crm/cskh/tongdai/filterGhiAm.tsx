import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";
import Image from "next/image";

interface MyComponentProps {
  datatable: any;
  isModalOpen: any;
  setIsModalOpen: any;
  fillStart: any;
  setFillStart: any;
  fillEnd: any;
  setFillEnd: any;
  handleGet: any;
  soNghe: any;
  setSoNghe: any;
  nv: any;
  setnv: any;
}
const FilterGhiAm: React.FC<MyComponentProps> = ({
  datatable,
  isModalOpen,
  setIsModalOpen,
  fillStart,
  setFillStart,
  fillEnd,
  setFillEnd,
  handleGet,
  soNghe,
  setSoNghe,
  nv,
  setnv,
}) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleGet();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDateChange = (e: any) => {
    setFillStart(`${e.target.value} 00:00:00`);
  };
  const handleDateChange2 = (e: any) => {
    setFillEnd(`${e.target.value} 23:59:59`);
  };
  // const uniqueCounts = Array.from(new Set(datatable?.map(item => item.caller))); // Lọc giá trị duy nhất
  const uniqueCounts = [
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
    201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220,
    221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
    301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
    321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340
  ];
  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        {/* <NodeIndexOutlined /> */}
        <Image width={23} height={23} src={"/crm/filter_alt.svg"} alt="" />
        <p>Bộ lọc</p>
      </button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter2}
      >
        <div className={styles.custom_filter}>Bộ lọc</div>

        <div className={styles.containerfillter}>
          <div className={styles.item1}>
            <div className={styles.item_time}>Thời gian</div>
            <div className={styles.filter_time}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 10,
                  gap: 10,
                }}
              >
                <div>Từ</div>
                <div>
                  <Input onChange={handleDateChange} type="date"></Input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div>Đến</div>
                <div>
                  <Input onChange={handleDateChange2} type="date"></Input>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 130 }}>Nhân viên</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Select
                  placeholder="Chọn nhân viên"
                  value={nv}
                  onChange={(value) => setnv(value)}
                >
                  {uniqueCounts.map((count: any, index: number) => {
                    return (
                      <option key={index} value={count}>
                        {count}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 130 }}>Số người nghe</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Input
                  type="text"
                  value={soNghe}
                  onChange={(event) => setSoNghe(event.target.value)}
                ></Input>
              </div>
            </div>
          </div>
          <div className={styles.footerBTN}>
            <div style={{ color: "#4c5bd4" }}>
              <Button
                onClick={handleCancel}
                style={{
                  color: "#4c5bd4",
                  border: "1px solid #4c5bd4",
                  width: 100,
                }}
              >
                Hủy
              </Button>
            </div>

            <Button
              style={{ color: "#fff", background: "#4c5bd4", width: 100 }}
              onClick={handleGet}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterGhiAm;
