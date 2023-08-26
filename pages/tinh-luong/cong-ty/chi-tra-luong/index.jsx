import styles from "./index.module.css";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import { useRouter } from "next/router";
import HeadNavResCongTy from "../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";
import { Select, Space, Modal, Table } from "antd";
import axios from "axios";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
// import { TokenForQuanLyChung, TokenForTinhLuong } from "../../api/BaseApi";
import dayjs from "dayjs";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";

export default function ChiTraLuong() {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  console.log("role: ", role);

  //Them so 0 vao ngay +thang
  function getMonth(date) {
    const month = date.getMonth() + 1; // JavaScript's getMonth() method returns a zero-based month (0-11)
    return month < 10 ? `0${month}` : month.toString();
  }
  function getDate(date) {
    const day = date.getDate();
    return day < 10 ? `0${day}` : day.toString();
  }
  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].shift_id == id) {
        return i; // Return the index if ID matches
      }
    }

    return -1; // Return -1 if ID is not found
  }
  function findIndexByIdForEdit(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].pay_id == id) {
        return i; // Return the index if ID matches
      }
    }

    return -1; // Return -1 if ID is not found
  }
  function formatDateWithoutTime(utcDateString) {
    const date = new Date(utcDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatMonthWithoutTime(utcDateString) {
    const date = new Date(utcDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}`;
  }

  function formatMonthWithoutTimeforRender(utcDateString) {
    const date = new Date(utcDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `Tháng ${month}/${year}`;
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

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
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
  const [isedit, setIsEdit] = useState(false);
  const [isInsert, setIsInsert] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [formData, setFormData] = useState({});
  const dataSource = apiData.data?.payment_list;
  const [isModalOpenThemMoi, setIsModalOpenThemMoi] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [allShift, setAllShift] = useState([]);
  const [selectedPay, setSelectedPay] = useState(0);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [isThongKe, setIsThongKe] = useState(false);
  // console.log("isThongKe:", isThongKe);
  // console.log("selectedYear:", selectedYear);
  // console.log("selectedMonth: ", selectedMonth);
  // console.log("Tất cả các ca: ", allShift);
  const showModalThemMoi = () => {
    setIsModalOpenThemMoi(true);
  };

  const showModalEdit = (id) => {
    setFormData({
      TenBangChiTra: dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_name,
      HinhThucThanhToan:
        dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_unit,
      ThangApDung: formatMonthWithoutTime(
        dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_for_time
      ),
      KyChiTraTu: formatDateWithoutTime(
        dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_time_start
      ),
      KyChiTraDen: formatDateWithoutTime(
        dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_time_end
      ),
      DonViApDung: dataSource[findIndexByIdForEdit(dataSource, id)]?.pay_for,
    });
    setIsModalOpenEdit(true);
  };
  const handleCancelThemMoi = () => {
    setFormData({
      TenBangChiTra: "",
      DonViApDung: 0,
      HinhThucThanhToan: 1,
      KyChiTraDen: "",
      KyChiTraTu: "",
      ThangApDung: "",
    });
    setIsModalOpenThemMoi(false);
    setIsModalOpenEdit(false);
    setIsEdit(false);
  };

  const handleOkThemMoi = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/insert_info_payment`, {
        dp_use_id: ep_id,
        dp_pay_id: 1,
        dp_com_id: cp,
        pay_name: formData?.TenBangChiTra,
        pay_unit: formData?.HinhThucThanhToan,
        pay_for_time: formData?.ThangApDung,
        pay_time_start: formData?.KyChiTraTu,
        pay_time_end: formData?.KyChiTraDen,
        pay_for: formData?.DonViApDung,
        pay_com: cp,
        token: token,
      })
      .then((res) => {
        console.log("Response sau khi thêm mới Chi trả lương: ", res);
        alert("Thêm mới thành công");
      })
      .catch((err) => {
        console.log(
          "error ở API http://210.245.108.202:3009/api/tinhluong/congty/insert_info_payment là: ",
          err
        );
        alert("Thêm mới thất bại");
      });
    setFormData({
      TenBangChiTra: "",
      DonViApDung: 0,
      HinhThucThanhToan: 1,
      KyChiTraDen: "",
      KyChiTraTu: "",
      ThangApDung: "",
    });
    setIsInsert(!isInsert);
    setIsModalOpenThemMoi(false);
  };
  const handleOkEdit = (id) => {
    axios
      .post(`${domain}/api/tinhluong/congty/updateinfo_payment`, {
        pay_id: id,
        pay_name: formData?.TenBangChiTra,
        pay_unit: formData?.HinhThucThanhToan,
        pay_for_time: formData?.ThangApDung,
        pay_time_start: formData?.KyChiTraTu,
        pay_time_end: formData?.KyChiTraDen,
        pay_com: cp,
        token: token,
      })
      .then((res) => {
        console.log("response sau khi handleOkEdit: ", res);
      })
      .catch((err) => {
        console.log(
          "err ở API: http://210.245.108.202:3009/api/tinhluong/congty/updateinfo_payment",
          err
        );
      });
    setIsModalOpenEdit(false);
    setIsEdit(!isedit);
    setFormData({
      TenBangChiTra: "",
      DonViApDung: 0,
      HinhThucThanhToan: 1,
      KyChiTraDen: "",
      KyChiTraTu: "",
      ThangApDung: "",
    });
  };
  const columns = [
    {
      title: "Bảng chi trả lương",
      key: "name",
      width: "16.59%",
      render: (record) => (
        <p className={styles.BangChiTraLuong}>{record?.pay_name}</p>
      ),
    },
    {
      title: "Tháng",

      key: "age",
      width: "12.52%",
      render: (record) => (
        <p className={styles.BangChiTraLuong} style={{ color: "#F46A6A" }}>
          {`${formatMonthWithoutTimeforRender(record?.pay_for_time)}`}
        </p>
      ),
    },
    {
      title: "Kỳ chi trả",

      key: "address",
      width: "20.87%",
      render: (record) => {
        const dateStart = new Date(record?.pay_time_start);
        const dateEnd = new Date(record?.pay_time_end);
        return (
          <p className={styles.BangChiTraLuong} style={{ color: "#68798B" }}>
            {/* 27/06/2023 - 18/07/2023 */}
            {`${getDate(dateStart)}/${getMonth(
              dateStart
            )}/${dateStart.getFullYear()} - ${getDate(dateEnd)}/${getMonth(
              dateEnd
            )}/${dateEnd.getFullYear()}`}
          </p>
        );
      },
    },
    {
      title: "Đối tượng",

      key: "address",
      width: "14.27%",
      render: (record) => (
        <p className={styles.BangChiTraLuong} style={{ color: "#68798B" }}>
          {(() => {
            if (record?.pay_for?.$numberDecimal == 0) {
              return "Áp dụng cho toàn bộ nhân viên";
            } else {
              return allShift[
                findIndexById(allShift, record?.pay_for?.$numberDecimal)
              ]?.shift_name;
            }
          })()}
        </p>
      ),
    },
    {
      title: "Hinh thức",

      key: "address",
      width: "7.86%",
      align: "center",
      render: (record) => (
        <p className={styles.BangChiTraLuong} style={{ color: "#4C5BD4" }}>
          {(() => {
            if (record?.pay_unit === 3) return "Cả 2";
            if (record?.pay_unit === 2) return "Chuyển khoản";
            if (record?.pay_unit === 1) return "Tiền mặt";
          })()}
        </p>
      ),
    },
    {
      title: "Trạng thái",

      key: "address",
      width: "20.56%",
      align: "center",
      render: (record) => {
        if (record?.pay_status == 1) {
          console.log("Đã Thanh toán: ");
          return (
            <span className={styles.takeleave_status_2}>Đã Thanh Toán</span>
          );
        }
        if (record?.pay_status == 2) {
          console.log("Thanh toán 1 phần");
          return (
            <span className={styles.takeleave_status_3}>Thanh Toán 1 Phần</span>
          );
        }
        if (record?.pay_status == 3) {
          console.log(" Chưa thanh toán");
          return (
            <span className={styles.takeleave_status_1}>Chưa Thanh Toán</span>
          );
        }
      },
    },
    {
      title: "Sửa",

      key: "address",
      width: "3.18%",
      render: (record) => (
        <div className={styles.c_point}>
          <img
            src="/tinhluong/edit.png"
            alt=""
            style={{ objectFit: "cover" }}
            onClick={() => handleEdit(record?.pay_id)}
          />
        </div>
      ),
    },
    {
      title: "Xóa",

      key: "address",
      width: "3.73%",
      render: (record) => (
        <div className={styles.c_point}>
          <img
            src="/tinhluong/remove.png"
            alt=""
            style={{ objectFit: "cover" }}
            onClick={() => handleDelete(record.pay_id)}
          />
        </div>
      ),
    },
  ];

  //* Data để render ra bảng
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/takeinfo_payment`, {
        com_id: cp,
        start_date: `${convertDateFormatforStartDate(
          `${selectedYear}-${selectedMonth}`
        )}-01T00:00:00.000+00:00`,
        end_date: `${convertDateFormatforEndDate(
          `${selectedYear}-${selectedMonth}`
        )}-01T00:00:00.000+00:00`,
        token: token,
      })
      .then((response) => {
        console.log("Data Chi Trả Lương:", response.data.payment_list);
        setApiData(response);

        // Handle the response data here
      })
      .catch((error) => {
        console.error(
          "Error ở API http://210.245.108.202:3009/api/tinhluong/congty/takeinfo_payment:",
          error
        );
        // Handle errors here
      });
  }, [isedit, isInsert, isThongKe]);

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

  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/list_shift`, {
        com_id: 3312,
        token: token,
      })
      .then((res) => {
        setAllShift(res.data.data.listShift);
      })
      .catch((err) => {
        console.log(
          "Lỗi ở API: http://210.245.108.202:3009/api/tinhluong/congty/show_staff_late  ",
          err
        );
      });
  }, []);

  const handleDelete = (id) => {
    // console.log("id ở trong handle Delete: ", id);
    const result = window.confirm("Bạn có chắc chắn muốn xóa");

    if (result) {
      // User Clicked Ok
    } else {
      // User clicked "Cancel"
    }
  };
  const handleEdit = (id) => {
    console.log("id của record chi trả lương", id);

    showModalEdit(id);
    setSelectedPay(id);
    setIsEdit(true);
  };

  const handleOkGeneral = () => {
    if (isedit) return handleOkEdit();
    else return handleOkThemMoi();
  };

  console.log("DataSource: ", dataSource);
  if (role == 1) {
    return (
      <div className={styles.idx_ttnv}>
        {/* <HeadNavRes></HeadNavRes> */}
        <HeadNavResCongTy></HeadNavResCongTy>
        <HeadNav title="Chi trả lương"></HeadNav>
        <div className={styles.part_tax}>
          <div className={styles.tax_three}>
            <div className={styles.tax_three_ct_one}>
              <div className={styles.tax_tb}>
                <div className={styles.cate_staff_one}>
                  <div className={styles.cate_ct_one}>
                    <h3>Bảng chi trả lương</h3>
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
                      onChange={(e) => setSelectedYear(e)}
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
                      onChange={(e) => setSelectedMonth(e)}
                    >
                      {MonthData.map((item, index) => (
                        <Option value={item.value}>{item.label}</Option>
                      ))}
                    </Select>
                    <input
                      type="button"
                      className={styles.tinh_luong}
                      onClick={() => setIsThongKe(!isThongKe)}
                      value="Thống kê"
                    />
                  </div>
                  <div className={styles.tax_one} onClick={showModalThemMoi}>
                    <p className={styles.check_btn}>
                      <span>Thêm mới</span>
                    </p>
                  </div>
                </div>
                <div className={styles.rose_tb}>
                  <div className={styles.rose_tb_ct_one}>
                    <Table
                      className={`customTable ${styles.ant_design_table}`}
                      columns={columns}
                      dataSource={dataSource}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Đây là modal cho Chỉnh sửa */}
        <Modal
          className="Tien_Modal_NhomLamViec"
          style={{ display: "flex", flexDirection: "column" }}
          title="Chỉnh Sửa"
          open={isModalOpenEdit}
          footer={null}
          onCancel={handleCancelThemMoi}
        >
          <div className={styles.modal_hd_tax_ThemMoi}>
            <div className={styles.modal_body_ThemMoi}>
              <div className={styles.cr_popup_tax_ThemMoi}>
                <form>
                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Tên bảng chi trả
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      name="TenBangChiTra"
                      placeholder="Nhập tên bảng chi trả"
                      value={formData?.TenBangChiTra}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Tháng áp dụng
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="month"
                      name="ThangApDung"
                      value={formData?.ThangApDung}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Kỳ chi trả ( từ - đến)
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className={styles.adtu}
                      type="date"
                      name="KyChiTraTu"
                      aria-invalid="false"
                      value={formData?.KyChiTraTu}
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      className={styles.adtu}
                      type="date"
                      name="KyChiTraDen"
                      value={formData?.KyChiTraDen}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Hình thức thanh toán
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      name="HinhThucThanhToan"
                      id=""
                      value={formData?.HinhThucThanhToan}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="1">Tiền mặt</option>
                      <option value="2">Chuyển Khoản</option>
                      <option value="3">Cả 2</option>
                    </select>
                  </div>

                  <div
                    className={styles.form_group_ThemMoi}
                    style={{ display: "none" }}
                  >
                    <label htmlFor="">
                      Đơn vị áp dụng
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      name="DonViApDung"
                      id=""
                      value={formData?.DonViApDung}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value={0}>Toàn bộ nhân viên</option>
                      {allShift.map((item, index) => (
                        <option value={item?.shift_id}>
                          {item?.shift_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOkEdit(selectedPay)}
                    className={styles.btn_sv_ThemMoi}
                  >
                    Lưu lại
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        {/* Đây là Modal cho Thêm mới */}
        <Modal
          className="Tien_Modal_NhomLamViec"
          style={{ display: "flex", flexDirection: "column" }}
          title="Thêm Mới"
          open={isModalOpenThemMoi}
          footer={null}
          onCancel={handleCancelThemMoi}
        >
          <div className={styles.modal_hd_tax_ThemMoi}>
            <div className={styles.modal_body_ThemMoi}>
              <div className={styles.cr_popup_tax_ThemMoi}>
                <form>
                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Tên bảng chi trả
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      name="TenBangChiTra"
                      placeholder="Nhập tên bảng chi trả"
                      value={formData?.TenBangChiTra}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Tháng áp dụng
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="month"
                      name="ThangApDung"
                      value={formData?.ThangApDung}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Kỳ chi trả ( từ - đến)
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className={styles.adtu}
                      type="date"
                      name="KyChiTraTu"
                      aria-invalid="false"
                      value={formData?.KyChiTraTu}
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      className={styles.adtu}
                      type="date"
                      name="KyChiTraDen"
                      value={formData?.KyChiTraDen}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Hình thức thanh toán
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      name="HinhThucThanhToan"
                      id=""
                      value={formData?.HinhThucThanhToan}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="1">Tiền mặt</option>
                      <option value="2">Chuyển Khoản</option>
                      <option value="3">Cả 2</option>
                    </select>
                  </div>
                  <div className={styles.form_group_ThemMoi}>
                    <label htmlFor="">
                      Đơn vị áp dụng
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      name="DonViApDung"
                      id=""
                      value={formData?.DonViApDung}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value={0}>Toàn bộ nhân viên</option>
                      {allShift.map((item, index) => (
                        <option value={item?.shift_id}>
                          {item?.shift_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleOkThemMoi}
                    className={styles.btn_sv_ThemMoi}
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
  } else {
    router.push("/dang-nhap-nhan-vien");
  }
}
