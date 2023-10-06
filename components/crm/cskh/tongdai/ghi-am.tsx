import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
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
  const [dataApi, setDataApi] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [showKetNoi, setShowKetNoi] = useState(false);
  const [condition, setCondition] = useState(JSON.stringify({ state: 'ANSWERED', token: Cookies.get("token_base365") }));
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
    filepath: string;
    filename: string;
    // Các trường dữ liệu khác của CallRecord
  }

  const count = listData?.reduce((acc, current) => {
    if (current.status === "ANSWERED") {
      return acc + 1;
    }
    return acc;
  }, 0);
  const dispatch = useDispatch();
  const [fillStart, setFillStart] = useState<any>();
  const [fillEnd, setFillEnd] = useState<any>();

  const handleGet = async () => {
    if (soNghe) {
      let dataFill = dataApi.filter((item) => item.callee === soNghe);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }
    if (nv) {
      let dataFill = dataApi.filter((item) => +item.caller === nv);
      setListData(dataFill);
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(false);
    if (fillEnd && fillStart) {
      setCondition(JSON.stringify({
        state: 'ANSWERED',
        timeStart: fillStart,
        timeEnd: fillEnd,
        token: Cookies.get("token_base365")
      }))
    }

    const response = await fetch(`https://43.239.223.185:9000/api/getStorage`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: condition
    })
    const data = await response.json();
    if (data && data.data && data.data.storage) {
      setListData(data.data.storage);
      setDataApi(data.data.storage);
    } else {
      dispatch(doDisConnect(""));
    }
    return data;
  };

  useEffect(() => {
    if (show) {
      setShowKetNoi(true);
    }
    handleGet();
  }, [condition]);
  console.log('tet', datatable)
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
      render: (text: any, record: CallRecord) => (
        <div className={`${styles.audio_container}`}>
          <audio id={`audio-${record.id}`}>
            <source
              src={`${record.filepath}`}
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
          loading={datatable ? false : true}
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
