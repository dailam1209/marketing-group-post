import { useEffect, useState } from "react";
import { columns } from "../../../Data/DataTable";
import styles from "./FourthPage.module.css";
import { Select, Table } from "antd";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import axios from "axios";
//!Chu ý: cái fr_id trong API : http://210.245.108.202:3009/api/tinhluong/congty/takedata_to_edit_phat_nghi chưa biết là gì

export default function FourthPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Ensure month and day are always two digits (e.g., "03" instead of "3")
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  function convertUtcToVietnamDate(utcDateString) {
    const utcDate = new Date(utcDateString);
    const vietnamUtcOffset = 7 * 60 * 60 * 1000;
    const vietnamUtcDate = new Date(utcDate.getTime() + vietnamUtcOffset);

    const day = vietnamUtcDate.getUTCDate().toString().padStart(2, "0");
    const month = (vietnamUtcDate.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0");
    const year = vietnamUtcDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  const YearData = [
    {
      value: 2022,
      label: "Năm 2022",
    },
    {
      value: 2023,
      label: "Năm 2023",
    },
    {
      value: 2024,
      label: "Năm 2024",
    },
  ];

  const MonthData = [
    {
      value: 1,
      label: "Tháng 1",
    },
    {
      value: 2,
      label: "Tháng 2",
    },
    {
      value: 3,
      label: "Tháng 3",
    },
    {
      value: 4,
      label: "Tháng 4",
    },
    {
      value: 5,
      label: "Tháng 5",
    },
    {
      value: 6,
      label: "Tháng 6",
    },
    {
      value: 7,
      label: "Tháng 7",
    },
    {
      value: 8,
      label: "Tháng 8",
    },
    {
      value: 9,
      label: "Tháng 9",
    },
    {
      value: 10,
      label: "Tháng 10",
    },
    {
      value: 11,
      label: "Tháng 11",
    },
    {
      value: 12,
      label: "Tháng 12",
    },
  ];
  const NhanVien = [
    { value: "TatCa", label: "Tất cả Nhân Viên" },
    { value: "NguyenQuangTien", label: "Nguyễn Quang Tiến" },
    { value: "NguyenVanThuc", label: "Nguyễn Văn Thức" },
    { value: "NguyenTheAnh", label: "Nguyễn Thế Anh" },
  ];
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      status: 1,
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      status: 1,
    },
  ];

  const columns = [
    {
      title: "Họ và tên",

      key: "name",
      width: "25.58%",
      render: (record) => (
        <div>
          <div style={{ float: "left", paddingLeft: "15px" }}>
            <img
              src="/add.png"
              style={{ borderRadius: "50%", width: "45px", height: "45px" }}
            />
          </div>
          <div
            style={{
              float: "left",
              paddingLeft: "10px",
              width: "72%",
              textAlign: "left",
            }}
          >
            <h4
              style={{
                fontWeight: "500",
                fontSize: "15px",
                lineHeight: "20px",
                color: "#4c5bd4",
                marginBottom: "3px",
                cursor: "pointer",
              }}
            >
              {record?.fr_user_name}
            </h4>
            <p
              style={{ fontSize: "15px", lineHeight: "16px", color: "#68798b" }}
            >
              ID:{record?.fr_id_user}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Ngày xin nghỉ",

      key: "age",
      width: "18.42%",
      render: (record) => (
        <div style={{ paddingBottom: "3px", color: "#4c5bd4" }}>
          {convertUtcToVietnamDate(record?.fr_fist_time)} -{" "}
          {convertUtcToVietnamDate(record?.fr_end_time)}
        </div>
      ),
    },
    {
      title: "Ca xin nghỉ",

      key: "address",
      width: "18.42%",
      render: (record) => (
        <div
          style={{
            fontSize: "15px",
            fontWeight: "16px",
            color: " #68798b",
          }}
        >
          {record?.ft_ca_nghi}
        </div>
      ),
    },
    {
      title: "Trạng thái",

      key: "address",
      width: "18.42%",
      render: (record) => (
        <div>
          {record.fr_status === 1 && (
            <div className={styles.takeleave_status_1}>Đã Duyệt</div>
          )}
          {record.fr_status === 2 && (
            <div className={styles.takeleave_status_2}>Đang chờ duyệt</div>
          )}
        </div>
      ),
    },
    {
      title: "Loại Hình",

      key: "address",
      width: "18.42%",
      render: () => (
        <div
          style={{
            fontSize: "15px",
            fontWeight: "16px",
            color: " #68798b",
          }}
        >
          Nghỉ phép không lương
        </div>
      ),
    },
  ];

  const [danhSachNhanVienNghiPhep, setDanhSachNhanVienNghiPhep] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://210.245.108.202:3009/api/tinhluong/congty/takedata_to_edit_phat_nghi",
        {
          fr_id: 82,
          token: token,
        }
      )
      .then((res) => {
        console.log("Các nhân viên nghỉ phép: ", res.data.tt);
        setDanhSachNhanVienNghiPhep(res.data.tt);
      })
      .catch((err) => {
        console.log(
          "Error ở API http://210.245.108.202:3009/api/tinhluong/congty/takedata_to_edit_phat_nghi",
          err
        );
      });
  }, []);
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Chính sách nghỉ phép</p>
          <p onClick={() => handleClick(2)}>Nghỉ sai quy định</p>
          <p onClick={() => handleClick(3)}>
            Nghỉ vào ngày không được phép nghỉ
          </p>
          <p onClick={() => handleClick(4)} className={styles.active}>
            Theo dõi nghỉ phép
          </p>
          <p onClick={() => handleClick(5)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.late_or_soon}>
            <div className={styles.cate_staff_one}>
              <div className={styles.cate_ct_one}>
                <h3>Danh sách nhân viên nghỉ phép</h3>
                <i>Quản lý theo dõi nhân viên nghỉ phép</i>
              </div>
              <div className={styles.cate_ct_tow}>
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Năm ${year}`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={YearData}
                />
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Tháng ${month}`}
                  optionFilterProp="children"
                  options={MonthData}
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                />
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Tất cả Nhân Viên`}
                  optionFilterProp="children"
                  options={NhanVien}
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                />
              </div>
            </div>

            <div className={styles.take_leave_tb}>
              {/* Them table vao day nha */}
              <Table
                className="NghiPhep4th"
                dataSource={danhSachNhanVienNghiPhep}
                columns={columns}
              />
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
