import React, { useEffect, useState } from "react";
import styles from "../customer/customer.module.css";
import { Table, Tooltip } from "antd";
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
}

interface TableDataContracDrops {
  // Define other props here
  rowSelection: any;
  datatable: any;
  dataStatusCustomer: any;
  dataGroup: any;
}

const TableListCustomer: React.FC<TableDataContracDrops> = ({
  rowSelection,
  datatable,
  dataStatusCustomer,
  dataGroup,
}: any) => {
  const [openModalCall, setOpenModalCall] = useState(false);
  const router = useRouter();
  const [openEditText, setOpenEditText] = useState(false);
  const [valueStatus, setValueStatus] = useState();
  const [cusId, setCusId] = useState();

  
  const handleDetail = (data: any) => {
    router.push(`/customer/detail/${data}`);
  };

  const handleChangeStatus = (e: any, data: any) => {
    setValueStatus(e.target.value);
    console.log(valueStatus);
  
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
          onClick={() => handleDetail(record.cus_id)}
          href={""}
        >
          {data}
        </Link>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone_number",
      key: "1",
      width: 200,
      render: (data) => (
        <button onClick={() => setOpenModalCall(true)}>{data}</button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 150,
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "group_id",
      key: "3",
      width: 200,
      render: (data) => (
        <div
          style={{ padding: "5px", paddingLeft: "11px" }}
          className={stylesPotentialSelect.wrap_select}
        >
          <CustomerGroupSelect
            data={dataGroup}
            value={data}
            placeholder={data}
          />
        </div>
      ),
    },
    {
      title: "Tình trạng khách hàng",
      dataIndex: "status",
      key: "3",
      width: 200,
      render: (data) => (
        <div style={{ padding: "5px" }}>
          <SelectDataInputBox
            data={dataStatusCustomer}
            value={undefined}
            handleChange={handleChangeStatus}
            cusId={data.cus_id}
          />
          {/* <select
            onChange={(e: any) => {
              handleChangeStatus(e, data);
            }}
            // defaultValue={data.status}
            value={valueStatus}
            style={{ border: 0 }}
          >
            <option value={""}>Chưa cập nhật</option>
            {dataStatusCustomer?.map((item: any, index: number) => (
              <>
                {item.status !== 0 && (
                  <option key={index} value={item.stt_id}>
                    {item.stt_name}
                  </option>
                )}
              </>
            ))}
          </select> */}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
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
      dataIndex: "resoure",
      key: "3",
      width: 180,
      render: () => (
        <select style={{ border: 0 }}>
          <option value={0}>Chưa cập nhật</option>
          <option value={0}>Facebook</option>
          <option value={0}>Zalo</option>
          <option value={0}>Website</option>
          <option value={0}>Bên thứ 3</option>
          <option value={0}>Khách hàng giới thiệu</option>
          <option value={0}>Giới thiệu</option>
          <option value={""}>Chăm sóc khách hàng</option>
        </select>
      ),
    },
    {
      title: "Nhân viên tạo khách hàng",
      dataIndex: "userCrete",
      key: "3",
      width: 200,
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "emp_name",
      key: "3",
      width: 200,
    },
    {
      title: "Nhân viên bàn giao",
      dataIndex: "user_handing_over_work",
      key: "3",
      width: 200,
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

  useEffect(()=>{
    console.log("hello cus")
  },[])

  return (
    <>
      <div className="custom_table">
        <Table
          columns={columns}
          dataSource={datatable}
          rowSelection={{ ...rowSelection }}
          bordered
          // pagination={true}
          scroll={{ x: 1500, y: 300 }}
        />
        {datatable?.length && (
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
              Tổng số: <b>{datatable?.length}</b> Khách hàng
            </div>
          </div>
        )}
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
