import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../campaign/campaign.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import CampaignActionTable from "@/components/crm/campaign/campaign_chance_table_action";

interface DataType {
  key: React.Key;
  name: string;
  customer: string;
  money: string;
  stage: string;
  rate: string;
  sale: number;
  date: number;
  person: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên cơ hội",
    width: 180,
    dataIndex: "name",
    key: "name",
    // render: (text: any,record:any) => (
    //   <Link href={`/campaign/detail/${record.key}`}>
    //     <b>{text}</b>
    //   </Link>
    // ),
  },
  {
    title: "Khách hàng",
    width: 150,
    dataIndex: "customer",
    key: "customer",
    // render: (data) => (
    //   <Tooltip title={data}>
    //     <span>{data}</span>
    //   </Tooltip>
    // ),
  },
  {
    title: "Số tiền (VNĐ)",
    dataIndex: "money",
    key: "money",
    width: 70,
  },
  {
    title: "Giai đoạn",
    dataIndex: "stage",
    key: "stage",
    width: 150,
  },
  {
    title: "Tỷ lệ thành công",
    dataIndex: "rate",
    key: "rate",
    width: 150,
  },
  {
    title: "Doanh số kỳ vọng (VNĐ)",
    dataIndex: "sale",
    key: "sale",
    width: 250,
  },
  {
    title: "Ngày kỳ vọng/kết thúc",
    dataIndex: "date",
    key: "date",
    width: 150,
  },
  {
    title: "Người thực hiện",
    dataIndex: "person",
    key: "person",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 150,
    fixed: "right",
    render: (text: any) => <CampaignActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Campaign ${i}`,
    customer: "Đang diễn ra",
    money: "abc",
    stage: "29/07/2023",
    rate: `30/07/2023`,
    sale: 10000000,
    date: 10000000,
    person: `Nguyen Van Hung`,
  });
}

interface TableDataCampaignChanceProps {}

const TableDataCampaignChance: React.FC<TableDataCampaignChanceProps> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 320 }}
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
          Tổng số: <b>{data.length}</b> Chiến dịch
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignChance;
