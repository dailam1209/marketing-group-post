import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import CancelModal from "../potential/potential_steps/cancel_modal";
import GroupSharedAFactorModal from "../customer/group_customer/group_shared_modal";
import Image from "next/image";

interface TableDataGroupListCustomerProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataGroupListCustomer: React.FC<TableDataGroupListCustomerProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);

  interface DataType {
    key: React.ReactNode;
    name: string;
    age: number;
    address: string;
    children?: DataType[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhóm khách hàng",
      width: 300,
      dataIndex: "name",
      key: "name",
      render: (data) => (
        <Link
          target="_blannk"
          href={`/danh-sach-khach-hang/group_parent/${data}`}
        >
          <span>{data}</span>
        </Link>
      ),
    },
    {
      title: "Đối tượng được chia sẻ",
      width: 160,
      dataIndex: "age",
      key: "age",
      render: (data) => (
        // <Tooltip title={data}>
        <button onClick={() => setOpenSharedModal(true)}>
          <img
            alt="logo"
            width={26}
            height={26}
            src={"https://crm.timviec365.vn/assets/img/user_kh.png"}
          />
        </button>
        // </Tooltip>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "address",
      key: "1",
      width: 280,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "6",
      width: 120,
      // fixed:"right",
      render: (id) => (
        <>
          <Link href={`/crm/customer/group/edit/${id}`}>
            <button>
              <img
                className={styles.icon_edit}
                src="https://crm.timviec365.vn/assets/img/h_edit_cus.svg"
              />
              Sửa
            </button>
          </Link>
          <button onClick={() => setIsOpenCancel(true)}>
            <img
              className={styles.icon_delete}
              src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
            />
            Xóa
          </button>
        </>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
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
        scroll={{ x: 1500, y: 300 }}
        className={styles.custom_table_children_row}
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
          Tổng số: <b>{data.length}</b> Nhóm khách hàng
        </div>
      </div>

      <CancelModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
        content={"Bạn có đồng ý xóa nhóm khách hàng này không?"}
        title={"Xác nhận xóa nhóm khách hàng"}
        link={"#"}
      />

      <GroupSharedAFactorModal
        isModalCancel={openSharedModal}
        setIsModalCancel={setOpenSharedModal}
      />
    </div>
  );
};

export default TableDataGroupListCustomer;
