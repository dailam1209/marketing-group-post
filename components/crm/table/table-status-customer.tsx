import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import CancelModal from "../potential/potential_steps/cancel_modal";
import EditStatusCustomerModal from "../customer/status/modal_status_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import Image from "next/image";
import H1 from "@/public/crm/h_edit_cus.svg";
import H2 from "@/public/crm/h_delete_cus.svg";
import AddStatusCustomerModal from "../customer/status/modal_add_customer_status";
import Add from "@/public/crm/add.svg";

interface DataType {
  key: number;
  name: string;
  created_user: number;
  created_at: string;
  status: string;
}

interface TableStatusCustomerProps {}

const TableStatusCustomer: React.FC<TableStatusCustomerProps> = ({}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [stt, setStt] = useState<any>("");
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/customerStatus/list",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
    "POST",
    { stt_name: `${stt}` }
  );
  console.log("check", data?.data?.listStatus);
  useEffect(() => {
    if (stt == null) {
      fetchData(
        "http://210.245.108.202:3007/api/crm/customerStatus/list",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
        "POST"
      );
    }
    fetchData();
  }, []);
  const datatable = data?.data?.listStatus.map((item: any, index: number) => {
    return {
      key: index + 1,
      name: item.stt_name,
      created_user: item.created_user,
      created_at: item.created_at,
      status: item.stt,
    };
  });
  const handelChangeSwicth = (e: boolean) => {
    return e;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 100,
      dataIndex: "key",
      key: "age",
    },
    {
      title: "Tên tình trạng",
      width: 250,
      dataIndex: "name",
      key: "name",
      render: (data) => <span style={{ color: "#4C5BD4" }}>{data}</span>,
    },
    {
      title: "Người tạo",
      width: 160,
      dataIndex: "created_user",
      key: "age",
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "created_at",
      key: "1",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "2",
      width: 180,
      render: (data) => (
        <Switch
          className="status_cus"
          defaultChecked
          onChange={handelChangeSwicth}
        />
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "6",
      width: 200,
      // fixed:"right",
      render: (id) => (
        <>
          {/* <Link href={`/crm/customer/group/edit/${id}`}> */}
          <button onClick={() => setOpenSharedModal(true)}>
            <Image
              src={H1} // Đường dẫn tới tệp tin SVG trong thư mục 'public'
              alt="My SVG Image"
              className={styles.icon_edit}
            />
            Sửa
          </button>
          {/* </Link> */}
          <button onClick={() => setIsOpenCancel(true)}>
            <Image
              src={H2} // Đường dẫn tới tệp tin SVG trong thư mục 'public'
              alt="My SVG Image"
              className={styles.icon_delete}
            />
            Xóa
          </button>
        </>
      ),
    },
  ];
  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <div className="custom_table">
      <div className={styles.main__control} style={{ paddingBottom: 40 }}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form
              className={styles.main__control_search}
              style={{ width: "100%" }}
              action=""
              onSubmit={() => handleSubmit(event)}
            >
              <input
                type="text"
                className={styles.input__search}
                name="search"
                onChange={(e) => setStt(e.target.value)}
                value={stt}
                placeholder="Tìm kiếm theo tình trạng khách hàng"
              />
              <button
                className={styles.kinh_lup}
                onClick={() => {
                  fetchData();
                }}
              >
                <img
                  className={styles.img__search}
                  src="https://crm.timviec365.vn/assets/icons/search.svg"
                  alt=""
                />
              </button>
            </form>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image src={Add} alt="My SVG Image" />
              Thêm mới
            </button>
          </div>
        </div>

        <AddStatusCustomerModal
          isModalCancel={isOpen}
          setIsModalCancel={setIsOpen}
        />
      </div>
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        pagination={false}
        scroll={{ x: 992, y: 300 }}
      />

      <CancelModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
        content={"Bạn có chắc chắn muốn xóa ???"}
        title={"Xác nhận xóa tình trạng khách hàng"}
        link={"#"}
      />

      <EditStatusCustomerModal
        isModalCancel={openSharedModal}
        setIsModalCancel={setOpenSharedModal}
      />
    </div>
  );
};

export default TableStatusCustomer;
