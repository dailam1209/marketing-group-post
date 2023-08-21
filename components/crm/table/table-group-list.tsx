import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import CancelModal from "../potential/potential_steps/cancel_modal";
import GroupSharedAFactorModal from "../customer/group_customer/group_shared_modal";
import Image from "next/image";

import { useApi } from "../hooks/useApi";
import CancelModalDelGroup from "../customer/group_customer/delete_mdal_gr_cus";
import { base_url } from "../service/function";
import Cookies from "js-cookie";

interface TableDataGroupListCustomerProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setSelectedRow: any;
  setChange: any;
}

const TableDataGroupListCustomer: React.FC<TableDataGroupListCustomerProps> = ({
  setSelected,
  setNumberSelected,
  setSelectedRow,
  setChange,
}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [keyDeleted, setKeyDeleted] = useState<any>();
  const [listKeyDeleted, setListKeyDeleted] = useState([]);
  const [numberDat, setNumberData] = useState(10);
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${base_url}/api/crm/group/list_group_khach_hang`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { page: 1, perPage: 1000 }
  );
  console.log("check", data?.data?.showGr);

  interface DataType {
    key: React.Key;
    gr_id: number;
    gr_name: string;
    gr_description: string;
    group_parent: number;
    company_id: number;
    dep_id: string;
    emp_id: string;
    count_customer: number;
    is_delete: number;
    created_at: number;
    updated_at: number;
  }

  useEffect(() => {
    // fetchData(
    //   "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    //   process.env.ACCESS_TOKEN ||
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MCwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjowLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTIzMjQ0ODQsImV4cCI6MTY5MjQxMDg4NH0.yJan9MaDFji3XNXlgi2xzgDWQDXKZ1pSvRMCN29899o",
    //   "POST"
    // );
    fetchData();
    console.log(data);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhóm khách hàng",
      width: 300,
      dataIndex: "gr_name",
      key: "gr_name",
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
      width: 120,
      dataIndex: "group_parent",
      key: "group_parent",
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
      dataIndex: "gr_description",
      key: "1",
      width: 280,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "6",
      width: 120,
      // fixed:"right",
      render: (data, record: any) => (
        <>
          <Link href={`/crm/customer/group/edit/${record.key}`}>
            <button>
              <img
                className={styles.icon_edit}
                src={"https://crm.timviec365.vn/assets/img/h_edit_cus.svg"}
                alt="sua"
              />
              Sửa
            </button>
          </Link>
          <button
            onClick={() => (setIsOpenCancel(true), setKeyDeleted(record.gr_id))}
          >
            <img
              className={styles.icon_delete}
              src={"https://crm.timviec365.vn/assets/img/customer/del_red.svg"}
              alt="xoa"
            />
            Xóa
          </button>
        </>
      ),
    },
  ];

  // const datatable: DataType[] = [
  //   {
  //     key: index + 1,
  //     name: "John Brown sr.",
  //     age: 60,
  //     address: "New York No. 1 Lake Park",
  //     children: [
  //       {
  //         key: 11,
  //         name: "John Brown",
  //         age: 42,
  //         address: "New York No. 2 Lake Park",
  //       },
  //       {
  //         key: 12,
  //         name: "John Brown jr.",
  //         age: 30,
  //         address: "New York No. 3 Lake Park",
  //       },
  //     ],
  //   },
  //   {
  //     key: 2,
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  // ];

  const datatable: DataType[] = data?.data?.showGr.map(
    (item: DataType, index: number) => {
      return {
        key: item.gr_id,
        gr_name: item.gr_name,
        group_parent: item.group_parent,
        gr_description: item.gr_description,
        updated_at: item.updated_at,
        gr_id: item.gr_id,
      };
    }
  );

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        setSelected(true);
        setSelectedRow(selectedRowKeys);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record.gr_id)
      console.log("check2", selectedRows);

      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1024, y: 400 }}
        pagination={{ pageSize: numberDat }}
        className={styles.custom_table_children_row}
      />
      {datatable?.length > 0 && (
        <div className="main__footer flex_between" id="">
          <div className="show_number_item">
            <b>Hiển thị:</b>
            <select
              value={numberDat}
              className="show_item"
              onChange={(e) => setNumberData(+e.target.value)}
            >
              <option value={10}>10 bản ghi trên trang</option>
              <option value={20}>20 bản ghi trên trang</option>
              <option value={30}>30 bản ghi trên trang</option>
              <option value={40}>40 bản ghi trên trang</option>
              <option value={50}>50 bản ghi trên trang</option>
            </select>
          </div>
          <div className="total">
            Tổng số:{" "}
            <b>
              {datatable?.length > numberDat ? numberDat : datatable?.length}
            </b>{" "}
            Nhóm khách hàng
          </div>
        </div>
      )}

      <CancelModalDelGroup
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
        content={"Bạn có đồng ý xóa nhóm khách hàng này không?"}
        title={"Xác nhận xóa nhóm khách hàng"}
        link={"#"}
        keyDeleted={keyDeleted}
        updateData={updateData}
        setChange={setChange}
      />

      <GroupSharedAFactorModal
        isModalCancel={openSharedModal}
        setIsModalCancel={setOpenSharedModal}
      />
    </div>
  );
};

export default TableDataGroupListCustomer;
