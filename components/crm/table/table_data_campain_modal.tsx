import React from "react";
import { Checkbox, Table, Tooltip } from "antd";
import styles from "../campaign/campaign.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import CampaignActionTable from "@/components/crm/campaign/campaign_table_action";
import { fetchApi } from "../ultis/api";
import Cookies from "js-cookie";
import { timestampToCustomString } from "../ultis/convert_date";

interface DataType {
  key: React.Key;
  nameCampaign: string;
  _id: number;
  status: number;
  typeCampaign: number;
  timeStart: string;
  timeEnd: string;
  discount: number;
  expectedSales: number;
  companyID: number;
  empID: number;
  description: string;
  money: number;
}

interface TableDataCampaignProps {
  dataAPI?: any;
  empList?: any;
}

const TableDataCampaignModal: React.FC<TableDataCampaignProps> = ({
  dataAPI,
  empList,
}) => {
  const url = "https://api.timviec365.vn/api/crm/campaign/delete-campaign";
  const token = Cookies.get("token_base365");

  const dataStatus = [
    <div>Chưa cập nhật</div>,
    <div>Chưa cập nhật</div>,
    <div style={{ color: "#FFA800" }}>Chưa diễn ra</div>,
    <div style={{ color: "#34B632" }}>Đã kết thúc</div>,
    <div style={{ color: "#FF3333" }}>Đang tạm dừng</div>,
    <div style={{ color: "#4C5BD4" }}>Đang diễn ra</div>,
  ];

  const dataTypeCampaign = [
    <div>Chưa cập nhật</div>,
    <div>Chưa cập nhật</div>,
    <div>Gửi mail</div>,
    <div>Điện thoại</div>,
    <div>Tổ chức hội thảo tập huấn</div>,
    <div>Gặp mặt trực tiếp</div>,
    <div>Qua bưu điện</div>,
    <div>Mạng xã hội</div>,
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: <Checkbox></Checkbox>,
      width: 50,
      dataIndex: "key",
      key: "key",
      render: (text: any, record: any) => <Checkbox></Checkbox>,
    },
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Tên chiến dịch",
      width: 180,
      dataIndex: "nameCampaign",
      key: "nameCampaign",
      render: (text: any, record: any) => (
        <Link href={`/campaign/detail/${record._id}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "ID",
      width: 50,
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tình trạng",
      width: 150,
      dataIndex: "status",
      key: "status",
      render: (data) => <>{dataStatus[data]}</>,
    },
    {
      title: "Loại",
      dataIndex: "typeCampaign",
      key: "typeCampaign",
      width: 120,
      render: (data) => <>{dataTypeCampaign[data]}</>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "timeStart",
      key: "timeStart",
      width: 150,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "timeEnd",
      key: "timeEnd",
      width: 150,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Doanh số kỳ vọng (VNĐ)",
      dataIndex: "expectedSales",
      key: "expectedSales",
      width: 180,
    },
    {
      title: "Ngân sách (VNĐ)",
      dataIndex: "money",
      key: "money",
      width: 160,
    },
    {
      title: "Người phụ trách",
      dataIndex: "empID",
      key: "empID",
      width: 180,
      render: (text: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <img src="/crm/user_kh.png" alt="user" />
          {empList?.filter((emp) => emp.ep_id === text)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
  ];

  const data: DataType[] =
    dataAPI?.data?.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    }) || [];

  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 320 }}
      />
    </div>
  );
};

export default TableDataCampaignModal;
