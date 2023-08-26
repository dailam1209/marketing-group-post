import React, { useState, useEffect } from "react";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import styles from "./index.module.css";
import {
  MonthData,
  YearData,
} from "../../../../components/tinh-luong/components/Data/SelectionData";
import { DatePicker, Table, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import HeadNavRes from "../../../../components/tinh-luong/components/big-component/head-nav-res";
import * as XLSX from "xlsx";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const App = () => {
  function roundToInteger(number) {
    if (typeof number !== "number" || isNaN(number)) {
      return "Chưa cập nhật";
    }
    let number1 = Math.round(number);
    return number1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function convertDateFormatforStartDate(inputDate) {
    const dateParts = inputDate.split("-").map(Number);
    let year = dateParts[0];
    let month = dateParts[1];

    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}`;
  }

  function convertDateFormatforEndDate(inputDate) {
    const dateParts = inputDate.split("-").map(Number);
    let year = dateParts[0];
    let month = dateParts[1];

    if (month === 12) {
      month = 1;
      year++;
    } else {
      month++;
    }

    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}`;
  }

  //render user
  const [apiDataUser, setApiDataUser] = useState([]);
  useEffect(() => {
    fetchApiDataUser();
  }, []);
  const fetchApiDataUser = () => {
    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`, {
        token: token,
        cp: cp,
        ep_id: ep_id,
      })
      .then((response) => {
        setApiDataUser(response.data.data);

        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching data from API:", error);
      });
  };
  //render data
  const [form] = Form.useForm();
  const [apiData, setApiData] = useState([]);
  const [placement, SetPlacement] = useState("topLeft");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  // const [selectedId,setSelectedID]=useState()
  checkCookie();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  const fetchApiData = (month, year) => {
    axios
      .post(`${domain}/api/tinhluong/nhanvien/show_payroll_user`, {
        token: token,
        cp: cp,
        ep_id: ep_id,
        month: month,
        year: year,
        start_date: `${convertDateFormatforStartDate(
          `${year}-${month}`
        )}-01T00:00:00.000+00:00`,
        end_date: `${convertDateFormatforEndDate(
          `${year}-${month}`
        )}-01T00:00:00.000+00:00`,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const dataTable = [
    {
      id: "1",
      name: "Lương cơ bản",
      parameter: `${roundToInteger(apiData?.data?.luong_co_ban)}`,
      unit: "VNĐ",
    },
    {
      id: "2",
      name: "Hợp đồng",
      parameter: `${apiData?.data?.phan_tram_hop_dong}`,
      unit: "%",
    },
    {
      id: "3",
      name: "Công chuẩn",
      parameter: `${apiData?.data?.cong_chuan}`,
      unit: "Công",
    },
    {
      id: "4",
      name: "Công thực",
      parameter: `${apiData?.data?.cong_thuc}`,
      unit: "Công",
    },
    {
      id: "5",
      name: "Công sau phạt",
      parameter: `${apiData?.data?.cong_sau_phat}`,
      unit: "Công",
    },
    {
      id: "6",
      name: "Công theo tiền (ca tính tiền)",
      parameter: `${apiData?.data?.cong_theo_tien}`,
      unit: "VNĐ",
    },
    {
      id: "7",
      name: "Công ghi nhận",
      parameter: `${apiData?.data?.cong_ghi_nhan}`,
      unit: "Công",
    },
    {
      id: "8",
      name: "Công nghỉ phép",
      parameter: `${apiData?.data?.cong_nghi_phep}`,
      unit: "Công",
    },
    {
      id: "9",
      name: "Tổng công nhận",
      parameter: `${apiData?.data?.tong_cong_nhan}`,
      unit: "Công",
    },
    {
      id: "10",
      name: "Lương thực",
      parameter: `${roundToInteger(apiData?.data?.luong_thuc)}`,
      unit: "VNĐ",
    },
    {
      id: "11",
      name: "Lương sau phạt",
      // parameter: `${apiData?.data?.luong_sau_phat
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      parameter: roundToInteger(apiData?.data?.luong_sau_phat),
      unit: "VNĐ",
    },
    {
      id: "12",
      name: "Lương bảo hiểm",
      parameter: `${roundToInteger(apiData?.data?.luong_bao_hiem)}`,
      unit: "VNĐ",
    },
    {
      id: "13",
      name: "Đi muộn/ về sớm phạt tiền",
      parameter: `${roundToInteger(apiData?.data?.tien_phat_muon)}`,
      unit: "VNĐ",
    },
    {
      id: "14",
      name: "Đi muộn/ về sớm phạt công",
      parameter: `${roundToInteger(apiData?.data?.cong_phat_di_muon_ve_som)}`,
      unit: "Công",
    },
    {
      id: "15",
      name: "Hoa hồng",
      parameter: `${roundToInteger(apiData?.data?.tong_hoa_hong)}`,
      unit: "VNĐ",
    },
    {
      id: "16",
      name: "Tiền đã tạm ứng",
      parameter: `${roundToInteger(apiData?.data?.tien_tam_ung)}`,
      unit: "VNĐ",
    },
    {
      id: "17",
      name: "Thưởng",
      parameter: `${roundToInteger(apiData?.data?.thuong)}`,
      unit: "VNĐ",
    },
    {
      id: "18",
      name: "Thưởng nghỉ lễ",
      parameter: `${roundToInteger(apiData?.data?.luong_nghi_le)}`,
      unit: "VNĐ",
    },
    {
      id: "19",
      name: "Phạt",
      parameter: `${roundToInteger(apiData?.data?.phat)}`,
      unit: "VNĐ",
    },
    {
      id: "20",
      name: "Phạt nghỉ ngày không được phép nghỉ",
      parameter: `${roundToInteger(apiData?.data?.tien_phat_nghi_khong_phep)}`,
      unit: "VNĐ",
    },
    {
      id: "21",
      name: "Phạt nghỉ sai quy định",
      parameter: `${roundToInteger(apiData?.data?.phat_nghi_sai_quy_dinh)}`,
      unit: "VNĐ",
    },
    {
      id: "22",
      name: "Phúc lợi",
      parameter: `${roundToInteger(apiData?.data?.luong_co_ban)}`,
      unit: "VNĐ",
    },
    {
      id: "23",
      name: "Phụ cấp",
      parameter: `${roundToInteger(apiData?.data?.tien_phu_cap)}`,
      unit: "VNĐ",
    },
    {
      id: "24",
      name: "Phụ cấp theo ca",
      parameter: `${roundToInteger(apiData?.data?.phu_cap_theo_ca)}`,
      unit: "VNĐ",
    },
    {
      id: "25",
      name: "Bảo hiểm",
      parameter: `${roundToInteger(apiData?.data?.tong_bao_hiem)}`,
      unit: "VNĐ",
    },
    {
      id: "26",
      name: "Khoản tiền khác",
      parameter: `${roundToInteger(apiData?.data?.tien_khac)}`,
      unit: "VNĐ",
    },
    {
      id: "27",
      name: "Tổng lương",
      parameter: `${roundToInteger(apiData?.data?.tong_luong)}`,
      unit: "VNĐ",
    },
    {
      id: "28",
      name: "Thuế",
      parameter: `${roundToInteger(apiData?.data?.thue)}`,
      unit: "VNĐ",
    },
    {
      id: "29",
      name: "Tổng lương thực nhận",
      // parameter: `${apiData?.data?.tien_thuc_nhan
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      parameter: `${roundToInteger(apiData?.data?.tien_thuc_nhan)}`,
      unit: "VNĐ",
    },
    {
      id: "30",
      name: "Tổng lương đã trả",
      parameter: `${roundToInteger(apiData?.data?.luong_da_tra)}`,
      unit: "VNĐ",
    },
  ];
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      render: (id) => <p className={styles.p_style}>{id}</p>,
    },
    {
      title: "Các khoản lương",
      dataIndex: "name",
      key: "name",
      render: (name) => <p className={styles.p_style}>{name}</p>,
    },
    {
      title: "Thông số lương",
      dataIndex: "parameter",
      key: "parameter",
      render: (parameter) => <p className={styles.p_red}>{parameter}</p>,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      render: (unit) => <p className={styles.p_style}>{unit}</p>,
    },
  ];
  const onFinish = (val) => {
    setSelectedYear(val?.year);
    setSelectedMonth(val?.month);
  };
  const dataArr = dataTable.map((obj) => [
    obj.id,
    obj.name,
    obj.parameter,
    obj.unit,
  ]);
  const handleExportExcel = ({ dataTable }) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataArr);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng lương");

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
    link.download = "bang_luong.xlsx";
    link.click();
  };

  return (
    <div className={styles.container}>
      <div>
        <HeadNavRes></HeadNavRes>
        <HeadNav title="Bảng lương"></HeadNav>
      </div>
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Bảng lương chu kỳ</h3>
          <span className={styles.span}>
            {apiDataUser?.info_dep_com?.user?.userName} - ID{" "}
            {apiDataUser?.info_dep_com?.user?.idQLC}
          </span>
          <p className={styles.p}>
            {apiDataUser?.info_dep_com?.department?.dep_name}
          </p>
        </div>
        <div className={styles.select_time}>
          <Form
            onFinish={onFinish}
            className={styles.formContainer}
            initialValues={{ year: selectedYear, month: selectedMonth }}
          >
            <Form.Item className={styles.formItem} name={"fromTo"}>
              <RangePicker
                placement={placement}
                format={dateFormat}
                locale={{
                  lang: {
                    locale: "vi",
                    rangePlaceholder: ["Từ ngày", "Đến ngày"],
                  },
                }}
              />
            </Form.Item>
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
                defaultValue={{ label: `${selectedYear}`, value: selectedYear }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                options={YearData}
              />
            </Form.Item>
            <button type="submit" className={styles.button}>
              Thống kê
            </button>
          </Form>
        </div>
        <div className={styles.table}>
          <Table
            className={`customTable1 ${styles.table}`}
            columns={columns}
            dataSource={dataTable}
            pagination={false}
          />
          <p className={styles.p_money}>
            Tổng lương thực nhận:{" "}
            {roundToInteger(apiData?.data?.tien_thuc_nhan)} (VNĐ)
          </p>
        </div>
        <button className={styles.export} onClick={handleExportExcel}>
          Xuất công
        </button>
      </div>
    </div>
  );
};

export default App;
