import React, { useEffect, useState } from "react";
import { Spin, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import DocumentActionDropDown from "../customer/documents/document_input_group";
import useLoading from "../hooks/useLoading";
import Cookies from "js-cookie";
import { fetchApi } from "../ultis/api";
import { timestampToCustomString } from "../ultis/convert_date";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

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

const TableChanceDetailHistory = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token_base365");
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);
  const [body, setBody] = useState({ page: 1, pageSize: 10 });
  const statusList = {
    1: "Mở đầu",
    0: "Mở đầu",
    2: "Khách hàng quan tâm",
    3: "Demo/Gthieu",
    4: "Đàm phán/ thương lương",
  };

  const fetchApiHistoryChance = async () => {
    startLoading();
    const data = await fetchApi(
      "https://api.timviec365.vn/api/crm/chance/list-history-stages-chance",
      token,
      {
        chance_id: id,
        ...body,
      },
      "POST"
    );
    stopLoading();
    setDataApi(data?.data?.data);
    setCount(data?.data?.total);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Giai đoạn",
      width: 180,
      dataIndex: "stage_id",
      key: "0",
      render: (data) => <span>{statusList?.[data]}</span>,
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "money",
      key: "1",
      width: 120,
      render: (money) => <>{money ? `${money} VNĐ` : "Chưa cập nhật"}</>,
    },
    {
      title: "Tỷ lệ thành công (%)",
      dataIndex: "success_rate",
      key: "2",
      width: 120,
      render: (rate) => <>{rate ? rate : "Chưa cập nhật"}</>,
    },
    {
      title: "Doanh số kỳ vọng (VND)",
      dataIndex: "expected_revenue",
      key: "2",
      width: 150,
      render: (money) => <>{money ? `${money} VNĐ` : "Chưa cập nhật"}</>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "2",
      width: 150,
      render: (date) => <>{timestampToCustomString(Number(date))}</>,
    },
    {
      title: "Thời gian sửa",
      dataIndex: "created_at",
      key: "2",
      width: 150,
      render: (date) => <>{timestampToCustomString(Number(date))}</>,
    },
    {
      title: "Người sửa",
      dataIndex: "user_edit_id",
      key: "2",
      width: 150,
      render: (user) => <>{user?.userName}</>,
    },
  ];

  useEffect(() => {
    fetchApiHistoryChance();
  }, [body]);

  return (
    <div className="custom_table product_return">
      {isLoading ? (
        <Spin
          style={{
            width: "100%",
            margin: "auto",
            marginTop: "30px",
            height: "100%",
            marginBottom: "30px",
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={dataAPI?.map((item, index) => {
            return {
              ...item,
              index: index + 1,
            };
          })}
          bordered
          scroll={{ x: 1024, y: 1100 }}
          pagination={{
            style: {
              paddingBottom: 20,
              display: "flex",
              position: "absolute",
              right: 0,
            },
            current: body?.page,
            pageSize: body?.pageSize,
            total: count,
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
      )}
    </div>
  );
};

export default TableChanceDetailHistory;
