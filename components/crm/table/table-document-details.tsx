import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import DocumentActionDropDown from "../customer/documents/document_input_group";
import { timestampToCustomString } from "../ultis/convert_date";
import { fetchApi } from "../ultis/api";
import Cookies from "js-cookie";

interface DataType {
  linkFile: string;
  key: React.Key;
}

interface TableChanceDetailDocumentsProps {
  dataApi?: any;
  body?: any;
  setBody?: any;
}

const TableChanceDetailDocuments: React.FC<TableChanceDetailDocumentsProps> = ({
  dataApi,
  setBody,
  body,
}) => {
  const router = useRouter();
  const token = Cookies.get("token_base365");
  const { id } = router.query;

  const fetchApiFile = async (
    url = "http://localhost:3007/api/crm/chance/delete-attachment-chance",
    id
  ) => {
    const data = await fetchApi(
      url,
      token,
      {
        chance_id: id,
        id,
      },
      "POST"
    );
    setBody((prev) => {
      return {
        ...prev,
        file_deleted: id,
      };
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên tài liệu",
      width: 200,
      dataIndex: "file_name",
      key: "0",
      render: (text, record) => (
        <Link href={`${record?.linkFile}`} target="_blank">
          <span>{text}</span>
        </Link>
      ),
    },
    {
      title: "Người đính kèm",
      dataIndex: "user_name",
      key: "1",
      width: 200,
      render: (text) => <span>{text || "Chưa cập nhật"}</span>,
    },
    {
      title: "Ngày đính kèm",
      dataIndex: "created_at",
      key: "2",
      width: 150,
      render: (date) => <span>{timestampToCustomString(Number(date))} </span>,
    },
    {
      title: "Dung lượng",
      dataIndex: "file_size",
      key: "2",
      width: 150,
      render: (text) => <span>{text} kb</span>,
    },
    {
      title: "Chức năng",
      dataIndex: "linkFile",
      key: "4",
      width: 120,
      fixed: "right",
      render: (linkFile: string, record) => (
        <DocumentActionDropDown record={record} fetchApi={fetchApiFile} />
      ),
    },
  ];

  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={dataApi?.data?.map((item, index) => {
          return {
            ...item,
            index: index + 1,
          };
        })}
        bordered
        scroll={{ x: 992, y: 1100 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: body?.page,
          pageSize: body?.pageSize,
          total: dataApi?.total,
          onChange: (current, pageSize) => {
            if (current != body?.page) {
              setBody((prev) => {
                return {
                  ...prev,
                  page: current,
                };
              });
            }
          },
        }}
      />
    </div>
  );
};

export default TableChanceDetailDocuments;
