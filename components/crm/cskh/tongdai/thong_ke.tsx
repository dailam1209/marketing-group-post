import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import { useSelector } from "react-redux";
import FilterTongdai from "./filterTongdai";
import FilterTongDai from "./filterTongdai";
import FilterThongKe from "./fillterThongKe";
import { base_url } from "../../service/function";
import { dataSaveTD } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Cookies = require("js-cookie");
type Props = {};

const Recording = (props: Props) => {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);

  const [listData, setListData] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phongban, setPhongban] = useState();

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };

  const getCurrentFormattedDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const seconds = "00";

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const getEndOfDayFormattedDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = "23";
    const minutes = "59";
    const seconds = "59";
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
  const start_T = getCurrentFormattedDate();
  const end_T = getEndOfDayFormattedDate();
  const [fillStart, setFillStart] = useState<any>();
  const [fillEnd, setFillEnd] = useState<any>();
  const [listNV, setListNV] = useState([]);

  const [query, setQuery] = useState(
    `http://s02.oncall.vn:8899/api/call_logs/list?pagesize=100000000&start_time=${start_T} &end_time=${end_T}&`
  );
  const handleGetNhanVienPhuTrach = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setListNV(data?.data?.items);
    } catch (error) {}
  };
  var outputArray = [];

  listData?.forEach(function (call) {
    var existingCall = outputArray.find(function (item) {
      return item.caller === call.caller;
    });

    var ringDuration = parseInt(call.ring_duration); // Chuyển đổi chuỗi thành số

    if (existingCall) {
      existingCall.ring_duration += ringDuration;
      existingCall.countSDT += 1;

      if (call.status === "ANSWERED") {
        existingCall.countStatus += 1;
      }
    } else {
      var newCall = {
        caller: call.caller,
        ring_duration: ringDuration,
        countSDT: 1,
        countStatus: 0,
      };

      if (call.status === "ANSWERED") {
        newCall.countStatus = 1;
      }

      outputArray.push(newCall);
    }
  });
  const [listLine, setlistLine] = useState([]);
  const [listPB, setlistPB] = useState([]);

  const handleGetPhongBan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setlistPB(data?.data?.items);
    } catch (error) {}
  };

  // console.log('check',listPB)

  const handleGetLine = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/cutomerCare/listLine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      const data = await res.json();
      setlistLine(data?.data);
    } catch (error) {}
  };
  const output2 = outputArray.filter((item) => {
    return item.caller.length < 4;
  });
  const datane: any = output2?.map((item: any) => {
    let name2 = "";
    let phong = "";
    for (var key of Object.keys(listLine)) {
      var value = listLine[key];
      if (value?.extension_number == item.caller) {
        name2 = value?.userName;
      }
    }
    if (listNV) {
      for (let key of listNV) {
        if (key.userName === name2) {
          phong = key.nameDeparment;
        }
      }
    }

    return {
      caller: item.caller,
      ring_duration: item.ring_duration,
      countStatus: item.countStatus,
      countSDT: item.countSDT,
      nocountStatus: item.countSDT - item.countStatus,
      adv: (item.ring_duration / item.countSDT).toFixed(2),
      name: name2,
      nameDeparment: phong,
      // status: item.status,
    };
  });
  datane.sort((a, b) => a.caller - b.caller);
  const handleGet = async () => {
    if (phongban) {
      datane.filter((item) => {
        return item.nameDeparment === phongban;
      });
      setIsModalOpen(false);
    }
    setListData([]);
    setIsModalOpen(false);
    if (fillEnd && fillStart) {
      setQuery(
        `http://s02.oncall.vn:8899/api/call_logs/list?pagesize=100000000&start_time=${fillStart} &end_time=${fillEnd}&`
      );
    }
    //lay datatable
    try {
      const response = await fetch(`${query}`, {
        method: "GET",
        headers: {
          access_token: show,
          // "Content-Type":"S"
        },
      });
      const data = await response.json();
      setListData(data?.items);
    } catch (error) {
      
    }

  };
  useEffect(() => {
    handleGetPhongBan();
    handleGetLine();
    handleGet();
    handleGetNhanVienPhuTrach();
  }, [query]);
  useEffect(() => {
    const handleget = async () => {
      if (show) {
        const res = await fetch(
          "https://s02.oncall.vn:8900/api/account/credentials/verify",
          {
            method: "POST",
            body: JSON.stringify({
              name: "HNCX00693",
              password: "v2ohO6B1Nf4F",
              domain: "hncx00693.oncall",
            }),
          }
        );
        const data = await res.json();
        dispatch(dataSaveTD(data.access_token));
      }
    };
    handleget();
  }, []);
  const Colums = [
    {
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: "10%",
      title: "Người phụ trách",
      dataIndex: "name",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: "10%",
      title: "Phòng ban",
      dataIndex: "nameDeparment",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "10%",
      title: "Tổng số cuộc gọi",
      dataIndex: "countSDT",
    },
    {
      width: "10%",
      title: "Tổng số đã trả lời",
      dataIndex: "countStatus",
    },
    {
      width: "12%",
      title: "Tổng số không trả lời",
      dataIndex: "nocountStatus",
    },
    {
      width: "12%",
      title: "Tổng thời gian gọi (s)",
      dataIndex: "ring_duration",
      render: (text: any, record: any) => <div>{text}s</div>,
    },
    {
      width: "20%",
      title: "Trung bình cuộc gọi (s/ cuộc gọi)",
      dataIndex: "adv",
      render: (text: any, record: any) => <div>{text}s</div>,
    },
  ];
  return (
    <div>
      <div className={styles.group_button}>
        <FilterThongKe
          datatable={datane}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fillStart={fillStart}
          setFillStart={setFillStart}
          fillEnd={fillEnd}
          setFillEnd={setFillEnd}
          handleGet={handleGet}
          setPhongban={setPhongban}
        />

        <div className={styles.group_button_right}>
          <Link href={"/crm/tong-dai"}>
            <button>Chi tiết</button>
          </Link>
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Table
          dataSource={datane}
          columns={Colums}
          bordered
          scroll={{ x: "fit-content" }}
          pagination={{ pageSize: 10 }}
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
export default Recording;
