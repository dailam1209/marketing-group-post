import React, { useState } from "react";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
// import HeadNavRes from "../../../../components/big-component/head-nav-res";
import styles from "./index.module.css";
import { DatePicker, Pagination, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const Table = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const monthFormat = "MM";
  const yearFormat = "YYYY";

  //    const data = [
  //       {
  //          name: "Nguyễn Văn Thức",
  //          date: "22/7/2023",
  //          money: "1000000",
  //          browser: "Duyệt",
  //          status: "Đã xong",
  //          note: "Không",
  //       },
  //    ];

  //    const dataArr = data.map((obj) => [obj.name, obj.date, obj.money, obj.browser, obj.status, obj.note]);
  //    const handleExportExcel = ({ data }) => {
  //       const workbook = XLSX.utils.book_new();
  //       const worksheet = XLSX.utils.aoa_to_sheet(dataArr);
  //       XLSX.utils.book_append_sheet(workbook, worksheet, "Tạm ứng");

  //       const excelBuffer = XLSX.write(workbook, {
  //          bookType: "xlsx",
  //          type: "array",
  //       });
  //       const excelData = new Blob([excelBuffer], { type: "application/octet-stream" });
  //       const excelUrl = URL.createObjectURL(excelData);
  //       const link = document.createElement("a");
  //       link.href = excelUrl;
  //       link.download = "tam_ung.xlsx";
  //       link.click();
  //    };

  const handleMonthChange = (monthString) => {
    setSelectedMonth(dayjs(monthString, monthFormat));
  };

  const handleYearChange = (yearString) => {
    setSelectedYear(dayjs(yearString, yearFormat));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className={styles.container}>
      <HeadNav title="Chấm công" />

      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Bảng công chu kỳ</h3>
        </div>
        <div className={styles.select_time}>
          <div>
            <DatePicker
              defaultValue={selectedMonth}
              format={monthFormat}
              onChange={handleMonthChange}
              picker="month"
              locale={{
                lang: {
                  locale: "vi",
                },
              }}
            />
          </div>
          <div>
            <DatePicker
              defaultValue={selectedYear}
              format={yearFormat}
              onChange={handleYearChange}
              picker="year"
            />
          </div>
          <div>
            <SearchOutlined className={styles["search-icon"]} />
            <Select
              showSearch
              placeholder=""
              defaultValue="Tất cả nhân viên"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Mới nhất",
                  label: "Mới nhất",
                },
                {
                  value: "Cũ nhất",
                  label: "Cũ nhất",
                },
                {
                  value: "Phòng ban",
                  label: "Phòng ban",
                },
              ]}
            />
          </div>
          <div>
            <SearchOutlined className={styles["search-icon"]} />
            <Select
              showSearch
              placeholder=""
              defaultValue="Phòng ban( Tất cả )"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Phòng ban( Tất cả )",
                  label: "Phòng ban( Tất cả )",
                },
                {
                  value: "Kỹ thuật",
                  label: "Kỹ thuật",
                },
                {
                  value: "Biên tập",
                  label: "Biên tập",
                },
                {
                  value: "Kinh doanh",
                  label: "Kinh doanh",
                },
                {
                  value: "Phòng SEO",
                  label: "Phòng SEO",
                },
                {
                  value: "Phòng đào tạo",
                  label: "Phòng đào tạo",
                },
                {
                  value: "Phòng Sáng tạo",
                  label: "Phòng Sáng tạo",
                },
                {
                  value: "Phòng tài vụ",
                  label: "Phòng tài vụ",
                },
                {
                  value: "Phòng nhân sự",
                  label: "Phòng nhân sự",
                },
              ]}
            />
          </div>
          <div>
            <button className={styles.button}>Thống kê</button>
          </div>
        </div>
        <p className={styles.p_style}>Vui lòng chọn nhân viên!</p>
      </div>
      {/* <button className={styles.export} onClick={handleExportExcel}>
            Xuất tạm ứng
         </button> */}
      <div>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/Uknt3Hiru4I"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
