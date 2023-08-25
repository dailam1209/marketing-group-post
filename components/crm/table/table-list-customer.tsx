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
import { text } from "stream/consumers";
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
  type: any;
  cus_from: any;
  link: any;
  value: any;
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
  setPage?: any;
  page?: any;
  totalRecords?: any;
  pageSize?: any;
  setPageSize?: any;
  loading?: any;
  setDatatable?: any;
  ArrNguonKK?: any;
}

const TableListCustomer: React.FC<TableDataContracDrops> = ({
  rowSelection,
  datatable,
  dataStatusCustomer,
  dataGroup,
  fetchData,
  des,
  setDes,
  setTest,
  page,
  setPage,
  totalRecords,
  pageSize,
  setPageSize,
  loading,
  setDatatable,
  ArrNguonKK,
}: any) => {
  const [openModalCall, setOpenModalCall] = useState(false);
  const router = useRouter();
  const [openEditText, setOpenEditText] = useState(false);
  const [valueStatus, setValueStatus] = useState();
  const [cusId, setCusId] = useState<any>();
  const [te, setTE] = useState<any>();
  const [nameNguon, setNameNguon] = useState();
  const handleChangeStatus = (e: any, data: any) => {
    setValueStatus(e.target.value);
  };
  const handleShowCall = (record: any) => {
    setCusId(record.cus_id);
    setOpenModalCall(true);
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
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: record?.cus_id }),
    });
    const type = await res.json();

    // const

    const url = `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("resoure", e.target.value);
    formData.append("type", type?.data?.loai_hinh_khach_hang);
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
      key: "cus_from",
    },
    {
      title: "Tên khách hàng",
      width: 250,
      dataIndex: "name",
      key: "0",
      render: (data, record) => (
        <div>
          <Link
            style={{ cursor: "pointer" }}
            href={{
              pathname: `/crm/customer/detail/${record.cus_id}`,
              query: { name: record.name },
            }}
          >
            {data}
          </Link>
          <br />
          {record?.link && record?.cus_from ? (
            <Link
              href={`${record?.link}`}
              style={{ color: "#ffa800", fontWeight: 600 }}
            >
              ({record?.cus_from ? record?.cus_from : ""})
            </Link>
          ) : (
            <div style={{ color: "#ffa800", fontWeight: 600 }}>
              {record?.cus_from && (
                <div> ({record?.cus_from ? record?.cus_from : ""})</div>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone_number",
      key: "1",
      width: 100,
      render: (data, record) => (
        <button onClick={() => handleShowCall(record)}>{data}</button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 240,
      render: (text, record) => <div> {text ? text : "Chưa cập nhật"}</div>,
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "group_id",
      key: "3",
      width: 400,
      render: (data, record) => (
        <div
          style={{
            padding: "5px",
            paddingLeft: "11px",
            width: "100%",
            textAlign: "left",
          }}
          className={stylesPotentialSelect.wrap_select}
          onClick={() => setCusId(record.cus_id)}
        >
          <CustomerGroupSelect
            data={dataGroup}
            value={data}
            placeholder={record?.group_id}
            cusId={cusId}
            type={record.type}
          />
        </div>
      ),
    },
    {
      title: "Tình trạng khách hàng",
      dataIndex: "status",
      key: "3",
      width: 300,
      render: (text, record) => (
        <div style={{ padding: "5px" }}>
          <SelectDataInputBox
            data={dataStatusCustomer}
            value={record.status}
            handleChange={handleChangeStatus}
            stt={record.status}
            cusId={record.cus_id}
            type={record.type}
          />
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
        <select
          style={{ border: 0, width: "100%" }}
          onChange={(e) => handleChangeSelect(e, record)}
          defaultValue={record?.value ? record.value : ""}
        >
          {ArrNguonKK?.map((item, index) => {
            if (item?.name == record?.resoure) {
              return (
                <option
                  key={index}
                  value={item?.id}
                  style={{ background: "rgb(76, 91, 212)", color: "#fff" }}
                >
                  {item?.name}
                </option>
              );
            } else {
              return (
                <option key={index} value={item?.id}>
                  {item?.name}
                </option>
              );
            }
          })}
        </select>
      ),
    },
    {
      title: "Nhân viên tạo khách hàng",
      dataIndex: "userNameCreate",
      key: "3",
      width: 220,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} />{" "}
          {text ? text : "Chưa cập nhật"}{" "}
        </div>
      ),
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "userName",
      key: "3",
      width: 220,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} />{" "}
          {text ? text : "Chưa cập nhật"}{" "}
        </div>
      ),
    },
    {
      title: "Nhân viên bàn giao",
      dataIndex: "NameHandingOverWork",
      key: "3",
      width: 220,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={25} height={25} alt="" src={"/crm/user.svg"} />{" "}
          {text ? text : "Chưa cập nhật"}{" "}
        </div>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "3",
      width: 120,
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
  const customLocale = {
    emptyText: (
      <div
        key={"empty"}
        style={{ fontWeight: 400, color: "black", fontSize: 15 }}
      >
        {loading ? " Đang phân tích kết quả ..." : " Không có kết quả phù hợp"}
      </div>
    ), // Thay thế nội dung "No Data" bằng "Hello"
  };
  return (
    <>
      <div className="custom_table">
        <Table
          locale={customLocale}
          columns={columns}
          dataSource={datatable}
          rowSelection={{ ...rowSelection }}
          bordered
          // pagination={true}
          scroll={{ x: 1500, y: "auto" }}
          pagination={{
            style: { paddingBottom: 20 },
            current: page,
            pageSize: pageSize,
            total: totalRecords,
            onChange: (current, pageSize) => {
              if (current != page) {
                setDatatable([]);
                setPage(current);
              }
            },
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
                onChange={(value) => setPageSize(value)}
              >
                <option value={10}>10 bản ghi trên trang</option>
                <option value={20}>20 bản ghi trên trang</option>
                <option value={30}>30 bản ghi trên trang</option>
                <option value={40}>40 bản ghi trên trang</option>
                <option value={50}>50 bản ghi trên trang</option>
              </Select>
            </div>
            <div className="total">
              Tổng số: <b>{totalRecords}</b> Khách hàng
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
        setCusId={setCusId}
      />
    </>
  );
};

export default TableListCustomer;
