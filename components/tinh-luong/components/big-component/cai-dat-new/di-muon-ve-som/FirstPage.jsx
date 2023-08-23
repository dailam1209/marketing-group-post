import { useEffect, useState } from "react";
import styles from "./FirstPage.module.css";
import { Select, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../api/BaseApi";

export default function FirstPage({ handleSelected }) {
  const arrayTest = [
    { userName: "Tien", University: "Hust" },
    { userName: "Binh", University: "Hust" },
    { userName: "Tuan Anh", University: "Hust" },
    { userName: "Thuc", University: "KingKong" },
    { userName: "The Anh", University: "TLU" },
    { userName: "Le Chi", University: "NEU" },
    { userName: "Huy Beo", University: "DHQG" },
    { userName: "Nam Beo", University: "FrankFruit" },
    { userName: "Thuy Anh", University: "DHNN" },
  ];

  const array1 = [
    { name: "HUST", id: "1" },
    { name: "DHNN", id: "2" },
  ];

  const handleClick = (c) => {
    handleSelected(c);
  };

  const [month, setMonth] = useState(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());
  const [isThongKe, setIsThongKe] = useState(false);
  const [selectedDep, setSelectedDep] = useState("all");
  const [selectedEmp, setSelectedEmp] = useState("all");
  const YearData = [
    {
      value: dayjs().year() - 1,
      label: `${dayjs().year() - 1}`,
    },
    {
      value: dayjs().year(),
      label: `${dayjs().year()}`,
    },
    {
      value: dayjs().year() + 1,
      label: `${dayjs().year() + 1}`,
    },
  ];

  const filterUnique = (input, name) => {
    const uniqueIds = [];
    return input?.filter((element) => {
      const isDuplicate = uniqueIds?.includes(element?.[name]);
      if (!isDuplicate) {
        uniqueIds?.push(element?.[name]);
        return true;
      }
      return false;
    });
  };
  function convertUtcToVietnamTime(utcTimeString) {
    const utcTime = new Date(utcTimeString);
    const vietnamOptions = {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedTime = utcTime.toLocaleString("en-US", vietnamOptions);
    const formattedDate = formattedTime.slice(0, 10);
    const formattedTimePart = formattedTime.slice(11);

    return `${formattedDate}-${formattedTimePart}`;
  }
  function handlerenderDepartment(nhanVien, keyToFind) {
    const foundObject = nhanVien.find((item) => item?.idQLC === keyToFind);

    if (foundObject) {
      return foundObject?.Deparment?.dep_name;
    } else {
      return null;
    }
  }

  function handlerenderShift(caLamViec, keyToFind) {
    const foundObject = caLamViec.find((item) => item?.shift_id === keyToFind);

    if (foundObject) {
      console.log("Đã tìm được ca làm việc: ", foundObject?.shift_name);
      return foundObject?.shift_name;
    } else {
      console.log("Không tìm được ca làm việc");
      return null;
    }
  }

  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.sheet_id == id) {
        return i; // Return the index when ID matches
      }
    }
    return -1; // Return -1 if ID is not found
  }

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

  const [nhanVien, setNhanVien] = useState([]);
  const [caLamViec, setCaLamViec] = useState([]);
  const [phongBan, setPhongBan] = useState([]);
  const [tienPhatMuon, setTienPhatMuon] = useState([]);
  const [congPhatMuon, setCongPhatMuon] = useState([]);
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const columns = [
    {
      title: "Họ và tên",

      key: "name",
      width: "13.66%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {record?.ep_name}
        </p>
      ),
    },
    {
      title: "Phòng ban	",

      key: "age",
      width: "19.19%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {handlerenderDepartment(nhanVien, record?.ep_id)}
        </p>
      ),
    },
    {
      title: "Thời gian",

      key: "address",
      width: "12.7%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {(() => {
            if (record?.early === 0) {
              return convertUtcToVietnamTime(record?.check_in);
            } else {
              return convertUtcToVietnamTime(record?.check_out);
            }
          })()}
        </p>
      ),
    },
    {
      title: "Ca",

      key: "address",
      width: "15.76%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {(() => {
            return handlerenderShift(caLamViec, record?.shift_id);
          })()}
        </p>
      ),
    },
    {
      title: "Muộn / Sớm",

      key: "address",
      width: "12.07%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {(() => {
            if (record?.early === 0) {
              return "Đi muộn " + record?.late + " phút";
            } else {
              return "Về Sớm " + record?.early + " phút";
            }
          })()}
        </p>
      ),
    },
    {
      title: "Phạt",

      key: "address",
      width: "9.6%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {(() => {
            if (record?.status == 1) {
              if (findIndexById(tienPhatMuon, record?.sheet_id) >= 0) {
                return (
                  tienPhatMuon[findIndexById(tienPhatMuon, record?.sheet_id)]
                    ?.cong + " VNĐ"
                );
              } else {
                return 0 + "VNĐ";
              }
            } else {
              if (findIndexById(congPhatMuon, record?.sheet_id) >= 0) {
                return (
                  congPhatMuon[findIndexById(congPhatMuon, record?.sheet_id)]
                    ?.cong + " Công/Ca"
                );
              } else {
                return 0 + " Công/Ca";
              }
            }
          })()}
        </p>
      ),
    },
  ];

  const [apiData, setApiData] = useState([]);

  //*  API
  const fetchApiData = (month, year, selectedEmp, selectedDep) => {
    axios
      .post(`${domain}/api/tinhluong/congty/show_staff_late`, {
        start_date: `${year}/${month}/01`,
        end_date: `${month === 12 ? year + 1 : year}/${
          month === 12 ? 1 : month + 1
        }/01`,
        com_id: cp,
        token: token,
      })
      .then((res) => {
        let mapData = res.data.data.list_data_late_early;
        let array1 = [1218, 1216];
        // mapData = mapData.filter((item) => item.ep_id === 1216);

        if (selectedEmp === "all" && selectedDep === "all") {
          mapData = mapData;
          console.log("Kết Quả: Tất cả mọi thứ");
        }

        if (selectedEmp !== "all" && selectedDep === "all") {
          mapData = mapData.filter((item) => item.ep_id === selectedEmp);
          console.log("Kết Quả: Chỉ lọc Nhân Viên");
        }
        if (selectedEmp === "all" && selectedDep !== "all") {
          let NhanVienThoaMan = res.data.data.listUserDetail.filter(
            (item) => item?.Deparment?.dep_id === selectedDep
          );
          let NhanVienThoaManId = NhanVienThoaMan.map((item) => item.idQLC);

          mapData = mapData.filter((item) =>
            NhanVienThoaManId.includes(item.ep_id)
          );
          console.log("Kết Quả: Chỉ lọc phòng ban");
        }
        if (selectedEmp !== "all" && selectedDep !== "all") {
          let NhanVienThoaMan = res.data.data.listUserDetail.filter(
            (item) => item?.Deparment?.dep_id === selectedDep
          );
          let NhanVienThoaManId = NhanVienThoaMan.map((item) => item.idQLC);

          mapData = mapData.filter((item) =>
            NhanVienThoaManId.includes(item.ep_id)
          );
          mapData = mapData.filter((item) => item.ep_id === selectedEmp);
          console.log("Kết Quả: Lọc cả phòng ban và nhân viên");
        }

        // console.log("Nhân Viên Thỏa Mãn : ", NhanVienThoaMan);
        // mapData = mapData.filter((item) => array1.includes(item.ep_id))
        setApiData(mapData);
        setNhanVien(res.data.data.listUserDetail);
        setCaLamViec(res.data.data.listShiftDetail);
        setTienPhatMuon(res.data.data.tien_phat_muon);
        setCongPhatMuon(res.data.data.cong_phat_muon);
      })
      .catch((err) => {
        console.log("Error from fetchApiData 1st: ", err);
      });
  };
  useEffect(() => {
    axios
      .post(
        `${domain}/api/qlc/department/list`,
        { com_id: cp },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("response ở đi muộn về sớm 1st page", res);
        setPhongBan(res.data.data.items);
      })
      .catch((err) => {
        console.log("error ở tất cả phòng ban: ", err);
      });
  }, []);
  useEffect(
    () => fetchApiData(month, year, selectedEmp, selectedDep),
    [isThongKe]
  );

  console.log("API Data at 1st: ", apiData);

  console.log("find Index By sheet_id", findIndexById(tienPhatMuon, 1408925));

  // console.log("selected Year:", year);
  // console.log("selected Month:", month);
  // console.log("is Thong Ke: ", isThongKe);

  return (
    <div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)} className={styles.active}>
            Đi muộn về sớm
          </p>
          <p onClick={() => handleClick(2)}>Cài đặt đi muộn về sớm</p>
          <p onClick={() => handleClick(3)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.tax_tb}>
            <div className={styles.cate_staff_one}>
              <div className={styles.cate_ct_one}>
                <h3>Theo dõi đi muộn về sớm</h3>
                <p>Quản lý nhân viên ra về</p>
              </div>
              <div className={styles.cate_ct_tow}>
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`${year}`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => setYear(e)}
                >
                  {YearData.map((item, index) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Tháng ${month}`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => setMonth(e)}
                >
                  {MonthData.map((item, index) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Tất cả Nhân Viên`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => setSelectedEmp(e)}
                >
                  <Option value="all">Tất cả nhân viên</Option>
                  {nhanVien.map((item, index) => (
                    <Option value={item?.idQLC}>{item?.userName}</Option>
                  ))}
                </Select>
                <Select
                  className={styles.selection}
                  showSearch
                  defaultValue={`Tất cả phòng ban`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => setSelectedDep(e)}
                >
                  <Option value="all">Tất cả Phòng Ban</Option>
                  {phongBan.map((item, index) => (
                    <Option value={item?.dep_id}>{item?.dep_name}</Option>
                  ))}
                </Select>
                <input
                  type="button"
                  className={styles.thong_ke}
                  value="Thống kê"
                  onClick={() => setIsThongKe(!isThongKe)}
                />
              </div>
            </div>
            <div className={styles.takeleave_tb}>
              <Table
                className="DiMuonVeSomTable"
                dataSource={apiData}
                columns={columns}
              />
            </div>
          </div>
          <div className={styles.cate_pay_ct}></div>
        </div>
      </div>
    </div>
  );
}
