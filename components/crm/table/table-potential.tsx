import React, { useState } from "react";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  salutation: string;
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
    dataIndex: "salutation",
    key: "salutation",
  },
  {
    title: "Họ và tên",
    dataIndex: "address",
    key: "1",
    width: 300,
    render: (data) => (
      // <Tooltip title={data}>
      <Link href={`/crm/potential/detail/${data}`}>
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
    salutation: `Anh`,
    address: `London Park no. ${i}`,
    operation: `Nguyen Van Hung`,
  });
}

interface TableDataPotentialProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setRowDataSelected: any;
}

const TableDataPotential: React.FC<TableDataPotentialProps> = ({
  setSelected,
  setNumberSelected,
  setRowDataSelected,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length >= 1) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
  };
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 300 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} Tiềm năng`,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
          },
        }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
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
