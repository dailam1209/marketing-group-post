import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import cskh from "../csks.module.css";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import Image from "next/image";
import { useSelector } from "react-redux";
import { da } from "date-fns/locale";
import { useApi } from "../../hooks/useApi";
import { current } from "@reduxjs/toolkit";
type Props = {};

const TongDaiPage = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listData, setListData] = useState([]);
  const show = useSelector((state: any) => state.auth.account);
  const [current, setcurrent] = useState(1)
  const [pageSize, setpageSize] = useState(10)
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const totalSum = listData?.reduce(
    (acc, current) => acc + +current.ring_duration,
    0
  );
  

  console.log("check222", totalSum);
  const datatable = listData?.map((item: any) => {
    return {
      caller: item.caller,
      callee: item.callee,
      start_time: item.start_time,
      end_time: item.end_time,
      ring_duration: +item.ring_duration,
      status: item.status,
    };
  });

  const count = listData?.reduce((acc, current) => {
    if (current.status === "ANSWERED") {
      return acc + 1;
    }
    return acc;
  }, 0);
//gettime start
function getCurrentFormattedDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = "00";
  const minutes = "00";
  const seconds = "00";

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
getEndOfDayFormattedDate()
getCurrentFormattedDate()
function getEndOfDayFormattedDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = "23";
  const minutes = "59";
  const seconds = "59";

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

  console.log("check count",count)
  const handleGet = async () => {
    const response = await fetch(
      `http://s02.oncall.vn:8899/api/call_logs/list?pagesize=1000000&start_time=${getCurrentFormattedDate()
    }&end_time=${getEndOfDayFormattedDate()}`,
      {
        method: "GET",
        headers: {
          access_token: show,
          // "Content-Type":"S"
        },
      }
    );
    const data = await response.json();
    console.log("databackend", data.items);
    setListData(data?.items);
    return data;
  };
  console.log("check show ne", show);

  useEffect(() => {
    handleGet();
  }, []);

  const Colums = [
    {
      key: "1",
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      key: "2",
      width: "10%",
      title: "Số nghe",
      dataIndex: "callee",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      key: "3",
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
    {
      key: "4",
      width: "20%",
      title: "Thời gian kết thúc cuộc gọi",
      dataIndex: "end_time",
    },
    {
      key: "5",
      width: "10%",
      title: "Thời lượng",
      dataIndex: "ring_duration",
      render: (text: any) => <div>{text}s</div>,
    },
    {
      key: "6",
      width: "10%",
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  return (
    <div key="1">
      {show !== "undefine" ? (
        <div>
          <div className={styles.group_button} >
            <Filter />
            <div className={styles.group_button_right}>
              <Link href={"/ghi-am"}>
                <button>Ghi âm</button>
              </Link>

              <Link href={"/thong-ke-tong-dai"}>
                <button>Thống kê</button>
              </Link>
              <Link href={"/switchboard/manager/line"}>
                <button>Quản lý line</button>
              </Link>
            </div>
          </div>
          <ul className={styles.cskh_info_call} style={{fontSize:16}}>
            <li>Số cuộc gọi: {listData?.length}</li>
            <li>Tổng số nghe máy: {count||''}</li>
            <li>Tổng số không trả lời: {listData?.length-count}</li>
            <li>Tổng thời gian gọi: {totalSum || ''}(s)</li>
            <li>Trung bình: {(totalSum / listData?.length).toFixed(2)}s/ cuộc gọi</li>
          </ul>
        </div>
      ) : (
        <div className={cskh.connect_tongdai}>
          <Link href={"/setting/switch_board"}>
            <Button
              style={{ height: 40, width: 200 }}
              className={`${cskh.dropbtn_add} `}
            >
              <Image
                style={{ paddingRight: 5 }}
                src="https://crm.timviec365.vn/assets/icons/kn.svg"
                alt="Connect Icon"
                width={30}
                height={15}
              />
              Kết nối tổng đài
            </Button>
          </Link>
        </div>
      )}
      <div style={{ paddingTop: 20 }}>
        <Table
          columns={Colums as any}
          dataSource={datatable}
          bordered
          scroll={{ x: 1000, y: 300 }}
          pagination={{
            current:current,
            pageSize:pageSize,
            onChange(page, pageSize) {
              if(page!=current){
                setcurrent(page)
              }
            },
          }}
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
