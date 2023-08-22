import React, { useEffect, useState } from "react";
import styles from "../customer/customer.module.css";
import { Select, Table, Tooltip, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import Image from "next/image";
import stylesPotentialSelect from "@/components/crm/potential/potential.module.css";
import EditTextCustomerList from "../customer/customer_modal/custoer_mdal_edit_text";
import { useRouter } from "next/router";
import CallModal from "../customer/modal/call_modal";
import { useApi } from "@/components/crm/hooks/useApi";
import SelectDataInputBox from "../select/select_data";
import CustomerGroupSelect from "../select/select_data_group_customer";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");
interface DataType {
  key: React.Key;
  cus_id: number;
  email: string;
  name: string;
  phone_number: number;
  resoure: number;
  description: string;
  group_id: number;
  status: number;
  updated_at: string;
  emp_name: string;
  userCrete: string;
  user_handing_over_work: string;
  NameHandingOverWork: string;
  userNameCreate: string;
}

interface TableDataContracDrops {
  // Define other props here
  rowSelection?: any;
  datatable?: any;
  dataStatusCustomer?: any;
  dataGroup?: any;
  fetchData?: any;
  des?: any;
  setDes?: any;

}

const TableListCustomer: React.FC<TableDataContracDrops> = ({
  rowSelection,
  datatable,
  dataStatusCustomer,
  dataGroup,
  fetchData,
  des,
  setDes,
  setTest:any,
}: any) => {
  const [openModalCall, setOpenModalCall] = useState(false);
  const router = useRouter();
  const [openEditText, setOpenEditText] = useState(false);
  const [valueStatus, setValueStatus] = useState();
  const [cusId, setCusId] = useState<any>();
  const [pageSize, setpageSize] = useState<any>();

  const handleChangeStatus = (e: any, data: any) => {
    setValueStatus(e.target.value);
  };
  const renderTitle = (record, text) => (
    <div className="tooltip-content">
      <button
        onClick={() => (setOpenEditText(true), setCusId(record), setDes(text))}
      >
        <Image
          className="edit-icon"
          src="/crm/h_edit_cus.svg"
          alt=""
          width={15}
          height={15}
        />
        Chỉnh sửa
      </button>
    </div>
  );
  const handleChangeSelect = async (e: any, record) => {
    //get type
    const res = await fetch(
     `${base_url}/api/crm/customerdetails/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: record?.cus_id }),
      }
    );
    const type = await res.json();
    // const

    const url =
    `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("resoure", e.target.value);
    formData.append(
      "type",
      type?.data?.data1?.loai_hinh_khach_hang ||
        type?.data?.data2?.loai_hinh_khach_hang
    );
    formData.append("cus_id", record.cus_id);

    const headers = {
      Authorization: `Bearer ${Cookies.get("token_base365")}`,
    };

    const config = {
      method: "POST",
      headers: headers,
      body: formData,
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (data?.error) {
        notification.error({ message: data.error.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã KH",
      width: 100,
      dataIndex: "cus_id",
      key: "cus_id",
    },
    {
      title: "Tên khách hàng",
      width: 200,
      dataIndex: "name",
      key: "0",
      render: (data, record) => (
        <Link
          style={{ cursor: "pointer" }}
          href={`/crm/customer/detail/${record.cus_id}`}
        >
          {data}
        </Link>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone_number",
      key: "1",
      width: 100,
      render: (data, record) => (
        <button
          onClick={() => (setOpenModalCall(true), setCusId(record.cus_id))}
        >
          {data}
        </button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 200,
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "group_id",
      key: "3",
      width: 300,
      render: (data, record) => (
        <div
          style={{ padding: "5px", paddingLeft: "11px" }}
          className={stylesPotentialSelect.wrap_select}
          onClick={() => setCusId(record.cus_id)}
        >
          <CustomerGroupSelect
            data={dataGroup}
            value={data}
            placeholder={record?.group_id}
            cusId={cusId}
          />
        </div>
      ),
    },
    {
      title: "Tình trạng khách hàng",
      dataIndex: "status",
      key: "3",
      width: 200,
      render: (data, record) => (
        <div style={{ padding: "5px" }}>
          <SelectDataInputBox
            data={dataStatusCustomer}
            value={undefined}
            handleChange={handleChangeStatus}
            cusId={data.cus_id}
          />
          {/* {data} */}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "3",
      width: 200,
      render: (text, record) => (
        <Tooltip title={renderTitle(record.cus_id, text)} color={"white"}>
          <div className="custom-cellCus">{text ? text : "Chưa cập nhật"}</div>
        </Tooltip>
      ),
    },
    {
      title: "Nguồn khách hàng",
      dataIndex: "resoure",
      key: "3",
      width: 180,
      render: (text, record) => (
        <div>
          <select
            style={{ border: 0, width: "100%" }}
            onChange={(e) => handleChangeSelect(e, record)}
          >
            <option value={0}>{text ? text : " Chưa cập nhật"}</option>
            <option value={1}>{" Facebook"}</option>Zalo
            <option value={2}>{" Website"}</option>
            <option value={3}>{" Zalo"}</option>
            <option value={4}>{" Dữ liệu bên thứ 3"}</option>
            <option value={5}>{" Khách hàng giới thiệu"}</option>
            <option value={6}>{" Giới thiệu"}</option>
            <option value={7}>{" Chăm sóc khách hàng"}</option>
            <option value={8}>{" Email"}</option>
          </select>
        </div>
      ),
    },
    {
      title: "Nhân viên tạo khách hàng",
      dataIndex: "userNameCreate",
      key: "3",
      width: 200,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} /> {text}{" "}
        </div>
      ),
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "userName",
      key: "3",
      width: 200,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} /> {text}{" "}
        </div>
      ),
    },
    {
      title: "Nhân viên bàn giao",
      dataIndex: "NameHandingOverWork",
      key: "3",
      width: 200,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} /> {text}{" "}
        </div>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "3",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 150,
      // fixed:"right",
      render: (data, record: any) => (
        <>
          <Link href={`/crm/customer/edit/${record.cus_id}`}>
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
  //nut select
  const handleChangePageSize = (value: any) => {
    setpageSize(value);
  };
  useEffect(() => {}, [des]);

  return (
    <>
      <div className="custom_table">
        <Table
          columns={columns}
          dataSource={datatable}
          rowSelection={{ ...rowSelection }}
          bordered
          // pagination={true}
          scroll={{ x: 1500, y: "auto" }}
          pagination={{
            style: { paddingBottom: 20 },
            pageSize: pageSize,
          }}
        />
        {datatable?.length && (
          <div
            className="main__footer flex_between"
            id=""
            style={{ marginBottom: 25 }}
          >
            <div className="show_number_item">
              <b>Hiển thị:</b>
              <Select
                style={{ width: 200 }}
                placeholder={
                  <div style={{ color: "black" }}>10 bản ghi trên trang</div>
                }
                onChange={(value) => handleChangePageSize(value)}
              >
                <option value={10}>10 bản ghi trên trang</option>
                <option value={20}>20 bản ghi trên trang</option>
                <option value={30}>30 bản ghi trên trang</option>
                <option value={40}>40 bản ghi trên trang</option>
                <option value={50}>50 bản ghi trên trang</option>
              </Select>
            </div>
            <div className="total">
              Tổng số: <b>{datatable?.length}</b> Khách hàng
            </div>
          </div>
        )}
      </div>

      <EditTextCustomerList
        isModalCancel={openEditText}
        setIsModalCancel={setOpenEditText}
        cusId={cusId}
        des={des}
        setDes={setDes}
      />

      <CallModal
        isModalCancel={openModalCall}
        setIsModalCancel={setOpenModalCall}
        cusId={cusId}
      />
    </>
  );
};

export default TableListCustomer;
