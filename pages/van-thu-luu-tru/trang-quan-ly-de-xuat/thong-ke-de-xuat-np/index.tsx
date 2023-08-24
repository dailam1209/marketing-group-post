import Pagination from "@/components/van-thu-luu-tru/pagination/Pagination";
import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import Table_header from "@/components/van-thu-luu-tru/components/tableheader/Table_header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./absent_statistical.module.css";

const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "40px",
    borderRadius: "10px",
  }),
};
const department_options = [
  { name: "id_phong_ban", value: "0", label: "Phòng ban (tất cả)" },
  { name: "id_phong_ban", value: "713", label: "KỸ THUẬT" },
  { name: "id_phong_ban", value: "714", label: "Biên Tập" },
  { name: "id_phong_ban", value: "719", label: "KINH DOANH" },
  { name: "id_phong_ban", value: "1015", label: "PHÒNG SEO" },
  { name: "id_phong_ban", value: "2340", label: "phòng Đào tạo" },
  { name: "id_phong_ban", value: "2354", label: "Phòng sáng tạo" },
  { name: "id_phong_ban", value: "4167", label: "Phòng tài vụ" },
  { name: "id_phong_ban", value: "4207", label: "PHÒNG NHÂN SỰ" },
];
const adsent_amount_options = [
  { type: "nghi_nhieu_nhat", value: "1", label: "Nghỉ nhiều nhất" },
  { type: "nghi_nhieu_nhat", value: "2", label: "Nghỉ đột xuất nhiều nhất" },
  { type: "nghi_nhieu_nhat", value: "3", label: "Nghỉ có kế hoạch nhiều nhất" },
];
const titles = [
  { label: "STT" },
  { label: "Tên nhân viên, phòng ban nhân viên" },
  { label: "Số ngày nghỉ phép" },
];
const Table_record = ({
  href,
  index,
  name,
  department,
  adsent_amount,
}: any) => {
  return (
    <a href={href} className={styles.link_record}>
      <div className={styles.tab_infor}>
        <p>{index}</p>
        <p className={styles.infor_name}>
          {name && <>{name}&nbsp;</>}
          <span>({department ? department : "Chưa cập nhật"})</span>
        </p>
        <div className={styles.infor_date}>
          <span>{adsent_amount}</span>
        </div>
      </div>
    </a>
  );
};
const table_records = [
  { href: "", name: "", department: "", adsent_amount: "6 ngày" },
  {
    href: "",
    name: "Uy Phùng Hiểu",
    department: "KỸ THUẬT",
    adsent_amount: "6 ngày",
  },
  { href: "", name: "Lê Hồng Anh", department: "", adsent_amount: "2 ngày" },
  {
    href: "",
    name: "Phùng Ngọc Anh",
    department: "KỸ THUẬT",
    adsent_amount: "1 ngày",
  },
  {
    href: "",
    name: "Hà Nhật Vy",
    department: "Biên Tập",
    adsent_amount: "0.5 ngày",
  },
];
const Index = () => {
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * recordsPerPage;
  const visibleData = table_records.slice(
    startIndex,
    startIndex + recordsPerPage
  );
  const totalPages = Math.ceil(table_records.length / recordsPerPage);

  const [filter_data, setFilter_data] = useState({});
  const handleSelectChange = (e: any) => {
    const { type, value } = e;
    setFilter_data((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };
  const handleCalenderChagne = (e: any) => {
    const selectedMonth = e.target.value;
    const [year, month] = selectedMonth.split("-");

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 1);

    const formattedFirstDay = `${year}-${month.padStart(2, "0")}-01`;
    const formattedLastDay = lastDay.toISOString().slice(0, 10);

    setFilter_data((prevFormData) => ({
      ...prevFormData,
      time_seach_from: formattedFirstDay,
      time_seach_to: formattedLastDay,
    }));
  };
  // useEffect(()=>{
  //   console.log(filter_data)
  // },[filter_data])
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.filter_area_box}>
          <form>
            <div className={styles.filter_area_list}>
              <Section
                style="filter_area_49"
                input={
                  <Input_select
                    options={department_options}
                    defautlValue={department_options[0]}
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
              <Section
                style="filter_area_49"
                input={
                  <Input_select
                    options={undefined}
                    placeholder="Chọn ID, tên nhân viên"
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
            </div>
            <div className={styles.filter_area_list}>
              <Section
                style="filter_area_23_5"
                input={
                  <Input_select
                    options={adsent_amount_options}
                    defautlValue={adsent_amount_options[0]}
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
              <Section
                style="filter_area_23_5"
                input={
                  <Input_calender
                    datetype="month"
                    placeholder="Chọn tháng"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                    handle_input={handleCalenderChagne}
                    input_name="month"
                  />
                }
              />
              <div className={styles.filter_area_23_5}>
                <button className={styles.top_btn}>
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
              <div className={styles.filter_area_23_5}>
                <button className={styles.top_btn}>
                  <span>Xuất file</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.box_list}>
          <div className={styles.list_tab}>
            <Table_header
              containerClassName="propose_list_header_container"
              titles={titles}
              className="adsent_statistic_list"
            />
            <div className={styles.tab_content}>
              <div className={styles.tab_items}>
                {visibleData.map((record, index) => {
                  return (
                    <Table_record
                      key={index}
                      href={record.href}
                      index={index + 1}
                      name={record.name}
                      department={record.department}
                      adsent_amount={record.adsent_amount}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Index;
