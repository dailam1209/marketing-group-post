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
import $ from "jquery";
import "select2";

const Cookies = require("js-cookie");
interface DataType {
  count_content_call: number;
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
  isSelectedRow?: any;
  numberSelected?: any;
  clearOption?: any;
  chooseAllOption?: any;
  setName?: any;
  name?: any;
  setPhone?: any;
  selectedCus?: any;
  setStatus?: any;
  setResoure?: any;
  nvPhuTrach?: any;
  setnvPhuTrach?: any;
  userNameCreate?: any;
  setuserNameCreate?: any;
  setNameHandingOverWork?: any;
  NameHandingOverWork?: any;
  nhomCha?: any;
  setnhomCha?: any;
  nhomCon?: any;
  setnhomCon?: any;
  setloading?: any;
  setgroup_id?: any;
  setTimeStart?: any;
  setTimeEnd?: any;
  setdateE?: any;
  setdateS?: any;
  setTime_s?: any;
  setTime_e?: any;
  setemp_id?: any;
  setIdNhom?: any;
  listGr?: any;
  listGr_Child?: any;
  nameNvNomor?: any;
  nv?: any;
  role?: any;
  posId?: any;
  listNV?: any;
  handleGetInfoSTT?: any;
  fetchDataDefault?: any;
}

