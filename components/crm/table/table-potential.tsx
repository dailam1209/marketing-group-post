import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã tiềm năng",
    width: 120,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Xưng hô",
    width: 150,
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Họ và tên",
    dataIndex: "address",
    key: "1",
    width: 300,
    render: (data) => (
      // <Tooltip title={data}>
      <Link href={`/potential/detail/${data}`}>
        <span>{data}</span>
        </Link>
      // </Tooltip>
    ),
  },
  {
    title: "Chức danh",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Điện thoại cá nhân",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "Email cá nhân",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "Điện thoại cơ quan",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Email cơ quan",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Tỉnh/Thành phố",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Quận/Huyện",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Phường/Xã",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Nguồn gốc",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Loại hình",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Lĩnh vực",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Mô tả",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Loại hình",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Người tạo",
    dataIndex: "operation",
    key: "6",
    width: 200,
    // fixed:"right",
    // render: () => (
    //   <button className="action_table">
    //     <img src="/crm/3_cham.png" />
    //     Thao tác
    //   </button>
    // ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    operation: `Nguyen Van Hung`,
  });
}

interface TableDataPotentialProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataPotential: React.FC<TableDataPotentialProps> = ({
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
        scroll={{ x: 1500, y: 300 }}
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
          Tổng số: <b>{data.length}</b> Tiềm năng
        </div>
      </div>
    </div>
  );
};

export default TableDataPotential;
