import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import Link from "next/link";
import QuoteActionTable from "../quote/quote_action_table";

interface DataType {
  key: React.Key;
  order_number: string;
  status: string;
  customer: string;
  explain: string;
  value: number;
  name: string;
  order_date: string;
  order_status: string;
  delivery_status: string;
}

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataQuote: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const [key, setKey] = useState();
  const [allKey, setAllKey] = useState<any>();
  const columns: ColumnsType<DataType> = [
    {
      title: "Số báo giá",
      width: 120,
      dataIndex: "order_number",
      key: "order_number",
      render: (text: any, record: any) => (
        <Link href={`/quote/detail/${record.order_number}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      width: 120,
      dataIndex: "status",
      key: "status",
      render: (text) => <div style={{ color: "#34B632" }}>{text}</div>,
    },
    {
      title: "Ngày báo giá",
      dataIndex: "order_date",
      key: "order_date",
      width: 250,
    },
    {
      title: "Hiệu lực đến ngày",
      dataIndex: "order_date",
      key: "order_date",
      width: 250,
    },
    {
      title: "Khách hàng",
      dataIndex: "explain",
      key: "customer",
      width: 300,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "value",
      key: "value",
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "customer",
      key: "customer",
      width: 300,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (text: any, record: any) => (
        <div onClick={() => setKey(record.order_number)}>
          <QuoteActionTable record={key} allKey={allKey} />
        </div>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      key: i,
      order_number: `ĐH-000${i}`,
      status: `Chờ duyệt`,
      customer: `Nguyễn Trần Kim Phượng`,
      explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
      value: 10000000,
      name: `Nguyễn Văn Nam`,
      order_date: "01/08/2023",
      order_status: `Đã thanh toán một phần`,
      delivery_status: `Chưa giao hàng`,
    });
  }
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setAllKey(selectedRows);
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 1200 }}
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

export default TableDataQuote;
