import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./SecondPage.module.css";
import { Select, Table, Modal } from "antd";
import axios from "axios";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../api/BaseApi";

//todo : lam xuat excel cua di muon ve som
//todo: them modal insert di muon ve som ( giong  voi theo doi di muon ve som)
//todo: noi api insert, update cua di muon ve som
export default function SecondPage({ handleSelected }) {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].pm_id === id) {
        return i; // Return the index if the id matches
      }
    }
    return -1; // Return -1 if the id is not found in the array
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  function formatDatetoDisplayOnTable(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `Tháng ${month}/${year}`;
  }
  function convertDateFormat(inputDate) {
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
  const handleClick = (c) => {
    handleSelected(c);
  };

  const fetchApiData = (month, year) => {
    // console.log("pm_time_begin: ", `${year}-0${month}-01T00:00:00.000+00:00`);
    // console.log(
    //   "pm_time_end: ",
    //   convertDateFormat(`${year}-${month}`) + `-01T00:00:00.000+00:00`
    // );
    axios
      .post(GetAllTypeofPenaltiesAPIUrl, {
        pm_time_begin: `${year}-0${month}-01T00:00:00.000+00:00`,
        pm_time_end:
          convertDateFormat(`${year}-${month}`) + `-01T00:00:00.000+00:00`,
        pm_id_com: cp,
        token: standardToken,
      })
      .then((response) => {
        console.log("Các loại phạt: ", response.data.phat_muon_info);
        setApiDataTypeofPenalties(response.data.phat_muon_info);
      });
  };
  const standardToken = token;

  const [month, setMonth] = useState(dayjs().month() + 1);
  const [year, setYear] = useState(dayjs().year());
  const [isThongKe, setIsThongKe] = useState(false);

  //* Các loại quy ước liên quan đến loại phạt

  const pm_type_fix_cung = [
    { value: 1, label: "Đi Muộn" },
    { value: 2, label: "Về Sớm" },
  ];
  const pm_type_phat_fix_cung = [
    { value: 1, label: "Phạt Tiền" },
    { value: 2, label: "Phạt Công" },
  ];
  //* Các loại data điền vào select và bảng
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

  const columns = [
    {
      title: "Loại phạt",

      key: "name",
      width: "17.36%",
      render: (record) => {
        if (record?.pm_type == 1) {
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              Đi Muộn
            </p>
          );
        }
        if (record?.pm_type == 2) {
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              Về Sớm
            </p>
          );
        }
      },
    },
    {
      title: "Ca làm việc áp dụng	",

      key: "age",
      width: "17.41%",
      render: (record) => {
        return (
          <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
            {record?.shift?.shift_name}
          </p>
        );
      },
    },
    {
      title: "Từ tháng	",

      key: "address",
      width: "13.29%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {formatDatetoDisplayOnTable(record.pm_time_begin)}
        </p>
      ),
    },
    {
      title: "Đến hết tháng	",

      key: "address",
      width: "13.29%",
      render: (record) => (
        <p style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}>
          {formatDatetoDisplayOnTable(record.pm_time_end)}
        </p>
      ),
    },
    {
      title: "Thời gian tính phạt	",

      key: "address",
      width: "16.14%",
      render: (record) => {
        if (record?.pm_type == 1)
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              Đi muộn {record.pm_minute} phút
            </p>
          );
        if (record?.pm_type == 2)
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              Về sớm {record.pm_minute} phút
            </p>
          );
      },
    },
    {
      title: "Mức phạt",

      key: "address",
      width: "15.79%",
      render: (record) => {
        if (record?.pm_type_phat == 1) {
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              {record.pm_monney} VNĐ/ca
            </p>
          );
        }
        if (record?.pm_type_phat == 2) {
          return (
            <p
              style={{ fontSize: "15px", lineHeight: "22px", color: "#68798B" }}
            >
              {record.pm_monney} công/ca
            </p>
          );
        }
      },
    },
    {
      title: "Sửa",

      key: "address",
      width: "3.4%",
      render: (record) => (
        <img
          onClick={() => showModalEdit(record.pm_id)}
          src="/edit.png"
          alt=""
        />
      ),
    },
    {
      title: "Xóa",

      key: "address",
      width: "3.4%",
      render: (record) => (
        <img
          src="/remove.png"
          alt=""
          onClick={() => handleDelete(record.pm_id)}
        />
      ),
    },
  ];

  //*Xóa
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = (id) => {
    const result = window.confirm("Bạn có chắc chắn muốn xóa ?");

    if (result) {
      // User clicked "OK"

      handleOkDelete(id);
    } else {
      // User clicked "Cancel"
    }
  };
  const handleOkDelete = (id) => {
    axios.post(`${domain}/api/tinhluong/congty/delete_phat_muon`, {
      pm_id: id,
      token: standardToken,
    });
    setIsDelete(!isDelete);
  };
  console.log("isDelete: ", isDelete);

  //* Lay Thong Tin Cac Loai Di Muon
  const [ApiDataTypeofPenalties, setApiDataTypeofPenalties] = useState([]);
  const [AllShift, setAllShift] = useState([]);

  const GetAllTypeofPenaltiesAPIUrl = `${domain}/api/tinhluong/congty/takeinfo_phat_muon`;

  const APICaLamViecCuaCongty = `${domain}/api/qlc/shift/list`;

  //* Chinh sua
  const apiURLEditPhatMuon = `${domain}/api/tinhluong/congty/update_phat_muon`;

  const [isEdit, setIsEdit] = useState(false);
  const [idEditing, setIsEditing] = useState(0);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const showModalEdit = (id) => {
    let index = findIndexById(ApiDataTypeofPenalties, id);
    console.log("Index ở findIndexById:", index);
    setFormData({
      LyDoPhat: ApiDataTypeofPenalties[index]?.pm_type,
      CaLamViecApDung: ApiDataTypeofPenalties[index]?.pm_shift,
      SoPhutApDungMucPhat: ApiDataTypeofPenalties[index]?.pm_minute,
      LoaiPhat: ApiDataTypeofPenalties[index]?.pm_type_phat,
      SoTienHoacCongPhat: ApiDataTypeofPenalties[index]?.pm_monney,
      ThoiGianBatDauApDung: ApiDataTypeofPenalties[index]?.pm_time_begin,
      ThoiGianKetThuc: ApiDataTypeofPenalties[index]?.pm_time_end,
    });
    setIsEditing(id);
    setIsEdit(true);
    setIsModalOpenEdit(true);
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setIsEdit(false);
    setIsInsert(false);
    setFormData({ SoTienHoacCongPhat: "" });
  };
  const handleOkEdit = () => {
    axios
      .post(apiURLEditPhatMuon, {
        pm_type: formData?.LyDoPhat,
        pm_shift: formData?.CaLamViecApDung,
        pm_type_phat: formData?.LoaiPhat,
        pm_time_begin: formData?.ThoiGianBatDauApDung,
        pm_time_end: formData?.ThoiGianKetThuc,
        pm_monney: formData?.SoTienHoacCongPhat,
        pm_minute: formData?.SoPhutApDungMucPhat,
        pm_id_com: cp,
        pm_id: idEditing,
        token: standardToken,
      })
      .then((response) => {
        console.log("Response sau khi Edit :", response);
      })
      .catch((error) => {
        console.log("Error :", error);
      });

    // setLyDoPhat(1);
    // setCaLamViecApDung(1);
    // setLoaiPhat(1);
    // setThoiGianBatDauApDung("2023-03");
    // setThoiGianKetThuc("2023-06");
    // setSoTienHoacCongPhat(10000);
    // setSoPhuApDungMucPhat(5);
    // setIsEdit(false);
    // setIsModalOpenEdit(false);
    console.log("Dang o trong Edit");
    setFormData({ SoTienHoacCongPhat: "" });
    setIsModalOpenEdit(false);
    setIsEdit(false);
  };

  //* Them moi

  const apiURLInsertPhatMuon = `${domain}/api/tinhluong/congty/insert_phat_muon`;
  const [isInsert, setIsInsert] = useState(false);
  const showModalInsert = () => {
    setIsInsert(true);
    setIsModalOpenEdit(true);
  };

  const handleOkInsert = () => {
    axios
      .post(apiURLInsertPhatMuon, {
        pm_type: formData.LyDoPhat,
        pm_shift: formData.CaLamViecApDung,
        pm_type_phat: formData.LoaiPhat,
        pm_time_begin: formData.ThoiGianBatDauApDung,
        pm_time_end: formData.ThoiGianKetThuc,
        pm_monney: formData.SoTienHoacCongPhat,
        pm_minute: formData.SoPhutApDungMucPhat,
        pm_id_com: cp,

        token: standardToken,
      })
      .then((response) => {
        console.log("Response sau khi Edit :", response);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
    // setLyDoPhat(1);
    // setCaLamViecApDung(1);
    // setLoaiPhat(1);
    // setThoiGianBatDauApDung("2023-03");
    // setThoiGianKetThuc("2023-06");
    // setSoTienHoacCongPhat(10000);
    // setSoPhuApDungMucPhat(5);
    // setIsInsert(false);
    // setIsModalOpenEdit(false);
    console.log("Dang o trong Insert");
    setFormData({ SoTienHoacCongPhat: "" });
    setIsModalOpenEdit(false);
    setIsEdit(false);
    setIsInsert(!isInsert);
  };
  //* Xu Ly nut Luu Lai Trong Modal
  const handleOkGeneral = () => {
    if (isEdit) {
      handleOkEdit();
    } else handleOkInsert();
  };

  const [formData, setFormData] = useState({});

  //* Destructoring
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  //* Lấy Danh sách các ca qua showStaff Late, Lmao
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/show_staff_late`, {
        start_date: "2023-08-01T00:00:00.000+00:00",
        end_date: "2023-09-01T00:00:00.000+00:00",
        com_id: cp,
        token: token,
      })
      .then((res) => {
        setAllShift(res.data.data.listShiftDetail);
      })
      .catch((err) => {
        console.log("Lỗi ở Danh Sách Ca: ", err);
      });
  }, []);

  useEffect(
    () => fetchApiData(month, year),
    [isDelete, isInsert, isEdit, isThongKe]
  );
  console.log(
    " Thời gian sau khi đã format: ",
    formatDate(formData.ThoiGianBatDauApDung)
  );

  console.log("Các ca làm việc: ", AllShift);
  console.log("Selected Year: ", year);
  console.log("Selected Month:", month);
  console.log("Is Insert: ", isInsert);

  return (
    <div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Đi muộn về sớm</p>
          <p onClick={() => handleClick(2)} className={styles.active}>
            Cài đặt đi muộn về sớm
          </p>
          <p onClick={() => handleClick(3)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.tax_tb}>
            <div className={styles.cate_staff_one}>
              <div className={styles.cate_ct_one}>
                <h3>Danh sách mức phạt đi muộn về sớm</h3>
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
                  options={MonthData}
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => setMonth(e)}
                >
                  {MonthData.map((item, index) => (
                    <Option value={item.value}>{item.label}</Option>
                  ))}
                </Select>
                <input
                  type="button"
                  className={styles.tinh_luong}
                  value="Thống kê"
                  onClick={() => setIsThongKe(!isThongKe)}
                />
                <p className={styles.check_btn} onClick={showModalInsert}>
                  <span style={{ color: "white" }}>Thêm mới</span>
                </p>
              </div>
            </div>
            <div className={styles.takeleave_tb}>
              <Table
                className="DiMuonVeSomTable"
                dataSource={ApiDataTypeofPenalties}
                columns={columns}
              />
            </div>
          </div>
          <div className={styles.cate_pay_ct}></div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Chỉnh sửa mức phạt đi muộn về sớm"
        open={isModalOpenEdit}
        footer={null}
        onCancel={handleCancelEdit}
      >
        <div className={styles.modal_hd_tax_edit}>
          <div className={styles.modal_body_edit}>
            <div className={styles.cr_popup_tax_edit}>
              <form>
                <div className={styles.form_group_edit}>
                  <label htmlFor="">Lý do phạt </label>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    name="LyDoPhat"
                    id=""
                    value={`${formData.LyDoPhat}`}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Chọn lý do</option>
                    <option value={1}>Đi muộn</option>
                    <option value={2}>Về sớm</option>
                  </select>
                </div>
                <div className={styles.form_group_edit}>
                  <label htmlFor="">Ca làm việc áp dụng </label>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    name="CaLamViecApDung"
                    id=""
                    // defaultValue={`${formData.CaLamViecApDung}`}
                    value={`${formData.CaLamViecApDung}`}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="all">Tất cả các ca</option>
                    {AllShift.map((item, index) => (
                      <option value={item?.shift_id}>{item?.shift_name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.form_group_edit}>
                  <label htmlFor="">Số phút áp dụng mức phạt </label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="number"
                    placeholder="Nhập số phút"
                    value={`${formData.SoPhutApDungMucPhat}`}
                    class="valid"
                    aria-invalid="false"
                    name="SoPhutApDungMucPhat"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>

                <div className={styles.form_group_edit}>
                  <label htmlFor="">Loại phát </label>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    name="LoaiPhat"
                    id=""
                    value={`${formData.LoaiPhat}`}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Chọn phương thức</option>
                    <option value={1}>Phạt tiền</option>
                    <option value={2}>Phạt công</option>
                  </select>
                </div>
                <div className={styles.form_group_edit}>
                  <label htmlFor="">Số tiền hoặc công phạt </label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    placeholder="Nhập số tiền hoặc công phạt"
                    value={`${formData.SoTienHoacCongPhat}`}
                    class="valid"
                    aria-invalid="false"
                    onChange={(e) => handleChange(e)}
                    name="SoTienHoacCongPhat"
                  ></input>
                </div>
                <div className={styles.form_group_edit}>
                  <label htmlFor="">Thời gian bắt đầu áp dụng </label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="month"
                    value={formatDate(formData.ThoiGianBatDauApDung)}
                    name="ThoiGianBatDauApDung"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                <div className={styles.form_group_edit}>
                  <label htmlFor="">Thời gian kết thúc </label>

                  <input
                    type="month"
                    value={formatDate(formData.ThoiGianKetThuc)}
                    name="ThoiGianKetThuc"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>

                <button
                  type="button"
                  onClick={handleOkGeneral}
                  className={styles.btn_sv_edit}
                >
                  Lưu lại
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
