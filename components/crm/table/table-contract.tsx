import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên hợp đồng",
    width: 200,
    dataIndex: "filename",
    key: "0",
    render: (data,record) => (
      <Link href={`detail/${record}`}>     <Tooltip title={data}>
      <span>{data}</span>
    </Tooltip></Link>
 
    ),
  },
  {
    title: "Người tạo",
    dataIndex: "personname",
    key: "1",
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "date1",
    key: "2",
    width: 150,
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 200,
    // fixed:"right",
    render: () => (
      <>
        <Link href={"/contract/edit_contract"}>
          <button>
            <img
              className={styles.icon_edit}
              src="https://crm.timviec365.vn/assets/img/h_edit_cus.svg"
            />
            Sửa
          </button>
        </Link>
        <Link href={"#"}>
          <button>
            <img
              className={styles.icon_delete}
              src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
            />
            Xóa
          </button>
        </Link>
      </>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableDataContracDrops {
  setSelected: (value: boolean) => void;
}

const TableDataContract: React.FC<TableDataContracDrops> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContract;
