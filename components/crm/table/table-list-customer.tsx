import React, { useState } from "react";
import styles from "../customer/customer.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import Image from "next/image";
import stylesPotentialSelect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import EditTextCustomerList from "../customer/customer_modal/custoer_mdal_edit_text";
import { useRouter } from "next/router";
import CallModal from "../customer/modal/call_modal";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

interface TableDataContracDrops {
  // Define other props here
  rowSelection: TableRowSelection<DataType>;
}

export const data: DataType[] = [];
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

const TableListCustomer: React.FC<TableDataContracDrops> = ({
  rowSelection,
}: any) => {
  const [openModalCall, setOpenModalCall] = useState(false);
  const router = useRouter();
  const [openEditText, setOpenEditText] = useState(false);

  const handleDetail = (data: any) => {
    router.push(`/crm/customer/detail/${data}`);
  };

  const renderTitle = () => (
    <button onClick={() => setOpenEditText(true)}>
      <Image
        style={{ marginRight: "8px" }}
        src="/h_edit_cus.svg"
        alt="filter"
        width={13}
        height={13}
      />
      Chỉnh sửa
    </button>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã KH",
      width: 100,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên khách hàng",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        <span style={{ cursor: "pointer" }} onClick={() => handleDetail(data)}>
          {data}
        </span>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "personname",
      key: "1",
      width: 200,
      render: (data) => (
        <button onClick={() => setOpenModalCall(true)}>{data}</button>
      ),
    },
    {
      title: "Email",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "date2",
      key: "3",
      width: 200,
      render: () => (
        <div
          style={{ padding: "5px", paddingLeft: "11px" }}
          className={stylesPotentialSelect.wrap_select}
        >
          <PotentialSelectBoxStep value="CBA" placeholder="CBA" />
        </div>
      ),
    },
    {
      title: "Tình trạng khách hàng",
      dataIndex: "date2",
      key: "3",
      width: 200,
      render: () => (
        <div style={{ padding: "5px" }}>
          <select style={{ border: 0 }}>
            <option value={""}>Chưa cập nhật</option>
            <option value={"b"}>Bệnh</option>
            <option value={"k"}>Khoẻ</option>
            <option value={"t"}>Tốt</option>
            <option value={"n"}>Bình thường</option>
          </select>
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "date2",
      key: "3",
      width: 200,
      render: (text) => (
        <Tooltip title={renderTitle} color={"white"}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Nguồn khách hàng",
      dataIndex: "date2",
      key: "3",
      width: 180,
      render: () => (
        <select style={{ border: 0 }}>
          <option value={""}>Chưa cập nhật</option>
          <option>Facebook</option>
          <option>Zalo</option>
          <option>Website</option>
          <option>Bên thứ 3</option>
          <option>Khách hàng giới thiệu</option>
          <option>Giới thiệu</option>
          <option value={""}>Chăm sóc khách hàng</option>
        </select>
      ),
    },
    {
      title: "Nhân viên tạo khách hàng",
      dataIndex: "date2",
      key: "3",
      width: 200,
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "date2",
      key: "3",
      width: 200,
    },
    {
      title: "Nhân viên bàn giao",
      dataIndex: "date2",
      key: "3",
      width: 200,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "date2",
      key: "3",
      width: 100,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 150,
      // fixed:"right",
      render: (data) => (
        <>
          <Link href={`/crm/customer/edit/data`}>
            <button className={styles.icon_edit}>
              <img
                style={{ marginRight: "8px" }}
                src="https://crm.timviec365.vn/assets/img/h_edit_cus.svg"
              />
              Chỉnh sửa
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="custom_table">
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
          bordered
          // pagination={true}
          scroll={{ x: 1500, y: 300 }}
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
            Tổng số: <b>{data.length}</b> Khách hàng
          </div>
        </div>
      </div>

      <EditTextCustomerList
        isModalCancel={openEditText}
        setIsModalCancel={setOpenEditText}
      />

      <CallModal
        isModalCancel={openModalCall}
        setIsModalCancel={setOpenModalCall}
      />
    </>
  );
};

export default TableListCustomer;
