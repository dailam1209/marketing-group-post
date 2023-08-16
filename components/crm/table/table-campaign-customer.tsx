import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  note: string;
  staff: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã KH",
    width: 80,
    dataIndex: "number",
    key: "number",
    
  },
  {
    title: "Tên khách hàng",
    width: 120,
    dataIndex: "name",
    key: "name",
    render:(text:any,record:any)=><Link href={`/crm/customer/detail/${record.key}`} ><b>{text}</b></Link>
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    width: 150,
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
    key: "note",
    width: 320,
    ellipsis: true,
  },
  {
    title: "Nhân viên thực hiện",
    dataIndex: "staff",
    key: "staff",
    width: 120,
  },
  
];



export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `ĐH-000${i}`,
    name: `Nguyễn Trần Kim Phượng`,
    status: `Chờ duyệt`,
    note: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
    staff: `10000000`,
   
  });
}

interface TableDataCampaignCustomerProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataCampaignCustomer: React.FC<TableDataCampaignCustomerProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ");
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(selectedRows);
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
        scroll={{ x: 1200, y: 1200 }}
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
          Tổng số: <b>{data.length}</b> Khách hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignCustomer;
