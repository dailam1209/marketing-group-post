import React, { useEffect, useState } from "react";
import { Pagination, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_table_step";
import stylesCampaignSelect from "@/components/crm/campaign/campaign.module.css";
import styles from "../order/order.module.css";
import Link from "next/link";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  description: string;
  source: string;
  group: string;
  staff: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã KH",
    width: 120,
    dataIndex: "number",
    key: "number",
    // render:(text:any,record:any)=><Link href={`/order/detail/${record.key}`} ><b>{text}</b></Link>
  },
  {
    title: "Tên khách hàng",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any, record: any) => (
      <Link href={`/customer/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Tình trạng khách hàng",
    dataIndex: "status",
    key: "status",
    width: 180,
    render: () => (
      <div
        style={{ padding: "5px", paddingLeft: "11px" }}
        className={stylesCampaignSelect.wrap_select}
      >
        <CampaignSelectBoxStep value="Hẹn gặp" placeholder="Hẹn gặp" />
      </div>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Nguồn khách hàng",
    dataIndex: "source",
    key: "source",
    width: 180,
    render: () => (
      <div
        style={{ padding: "5px", paddingLeft: "11px" }}
        className={stylesCampaignSelect.wrap_select}
      >
        <CampaignSelectBoxStep value="Facebook" placeholder="Facebook" />
      </div>
    ),
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "group",
    key: "group",
    width: 250,
  },
  {
    title: "Nhân viên phụ trách",
    dataIndex: "staff",
    key: "staff",
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "date",
    key: "date",
    width: 120,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `123456`,
    name: `Nguyễn Trần Kim Phượng`,
    phone: `0123 456 789`,
    email: `nguyenvannam@gmail.com `,
    status: `Hẹn gặp`,
    description: `Khách hàng tháng 1`,
    source: `Facebook`,
    group: `Nhóm khách hàng không quan tâm`,
    staff: `Nguyễn Văn Nam`,
    date: `10/10/2021`,
  });
}

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataOrder: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const dataForPage = data.slice((currentPage - 1) * 10, currentPage * 10);

  useEffect(() => {
    //
  }, [currentPage]);
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
        dataSource={dataForPage}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 400 }}
      />
      <div className={`${styles.main__footer} ${styles.flex_between}`}>
        <div className="total">
          Tổng số: <b>{data.length}</b> Chiến dịch
        </div>
        <Pagination
          current={currentPage}
          total={data.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableDataOrder;
