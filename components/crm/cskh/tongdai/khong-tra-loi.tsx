import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import Cookies from 'js-cookie';
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import cskh from "../csks.module.css";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { da } from "date-fns/locale";
import { useApi } from "../../hooks/useApi";
import { current } from "@reduxjs/toolkit";
import FilterTongDai from "./filterTongdai";
import { dataSaveTD, doDisConnect } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
type Props = {};

const KhongTraLoiPage = (props: Props) => {
  const token = Cookies.get("token_base365")
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [showKetNoi, setShowKetNoi] = useState(true);
  const [soNghe, setSoNghe] = useState();
  const [nv, setnv] = useState();

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const datatable: any = listData?.map((item: any) => {
    return {
      caller: item.caller,
      callee: item.callee,
      start_time: item.start_time,
      end_time: item.end_time,
      ring_duration: +item.ring_duration,
      status: item.status,
    };
  });

  const dispatch = useDispatch();
  const [fillStart, setFillStart] = useState<any>();
  const [fillEnd, setFillEnd] = useState<any>();
  const [condition, setCondition] = useState(JSON.stringify({ token, state: 'NONE' }));

  const handleGet = async () => {
    setListData([]);
    if (soNghe) {
      let dataFill = data.filter((item) => item.callee === soNghe);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }
    if (nv) {
      let dataFill = data.filter((item) => +item.caller === nv);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(false);
    if (fillEnd && fillStart) {
      setCondition(JSON.stringify({
        timeStart: fillStart,
        timeEnd: fillEnd,
        token
      }))
    }
    try {
      const response = await fetch(`https://voip.timviec365.vn/api/GetPhoneNoAnswer`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: condition
      })
      const data = await response.json();
      if (data && data.data && data.data.storage) {
        setListData(data.data.storage);
        setData(data.data.storage);
      }
      return data;
    } catch (error) { }
  };
  const router = useRouter();
  useEffect(() => {
    handleGet();
  }, [condition]);

  const Colums = [
    {
      key: "1",
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      key: "2",
      width: "10%",
      title: "Người phụ trách",
      // render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      key: "3",
      width: "10%",
      title: "Số nghe",
      dataIndex: "callee",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      key: "4",
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
  ];

  return (
    <div>
      {showKetNoi && (
        <div className={styles.group_button} style={{ display: "block" }}>
          <div>
            <FilterTongDai
              datatable={datatable}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              fillStart={fillStart}
              setFillStart={setFillStart}
              fillEnd={fillEnd}
              setFillEnd={setFillEnd}
              handleGet={handleGet}
              soNghe={soNghe}
              setSoNghe={setSoNghe}
              nv={nv}
              setnv={setnv}
            />
          </div>

          <div
            className={styles.group_button_right}
            style={{ float: "right", marginTop: -40 }}
          >
            <Link href={"/tong-dai"}>
              <button>Chi tiết</button>
            </Link>

            <Link href={"/ghi-am"}>
              <button>Ghi âm</button>
            </Link>

            <Link href={"/thong-ke-tong-dai"}>
              <button>Thống kê</button>
            </Link>
          </div>

          <ul className={styles.cskh_info_call} style={{ fontSize: 16 }}>
            <li></li>
            <li>Tổng số không trả lời: {listData?.length || 0}</li>
          </ul>
        </div>
      )}
      {!showKetNoi && (
        <div className={cskh.connect_tongdai} style={{ paddingBottom: 20 }}>
          <Link href={"/setting/switch_board"}>
            <Button
              style={{ height: 40, width: 200 }}
              className={`${cskh.dropbtn_add} `}
            >
              <Image
                style={{ paddingRight: 5 }}
                src="/crm/kn.svg"
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
          //  loading={datatable?.length>0?false:true}
          columns={Colums as any}
          dataSource={datatable}
          bordered
          scroll={{ x: 1000, y: "auto" }}
          pagination={{
            style: { display: "flex", float: "left" },
            current: current,
            pageSize: pageSize,
            onChange(page, pageSize) {
              if (page != current) {
                setcurrent(page);
              }
            },
          }}
        />
        {/* <ModalConnect
          isShowModalAdd={isShowModalAdd}
          onClose={onClose}
          handleAddDB={handleAddDB}
        /> */}
      </div>
    </div>
  );
};
export default KhongTraLoiPage;
