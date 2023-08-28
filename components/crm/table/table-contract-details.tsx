import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";
import { base_url } from "../service/function";
import Image from "next/image";

interface DataType {
  key: React.Key;
  name: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

interface TableDataContracDrops {}

const TableDataContractDetailList: React.FC<
  TableDataContracDrops
> = ({}: any) => {
  const [id_customer, setid_customer] = useState<any>("");
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${base_url}/api/crm/contractforcus/list`,
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJNdG4gQ29tcGFueSIsImFsaWFzIjoibXRuLWNvbXBhbnkiLCJwaG9uZSI6IjAzMjk4ODY0NTA5IiwiZW1haWxDb250YWN0IjoidHJhbmdjaHVvaTRAZ21haWwuY29tIiwiYXZhdGFyVXNlciI6bnVsbCwidHlwZSI6MSwicGFzc3dvcmQiOiJiYzBhOTA5MDM1NTc4OGRjYmUyNmI4NzBkY2RhMjNlZCIsImNpdHkiOjEsImRpc3RyaWN0Ijo3MywiYWRkcmVzcyI6ImhvYW5nIG1haSBIYSBOb2kgNSIsIm90cCI6IjU3MDgyMCIsImF1dGhlbnRpYyI6MSwiaXNPbmxpbmUiOjAsImZyb21XZWIiOiJ0aW12aWVjMzY1IiwiZnJvbURldmljZSI6NCwiY3JlYXRlZEF0IjoxNjYzODM2NDA1LCJ1cGRhdGVkQXQiOjE2OTI4Njc2NDcsImxhc3RBY3RpdmVkQXQiOiIyMDIzLTA4LTE4VDAyOjA0OjU4LjA4NVoiLCJ0aW1lX2xvZ2luIjoxNjczMDgwNTk5LCJyb2xlIjowLCJsYXRpdHVkZSI6IjIwLjk4NjgyODciLCJsb25ndGl0dWRlIjoiMTA1LjgzMTIzMTQiLCJpZFFMQyI6MTY2NCwiaWRUaW1WaWVjMzY1IjoyMzI0MTYsImlkUmFvTmhhbmgzNjUiOjAsImNoYXQzNjVfc2VjcmV0IjoiWDhscWxhc2ZvayIsImNoYXQzNjVfaWQiOjAsInNjYW5fYmFzZTM2NSI6MCwiY2hlY2tfY2hhdCI6MCwic2hhcmVQZXJtaXNzaW9uSWQiOltdLCJpbkZvclBlcnNvbiI6bnVsbCwiaW5Gb3JDb21wYW55Ijp7InNjYW4iOjAsInVzY19rZCI6MTAsInVzY19rZF9maXJzdCI6MCwiZGVzY3JpcHRpb24iOiIiLCJjb21fc2l6ZSI6MjE0LCJ0aW12aWVjMzY1Ijp7InVzY19uYW1lIjoiTXRuIENvbXBhbnkiLCJ1c2NfbmFtZV9hZGQiOiJOxqEgNTAgTMO0IDYgS8SQVCDEkOG7i25oIEPDtG5nIiwidXNjX25hbWVfcGhvbmUiOiIwMzU2MDIxNjA2IiwidXNjX25hbWVfZW1haWwiOiJ0cmFuZ2NodW9pNEBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MTU3NTEwNSwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MSwidXNjX3NpemUiOjAsInVzY193ZWJzaXRlIjoiIiwidXNjX3ZpZXdfY291bnQiOjAsInVzY19hY3RpdmUiOjAsInVzY19zaG93IjoxLCJ1c2NfbWFpbCI6MCwidXNjX3N0b3BfbWFpbCI6MCwidXNjX3V0bCI6MCwidXNjX3NzbCI6MCwidXNjX21zdCI6IjAiLCJ1c2Nfc2VjdXJpdHkiOiIiLCJ1c2NfaXAiOiIxMTguNzAuMTI2LjEzOCIsInVzY19sb2MiOjAsInVzY19tYWlsX2FwcCI6MCwidXNjX3ZpZGVvIjoiIiwidXNjX3ZpZGVvX3R5cGUiOjEsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MCwidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MCwidXNjX3N0YXIiOjAsInVzY192aXAiOjAsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiIiLCJ1c2NfZGdjIjoiIiwidXNjX2RndHYiOiIiLCJ1c2NfZGdfdGltZSI6MCwidXNjX3NreXBlIjoiIiwidXNjX3ZpZGVvX2NvbSI6IiIsInVzY19sdiI6Iml0IHBo4bqnbiBj4bupbmciLCJ1c2NfemFsbyI6bnVsbCwidXNjX2NjMzY1IjowLCJ1c2NfY3JtIjowLCJ1c2NfaW1hZ2VzIjpudWxsLCJ1c2NfYWN0aXZlX2ltZyI6MCwidXNjX2ZvdW5kZWRfdGltZSI6MCwidXNjX2JyYW5jaGVzIjpbXX0sImNkcyI6eyJjb21fcm9sZV9pZCI6MSwiY29tX3BhcmVudF9pZCI6bnVsbCwidHlwZV90aW1la2VlcGluZyI6IjEsMiwzLDQsNSw2IiwiaWRfd2F5X3RpbWVrZWVwaW5nIjoiMSwyLDMsNCIsImNvbV9xcl9sb2dvIjoiY29tXzE2NjQvTUdkR1MyUkhkMk4yY3pFM2JpdEVVMVJTVDIwelFUMDkucG5nIiwiZW5hYmxlX3NjYW5fcXIiOjEsImNvbV92aXAiOjEsImNvbV9lcF92aXAiOjEwMDAwLCJjb21fdmlwX3RpbWUiOjAsImVwX2NybSI6NTc0NCwiZXBfc3R0IjoxfSwiX2lkIjoiNjRkMWE4NmZhMzU4YWQ5MGY5MWI4YjM4In0sImluZm9yUk4zNjUiOm51bGwsImNvbmZpZ0NoYXQiOnsibm90aWZpY2F0aW9uQWNjZXB0T2ZmZXIiOjEsIm5vdGlmaWNhdGlvbkFsbG9jYXRpb25SZWNhbGwiOjEsIm5vdGlmaWNhdGlvbkNoYW5nZVNhbGFyeSI6MSwibm90aWZpY2F0aW9uQ29tbWVudEZyb21SYW9OaGFuaCI6MSwibm90aWZpY2F0aW9uQ29tbWVudEZyb21UaW1WaWVjIjoxLCJub3RpZmljYXRpb25EZWNpbGluZU9mZmVyIjoxLCJub3RpZmljYXRpb25NaXNzTWVzc2FnZSI6MSwibm90aWZpY2F0aW9uTlRERXhwaXJlZFBpbiI6MSwibm90aWZpY2F0aW9uTlRERXhwaXJlZFJlY3J1aXQiOjEsIm5vdGlmaWNhdGlvbk5URFBvaW50IjoxLCJub3RpZmljYXRpb25TZW5kQ2FuZGlkYXRlIjoxLCJub3RpZmljYXRpb25UYWciOjEsInJlbW92ZVN1Z2dlcyI6W10sInVzZXJOYW1lTm9WbiI6IiIsImRvdWJsZVZlcmlmeSI6MCwiYWN0aXZlIjoxLCJzdGF0dXMiOiIiLCJhY2NlcHRNZXNzU3RyYW5nZXIiOjEsIkhpc3RvcnlBY2Nlc3MiOltdfSwic2NhbiI6MH0sImlhdCI6MTY5MzAxMTk5NiwiZXhwIjoxNjkzMDk4Mzk2fQ.YA29J29OBqMGo5ahQTgut5k1IH0Pzi2hrnmDBye66po`,
    "POST",
    { id_customer: `${id_customer}`, pageSize: 10000 }
  );
  useEffect(() => {
    fetchData();
  }, []);

