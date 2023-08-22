import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import { useApi } from "@/components/crm/hooks/useApi";

interface DataType {
  key: React.Key;
  user_created: string;
  created_at: string;
  update_at: string;
  path_dowload: string;
}

interface TableContractProps {}

const TableContract: React.FC<TableContractProps> = ({}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [id_customer, setid_customer] = useState<any>("");
  const [id, setId] = useState();
  const [name, setName] = useState();
  const Cookies = require("js-cookie");

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/contractforcus/list",
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY1NDAiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOiIxNjkxNDg2ODE5X2ZpbmR4LnBuZyIsInR5cGUiOjEsInBhc3N3b3JkIjoiYmMwYTkwOTAzNTU3ODhkY2JlMjZiODcwZGNkYTIzZWQiLCJjaXR5IjoxLCJkaXN0cmljdCI6NzMsImFkZHJlc3MiOiJob2FuZyBtYWkgSGEgTm9pIiwib3RwIjoiNTcwODIwIiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjo0LCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInVwZGF0ZWRBdCI6MTY5MTQ2Njc3MywibGFzdEFjdGl2ZWRBdCI6IjIwMjMtMDgtMThUMDI6MDQ6NTguMDg1WiIsInRpbWVfbG9naW4iOjE2NzMwODA1OTksInJvbGUiOjAsImxhdGl0dWRlIjoiMjAuOTg2ODI4NyIsImxvbmd0aXR1ZGUiOiIxMDUuODMxMjMxNCIsImlkUUxDIjoxNjY0LCJpZFRpbVZpZWMzNjUiOjIzMjQxNiwiaWRSYW9OaGFuaDM2NSI6MCwiY2hhdDM2NV9zZWNyZXQiOiJYOGxxbGFzZm9rIiwiY2hhdDM2NV9pZCI6MCwic2Nhbl9iYXNlMzY1IjowLCJjaGVja19jaGF0IjowLCJzaGFyZVBlcm1pc3Npb25JZCI6W10sImluRm9yUGVyc29uIjpudWxsLCJpbkZvckNvbXBhbnkiOnsic2NhbiI6MCwidXNjX2tkIjoxMCwidXNjX2tkX2ZpcnN0IjowLCJkZXNjcmlwdGlvbiI6IiIsImNvbV9zaXplIjoxNSwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik10biBDb21wYW55IiwidXNjX25hbWVfYWRkIjoiTsahIDUwIEzDtCA2IEvEkFQgxJDhu4tuaCBDw7RuZyIsInVzY19uYW1lX3Bob25lIjoiMDM1NjAyMTYwNiIsInVzY19uYW1lX2VtYWlsIjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwidXNjX3VwZGF0ZV9uZXciOjE2OTE1NzUxMDUsInVzY19jYW5vbmljYWwiOiIiLCJ1c2NfbWQ1IjoiIiwidXNjX3JlZGlyZWN0IjoiIiwidXNjX3R5cGUiOjEsInVzY19zaXplIjowLCJ1c2Nfd2Vic2l0ZSI6IiIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjAsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4xMzgiLCJ1c2NfbG9jIjowLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6IiIsInVzY192aWRlb190eXBlIjoxLCJ1c2NfdmlkZW9fYWN0aXZlIjowLCJ1c2NfYmxvY2tfYWNjb3VudCI6MCwidXNjX3N0b3Bfbm90aSI6MCwib3RwX3RpbWVfZXhpc3QiOjAsInVzZV90ZXN0IjowLCJ1c2NfYmFkZ2UiOjAsInVzY19zdGFyIjowLCJ1c2NfdmlwIjowLCJ1c2NfbWFuYWdlciI6IiIsInVzY19saWNlbnNlIjoiIiwidXNjX2FjdGl2ZV9saWNlbnNlIjowLCJ1c2NfbWFwIjoiIiwidXNjX2RnYyI6IiIsInVzY19kZ3R2IjoiIiwidXNjX2RnX3RpbWUiOjAsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJpdCBwaOG6p24gY-G7qW5nIiwidXNjX3phbG8iOm51bGwsInVzY19jYzM2NSI6MCwidXNjX2NybSI6MCwidXNjX2ltYWdlcyI6bnVsbCwidXNjX2FjdGl2ZV9pbWciOjAsInVzY19mb3VuZGVkX3RpbWUiOjAsInVzY19icmFuY2hlcyI6W119LCJjZHMiOnsiY29tX3JvbGVfaWQiOjEsImNvbV9wYXJlbnRfaWQiOm51bGwsInR5cGVfdGltZWtlZXBpbmciOiIxLDIsMyw0LDUsNiIsImlkX3dheV90aW1la2VlcGluZyI6IjEsMiwzLDQiLCJjb21fcXJfbG9nbyI6ImNvbV8xNjY0L01HZEdTMlJIZDJOMmN6RTNiaXRFVTFSU1QyMHpRVDA5LnBuZyIsImVuYWJsZV9zY2FuX3FyIjoxLCJjb21fdmlwIjoxLCJjb21fZXBfdmlwIjoxMDAwMCwiY29tX3ZpcF90aW1lIjowLCJlcF9jcm0iOjU3NDQsImVwX3N0dCI6MX0sIl9pZCI6IjY0ZDFhODZmYTM1OGFkOTBmOTFiOGIzOCJ9LCJpbmZvclJOMzY1IjpudWxsLCJjb25maWdDaGF0Ijp7Im5vdGlmaWNhdGlvbkFjY2VwdE9mZmVyIjoxLCJub3RpZmljYXRpb25BbGxvY2F0aW9uUmVjYWxsIjoxLCJub3RpZmljYXRpb25DaGFuZ2VTYWxhcnkiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tUmFvTmhhbmgiOjEsIm5vdGlmaWNhdGlvbkNvbW1lbnRGcm9tVGltVmllYyI6MSwibm90aWZpY2F0aW9uRGVjaWxpbmVPZmZlciI6MSwibm90aWZpY2F0aW9uTWlzc01lc3NhZ2UiOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRQaW4iOjEsIm5vdGlmaWNhdGlvbk5UREV4cGlyZWRSZWNydWl0IjoxLCJub3RpZmljYXRpb25OVERQb2ludCI6MSwibm90aWZpY2F0aW9uU2VuZENhbmRpZGF0ZSI6MSwibm90aWZpY2F0aW9uVGFnIjoxLCJyZW1vdmVTdWdnZXMiOltdLCJ1c2VyTmFtZU5vVm4iOiIiLCJkb3VibGVWZXJpZnkiOjAsImFjdGl2ZSI6MSwic3RhdHVzIjoiIiwiYWNjZXB0TWVzc1N0cmFuZ2VyIjoxLCJIaXN0b3J5QWNjZXNzIjpbXX0sInNjYW4iOjB9LCJpYXQiOjE2OTI2Njk0MTIsImV4cCI6MTY5Mjc1NTgxMn0.sOFodhOO_vz5afElII2M8sxyPQzUhCKbmfp8mNZzUt0`,
    "POST",
    { id_customer: `${id_customer}`, pageSize: 10000 }
  );
  useEffect(() => {
    fetchData();
  }, []);

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
      dataIndex: "path_dowload",
      key: "0",
      render: (data, record) => (
        <Link href={`detail/${record}`}>
          <Tooltip title={data}>
            <span>{data}</span>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "user_created",
      key: "1",
      width: 200,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "2",
      width: 150,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "update_at",
      key: "3",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "",
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

  const datatable = data?.data?.data?.map(
    (item: any, index: number) => {
      return {
        key: index + 1,
        _id: item._id,
        name: item.name,
        pathFile: item.pathFile,
        com_id: item.com_id,
        ep_id: item.ep_id,
        id_file: item.id_file,
        created_at: item.created_at,
        user_created: item.user_created,
        id_customer: item.id_customer,
        update_at: item.update_at || "Chua cap nhat",
        status: item.status,
        is_delete: item.is_delete,
        new_field: item.new_field,
        old_field: item.old_field,
        index_field: item.index_field,
        default_field: item.default_field,
        path_dowload: item.path_dowload,
        id_form_contract: item.id_form_contract,
      };
    }
  );
  console.log(data);

  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableContract;
