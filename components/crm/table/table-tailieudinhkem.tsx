import React, { useState } from "react";
import { Button, Dropdown, MenuProps, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import DelTLDK from "../quote/quote_action_modal/mdal_delete_TLDK";
// import { TableRowSelection } from "antd/es/table/interface";

interface TableDataCampaignProps {}

const TableAddTLDK: React.FC<TableDataCampaignProps> = (props: any) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [key, setKey] = useState();
  const onClose = () => {
    setIsCancelOpen(false);
  };
  const handleAddDB = () => {
  };
  interface DataType {
    key: React.Key;
    number: string;
    name: string;
    status: string;
    total: string;
    address: string;
    order_status: string;
    date: string;
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", fontSize: 15 }}>
          <i className="bi bi-download" />
          &nbsp; &nbsp; <p>Tải xuống</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          onClick={() => setIsCancelOpen(true)}
        >
          <img src="/crm/icon-delete-black.svg" alt="" />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên tài liệu",
      width: 300,
      dataIndex: "number",
      key: "number",
      render: (text: any, record: any) => (
        <Link href="#">
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Người đính kèm",
      width: 200,
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/crm/user_kh.png"></img>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Ngày đính kèm",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Dung lượng",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => <div>{text}</div>,
    },

    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 80,
      fixed: "right",
      render: (text: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <div>
            <Dropdown
              overlayStyle={{ margin: "-10px -10px" }}
              trigger={["click"]}
              menu={{ items }}
              placement="bottomLeft"
            >
              <div
                onClick={() => {
                  handleSelect(record.key);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  cursor: "pointer",
                  gap: 5,
                }}
              >
                <img style={{ cursor: "pointer" }} src="/crm/icon_1.svg" />
                <div>Chức năng</div>
              </div>
            </Dropdown>
          </div>
        </div>
      ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      number: `Lịch hẹn - Nguyễn Thị Hòa${i}`,
      name: "Nguyễn Trần Kim Phượng",
      status: "10.0 MB",
      total: "10.000.000.000",
      address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
      order_status: `Chưa gửi`,
      date: "09/08/2023",
    });
  }
  const handleSelect = (value: any) => {
    setKey(value);
  };
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
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
          Tổng số: <b>{data.length}</b> Tài liệu đính kèm
        </div>
        <DelTLDK record={key} isModalCancel={isCancelOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default TableAddTLDK;