  const datatable = data?.data?.data?.map((item: any, index: number) => {
    return {
      key: index + 1,
      _id: item._id,
      name: "Đặng Hữu Đạt",
      ep_id: item.ep_id,
      file: "Hợp đồng tiền tỷ",
      created_at: item.created_at,
      user_created: item.user_created,
      id_customer: item.id_customer,
      status: item.status,
    };
  });
  console.log();

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
      dataIndex: "file",
      key: "file",
      render: (data) => (
        <Link href={`/crm/customer/contract/detail/${id}`}>
          <Tooltip title={data}>
            <span className={styles.font_file}>{data}</span>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
    },
    {
      title: "Người tạo",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (_, record) => (
        <div className={styles.username}>
          <Image
            className={styles.icon_user}
            src="/crm/user.svg"
            alt={"icon_user"}
            width={35}
            height={35}
          />
          {record.name}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <>
          {status === "Đã gửi" ? (
            <button className={styles.send}>Đã gửi</button>
          ) : (
            <button className={styles.not_send}>Chưa gửi</button>
          )}
        </>
      ),
    },
    {
      title: "Gửi hợp đồng",
      dataIndex: "send",
      key: "send",
      width: 80,
      render: () => (
        <>
          <Link href={`/crm/customer/contract/send/${id}`}>
            <button>Gửi</button>
          </Link>
        </>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: () => (
        <>
          <button className={styles.delete_button}>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
            Xóa
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContractDetailList;
