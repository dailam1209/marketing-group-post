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
      title: "STT",
      dataIndex: "name",
    },
    {
      width: "10%",
      title: "Line",
      dataIndex: "des",
    },
    {
      width: "10%",
      title: "Người phụ trách",
      dataIndex: "des",
    },
    {
      width: "12%",
      title: "Trạng thái",
      dataIndex: "date",
    },
    {
      width: "12%",
      title: "Chức năng",
      dataIndex: "action",
      render: (text: any) => {
        if (text) {
          return <button>Sửa</button>;
        }
        return null;
      },
    },
  ];

  useEffect(() => {
    console.log(isConnected);
  }, []);

  return (
    <div>
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
