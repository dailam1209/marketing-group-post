import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import { useSelector } from "react-redux";
import FilterThongKe from "./fillterThongKe";
import { base_url } from "../../service/function";
import { useDispatch } from "react-redux";
const Cookies = require("js-cookie");
type Props = {};

const Recording = (props: Props) => {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phongban, setPhongban] = useState();
  let [datane, setDatane] = useState([]);
  const [data, setData] = useState([]);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };

  const [fillStart, setFillStart] = useState<any>();
  const [fillEnd, setFillEnd] = useState<any>();
  const [listNV, setListNV] = useState([]);
  const [condition, setCondition] = useState(
    JSON.stringify({ token: Cookies.get("token_base365") })
  );

  const handleGetNhanVienPhuTrach = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      setListNV(data?.data?.items);
    } catch (error) { }
  };
  const [listLine, setlistLine] = useState([]);
  const [listPB, setlistPB] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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
    } catch (error) { }
  };

  const handleFilter = async () => {
    if (phongban) {
      let tmp = data.filter((item) => {
        return item.nameDeparment === phongban;
      });
      setIsModalOpen(false);
      setDatane(tmp)
    }
    setIsModalOpen(false);
    if (fillEnd && fillStart) {
      setCondition(
        JSON.stringify({
          timeStart: fillStart,
          timeEnd: fillEnd,
          token: Cookies.get("token_base365"),
        })
      );
    }
  }

  const handleGet = async () => {
    try {
      const response = await fetch(`https://voip.timviec365.vn/api/thongke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: condition,
      });
      const data = await response.json();
      console.log(data)
      if (data && data.data && data.data.data) {
        setData(data.data.data);
        setDatane(data.data.data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    handleGetLine();
    handleGet();
    handleGetNhanVienPhuTrach();
  }, [condition]);
  const Colums = [
    {
      width: 50,
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 150,
      title: "Người phụ trách",
      dataIndex: "name",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 200,
      title: "Tổ chức",
      dataIndex: "nameDeparment",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 100,
      title: "Tổng số cuộc gọi",
      dataIndex: "countSDT",
    },
    {
      width: 100,
      title: "Tổng số đã trả lời",
      dataIndex: "countStatus",
    },
    {
      width: 100,
      title: "Tổng số không trả lời",
      dataIndex: "nocountStatus",
    },
    {
      width: 100,
      title: "Tổng thời gian gọi (s)",
      dataIndex: "ring_duration",
      render: (text: any, record: any) => <div>{text}s</div>,
    },
    {
      width: 100,
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
          handleGet={handleFilter}
          // handleGet={handleGet}
          setPhongban={setPhongban}
        />

        <div className={styles.group_button_right}>
          <Link href={"/tong-dai"}>
            <button>Chi tiết</button>
          </Link>
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Table
          loading={datane ? false : true}
          dataSource={datane}
          columns={Colums}
          bordered
          scroll={{ x: 1000, y: "auto" }}
          pagination={{ pageSize: 10 }}
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
export default Recording;
