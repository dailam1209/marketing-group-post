import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps, Table } from "antd";
import React, { useState } from "react";
import styles from "../../delete_data/table.module.css";
import styless from "../../potential/potential.module.css";
import cskh from "../csks.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalConnect from "../modal/modal-connect";
type Props = {};

const TongDaiPage = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [id, setId] = useState();
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleSelect = (id: any) => {
    console.log(id);
    setId(id);
  };
  const handleDeleteDB = () => {
    console.log("delete");
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const data: any = [null];
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          //   onClick={() => {
          //     router.push(`/chinh-sua-khao-sat/${id}`);
          //   }}
        >
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-edit-black.svg"
            alt=""
          />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          <img
            src="https://crm.timviec365.vn/assets/icons/icon-delete-black.svg"
            alt=""
          />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];
  const Colums = [
    {
      width: "10%",
      title: "Số gọi",
      dataIndex: "name",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "10%",
      title: "Số nghe",
      dataIndex: "des",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "20%",
      title: "Thời gian kết thúc cuộc gọi",
      dataIndex: "date",
    },
    {
      width: "10%",
      title: "Thời lượng",
      dataIndex: "name",
    },
    {
      width: "10%",
      title: "Trạng thái",
      dataIndex: "name",
    },
  ];
  const suffix = (
    <SearchOutlined
      onClick={() => window.location.reload()}
      style={{
        fontSize: 20,
        color: "black",
      }}
    />
  );
  return (
    <div>
      <div className={cskh.input}>
        <div className={cskh.connect_tongdai}>
          <Link href="/crm/setting/switch_fpt">
            <Button
              onClick={() => setIsShowModalAdd(true)}
              style={{ height: 40, width: 200 }}
              className={`${cskh.dropbtn_add} `}
            >
              <img
                style={{ paddingRight: 5 }}
                src="https://crm.timviec365.vn/assets/icons/kn.svg"
              />
              Kết nối tổng đài
            </Button>
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Table
          // className={styles.table_antd}
          columns={Colums as any}
          dataSource={data}
          bordered
          scroll={{ x: 1000, y: 300 }}
          pagination={false}
        />
        <ModalConnect
          isShowModalAdd={isShowModalAdd}
          onClose={onClose}
          handleAddDB={handleAddDB}
        />
      </div>
    </div>
  );
};
export default TongDaiPage;
