import styles from "./index.module.css";

import React, { useState, useRef, useEffect } from "react";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../components/tinh-luong/components/big-component/head-nav-res";
import axios from "axios";
import { resolve } from "path";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";
// import { TokenForTinhLuong } from "../../api/BaseApi";

function Thongtin({ title1, title2 }) {
  return (
    <div className={styles.psif_fngd}>
      <div className={styles.fngd_one}>
        <p className={styles.ful_al}>{title1}</p>
      </div>
      <div className={styles.fngd_tow}>
        <p className={styles.ful_al}>{title2}</p>
      </div>
    </div>
  );
}

function Gioithieu() {
  const [IsEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.prf_al_tow}>
      <h3>Giới thiệu</h3>
      <span>
        <img src="/edit.png" onClick={() => setIsEdit(!IsEdit)} />
      </span>
      <p style={{ display: `${IsEdit ? "none" : "block"}` }}></p>
      <div
        style={{ display: `${IsEdit ? "block" : "none"}` }}
        className={styles.frame_gt_profile}
      >
        <textarea rows={5} className={styles.txt_gt_profile}></textarea>
        <div className={styles.fg_bt_gt}>
          <button
            className={styles.format_gt_profile}
            onClick={() => setIsEdit(!IsEdit)}
          >
            Hủy
          </button>
          <button type="submit" className={styles.sm_gt_profile}>
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label1, label2, children1, children2 }) {
  return (
    <div className={styles.form_row}>
      <div className={styles.form_group}>
        <label>{label1}</label>
        {children1}
      </div>
      <div className={styles.form_group1}>
        <label>{label2}</label>
        {children2}
      </div>
      <div className={styles.form_group} aria-invalid={false}></div>
    </div>
  );
}

