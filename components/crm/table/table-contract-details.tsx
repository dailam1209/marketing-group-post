import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
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
    width: 80,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên hợp đồng",
    width: 160,
    dataIndex: "filename",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "date1",
    key: "2",
    width: 130,
  },
  {
    title: "Người tạo",
    dataIndex: "personname",
    key: "1",
    width: 150,
  },
  {
    title: "Trạng thái",
    dataIndex: "date2",
    key: "3",
    width: 100,
  },
  {
    title: "Gửi hợp đồng",
    dataIndex: "date2",
    key: "3",
    width: 130,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 120,
    // fixed:"right",
    render: () => (
      <>
        {/* <Link href={"/contract/edit_contract"}> */}
        <button>
          <img
            className={styles.icon_edit}
            src="https://crm.timviec365.vn/assets/img/h_edit_cus.svg"
          />
          Sửa
        </button>
        {/* </Link> */}
        {/* <Link href={"#"}> */}
        <button>
          <img
            className={styles.icon_delete}
            src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
          />
          Xóa
        </button>
        {/* </Link> */}
      </>
    ),
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 1; i++) {
//   data.push({
//     key: i + 1,
//     filename: `Dulich.docx ${i}`,
//     personname: `NguyenVanHung`,
//     operation: "",
//     date1: `10/07/2023`,
//     date2: `17/07/2023`,
//   });
// }

interface TableDataContracDrops {
}

const TableDataContractDetailList: React.FC<TableDataContracDrops> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContractDetailList;
