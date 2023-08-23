import React, { useEffect } from "react";

import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Label, { Custom_label } from "@/components/van-thu-luu-tru/components/Input/Label/Label";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import Image from "next/image";
import styles from "./filter_area.module.css";
import {
  Custom_input_num,
  Custom_input_text,
} from "@/components/van-thu-luu-tru/components/Input/Input_text/Input_text";
import { Custom_input_number } from "@/components/van-thu-luu-tru/components/Input/Input_number/Input_text";
import { useState } from "react";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import Select from "react-select";
import { getCookie } from "cookies-next";
import { fetchNoiGui, fetch_list_employs } from "@/utils/ShareApi";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const list_status = [
  { value: "0", label: "Tất cả trạng thái" },
  { value: "1", label: "Đang chờ ký" },
  { value: "2", label: "Hoàn thành" },
];
interface ListItems {
  onResetArray: () => void;
  api: string;
  onDataArrayChange: (newDataArray: string[]) => void;
  type: any;
}

const Filter_area = (props: ListItems) => {
  const { onDataArrayChange, api, onResetArray, type } = props;
  const [NameOrNum, setNameOrNum] = useState<any>(null);
  const [selectedSoVb, setSelectedSoVb] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [DateStart, setDateStart] = useState<any>(null);
  const [DateEnd, setDateEnd] = useState<any>(null);
  const [money_min, setmoney_min] = useState<any>(null);
  const [money_max, setmoney_max] = useState<any>(null);
  const [listSoVB, setlistSoVB] = useState<any>(null);
  const handleSelectStatus = (selectedOption: any) => {
    setStatus(selectedOption);
  };
  //  Lấy ra sổ văn bản
  useEffect(() => {
    const fetchGetDataDetail = async () => {
      try {
        const response = await fetchData(
          token,
          "api/vanthu/guiNhanCongVan/setting/getListSoVanBan"
        );
        setlistSoVB(response?.data?.message?.listSoVanBan);
      } catch (error) {
        console.log("Error fetching home data:", error);
      }
    };
    fetchGetDataDetail();
  }, []);
  const ds_sovb = listSoVB?.map((opt: any) => {
    return { value: opt?._id, label: opt?.name_book };
  });
  const handleSelectChangeSoVb = (selectedOption: any) => {
    setSelectedSoVb(selectedOption);
  };
  //   get values
  const requestData = {
    type: type,
    book: selectedSoVb?.value,
    key: NameOrNum,
    money_min: money_min,
    money_max: money_max,
    status: status?.value,
    dayStart: DateStart,
    dayEnd: DateEnd,
  };
  const handleSearch = async (api: string) => {
    try {
      let newDataArray: any;
      onResetArray();
      const response = await fetchData(token, api, requestData);
      newDataArray = [...response?.data?.data?.db_qr];
      const list_emps = await fetch_list_employs();
      const updatedList = await Promise.all(
        newDataArray.map(async (user: any) => {
          const name_book = await fetchListSoVB(user?.cv_id_book);
          const location = await fetchNoiGui(user?.cv_phong_soan);
          const name_user_save = list_emps.find(
            (item: any) => item._id === user?.cv_user_save
          )?.userName;
          return { ...user, name_book, location, name_user_save };
        })
      );
      onDataArrayChange(updatedList);
      console.log(updatedList);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.filter_area_box}>
      <form className={styles.form}>
        <div className={styles.filter_area_list}>
          <Section
            style="filter_area_24"
            input={
              <Select
                value={selectedSoVb}
                onChange={handleSelectChangeSoVb}
                options={ds_sovb}
                placeholder="Chọn sổ văn bản"
                styles={{
                  control: (provided: any) => ({
                    ...provided,
                    height: "30px",
                    borderRadius: "15px",
                  }),
                }}
              />
            }
          />
          <Section
            style="filter_area_24"
            label={
              <Custom_label
                isRequired={false}
                title=""
                label_class="font_500"
              />
            }
            input={
              <Custom_input_text
                inputclass="input_text_shedule1"
                placeholder="Nhập từ khóa, tên văn bản"
                handleChange={(e: any) => {
                  setNameOrNum(e.target.value);
                }}
              />
            }
          />
          <Section
            style="filter_area_24"
            label={
              <Custom_label
                isRequired={false}
                title=""
                label_class="font_500"
              />
            }
            input={
              <Custom_input_num
                inputclass="input_text_shedule1"
                placeholder="Tổng tiền từ ..."
                handleChange={(e: any) => {
                  setmoney_min(e.target.value);
                }}
              />
            }
          />
          <Section
            style="filter_area_24"
            label={
              <Custom_label
                isRequired={false}
                title=""
                label_class="font_500"
              />
            }
            input={
              <Custom_input_num
                inputclass="input_text_shedule1"
                placeholder="Tổng tiền đến ..."
                handleChange={(e: any) => {
                  setmoney_max(e.target.value);
                }}
              />
            }
          />
        </div>
        <div className={styles.filter_area_list}>
          <Section
            style="filter_area_24"
            input={
              <Select
                value={status}
                onChange={handleSelectStatus}
                options={list_status}
                placeholder="Chọn trạng thái"
                styles={{
                  control: (provided: any) => ({
                    ...provided,
                    height: "30px",
                    borderRadius: "10px",
                  }),
                }}
              />
            }
          />
          <Section
            style="filter_area_24"
            input={
              <Input_calender
                placeholder="Từ ngày"
                datetype="date"
                calender_class="filter_area"
                calender_label_class="filter_area_label"
                handle_input={(e: any) => {
                  setDateStart(e.target.value);
                }}
              />
            }
          />
          <Section
            style="filter_area_24"
            input={
              <Input_calender
                placeholder="Đến ngày"
                datetype="date"
                calender_class="filter_area"
                calender_label_class="filter_area_label"
                handle_input={(e: any) => {
                  setDateEnd(e.target.value);
                }}
              />
            }
          />
          <div
            className={styles.filter_area_24}
            onClick={() => handleSearch(api)}
          >
            <button className={styles.top_btn} type="button">
              <Image
                className={styles.search_icon}
                alt=""
                src="/icon/icon_search_white.png"
                width={17}
                height={17}
              />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Filter_area;
