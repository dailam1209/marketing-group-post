import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import { CallContext } from "@/components/context/tongdaiContext";
import Filter from "./filter";
type Props = {};

const Recording = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const data: any = [null];

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
      title: "Ghi âm",
      dataIndex: "name",
    },
  ];


  useEffect(() => {
    console.log(isConnected);
  }, []);

  return (
    <div>
      <div className={styles.group_button}>
        <Filter />
      </div>

      <div style={{ paddingTop: 20 }}>
        <Table
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
      <div className={styles.pagination}>
        <PaginationCSKH />
      </div>
    </div>
  );
};
export default Recording;
