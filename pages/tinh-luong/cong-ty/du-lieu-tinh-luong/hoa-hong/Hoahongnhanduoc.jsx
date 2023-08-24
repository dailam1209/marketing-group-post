import React, { useState } from "react";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "./Hoahongnhanduoc.module.css";
import { DatePicker, Table, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const Hoahongnhanduoc = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const monthFormat = "MM";
  const yearFormat = "YYYY";
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Hoa hồng tiền",
      dataIndex: "money",
    },
    {
      title: "Hoa hồng doanh thu",
      dataIndex: "revenue",
    },
    {
      title: "Hoa hồng lợi nhuận",
      dataIndex: "profit",
    },
    {
      title: "Hoa hồng lệ phí vị trí",
      dataIndex: "location",
    },
    {
      title: "Hoa hồng kế hoạch",
      dataIndex: "plan",
    },
    {
      title: "Tổng hoa hồng",
      dataIndex: "all",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      money: "100,000,000",
      revenue: "5,000,000,000",
      profit: "100,000,000",
      location: "5,000,000",
      plan: "9,000,000",
      all: "9,999,999,999",
    },
  ];

  const dataArr = data.map((obj) => [
    obj.name,
    obj.money,
    obj.revenue,
    obj.profit,
    obj.location,
    obj.plan,
    obj.all,
  ]);
  const handleExportExcel = ({ data }) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataArr);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoa hồng nhận được");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "hoa_hong.xlsx";
    link.click();
  };

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
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Danh sách nhân viên & hoa hồng</h3>
          <p className={styles.p_style}>
            Quản lý theo dõi nhân viên được gán hoa hồng
          </p>
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
            <button className={styles.button}>Thống kê</button>
          </div>
        </div>
        <div className={styles.table_content}>
          <Table
            className={styles.table_add}
            pagination={false}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
      <div className={styles.content_bot}>
        <div>
          <button className={styles.export} onClick={handleExportExcel}>
            Xuất file thống kê
          </button>
        </div>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/7LHuvsxo764"
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

export default Hoahongnhanduoc;
