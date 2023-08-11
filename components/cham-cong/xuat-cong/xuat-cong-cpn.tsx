import "./xuat-cong-cpn.module.css"
import { Table } from "antd"
import { DataType } from "@/pages/cham-cong/xuat-cong/index"
import type { ColumnsType } from "antd/es/table"
import Image from "next/image"
export function xuatCong(data: DataType[]) {
  const columns: ColumnsType<DataType> = [
    {
      title: <p style={{ color: "#fff" }}>Ảnh</p>,
      dataIndex: "url",
      align: "center",
      render: (record) => <Image src={record} alt="/" width={46} height={46} />,
      width: 100
    },
    {
      title: <p style={{ color: "#fff" }}>Họ tên (ID)</p>,
      render: (record: any) => <p>{record?.name}</p>,
      align: "center"
    },
    {
      title: <p style={{ color: "#fff" }}>Ngày tháng</p>,
      render: (record: any) => <p>{record?.date}</p>,
      align: "center"
    },
    {
      title: <p style={{ color: "#fff" }}>Thời gian</p>,
      render: (record: any) => <p>{record?.time}</p>,
      align: "center"
    }
  ]
  return (
    <div>
      <Table
        className={`table_xuat_cong`}
        columns={columns}
        dataSource={data}
        sticky={true}
        scroll={{ x: "1000px" }}
        pagination={{ position: ["bottomCenter"] }}
      ></Table>
    </div>
  )
}
