import React, { useState } from "react";
import styles from "./day_top.module.css";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { fetchData } from "@/utils/BaseApi";

interface ItemChoose {
  id: number;
  status: string;
}
interface ListItems {
  menuItems?: ItemChoose[];
  from_to_date?: boolean;
  dataArray?: string[];
  onResetArray: () => void;
  api: string;
  url: string;
  onDataArrayChange: (newDataArray: string[]) => void;
}

const Day_top = (props: ListItems) => {
  const [click, setClick] = useState(false);
  const [choose, setChoose] = useState(-1);
  const [status, setStatus] = useState("");
  const [since, setSince] = useState(false);
  const [to_day, setTo_day] = useState(false);

  // search
  const [inputValue, setInputValue] = useState("");
  const [time_start, settime_start] = useState("");
  const [time_end, settime_end] = useState("");

  const { dataArray, onDataArrayChange, url, api, onResetArray } = props;
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const requestData = {
    ten_vb_search: inputValue,
    trang_thai_search: choose === -1 ? "" : choose.toString(),
    fromDate: time_start,
    toDate: time_end,
  };
  const requestDataCap_nhat = {
    ten_vb_search: inputValue,
    trang_thai_search: choose === -1 ? "" : choose.toString(),
    fromDate: time_start,
    toDate: time_end,
    type_thu_hoi: 1,
  };
  const requestDataThayThe = {
    ten_vb_search: inputValue,
    trang_thai_search: choose === -1 ? "" : choose.toString(),
    fromDate: time_start,
    toDate: time_end,
    type_thay_the: 1,
  };
  const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
  const handleSearch = async (api: string, url: string) => {
    try {
      onResetArray();
      const response = await fetchData(token, api, requestData);
      let newDataArray: any;
      if (url == "van-ban-di-da-gui") {
        newDataArray = [...response?.data?.listVanBanDi];
      } else if (url == "van-ban-di-cho-duyet") {
        newDataArray = [...response?.data?.listVanBanDi];
      } else if (url == "van-ban-moi") {
        newDataArray = [...response?.data?.listVanBanMoi];
      } else if (url == "van-ban-da-xu-ly") {
        newDataArray = [...response?.data?.listVanBanDaXuLy];
      } else if (url == "van-ban-can-duyet") {
        newDataArray = [...response?.data?.listVanBanDenCanDuyet];
      } else if (url == "van-ban-thu-hoi") {
        newDataArray = [...response?.data?.listVanBanDaThuHoi];
      }
      if (url == "van-ban-cap-nhat") {
        const response = await fetchData(token, api, requestDataCap_nhat);
        newDataArray = [...response?.data?.listVanBanCapNhat];
      }
      if (url == "van-ban-thay-the") {
        const response = await fetchData(token, api, requestDataThayThe);
        newDataArray = [...response?.data?.listVanBanCapNhat];
      }
      onDataArrayChange(newDataArray);
      settime_end("");
      settime_start("");
      setChoose(-1);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleChooseStatus = (status: string, id: number) => {
    setStatus(status);
    setChoose(id);
  };
  const List = props.menuItems?.map((item, index) => {
    return (
      <p
        className={`${styles.search_item} ${
          choose === item.id ? styles.active_search_element : ""
        }`}
        data-value_choose={item.id}
        key={index}
        onClick={() => {
          handleChooseStatus(item.status, item.id);
        }}
      >
        {item.status}
      </p>
    );
  });

  return (
    <div className={`${styles.day_top}`}>
      <form className={`${styles.day_top}`} action="" method="POST">
        <div className={`${styles.incoming_text_top}`}>
          <input
            className={`${styles.incoming_text_top_input}`}
            type="text"
            placeholder="Nhập tên văn bản"
            name="ten_vb_search"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        {props.from_to_date && (
          <>
            <div
              className={`${styles.incoming_text_top}`}
              onClick={() => {
                setSince(true);
              }}
            >
              <input
                className={`${styles.incoming_text_top_input}`}
                type={since ? "date" : "text"}
                placeholder="Từ ngày"
                name="time_start"
                value={time_start}
                onChange={(e: any) => {
                  settime_start(e.target.value);
                }}
              />
            </div>
            <div
              className={`${styles.incoming_text_top}`}
              onClick={() => {
                setTo_day(true);
              }}
            >
              <input
                className={`${styles.incoming_text_top_input}`}
                type={to_day ? "date" : "text"}
                placeholder="Đến ngày"
                name="time_end"
                value={time_end}
                onChange={(e: any) => {
                  settime_end(e.target.value);
                }}
              />
            </div>
          </>
        )}
        {props.menuItems && (
          <div
            className={`${styles.incoming_text_top_select}`}
            onClick={() => {
              setClick(!click);
            }}
          >
            <div className={`${styles.btn_select}`} id="">
              <Image
                src={"/icon/arr_top.png"}
                width={50}
                height={50}
                alt=""
                className={`${styles.img_select}`}
              />
              <input
                type="hidden"
                className={`${styles.status_search}`}
                value=""
                name="trang_thai_search"
              />
              <p className={`${styles.search_choose}`}>
                {status !== "" ? status : "Trạng thái"}
              </p>
              <div
                className={`${styles.search_box} ${click ? styles.show : ""}`}
              >
                {List}
              </div>
            </div>
          </div>
        )}

        <div
          className={`${styles.incoming_text_top_btn}`}
          onClick={() => handleSearch(api, url)}
        >
          <button type="button" className={`${styles.btn_search}`}>
            <Image
              width={50}
              height={50}
              className={`${styles.btn_img}`}
              src={"/icon/i_search.png"}
              alt=""
            />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Day_top;