const TableListCustomer: React.FC<TableDataContracDrops> = ({
  rowSelection,
  datatable,
  dataStatusCustomer,
  dataGroup,
  fetchData,
  des,
  setDes,
  page,
  setPage,
  totalRecords,
  pageSize,
  setPageSize,
  loading,
  setDatatable,
  ArrNguonKK,
  setStatus,
  setResoure,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setloading,
  setgroup_id,
  setTimeStart,
  setTimeEnd,
  setdateE,
  setdateS,
  setTime_s,
  setTime_e,
  setemp_id,
  setIdNhom,
  listGr,
  listGr_Child,
  nameNvNomor,
  nv,
  role,
  posId,
  listNV,
  handleGetInfoSTT,
  fetchDataDefault,
}: any) => {
  const [openModalCall, setOpenModalCall] = useState(false);
  const router = useRouter();
  const [openEditText, setOpenEditText] = useState(false);
  const [valueStatus, setValueStatus] = useState();
  const [cusId, setCusId] = useState<any>();
  const [te, setTE] = useState<any>();
  const [nameNguon, setNameNguon] = useState();
  const [show, setshow] = useState<boolean>(false);
  const [group_idFix, setgroup_idFix] = useState<any>();
  const handleChangeStatus = (e: any, data: any) => {
    setValueStatus(e.target.value);
  };
  const handleShowCall = (record: any) => {
    setgroup_idFix(record.group_id);
    setCusId(record.cus_id);
    setshow(true);
  };

  const renderTitle = (record, text) => (
    <div className="tooltip-content">
      <button
        onClick={() => (setOpenEditText(true), setCusId(record), setDes(text))}
      >
        <Image
          className="edit-icon"
          src="/crm/h_edit_cus.svg"
          alt="hungha365.com"
          width={15}
          height={15}
        />
        Chỉnh sửa
      </button>
    </div>
  );
  const [nguon, setnguon] = useState<any>();
  const [slectNguon, setslectNguon] = useState<any>();
  let cus_nhom;
  let type_nhom;
  const handleChangeSelect = async (e: any, record) => {
    setnguon(e.target.value);
    // const
    const url = `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("resoure", e.target.value);
    formData.append("type", record?.type);
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [type, setType] = useState<any>();
  const initialOption = { gr_id: "0", gr_name: "Chưa cập nhật" };

  const options = [initialOption, ...(dataGroup ?? [])].map((item) => ({
    label: item.gr_id !== "0" ? item.gr_name : "", // Không trả về label nếu item.gr_id = 0
    options:
      item.gr_id !== "0"
        ? [
            {
              value: item.gr_id.toString(),
              label: item.gr_name,
            },
            ...(item?.lists_child ?? []).map((child) => ({
              value: child.gr_id.toString(),
              label: child.gr_name,
            })),
          ]
        : [{ label: item.gr_name, value: item.gr_id.toString() }],
  }));
  const [value, setvalue] = useState();
  const [slectNhom, setslectNhom] = useState<any>();
  const [groupIds, setGroupIds] = useState<any>({});

  const handleSelectChange = async (selectedOption) => {
    // Kiểm tra nếu người dùng chọn một nhóm (select cha)
    const url = `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("group_id", selectedOption);
    formData.append("type", type);
    formData.append("cus_id", cus_nhom);

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
      }
    } catch (error) {
      console.error(error);
    }
    if (selectedOption && selectedOption.options) {
      console.log("Không thể chọn nhóm");
      // Có thể hiển thị thông báo hoặc xử lý theo cách bạn muốn
      return;
    }
  };

  $(document).ready(function () {
    $(".js-example-basic-single").select2();

    $(".js-example-basic-single").on("select2:opening", function (e) {
      const record = JSON.parse(e.target.getAttribute("data-record"));
      cus_nhom = record.cus_id;
      type_nhom = record.type;
    });

    $(".js-example-basic-single").on("change", async (e) => {
      var selectedValue = e.target.value;
      // Đoạn mã xử lý giá trị đã chọn ở đây

      if (selectedValue !== null) {
        await handleSelectChange(selectedValue);
      }
    });
  });
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
            target="_blank"
            rel="nofollow noopener noreferrer"
            style={{ cursor: "pointer" }}
            href={{
              pathname: `/customer/detail/${record.cus_id}`,
              query: { name: record.name },
            }}
          >
            {data}
          </Link>
          <br />
          {record?.link && record?.cus_from ? (
            <Link
              target="_blank"
              rel="nofollow noopener noreferrer"
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
        <div
          onClick={() => handleShowCall(record)}
          style={{
            cursor: "pointer",
            color:
              record?.count_content_call !== 0 && record?.count_content_call
                ? "#ffa800"
                : "#474747",
          }}
          className={data?.length > 20 ? "truncate-text" : ""}
        >
          {data}
        </div>
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
      render: (data, record, index) => (
        <select
          // id="mySelect"
          style={{
            width: "100%",
            height: "100%",
          }}
          name="value"
          className="js-example-basic-single"
          defaultValue={record?.group_id?.toString() || "0"}
          data-record={JSON.stringify(record)} // Lưu bản ghi vào data attribute
        >
          {options.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
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
        <div
          onClick={() => (
            setslectNguon(record.cus_id), setCusId(record.cus_id)
          )}
        >
          <select
            style={{ border: 0, width: "100%" }}
            onChange={(e) => handleChangeSelect(e, record)}
            value={
              slectNguon === record.cus_id && nguon ? nguon : record?.value
            }
            // defaultValue={record?.value ? record.value : ""}
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
        </div>
      ),
    },
    {
      title: "Nhân viên tạo khách hàng",
      dataIndex: "userNameCreate",
      key: "3",
      width: 220,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            width={25}
            height={25}
            alt="hungha365.com"
            src={"/crm/user.svg"}
          />
          {text ? text : "Chưa cập nhật"}
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
          <Image
            width={25}
            height={25}
            alt="hungha365.com"
            src={"/crm/user.svg"}
          />
          {text ? text : "Chưa cập nhật"}
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
          <Image
            width={25}
            height={25}
            alt="hungha365.com"
            src={"/crm/user.svg"}
          />
          {text ? text : "Chưa cập nhật"}
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
          <Link href={`/customer/edit/${record.cus_id}`}>
            <button className={styles.icon_edit}>
              <img style={{ marginRight: "8px" }} src="/crm/h_edit_cus.svg" />
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
      <head>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <link
          href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
      </head>
      <div className="custom-table">
        <Table
          locale={customLocale}
          columns={columns}
          dataSource={datatable}
          rowSelection={{ ...rowSelection }}
          bordered
          // pagination={true}
          scroll={{ x: 2000, y: "auto" }}
          pagination={{
            style: {
              paddingBottom: 20,
              display: "flex",
              float: "left",
              marginLeft: 850,
              position: "absolute",
            },
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
        {datatable?.length && datatable?.length > 0 && (
          <div
            className="main__footer_fix flex_between"
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
            <div className="total" style={{ paddingTop: 5 }}>
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
        handleGetInfoSTT={handleGetInfoSTT}
        isModalCancel={openModalCall}
        setIsModalCancel={setOpenModalCall}
        cusId={cusId}
        setCusId={setCusId}
        setIdNhom={setIdNhom}
        setTime_s={setTime_s}
        setTime_e={setTime_e}
        dataStatusCustomer={dataStatusCustomer}
        setStatus={setStatus}
        fetchData={fetchData}
        setResoure={setResoure}
        datatable={datatable}
        nvPhuTrach={nvPhuTrach}
        setnvPhuTrach={setnvPhuTrach}
        userNameCreate={userNameCreate}
        setuserNameCreate={setuserNameCreate}
        nhomCha={nhomCha}
        setnhomCha={setnhomCha}
        nhomCon={nhomCon}
        setnhomCon={setnhomCon}
        setDatatable={setDatatable}
        setloading={setloading}
        setgroup_id={setgroup_id}
        setTimeStart={setTimeStart}
        setTimeEnd={setTimeEnd}
        setdateE={setdateE}
        setdateS={setdateS}
        setemp_id={setemp_id}
        nv={nv}
        role={role}
        posId={posId}
        listNV={listNV}
        nameNvNomor={nameNvNomor}
        listGr={listGr}
        listGr_Child={listGr_Child}
        group_idFix={group_idFix}
        show={show}
        setshow={setshow}
        fetchDataDefault={fetchDataDefault}
      />
    </>
  );
};

export default TableListCustomer;
