import { Modal, Table, Row, Col, Card } from "antd";
import styles from "./modal-danh-sach.module.css";
import type { ColumnsType } from "antd/es/table";
import { XoaLich } from "../modal-xoa/modal-xoa";
import { useEffect, useState } from "react";
import { POST } from "@/pages/api/BaseApi";
interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  phone: string;
  email: string;
}

// const data = [
//   {
//     key: "504000",
//     url: "/anhnhanvien.png",
//     name: "Hồ Mạnh Hùng",
//     room: "Kĩ thuật",
//     phone: "0123456789",
//     email: "abc@gmail.com",
//   },
//   {
//     key: "504001",
//     url: "/anhnhanvien.png",
//     name: "Hồ Mạnh Hùng",
//     room: "Kĩ thuật",
//     phone: "0123456789",
//     email: "abc@gmail.com",
//   },
//   {
//     key: "504002",
//     url: "/anhnhanvien.png",
//     name: "Hồ Mạnh Hùng",
//     room: "Kĩ thuật",
//     phone: "0123456789",
//     email: "abc@gmail.com",
//   },
// ];

export function DanhSach(open: boolean, setOpen: Function, cySelected: any, listEmpInCy: any) {
  const [xacNhan, setXacNhan] = useState(false);
  const [data, setData]: any = useState(listEmpInCy);
  const [selectedRow, setSelectedRow]: any = useState({});

  useEffect(() => {
      setData(listEmpInCy)
  }, [listEmpInCy]);

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "url",
      align: "center",
      width: "70px",
      render: (record) => (
        <img src={record} style={{ height: "46px", width: "46px" }} />
      ),
    },
    {
      title: (
        <p style={{ fontSize: "18px", textAlign: "center", color: "#fff" }}>
          Họ và tên
        </p>
      ),
      align: "left",
      render: (record) => (
        <div style={{ marginLeft: "10px" }}>
          <div style={{ color: "#4C5BD4", fontSize: "18px" }}>
            {record?.name}
          </div>
          <p>{record?.key}</p>
        </div>
      ),
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Phòng ban</p>,
      align: "center",
      render: (record: any) => <p>{record.room}</p>,
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Số điện thoại</p>,
      render: (record: any) => <p>{record.phone}</p>,
      align: "center",
    },
    {
      title: <p style={{ fontSize: "18px", color: "#fff" }}>Email</p>,
      render: (record: any) => <p>{record.email}</p>,
      align: "center",
    },
    {
      title: "",
      dataIndex: "delete",
      align: "center",
      width: "100px",
      render: (_, record: { key: React.Key }) => (
        <img
          src="/delete-icon.png"
          onClick={() => {
            setSelectedRow(record)
            setXacNhan(true);
          }}
        />
      ),
    },
  ];
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      style={{ color: "#474747" }}
    >
      <div className={styles.body}>
        <div className={styles.header} style={{ fontSize: "22px" }}>
          Lịch làm việc tháng 6
        </div>
        <div
          className={styles.headerTxt}
          style={{ marginTop: "5px", marginBottom: "20px" }}
        >
          Danh sách nhân viên
        </div>
        <div
          style={{ borderBottom: "1px solid #9F9F9F", marginBottom: "20px" }}
        >
          <Row>
            <Col
              lg={3}
              md={5}
              sm={4}
              xs={10}
              style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid #4C5BD4",
              }}
            >
              <p className={styles.headerTxt} style={{ color: "#4c5bd4" }}>
                Nhân viên ({data?.length})
              </p>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            scroll={{ x: "900px" }}
            className={`table_lich_lam_viec`}
            columns={columns}
            dataSource={data}
            sticky={true}
            pagination={{ position: ["bottomCenter"] }}
          ></Table>
        </div>
      </div>
      {XoaLich(
        xacNhan,
        setXacNhan,
        "Bạn chắc chắn muốn xóa nhân viên này khỏi lịch làm việc không ?",
        cySelected,
        selectedRow,
        data,
        setData
      )}
    </Modal>
  );
}
