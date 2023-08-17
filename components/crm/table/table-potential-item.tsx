import React from "react";
import { Table } from "antd";
import styles from "../campaign/campaign.module.css";
import style from "../potential/detail/information.module.css";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  MaHangHoa: string;
  TenHangHoa: string;
  NhomHangHoa: string;
  DonViTinh: string;
  DonGia: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "STT",
  },
  {
    title: "Mã hàng hoá",
    width: 180,
    dataIndex: "MaHangHoa",
    key: "MaHangHoa",
  },
  {
    title: "Tên hàng hóa",
    width: 150,
    dataIndex: "TenHangHoa",
    key: "TenHangHoa",
    render: (data) => (
      // <Tooltip title={data}>
      <Link href={`/potential/detail/${data}`}>
        <span>{data}</span>
      </Link>
      // </Tooltip>
    ),
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "NhomHangHoa",
    key: "NhomHangHoa",
    width: 70,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "DonViTinh",
    key: "DonViTinh",
    width: 150,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "DonGia",
    key: "DonGia",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "ChucNang",
    width: 150,
    fixed: "right",
    render: () => (
      <>
        <Link href={"#"}>
          <button className={style.action_delete}>
            <img
              className={styles.icon_delete}
              src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
              alt="Delete Icon"
            />
            Gỡ bỏ
          </button>
        </Link>
      </>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    MaHangHoa: `HH-000`,
    TenHangHoa: "Dịch vụ bảo hành máy tính trọn đời",
    NhomHangHoa: "Dịch vụ máy tính",
    DonViTinh: "Gói",
    DonGia: `1.000.000.000`,
  });
}

interface TablePotentialItemProps {}

const TablePotentialItem: React.FC<TablePotentialItemProps> = () => {
  return (
    <div className="custom_table campaign_tble ">
      <Table
        columns={columns}
        dataSource={data}
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
          Tổng số: <b>{data.length}</b> Hàng hoá
        </div>
      </div>
    </div>
  );
};

export default TablePotentialItem;
