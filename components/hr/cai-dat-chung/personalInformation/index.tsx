/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./PersonalInformation.module.css";
import { format } from "date-fns";
import {
  EmployeeInfo,
  UpdateInfoEmployee,
} from "@/pages/api/api-hr/cai-dat/generalSettings";

export default function PersonalInformation({ }) {
  const [active, setActive] = useState<any>(true);
  const [dataUser, setDataUser] = useState<any>();
  const [content, setContent] = useState<any>();
  const [birthday, setBirthday] = useState<any>();
  const [formattedDate, setFormattedDate] = useState<any>(null);
  const [formattedDateEdit, setFormattedDateEdit] = useState<any>(null);
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await EmployeeInfo();
        setDataUser(response?.data?.data);
      } catch (error) { }
    };
    fetchDataUser();
  }, []);

  useEffect(() => {
    if (dataUser?.birthday) {
      const date = new Date(dataUser.birthday * 1000);
      const formatted = format(date, "yyyy-MM-dd");
      Number(setBirthday(formatted));
    }
  }, [dataUser?.birthday]);

  useEffect(() => {
    if (dataUser?.start_working_time) {
      const date = new Date(dataUser.start_working_time * 1000);
      const formatted = format(date, "dd-MM-yyyy");
      setFormattedDate(formatted);
    }
  }, [dataUser?.start_working_time]);

  useEffect(() => {
    if (dataUser?.start_working_time) {
      const date = new Date(dataUser.start_working_time * 1000);
      const formatted = format(date, "yyyy-MM-dd"); // Định dạng ngày tháng đúng
      setFormattedDateEdit(formatted);
    }
  }, [dataUser?.start_working_time]);

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateInfoEmployee(content, birthday);
      if (response?.status === 200) {
        setActive(true);
      }
    } catch (error) { }
  };
  const option = [
    { label: "Mới tốt nghiệp" },
    { label: "Thực tập sinh" },
    { label: "Nhân viên" },
    { label: "Trưởng nhóm" },
    { label: "Phó tổ trưởng" },
    { label: "Tổ trưởng" },
    { label: "Phó trưởng phòng" },
    { label: "Trưởng phòng" },
    { label: "Phó giám đốc" },
    { label: "Giám đốc" },
    { label: "Phó tổng giám đốc" },
    { label: "Tổng giám đốc" },
    { label: "Quản lý cấp trung" },
    { label: "Quản lý cấp cao" },
  ];
  return (
    <>
      <div className={`${styles.tab_content}`}>
        <div className={`${styles.l_content} ${styles.fade} ${styles.in}`}>
          <div className={`${styles.l_flex}`}>
            <div className={`${styles.l_setting_avatar}`}>
              <picture>
                <img
                  className={styles.l_image_avatar}
                  src={dataUser?.avatarUser}
                  alt="User Avatar"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.currentTarget.src = `${'/logo_demo.png'}`
                  }}
                />
              </picture>
            </div>

            <div className={`${styles.col_md_10}`}>
              <div className={`${styles.col_md_6}`}>
                <div className={`${styles.l_setting_name}`}>
                  {dataUser?.userName}
                </div>
                <div className={`${styles.l_nhansu}`}>
                  Bộ phận : {dataUser?.nameDeparment}
                </div>
                <div className={`${styles.l_nhansu}`}>
                  Vị trí: {option[dataUser?.position_id - 1]?.label}
                </div>
                <div className={`${styles.l_nhansu}`}>
                  ID: {dataUser?.idQLC}
                </div>
              </div>

              <div className={`${styles.col_md_4} ${styles.l_custom_btn}`}>
                <button
                  className={`${styles.l_btn_chinhsua1}`}
                  onClick={() => setActive(!active)}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles.l_setting_title}`}>Thông tin cá nhân</div>

          {active === true && (
            <div className={`${styles.l_info}`}>
              <div className={`${styles.l_info_item}`}>
                <div className={`${styles.l_info_item_left}`}>
                  Địa chỉ thường chú:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {dataUser?.address}
                  </span>
                </div>
                <div className={`${styles.l_info_item_right}`}>
                  Giới tính:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {dataUser?.gender === 1
                      ? "Nam"
                      : dataUser?.gender === 2
                        ? "Nữ"
                        : "Khác"}
                  </span>
                </div>
              </div>
              <div className={`${styles.l_info_hr}`}></div>

              <div className={`${styles.l_info_item}`}>
                <div className={`${styles.l_info_item_left}`}>
                  Email:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {dataUser?.email}
                  </span>
                </div>
                <div className={`${styles.l_info_item_right}`}>
                  Số điện thoai:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {dataUser?.phoneTK}
                  </span>
                </div>
              </div>
              <div className={`${styles.l_info_hr}`}></div>

              <div className={`${styles.l_info_item}`}>
                <div className={`${styles.l_info_item_left}`}>
                  Ngày bắt đầu làm việc:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {formattedDate}
                  </span>
                </div>
                <div className={`${styles.l_info_item_right}`}>
                  Tình trạng hôn nhân:
                  <span className={`${styles.l_info_item_left_text}`}>
                    {" "}
                    {dataUser?.married === 1 ? "Đã lập gia đình" : "Độc thân"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {active === false && (
            <>
              <div className={`${styles.l_edit_info}`}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div
                    className={`${styles.l_flex} ${styles.l_edit_info_item}`}
                  >
                    <div className={`${styles.l_edit_info_left}`}>
                      <div>Địa chỉ thường trú: </div>
                      <div>
                        <input
                          defaultValue={dataUser?.address}
                          type="text"
                          spellCheck={false}
                          className={`${styles.l_input_edit}`}
                          name="address"
                          onChange={handleContentChange}
                        />
                      </div>
                    </div>

                    <div className={`${styles.l_edit_info_right}`}>
                      <div>Giới tính: </div>
                      <div>
                        <select
                          defaultValue={
                            dataUser?.gender === 1
                              ? "Nam"
                              : dataUser?.gender === 2
                                ? "Nữ"
                                : "Khác"
                          }
                          className={`${styles.l_input_edit}`}
                          style={{ width: "100%" }}
                          name="gender"
                          onChange={handleContentChange}
                        >
                          <option value="1">Nam</option>
                          <option value="2">Nữ</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.l_flex} ${styles.l_edit_info_item} ${styles.l_edit_margin}`}
                  >
                    <div className={`${styles.l_edit_info_left}`}>
                      <div>Email: </div>
                      <div>
                        <input
                          readOnly
                          type="text"
                          spellCheck={false}
                          className={`${styles.l_input_edit}`}
                        />
                      </div>
                    </div>

                    <div className={`${styles.l_edit_info_right}`}>
                      <div>Số điện thoại: </div>
                      <div>
                        <input
                          defaultValue={dataUser?.phoneTK}
                          type="text"
                          spellCheck={false}
                          className={`${styles.l_input_edit}`}
                          style={{ width: "90%" }}
                          name="phoneTK"
                          onChange={handleContentChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.l_flex} ${styles.l_edit_info_item} ${styles.l_edit_margin}`}
                  >
                    <div className={`${styles.l_edit_info_left}`}>
                      <div>Tình trạng hôn nhân: </div>
                      <div>
                        <select
                          className={`${styles.l_input_edit}`}
                          name="married"
                          onChange={handleContentChange}
                        >
                          <option value="1">Đã kết hôn</option>
                          <option value="2">Chưa kết hôn</option>
                        </select>
                      </div>
                    </div>

                    <div className={`${styles.l_edit_info_right}`}>
                      <div>Ngày bắt đầu làm việc: </div>
                      <div>
                        <input
                          defaultValue={formattedDateEdit}
                          type="date"
                          spellCheck={false}
                          className={`${styles.l_input_edit}`}
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.l_btn_info}`}>
                    <div>
                      <button
                        className={`${styles.l_quaylai}`}
                        onClick={() => setActive(true)}
                      >
                        Quay lại
                      </button>
                      <button className={`${styles.l_luu}`} type="submit">
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
