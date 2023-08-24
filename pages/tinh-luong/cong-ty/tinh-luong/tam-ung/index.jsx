import React, { useState, useEffect } from "react";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "./index.module.css";
import { DatePicker, Table, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedYear, setSelectedYear] = useState(dayjs());
  const monthFormat = "MM";
  const yearFormat = "YYYY";
  const [apiData, setApiData] = useState([]);
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const fetchApiData = (month, year) => {
    const skip = 0;

    axios
      .post(`${domain}/api/tinhluong/congty/show_bangluong_nv`, {
        token: token,
        com_id: cp,
        month: 8,
        year: 2023,
        start_date: "2023-08-01T00:00:00.000+00:00",
        end_date: "2023-09-01T00:00:00.000+00:00",
        skip: skip,
      })
      .then((response) => {
        setApiData(response.data);
        console.log("kết quả ở /show_bangluong_nv", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  const columns = [
    {
      title: "Họ và tên",
      key: "1",
      // render: (record, _, index) => (
      //    <div>
      //       <div><p>{apiData?.listUser[index]?.avatarUser}</p></div>
      //       <div className={styles.user}>
      //          <p className={styles.p}>{apiData?.listUser[index]?.userName}</p>
      //          <p className={styles.p}>{apiData?.listUser[index]?.idQLC}</p>
      //       </div>
      //    </div>
      // ),
    },
    {
      title: "Ngày tạm ứng",
      // render: (record, _, index) => <p className={styles.p}>{apiData?.listUser[index]?.department?.[0]?.dep_name}</p>,

      key: "2",
    },
    {
      title: "Tiền tạm ứng",
      // render: (record, _, index) => <p className={styles.p}>{apiData?.listResult[index]?.luong_co_ban}</p>,
      key: "3",
    },
    {
      title: "Duyệt",
      // render: (record, _, index) => <p className={styles.p}>{apiData?.listResult[index]?.phan_tram_hop_dong}</p>,
      key: "4",
    },
    {
      title: "Trạng thái",
      // render: (record, _, index) => <p className={styles.p}>{apiData?.listResult[index]?.cong_chuan}</p>,
      key: "5",
    },
    {
      title: "Ghi chú",
      // render: (record, _, index) => <p className={styles.p}>{apiData?.listResult[index]?.cong_thuc}</p>,
      key: "6",
    },
  ];
  console.log(apiData);

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tạm ứng");

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
    link.download = "tam_ung.xlsx";
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
      <HeadNav title="Danh sách nhân viên tạm ứng" />

      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Bảng lương chu kỳ</h3>
          <p className={styles.p_style}>Quản lý theo dõi nhân viên tạm ứng</p>
        </div>
        <div className={styles.select_time}>
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
            <button className={styles.button}>Thống kê</button>
          </div>
        </div>
        <div className={styles.table_container}>
          <Table className={styles.table} columns={columns} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <button className={styles.export} onClick={handleExportExcel}>
            Xuất tạm ứng
          </button>
        </div>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/uj133QNs6j8"
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

export default App;
