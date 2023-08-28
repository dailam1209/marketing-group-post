import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import cskh from "../csks.module.css";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { da } from "date-fns/locale";
import { useApi } from "../../hooks/useApi";
import { current } from "@reduxjs/toolkit";
import FilterGhiAm from "./filterGhiAm";
import { dataSaveTD, doDisConnect } from "../../redux/user/userSlice";
type Props = {};

const GhiAmPage = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listData, setListData] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [showKetNoi, setShowKetNoi] = useState(false);
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const [soNghe, setSoNghe] = useState();
  const [nv, setnv] = useState();
  const totalSum = listData?.reduce(
    (acc, current) => acc + +current.ring_duration,
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datatable: any = listData?.map((item: any) => {
    return {
      id: item.id,
      caller: item.caller,
      callee: item.callee,
      start_time: item.start_time,
      end_time: item.end_time,
      duration: item.duration,
      filepath: item.filepath,
      filename: item.filename,
    };
  });

  function toggleAudio(
    audioId: string,
    playButtonId: string,
    pauseButtonId: string
  ) {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    const playButton = document.getElementById(
      playButtonId
    ) as HTMLButtonElement;
    const pauseButton = document.getElementById(
      pauseButtonId
    ) as HTMLButtonElement;

    if (audioElement.paused) {
      audioElement.play();
      playButton.style.display = "none";
      pauseButton.style.display = "block";
    } else {
      audioElement.pause();
      playButton.style.display = "block";
      pauseButton.style.display = "none";
    }
  }

  interface CallRecord {
    id: string;
    file_path: string;
    filename: string;
    // Các trường dữ liệu khác của CallRecord
  }

  const count = listData?.reduce((acc, current) => {
    if (current.status === "ANSWERED") {
      return acc + 1;
    }
    return acc;
  }, 0);
  //gettime start
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
  const dispatch = useDispatch();
  const start_T = getCurrentFormattedDate();
  const end_T = getEndOfDayFormattedDate();
  const [fillStart, setFillStart] = useState<any>();
  const [fillEnd, setFillEnd] = useState<any>();
  const [query, setQuery] = useState(
    `https://s02.oncall.vn:8900/api/recordfiles/extension/list?pagesize=1000000&start_time=${start_T} &end_time=${end_T}`
  );

  const handleGet = async () => {
    // setListData([]);
    if (soNghe) {
      let dataFill = listData.filter((item) => item.callee === soNghe);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }
    if (nv) {
      let dataFill = listData.filter((item) => +item.caller === nv);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(false);
    if (fillEnd && fillStart) {
      setQuery(
        `https://s02.oncall.vn:8900/api/recordfiles/extension/list?pagesize=1000000&start_time=${fillStart} &end_time=${fillEnd}`
      );
    }

    const response = await fetch(`${query}`, {
      method: "GET",
      headers: {
        access_token: show,
        // "Content-Type":"S"
      },
    });
    const data = await response.json();
    if (data && data.items) {
      setListData(data?.items);
    } else {
      dispatch(doDisConnect(""));
    }
    return data;
  };
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

  useEffect(() => {
    if (show) {
      setShowKetNoi(true);
    }
    handleGet();
  }, [query, show]);
  const Colums = [
    {
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      // render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "10%",
      title: "Số nghe",
      dataIndex: "callee",
      // render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "20%",
      title: "Thời gian kết thúc cuộc gọi",
      dataIndex: "end_time",
    },
    {
      width: "10%",
      title: "Thời lượng",
      dataIndex: "duration",
      render: (text: any) => <div>{text}s</div>,
    },
    {
      width: "10%",
      title: "Ghi âm",
      dataIndex: "filepath",
      // render: (text: any, record: any) => (
      //   <audio controls>
      //     <source src={`https://s02.oncall.vn:8883/filedown/${text}?filename=${record.filename}`} type="audio/ogg" />
      //   </audio>
      // ),
      render: (text: any, record: CallRecord) => (
        <div className={`${styles.audio_container}`}>
          <audio id={`audio-${record.id}`}>
            <source
              src={`https://s02.oncall.vn:8883/filedown/${text}?filename=${record.filename}`}
              type="audio/ogg"
            />
          </audio>
          <div className={`${styles.audio_buttons_play}`}>
            <button
              className={`${styles.tb_ga}`}
              id={`play-${record.id}`}
              onClick={() =>
                toggleAudio(
                  `audio-${record.id}`,
                  `play-${record.id}`,
                  `pause-${record.id}`
                )
              }
            >
              <img src="/crm/ghiam.svg" alt="" width={15} height={15} />
            </button>
          </div>
          <div className={`${styles.audio_buttons_pause}`}>
            <button
              className={`${styles.tb_ga}`}
              id={`pause-${record.id}`}
              onClick={() =>
                toggleAudio(
                  `audio-${record.id}`,
                  `play-${record.id}`,
                  `pause-${record.id}`
                )
              }
              style={{ display: "none" }}
            >
              <img src="/crm/pause.svg" alt="" width={15} height={15} />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const customLocale = {
    emptyText: (
      <div
        key={"empty"}
        style={{ fontWeight: 400, color: "black", fontSize: 15 }}
      >
        {showKetNoi ? " Đang phân tích kết quả ..." : ""}
      </div>
    ), // Thay thế nội dung "No Data" bằng "Hello"
  };
  return (
    <div>
      {showKetNoi && (
        <div className={styles.group_button} style={{ display: "block" }}>
          <div>
            <FilterGhiAm
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

          {/* <div
            className={styles.group_button_right}
            style={{ float: "right", marginTop: -40 }}
          >
            <Link href={"/crm/ghi-am"}>
              <button>Ghi âm</button>
            </Link>

            <Link href={"/crm/thong-ke-tong-dai"}>
              <button>Thống kê</button>
            </Link>
            <Link href={"/crm/switchboard/manager/line"}>
              <button>Quản lý line</button>
            </Link>
          </div> */}

          {/* <ul className={styles.cskh_info_call} style={{ fontSize: 16 }}>
            <li>Số cuộc gọi: {listData?.length}</li>
            <li>Tổng số nghe máy: {count || ""}</li>
            <li>Tổng số không trả lời: {listData?.length - count}</li>
            <li>Tổng thời gian gọi: {totalSum || ""}(s)</li>
            <li>
              Trung bình: {(totalSum / listData?.length).toFixed(2)}s/ cuộc gọi
            </li>
          </ul> */}
        </div>
      )}
      {!showKetNoi && (
        <div className={cskh.connect_tongdai} style={{ paddingBottom: 20 }}>
          <Link href={"/crm/setting/switch_board"}>
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
          locale={customLocale}
          columns={Colums as any}
          dataSource={datatable}
          bordered
          scroll={{ x: 1000 }}
          pagination={{
            style: { paddingBottom: 30, float: "left" },
            current: current,
            pageSize: pageSize,
            onChange(page, pageSize) {
              if (page != current) {
                setcurrent(page);
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
export default GhiAmPage;
