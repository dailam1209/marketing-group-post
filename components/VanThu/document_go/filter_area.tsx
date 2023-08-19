import React, { useState, useEffect } from "react";
import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import Select from "react-select";
import Label, { Custom_label } from "@/components/VanThu/components/Input/Label/Label";
import Section from "@/components/VanThu/components/Input/Section/Section";
import Image from "next/image";
import styles from "./filter_area.module.css";
import { Custom_input_text } from "@/components/VanThu/components/Input/Input_text/Input_text";
import { getCookie, getCookies } from "cookies-next";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import { fetchNoiGui, fetch_list_employs } from "@/utils/ShareApi";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const status_options = [
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
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [DateStart, setDateStart] = useState<any>(null);
  const [DateEnd, setDateEnd] = useState<any>(null);
  const [notif, setnotif] = useState<any>(null);
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setStatus(selectedOption.value);
  };
  const requestData = {
    key: NameOrNum,
    // trang_thai_search: status === 0 ? "" : status,
    dayStart: DateStart,
    dayEnd: DateEnd,
    type: type,
  };
  const handleSearch = async (api: string) => {
    if (NameOrNum === "" && DateStart === "" && DateEnd === "") {
      setnotif(true);
    } else {
      setnotif(false);
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
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  return (
    <div className={styles.filter_area_box}>
      <form className={styles.form}>
        <div className={styles.filter_area_list}>
          <Section
            style="filter_area_25"
            label={
              <Custom_label
                isRequired={false}
                label_class="font_500"
                title=""
              />
            }
            input={
              <Custom_input_text
                isDisabled={false}
                inputclass="input_text_shedule_2"
                placeholder="Nhập tên số văn bản"
                handleChange={(e: any) => {
                  setNameOrNum(e.target.value);
                }}
              />
            }
          />
          <Section
            style="filter_area_25"
            input={
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={status_options}
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
            style="filter_area_25"
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
            style="filter_area_25"
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
            className={styles.filter_area_25}
            onClick={() => handleSearch(api)}
          >
            <button type="button" className={styles.top_btn}>
              <div className={styles.flex}>
                <Image
                  className={styles.search_icon}
                  alt=""
                  src="/icon/icon_search_white.png"
                  width={17}
                  height={17}
                />
              </div>
            </button>
          </div>
        </div>
      </form>
      {notif && (
        <div
          style={{
            color: "red",
            fontSize: "14px",
            marginLeft: "20px",
          }}
        >
          Nhập dữ liệu cần tìm kiếm
        </div>
      )}
    </div>
  );
};
export default Filter_area;
