import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import QuoteActionLichHenTable from "../quote/action_lich_hen_table";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  total: string;
  address: string;
  order_status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên lịch hẹn",
    width: 300,
    dataIndex: "number",
    key: "number",
    render: (text: any, record: any) => (
      <Link href={`/crm/customer/schedule/detail/${record.key}/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    title: "Thời gian thực hiện",
    dataIndex: "date",
    key: "date",
    width: 200,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Nhân viên thực hiện",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/crm/user_kh.png"></img>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <QuoteActionLichHenTable record={record.number} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `Lịch hẹn - Nguyễn Thị Hòa${i}`,
    name: "Nguyễn Trần Kim Phượng",
    status: "Đã hủy",
    total: "10.000.000.000",
    address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
    order_status: `Chưa gửi`,
    date: "09/08/2023",
  });
}

interface TableDataCampaignProps {}

const TableDataLichhen: React.FC<TableDataCampaignProps> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select className="show_item">
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Lịch hẹn
        </div>
      </div>
    </div>
  );
};

export default TableDataLichhen;