export default function HoSoCaNhan() {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  console.log("domain: ", domain);
  const arrayTest = [
    {
      cl_name: "BHXH tính theo lương nhập vào",
      cl_time_created: "2021-07-22T01:00:19.000Z",
    },
    {
      cl_name: "BHXH1 tính theo lương nhập vào",
      cl_time_created: "2021-07-22T01:00:18.000Z",
    },
  ];

  //* function phụ
  function getLabelByValue(value) {
    const foundItem = ChucVu.find((item) => item.value == value);
    return foundItem ? foundItem.label : "N/A";
  }

  function convertAndFormatTimestamp(timestamp) {
    const utcTime = new Date(timestamp);

    // Convert to Vietnam time (UTC+7)
    const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);

    // Format as DD/MM/YYYY
    const day = vietnamTime.getUTCDate().toString().padStart(2, "0");
    const month = (vietnamTime.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = vietnamTime.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  function CheckisTheSame(existingArray, newArrayItem) {
    const lastItem = existingArray[existingArray.length - 1];
    const isSame =
      lastItem &&
      lastItem.cl_name === newArrayItem.cl_name &&
      lastItem.cl_time_created === newArrayItem.cl_time_created;

    return isSame;
  }

  const ChucVu = [
    { name: name, value: "", label: "Tất cả" },
    { name: name, value: "1", label: "SINH VIÊN THỰC TẬP" },
    { name: name, value: "9", label: "NHÂN VIÊN PART TIME" },
    { name: name, value: "2", label: "NHÂN VIÊN THỬ VIỆC" },
    { name: name, value: "3", label: "NHÂN VIÊN CHÍNH THỨC" },
    { name: name, value: "20", label: "NHÓM PHÓ" },
    { name: name, value: "4", label: "TRƯỞNG NHÓM" },
    { name: name, value: "12", label: "PHÓ TỔ TRƯỞNG" },
    { name: name, value: "13", label: "TỔ TRƯỞNG" },
    { name: name, value: "10", label: "PHÓ BAN DỰ ÁN" },
    { name: name, value: "11", label: "TRƯỞNG BAN DỰ ÁN" },
    { name: name, value: "5", label: "PHÓ TRƯỞNG PHÒNG" },
    { name: name, value: "6", label: "TRƯỞNG PHÒNG" },
    { name: name, value: "7", label: "PHÓ GIÁM ĐỐC" },
    { name: name, value: "8", label: "GIÁM ĐỐC" },
    { name: name, value: "14", label: "PHÓ TỔNG GIÁM ĐỐC" },
    { name: name, value: "16", label: "TỔNG GIÁM ĐỐC" },
    { name: name, value: "22", label: "PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
    { name: name, value: "21", label: "TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
    { name: name, value: "17", label: "THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ" },
    { name: name, value: "18", label: "PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
    { name: name, value: "19", label: "CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
  ];
  const domainAvatar = "https://cdn.timviec365.vn/upload/employee/";
  const editUserUrl = `${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`;
  const updatedUserData = {
    ep_id: ep_id,
    cp: cp,
    token: token,
    // Add other properties you want to update
  };
  const [userInfo, setUserInfo] = useState({});

  const getUserinformation = () => {
    axios
      .post(editUserUrl, updatedUserData)
      .then((response) => {
        setUserInfo(response.data.data);
        setBasicSalary(response.data.data.info_basic_salary);
        setInfoContract(response.data.data.info_contract);
        setThueVaBaoHiem(response.data.data.info_class);
        setTenThueVaBaoHiem(
          response.data.data.info_class[0].TinhluongListClass[0].cl_name
        );

        //! Đang trên đà thử nghiệm

        console.log("finalResult: ", response.data.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Request error12:", error);
      });
  };
  useEffect(() => {
    getUserinformation();
  }, []);

  // getUserinformation()
  //   .then((response) => {
  //     console.log("Resolved data", response);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  const defaultDate = "2001-02-05";
  const [Edit, setEdit] = useState(true);

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [basicSalary, setBasicSalary] = useState([]);
  const [infoContract, setInfoContract] = useState([]);
  const [thueVaBaoHiem, setThueVaBaoHiem] = useState([]);
  const [tenThueVaBaoHiem, setTenThueVaBaoHiem] = useState([]);

  console.log("basicSalary: ", basicSalary);
  console.log("thueVaBaoHiem", thueVaBaoHiem);
  console.log(
    "isThesame",
    CheckisTheSame(arrayTest, {
      cl_name: "BHXH1 tính theo lương nhập vào",
      cl_time_created: "2021-07-22T01:00:18.000Z", // Replace with the actual value
    })
  );
  console.log("Tên Thuế  Bảo hiểm : ", tenThueVaBaoHiem);
  return (
    <div className={styles.idx_ttnv}>
      <HeadNavRes></HeadNavRes>
      <HeadNav title="Hồ sơ cá nhân"></HeadNav>
      <div className={styles.part_hps}>
        <div className={styles.part_hps_al}>
          <div className={styles.hps_prf_al}>
            <div className={styles.prf_al_one}>
              <div className={styles.prf_avt}>
                <img
                  src={`${domainAvatar}${userInfo?.info_dep_com?.user?.avatarUser}`}
                />
                <span className={styles.edit_avt}>
                  <div className={styles.edit}>
                    <img src="/tinhluong/edit.png" onClick={triggerFileInput} />

                    <input
                      type="file"
                      id="myFileInput"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                </span>
              </div>
              <div className={styles.prf_fn}>
                <h3>{userInfo.info_dep_com?.user.userName}</h3>
                <p>
                  {getLabelByValue(
                    userInfo.info_dep_com?.user.inForPerson.employee.position_id
                  )}
                </p>
              </div>
            </div>

            <Gioithieu></Gioithieu>
            <div className={styles.prf_al_three}>
              <div className={styles.psif_one_active}>
                <div className={styles.psif_al_one}>
                  <div className={styles.pf_fle_one}>
                    <h3>Thông tin cá nhân</h3>
                    <span>
                      <img src="/edit.png" onClick={() => setEdit(!Edit)} />
                    </span>
                  </div>

                  <div
                    className={styles.pf_fle_tow}
                    style={{ display: `${Edit ? "block" : "none"}` }}
                  >
                    <Thongtin
                      title1={`Họ và tên: ${userInfo.info_dep_com?.user.userName}`}
                      title2={`Giới tính: ${
                        userInfo?.info_dep_com?.user?.inForPerson?.account
                          ?.gender === 1
                          ? "Nam"
                          : userInfo.gioitinh === 2
                          ? "Nữ"
                          : "Không xác định"
                      }`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Ngày sinh: ${userInfo?.info_dep_com?.user.inForPerson.account.birthday}`}
                      title2={`Mã nhân viên: ${userInfo.info_dep_com?.user.idQLC}`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Phòng ban: ${userInfo.info_dep_com?.department.dep_name}`}
                      title2={`Ngày bắt đầu làm: ${userInfo.info_dep_com?.user.inForPerson.employee.start_working_time}`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Tình trạng hôn nhân: ${
                        userInfo.info_dep_com?.user.inForPerson.account
                          .married === 1
                          ? "Chưa"
                          : userInfo.info_dep_com?.user.inForPerson.account
                              .married === 2
                          ? "Đã kết hôn"
                          : "Không xác định"
                      }`}
                      title2={`Chức vụ: ${getLabelByValue(
                        userInfo.info_dep_com?.user.inForPerson.employee
                          .position_id
                      )}`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Số điện thoại: ${userInfo.info_dep_com?.user.phone}`}
                      title2={`Email: ${userInfo.info_dep_com?.user.email}`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Ngân hàng nhận lương: ${
                        userInfo.info_emp_start?.st_bank !== ""
                          ? userInfo.info_emp_start?.st_bank
                          : "Chưa cập nhật"
                      }`}
                      title2={`Số tài khoản ngân hàng: ${
                        userInfo.info_emp_start?.st_stk !== ""
                          ? userInfo.info_emp_start?.st_stk
                          : "Chưa cập nhật"
                      }`}
                    ></Thongtin>
                    <Thongtin
                      title1={`Địa chỉ: ${userInfo.info_dep_com?.user?.address}`}
                      title2={""}
                    ></Thongtin>
                  </div>
                  <div
                    className={styles.pf_fle_three}
                    style={{ display: `${Edit ? "none" : "block"}` }}
                  >
                    <form
                      method="post"
                      id="form_profile_user"
                      noValidate={true}
                    >
                      <FormRow
                        label1="Họ và Tên:  "
                        label2="Giới tính: "
                        children1={
                          <input
                            type="text"
                            className={styles.form_control}
                            placeholder="Nhập họ và tên"
                            defaultValue="Nguyễn Quang Tiến"
                            aria-invalid={false}
                          />
                        }
                        children2={
                          <select
                            className={styles.form_control}
                            defaultValue={1}
                          >
                            <option value="0">Chọn giới tính</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                          </select>
                        }
                      />

                      <FormRow
                        label1="Ngày sinh: "
                        label2="Mã Nhân Viên: "
                        children1={
                          <input
                            type="date"
                            className={styles.form_control}
                            placeholder="Nhập ngày sinh"
                            defaultValue={defaultDate}
                            aria-invalid={false}
                          />
                        }
                        children2={
                          <input
                            className={styles.form_control}
                            type="text"
                            placeholder="Mã nhân viên"
                            value={903839}
                          />
                        }
                      />
                      <FormRow
                        label1="Tình trạng hôn nhân: "
                        label2="Ngày bắt đầu làm: "
                        children1={
                          <select
                            className={styles.form_control}
                            defaultValue={1}
                          >
                            <option value="0">Chọn tình trạng hôn nhân</option>
                            <option value="1">Độc thân</option>
                            <option value="2">Đã kết hôn</option>
                            <option value="3">Khác</option>
                          </select>
                        }
                        children2={
                          <input
                            className={styles.form_control}
                            type="text"
                            placeholder="Chọn ngày bắt đầu làm"
                            value="22/06/2023"
                          />
                        }
                      />
                      <FormRow
                        label1="Số điện thoại: "
                        label2="Email: "
                        children1={
                          <input
                            className={styles.form_control}
                            type="text"
                            placeholder="Điền số điện thoại"
                            defaultValue="0813548567"
                          />
                        }
                        children2={
                          <input
                            className={styles.form_control}
                            type="text"
                            placeholder="Điền email"
                            defaultValue="quangtien05022001@gmail.com"
                          />
                        }
                      />
                      <div className={styles.form_group3}>
                        <label>Địa chỉ:</label>
                        <textarea
                          rows={3}
                          placeholder="Nhập thông tin địa chỉ"
                          aria-invalid={false}
                          defaultValue={"Khâm thiên đống đa Hà Nội"}
                        >
                          {/* Khâm Thiên Đống Đa Hà Nội{" "} */}
                        </textarea>
                      </div>

                      <div>
                        <div
                          className={styles.fg_bt_one}
                          onClick={() => setEdit(!Edit)}
                        >
                          Hủy
                        </div>
                        <button className={styles.fg_bt_tow}>
                          Lưu thông tin
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* Bảng lương cơ bản */}
                <div className={styles.psif_al_one}>
                  <div className={styles.ingredient}>
                    <h3>Lương Cơ Bản</h3>
                  </div>
                  {true ? (
                    <>
                      <div className={styles.psif_bs_tb}>
                        <table className={styles.b_salary}>
                          <thead>
                            <tr>
                              <th>Lương Cơ Bản</th>
                              <th>Lương Đóng Bảo Hiểm</th>
                              <th>Thời Gian Áp Dụng</th>
                              <th>Vị Trí</th>
                              <th className={styles.profile_tda}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {basicSalary.map((item, index) => (
                              <tr className={styles.sl_tr}>
                                <td
                                  className={styles.cl_r}
                                  style={{ color: "#f46a6a" }}
                                >
                                  {item?.sb_salary_basic}
                                </td>
                                <td
                                  className={styles.cl_r}
                                  style={{ color: "#f46a6a" }}
                                >
                                  {item?.sb_salary_bh}
                                </td>
                                <td>
                                  {convertAndFormatTimestamp(
                                    item?.sb_time_created
                                  )}
                                </td>
                                <td>{item?.sb_location}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* Hợp đồng làm việc */}
                <div className={styles.psif_al_one}>
                  <div className={styles.ingredient}>
                    <h3>Hợp đồng làm việc</h3>
                  </div>
                  {true ? (
                    <>
                      <div className={styles.psif_bs_tb}>
                        <table className={styles.b_salary}>
                          <thead>
                            <tr>
                              <th>Loại hợp đồng</th>
                              <th>Ngày hiệu lực</th>
                              <th>Ngày hết hạn</th>
                              <th>%lương</th>
                              <th className={styles.profile_tda}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {infoContract.map((item, index) => (
                              <tr className={styles.sl_tr}>
                                <td
                                  className={styles.cl_r}
                                  style={{ color: "#f46a6a" }}
                                >
                                  {item?.con_name}
                                </td>
                                <td className={styles.cl_r} style={{}}>
                                  {convertAndFormatTimestamp(
                                    item?.con_time_created
                                  )}
                                </td>
                                <td>
                                  {convertAndFormatTimestamp(item?.con_time_up)}
                                </td>
                                <td>{item?.con_salary_persent}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* Thuế và Bảo hiểm */}
                <div className={styles.psif_al_one}>
                  <div className={styles.ingredient}>
                    <h3>Thuế & Bảo hiểm</h3>
                  </div>
                  {true ? (
                    <>
                      <div className={styles.psif_bs_tb}>
                        <table className={styles.b_salary}>
                          <thead>
                            <tr>
                              <th>Bảo hiểm áp dụng</th>
                              <th></th>

                              <th className={styles.profile_tda}></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={styles.sl_tr}>
                              <td className={styles.cl_r} style={{}}>
                                {tenThueVaBaoHiem}
                              </td>
                              <td className={styles.cl_r} style={{}}>
                                {convertAndFormatTimestamp(
                                  thueVaBaoHiem[0]?.cls_day
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
