import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import {
  MonthData,
  YearData,
} from "../../../../components/tinh-luong/components/Data/SelectionData";
import { Col, Form, Row, Select } from "antd";
import { RightOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const BaoCaoCongLuong = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  let totalPaymentSalary = 0;
  let totalInsurance = 0;
  let totalTax = 0;
  let totalSalaryPaid = 0;

  for (const luongdatra of apiData?.listResult || []) {
    totalSalaryPaid += luongdatra.luong_da_tra;
  }

  for (const tongluong of apiData?.listResult || []) {
    totalPaymentSalary += tongluong.tien_thuc_nhan;
  }
  for (const tongbaohiem of apiData?.listResult || []) {
    totalInsurance += tongbaohiem.tong_bao_hiem;
  }

  for (const thue of apiData?.listResult || []) {
    totalTax += thue.thue;
  }

  const totalStaff = apiData?.listResult?.length;

  const luongcoban = apiData?.listResult?.map((item) => {
    return item?.luong_co_ban;
  });
  const luongcobanhon10 = luongcoban?.filter((item) => item > 10000000).length;
  const luongcoban7den10 = luongcoban?.filter(
    (item) => item > 7000000 && item < 10000000
  ).length;
  const luongcoban5den7 = luongcoban?.filter(
    (item) => item > 5000000 && item <= 7000000
  ).length;
  const luongcobannho5 = luongcoban?.filter((item) => item <= 5000000).length;

  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const fetchApiData = (month, year) => {
    axios
      .post(`${domain}/api/tinhluong/congty/takedata_salary_report`, {
        token: token,
        com_id: cp,
        month: month,
        year: year,
        start_date: `${year}/${month}/01`,
        end_date: `${month === 12 ? year + 1 : year}/${
          month === 12 ? 1 : month + 1
        }/01`,
        skip: 0,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  //Barchart
  const options1 = {
    indexAxis: "y", // Hiển thị biểu đồ hàng dọc
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Tắt hiển thị chú thích (nếu không muốn hiển thị)
      },
      title: {
        display: true,
        text: "Biểu đồ dữ liệu công ty",
      },
    },
    scales: {
      x: {
        min: 0, // Giá trị tối thiểu trục x
        max: totalStaff < 100 ? 50 : 150, // Giá trị tối đa trục x
        stepSize: 10, // Khoảng giá trị giữa các vạch trên trục x
      },
      y: {
        beginAtZero: true, // Bắt đầu trục y từ 0
      },
    },
    barPercentage: 0.5,
    responsiveAnimationDuration: 200,
  };

  const data = {
    labels: ["Lớn hơn 10tr", "7-10tr", "5-7tr", "Dưới 5tr"],
    datasets: [
      {
        label: "",
        data: [
          luongcobanhon10,
          luongcoban7den10,
          luongcoban5den7,
          luongcobannho5,
        ],
        borderColor: "#4c5bd4",
        backgroundColor: "#4c5bd4",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };
  const onFinish = (val) => {
    setSelectedYear(val?.year);
    setSelectedMonth(val?.month);
  };

  return (
    <div
      style={{
        width: "100%",
        flex: "1",
        background: " #F7F8FC",
        paddingBottom: "70px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <HeadNav />
      <div className={styles.part_hps}>
        <div className={styles.cate_staff}>
          <div className={styles.cate_staff_one}>
            <div className={styles.cate_ct_one}>
              <h3>Báo cáo công - lương</h3>
            </div>
            <div className={styles.cate_ct_tow}>
              <Form
                onFinish={onFinish}
                className={styles.formContainer}
                initialValues={{ year: selectedYear, month: selectedMonth }}
              >
                <Form.Item name={"month"} className={styles.formItem}>
                  <Select
                    className={styles.selection}
                    showSearch
                    defaultValue={{
                      label: `Tháng ${selectedMonth}`,
                      value: selectedMonth,
                    }}
                    optionFilterProp="children"
                    options={MonthData}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                  />
                </Form.Item>
                <Form.Item name={"year"} className={styles.formItem}>
                  <Select
                    className={styles.selection}
                    showSearch
                    defaultValue={{
                      label: `${selectedYear}`,
                      value: selectedYear,
                    }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={YearData}
                  />
                </Form.Item>
                <button type="submit" className={styles.tinh_luong}>
                  Thống kê
                </button>
              </Form>
            </div>
          </div>
          <div className={styles.cate_staff_tow_cl_th}>
            <div className={styles.nd_cl_box}>
              <Row>
                <Col span={8}>
                  <div className={styles.box_cl}>
                    <h3>Tổng hợp lương</h3>
                    <ul>
                      <li>
                        <span>Tổng lương thanh toán:</span>
                        <span style={{ paddingLeft: "20px" }}>
                          {totalPaymentSalary
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VNĐ
                        </span>
                      </li>
                      <li>
                        <span>Tổng tiền bảo hiểm:</span>
                        <span style={{ paddingLeft: "20px" }}>
                          {totalInsurance
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VNĐ
                        </span>
                      </li>
                      <li>
                        <span>Tổng thuế:</span>
                        <span style={{ paddingLeft: "20px" }}>
                          {totalTax
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VNĐ
                        </span>
                      </li>
                      <li>
                        <span>Tổng lương đã chi trả:</span>
                        <span style={{ paddingLeft: "20px" }}>
                          {totalSalaryPaid
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VNĐ
                        </span>
                      </li>
                    </ul>
                    <a
                      className={styles.detail_th}
                      href={
                        "/tinh-luong/cong-ty/bao-cao-cong-luong/tong-hop-luong-nhan-vien"
                      }
                    >
                      Chi tiết <RightOutlined />
                    </a>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.box_cl}>
                    <h3>Phân tích bảo hiểm</h3>
                    <Pie
                      data={{
                        labels: ["Tổng lương thanh toán", "Bảo hiểm"],
                        datasets: [
                          {
                            data: [totalPaymentSalary, totalInsurance],
                            backgroundColor: ["#FFA800", "#4C5BD4"],
                          },
                        ],
                      }}
                      options={options}
                    />
                    <a
                      className={styles.detail_th}
                      href={
                        "/tinh-luong/cong-ty/bao-cao-cong-luong/tong-hop-bao-hiem-nhan-vien"
                      }
                    >
                      Chi tiết <RightOutlined />
                    </a>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <div className={styles.box_cl}>
                      <h3>Phân tích thuế</h3>
                      <Pie
                        data={{
                          labels: ["Tổng lương thanh toán", "Tổng thuế"],
                          datasets: [
                            {
                              data: [totalPaymentSalary, totalTax],
                              backgroundColor: ["#FFA800", "#4C5BD4"],
                            },
                          ],
                        }}
                        options={options}
                      />
                      <a
                        className={styles.detail_th}
                        href={
                          "/tinh-luong/cong-ty/bao-cao-cong-luong/tong-hop-thue-nhan-vien"
                        }
                      >
                        Chi tiết <RightOutlined />
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                className={styles.box_cl}
                style={{ width: "98.5%", height: "auto" }}
              >
                <h3>Phân tích mức lương nhân viên</h3>
                <div className={styles.my_barChart}>
                  <Bar
                    className={styles.chart_bar}
                    options={options1}
                    data={data}
                  />
                </div>
                <h3 style={{ marginTop: "30px" }}>Số lượng nhân viên</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaoCaoCongLuong;
