import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "../quote/quote_action_table";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  total: string;
  address: string;
  order_status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đơn hàng",
    width: 100,
    dataIndex: "number",
    key: "number",
    render: (text: any) => (
      <Link href={"/order/detail"}>
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
    title: "Diễn giải",
    dataIndex: "name",
    key: "name",
    width: 200,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Giá trị (VNĐ)",
    dataIndex: "total",
    key: "total",
    width: 150,
  },
  {
    title: "Người thực hiện",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <Link href={"/crm/customer/contact/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },

  {
    title: "Ngày đặt hàng",
    dataIndex: "address",
    key: "address",
    width: 150,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <OrderActionTable record={record.number} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `ĐN-000${i}`,
    name: "Nguyễn Trần Kim Phượng",
    status: "Đã xuất",
    total: "10.000.000.000",
    address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
    order_status: `Chưa gửi`,
  });
}

interface TableDataCampaignProps {}

const TableDataCampaign: React.FC<TableDataCampaignProps> = () => {
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
          Tổng số: <b>{data.length}</b> Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaign;
