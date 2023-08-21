import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";
import Image from "next/image";
import Cookies from "js-cookie";
interface MyComponentProps {
  datatable: any;
  isModalOpen: any;
  setIsModalOpen: any;
  fillStart: any;
  setFillStart: any;
  fillEnd: any;
  setFillEnd: any;
  handleGet: any;
  setPhongban:any
}
const FilterThongKe: React.FC<MyComponentProps> = ({
  datatable,
  isModalOpen,
  setIsModalOpen,
  fillStart,
  setFillStart,
  fillEnd,
  setFillEnd,
  handleGet,
  setPhongban
  
}) => {
  const [listPB, setlistPB] = useState([]);

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
  const handleGetPhongBan = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ com_id: Cookies.get("com_id") }),
      }
    );
    const data = await res.json();
    setlistPB(data?.data?.data);
  };
  const handleSlectPB = (value:any) =>{
    setPhongban(value)
  }
  useEffect(() => {
    handleGetPhongBan();
  }, []);
  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        {/* <NodeIndexOutlined /> */}
        <Image width={23} height={23} src={"filter_alt.svg"} alt="" />
        <p>Bộ lọc</p>
      </button>
      <Modal
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "111%",
              margin: "-20px -25px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                paddingTop: 5,
              }}
            >
              Bộ lọc
            </div>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter}
      >
        <div className={styles.containerfillter}>
          <div className={styles.item1}>
            <div style={{ width: 120 }}>Thời gian</div>
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div>Đến</div>
              <div>
                <Input onChange={handleDateChange2} type="date"></Input>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 100 }}>Phòng ban</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: "100%" }}>
                <Select onChange={handleSlectPB} style={{ width: 145 }} placeholder="Chọn phòng ban">
                  {listPB &&
                    listPB.length > 0 &&
                    listPB?.map((item: any, index: number) => {
                      return (
                        <option key={index} value={item?.dep_name}>
                          {item?.dep_name}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.footerBTN}>
            <div style={{ color: "#4c5bd4" }}>
              <Button
                onClick={handleCancel}
                style={{ color: "#4c5bd4", border: "1px solid #4c5bd4" }}
              >
                {" "}
                Hủy
              </Button>
            </div>

            <Button
              style={{ color: "#fff", background: "#4c5bd4" }}
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

export default FilterThongKe;
