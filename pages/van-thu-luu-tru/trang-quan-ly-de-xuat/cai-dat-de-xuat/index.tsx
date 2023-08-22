import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import SwitchInput from "@/components/van-thu-luu-tru/components/Input/Input_switch/Input_switch";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import { fetch_setting } from "@/utils/api/dexuat/api_fecth_cty";
import {
  fetch_department,
  fetch_employee,
  fetch_shift,
  fetch_position,
} from "@/utils/api/dexuat/api_fetch";
import { edit_setting } from "@/utils/api/dexuat/api_post_cty";
import Image from "next/image";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import styles from "./setting.module.css";

const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "36px",
    borderRadius: "10px",
    minHeight: "36px",
  }),
};
const Switch = ({ label, toggleShow, check, id }: any) => {
  //if you want to change the default show of element, change both isChecked value at component initialize and the element show value
  const [isChecked, setIsChecked] = useState(check);
  useEffect(() => {
    const savedState = localStorage.getItem(`isChecked_${id}`);
    if (savedState !== null) {
      setIsChecked(savedState === "true");
    } else {
      setIsChecked(check);
    }
  }, [check, id]);
  useEffect(() => {
    localStorage.setItem(`isChecked_${id}`, isChecked.toString());
  }, [id, isChecked]);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
    if (toggleShow) {
      if (!isChecked) {
        toggleShow(true);
      } else {
        toggleShow(false);
      }
    }
  };
  return (
    <div className={styles.switchContainer}>
      <div className={styles.switchWrapper}>
        <label className={styles.switch}>
          <input
            className={styles.switch_input}
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={handleInputChange}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <label className={styles.switchLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
const Member_table_records = ({
  stt,
  id,
  employee,
  position,
  handleCheck,
  handleDelete,
}: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheck(e);
  };
  const emp = employee?.find((emp: any) => emp.idQLC.toString() === id);
  const posData = position?.find(
    (position: any) => position.value === emp?.position_id.toString()
  )?.label;
  return (
    <tr className={styles.tr}>
      <td>
        <input
          value={id}
          type="checkbox"
          onChange={handleChange}
          className={styles.checkall}
        />
      </td>
      <td className={styles.stt_nv}>{stt}</td>
      <td className={styles.id_user}>{id}</td>
      <td className={styles.user_name}>{emp?.userName}</td>
      <td className={styles.departure}>{emp?.nameDeparment}</td>
      <td className={styles.pos}>{posData}</td>
      <td onClick={() => handleDelete(id)} className={styles.func}>
        <Image alt="" src="/icon/icon_loai_bo.png" width={20} height={20} />
      </td>
    </tr>
  );
};
const Popup_table = ({
  positions,
  handleCheck,
  popup_table_records,
  handleCheckAll,
}: any) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      handleCheckAll(
        popup_table_records?.map((rec: any) => rec.idQLC.toString())
      );
    } else {
      handleCheckAll([]);
    }
  };
  return (
    <div className={styles.popup_table}>
      <div className={styles.popup_main_table}>
        <div className={styles.popup_box_main_table}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tb_th_blue}>
                <th>ID</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>
                  <input
                    type="checkbox"
                    className={styles.checkall}
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {popup_table_records?.map((rec: any, index: any) => {
                const posData = positions?.find(
                  (position: any) =>
                    position.value === rec.position_id.toString()
                )?.label;
                return (
                  <tr key={index} className={styles.popup_table_row}>
                    <td className={styles.id_user}>{rec.idQLC}</td>
                    <td className={styles.user_name}>{rec.userName}</td>
                    <td className={styles.departure}>{rec.nameDeparment}</td>
                    <td className={styles.pos}>{posData}</td>
                    <th>
                      <input
                        value={rec.idQLC}
                        type="checkbox"
                        disabled={selectAll}
                        onChange={handleCheck}
                        className={styles.checkall}
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const Index = () => {
  const [popup_table_records, setPopup_table_records] = useState<any>([]);
  const [idDuyet, setIdDuyet] = useState<any>();
  const add_memeber_to_popup_table = (e: any) => {
    const member_to_add = employee?.find((emp: any) => emp.idQLC === e.value);
    const isMemberExist = popup_table_records?.some(
      (record: any) => record.idQLC === e.value
    );
    if (!isMemberExist) {
      setPopup_table_records((prev: any) => {
        if (prev) {
          return [...prev, member_to_add];
        } else {
          return [member_to_add];
        }
      });
    }
  };
  const [department, setDepartment] = useState<any>();
  const [employee, setEmployee] = useState<any>();
  const [position, setPosition] = useState<any>();
  const [shift, setShift] = useState<any>();
  const [filter_data, setFilter_data] = useState<any>({});
  const [setting, setSetting] = useState<any>();
  const [dotxuatData, setDotxuatData] = useState<any>();

  useEffect(() => {
    const fetchdata = async () => {
      const token = sessionStorage.getItem("token");
      const res_department = await fetch_department(token);
      const res_employee = await fetch_employee(token);
      const res_shift = await fetch_shift(token);
      const res_position = await fetch_position("chucvu_dx_bn");
      const res_setting = await fetch_setting();
      setDepartment(res_department?.data.items);
      setEmployee(res_employee?.data.items);
      setPosition(res_position);
      setShift(res_shift?.data.list);
      setSetting(res_setting?.data.settingDx);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    setIdDuyet(setting?.list_user.split(","));
    setSettingData({
      time_limit: setting?.time_limit,
      time_tp: setting?.time_tp,
      time_hh: setting?.time_hh,
    });
    setDotxuatData(setting ? JSON.parse(setting?.time_limit_l) : []);
  }, [setting]);
  const departmnet_options = department?.map((opts: any) => {
    return { value: opts.dep_id, label: opts.dep_name, name: "id_phong_ban" };
  });
  departmnet_options?.unshift({
    value: "",
    label: "Phòng ban (Tất cả)",
    name: "id_phong_ban",
  });
  const employee_options = employee
    ?.filter((emp: any) =>
      filter_data.id_phong_ban
        ? emp.dep_id === filter_data.id_phong_ban
        : emp
    )
    .map((opts: any) => {
      return {
        value: opts.ep_id,
        label: `(${opts.ep_id}) ${opts.ep_name}`,
        name: "id_user",
      };
    });
  const handleSelectChange = (e: any) => {
    const { type, name, value } = e;
    setFilter_data((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [idList, setIdList] = useState<any>([]);

  const [idList_popup, setIdList_popup] = useState<any>([]);
  const addIdtoAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isChecked = checked;
    const newValue = value;
    setIdList_popup((prev: any) => {
      if (isChecked) {
        return [...prev, newValue];
      } else {
        return prev.filter((p: any) => p !== newValue);
      }
    });
  };
  const addIdToDelete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isChecked = checked;
    const newValue = value;
    setIdDuyet((prev: any) => {
      if (!isChecked) {
        return [...prev, newValue];
      } else {
        return prev.filter((p: any) => p !== newValue);
      }
    });
    setIdList((prev: any) => {
      if (isChecked) {
        return [...prev, newValue];
      } else {
        return prev.filter((p: any) => p !== newValue);
      }
    });
  };
  const handleSubmitPopUp = async () => {
    try {
      if (idList_popup.length > 0) {
        const res = await edit_setting({ list_user: idList_popup.join(",") });
        setIdList_popup([]);
        setSetting(res?.data.chinhsuasetting);
        setShowPopUP(!showPopUP);
        setPopup_table_records(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTableRecord = async (id: string) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa?")) {
        const data = idDuyet?.filter((rec: any) => rec !== id.toString());
        const res = await edit_setting({ list_user: data.join(",") });
        setSetting(res?.data.chinhsuasetting);
        setIdList([]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUserDuyet = async () => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa?")) {
        const res = await edit_setting({ list_user: idDuyet.join(",") });
        setSetting(res?.data.chinhsuasetting);
        setIdList([]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [pro_set, setPro_set] = useState(true);
  const [gen_set, setGen_set] = useState(false);
  const [showPopUP, setShowPopUP] = useState(false);

  const [showATL, setShowATL] = useState(false);
  const [showPPCT, setShowPPCT] = useState(false);
  const [showSPCT, setShowSPCT] = useState(false);
  const [showSPPT, setShowSPPT] = useState(false);
  const [showPPT, setShowPPT] = useState(false);
  useEffect(() => {
    const savedStateATL = localStorage.getItem("showATL");
    const savedStatePPCT = localStorage.getItem("showPPCT");
    const savedStateSPCT = localStorage.getItem("showSPCT");
    const savedStateSPPT = localStorage.getItem("showSPPT");
    const savedStatePPT = localStorage.getItem("showPPT");
    if (savedStateATL !== null) {
      setShowATL(savedStateATL === "true");
      setShowPPCT(savedStatePPCT === "true");
      setShowSPCT(savedStateSPCT === "true");
      setShowSPPT(savedStateSPPT === "true");
      setShowPPT(savedStatePPT === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showATL", showATL.toString());
    localStorage.setItem("showPPCT", showPPCT.toString());
    localStorage.setItem("showSPCT", showSPCT.toString());
    localStorage.setItem("showSPPT", showSPPT.toString());
    localStorage.setItem("showPPT", showPPT.toString());
  }, [showATL, showPPCT, showPPT, showSPCT, showSPPT]);

  const active_general_setting = () => {
    if (gen_set === false) {
      setGen_set(!gen_set);
      setPro_set(!pro_set);
    }
  };
  const active_propose_setting = () => {
    if (pro_set === false) {
      setGen_set(!gen_set);
      setPro_set(!pro_set);
    }
  };

  const toggleShow_absent_through_level = (isshow: boolean) => {
    setShowATL(isshow);
  };
  const toggleShow_plan_propose_confirm_time = (isshow: boolean) => {
    setShowPPCT(isshow);
  };
  const toggleShow_sudden_propose_confirm_time = (isshow: boolean) => {
    setShowSPCT(isshow);
  };
  const toggleShow_bonus_payoff_propose_time = (isshow: boolean) => {
    setShowSPPT(isshow);
  };
  const toggleShow_percentage_propose_time = (isshow: boolean) => {
    setShowPPT(isshow);
  };

  const handleShowPopup = () => {
    setShowPopUP(!showPopUP);
    setPopup_table_records(undefined);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSettingData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [settingData, setSettingData] = useState<any>({});

  const handleEditSetting = async () => {
    try {
      const res = await edit_setting({ ...settingData });
      setSetting(res?.data.chinhsuasetting);
      alert("Cập nhật thành công");
    } catch (err) {
      console.error(err);
    }
  };
  const handleDateChange = async (e: any) => {
    const { name, value } = e.target;
    if (dotxuatData && dotxuatData.length > 0) {
      for (var i = 0; i < dotxuatData.length; i++) {
        if (dotxuatData[i][0] === name) {
          const data = dotxuatData;
          data[i][1] = value;
          setDotxuatData((prev: any) => {
            return data;
          });
          setSettingData((prev: any) => ({
            ...prev,
            time_limit_l: JSON.stringify(data),
          }));
        }
      }
    }
  };
  const defaultValue = (shift: any) => {
    let defaultValue = "Chọn thời gian duyệt";
    if (dotxuatData && dotxuatData.length > 0) {
      for (var i = 0; i < dotxuatData.length; i++) {
        if (dotxuatData[i][0] === shift.shift_id.toString()) {
          defaultValue = dotxuatData[i][1];
          break;
        }
      }
    }
    return defaultValue;
  };
  const handleCheckAll = (e: any) => {
    setIdList_popup(e);
  };
  return (
    <>
      {showPopUP && (
        <div className={styles.popup}>
          <div className={styles.main_popup}>
            <div className={styles.heading_popup}>
              <p className={styles.heading_popup_title}>Danh sách nhân viên</p>
              <div onClick={handleShowPopup} className={styles.close_popup}>
                <Image alt="" src="/icon/X-trang.png" width={17} height={17} />
              </div>
            </div>
            <div className={styles.content_popup}>
              <div className={styles.scroll_popup}>
                <div className={styles.popup_filter}>
                  <div className={styles.popup_filter_departure}>
                    <Input_select
                      style={select_style}
                      options={departmnet_options}
                      placeholder="Chọn phòng ban"
                      className="setting_filter_area"
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div className={styles.popup_filter_member}>
                    <Input_select
                      style={select_style}
                      options={employee_options}
                      className="setting_filter_area"
                      placeholder="Chọn nhân viên"
                      onChange={add_memeber_to_popup_table}
                    />
                  </div>
                </div>
                <Popup_table
                  positions={position}
                  popup_table_records={popup_table_records}
                  handleCheck={addIdtoAdd}
                  handleCheckAll={handleCheckAll}
                />
              </div>
              <div className={styles.table_btn}>
                <button onClick={handleShowPopup} className={styles.cancel_btn}>
                  Hủy
                </button>
                <button
                  onClick={handleSubmitPopUp}
                  className={styles.confirm_btn}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.cai_dat_dx}>
        <div className={styles.container}>
          <div className={styles.tile_cd}>
            <p
              className={
                gen_set ? styles.it_title_cd_active : styles.it_title_cd
              }
              onClick={active_general_setting}
            >
              Cài đặt chung
            </p>
            <p
              className={
                pro_set ? styles.it_title_cd_active : styles.it_title_cd
              }
              onClick={active_propose_setting}
            >
              Cài đặt duyệt đề xuất
            </p>
            <span
              className={styles.th_hd}
              style={gen_set ? { left: "23px" } : { left: "151.5px" }}
            ></span>
          </div>
          <div className={styles.view_hiden_caidat}>
            {gen_set && (
              <div className={styles.wapper_caidatchung}>
                <div className={styles.setting_tb}>
                  <div className={styles.title_cdc_st}>
                    <p>Cài đặt chung</p>
                  </div>
                  <div className={styles.wapper_tb}>
                    <div className={styles.tb_text}>
                      <p>Thông báo: </p>
                    </div>
                    <div className={styles.tb_img}>
                      <Switch
                        check={false}
                        id="notice"
                        label="Nhận thông báo"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.setting_nn}>
                  <div className={styles.nn_text}>
                    <p>Ngôn ngữ: </p>
                  </div>
                  <div className={styles.lang_list}>
                    <div className={styles.item_lang}>
                      <input
                        name="cd_lang"
                        id="cd_vn"
                        type="radio"
                        className={styles.lang_radio}
                      />
                      <label htmlFor="cd_vn" className={styles.lang_label}>
                        <p className={styles.lang_label_text}>Tiếng Việt</p>
                        <Image
                          alt=""
                          src="/icon/setting_lang_vn_icon.png"
                          width={18}
                          height={18}
                        />
                      </label>
                    </div>
                    <div className={styles.item_lang}>
                      <input
                        name="cd_lang"
                        id="cd_en"
                        type="radio"
                        className={styles.lang_radio}
                      />
                      <label htmlFor="cd_en" className={styles.lang_label}>
                        <p className={styles.lang_label_text}>Tiếng Anh</p>
                        <Image
                          alt=""
                          src="/icon/setting_lang_en_icon.png"
                          width={18}
                          height={18}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pro_set && (
              <div className={styles.wapper_chung}>
                <div className={styles.wapper_heading}>
                  <p>Cài đặt duyệt đề xuất</p>
                </div>
                <div className={styles.wapper_content}>
                  <div className={styles.wapper_content_item}>
                    <h3>Duyệt đề xuất nghỉ phép qua nhiều cấp</h3>
                    <p>
                      Là đề xuất nghỉ bắt buộc chọn từ 2 người duyệt trở lên
                    </p>
                    <div className={styles.switch_area}>
                      <Switch
                        id="ATL"
                        check={false}
                        label="Duyệt đề xuất nghỉ qua nhiều cấp"
                        toggleShow={toggleShow_absent_through_level}
                      />
                    </div>
                    {showATL && (
                      <div className={styles.viewOption}>
                        <div className={styles.atl_list_label}>
                          <p className={styles.atl_list_label_text}>
                            Danh sách những nhân sự chỉ duyệt qua 1 cấp (Nếu có)
                          </p>
                          <div
                            onClick={handleShowPopup}
                            className={styles.pick_member}
                          >
                            <Image
                              alt=""
                              src="/icon/setting_check_blue_icon.png"
                              width={16}
                              height={16}
                            />
                            <span className={styles.pick_member_text}>
                              Chọn nhân viên
                            </span>
                          </div>
                          {idList.length > 0 && (
                            <span
                              onClick={deleteUserDuyet}
                              className={styles.del_box}
                            >
                              Xóa
                            </span>
                          )}
                        </div>
                        <div className={styles.member_table}>
                          <div className={styles.box_main_member_table}>
                            <table className={styles.table}>
                              <thead>
                                <tr>
                                  <th>Chọn</th>
                                  <th className={styles.stt}>STT</th>
                                  <th>ID</th>
                                  <th>Họ và tên</th>
                                  <th>Phòng ban</th>
                                  <th>Chức vụ</th>
                                  <th>Chức năng</th>
                                </tr>
                              </thead>
                              <tbody>
                                {setting?.list_user &&
                                  setting?.list_user
                                    .split(",")
                                    .map((rec: any, index: any) => {
                                      return (
                                        <Member_table_records
                                          key={index}
                                          stt={index + 1}
                                          id={rec}
                                          handleCheck={addIdToDelete}
                                          handleDelete={deleteTableRecord}
                                          employee={employee}
                                          position={position}
                                        />
                                      );
                                    })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.wapper_content_item}>
                    <h3>Thời gian duyệt đề xuất có kế hoạch</h3>
                    <p>
                      Là đề xuất nghỉ có kế hoạch chủ động, có đơn gửi lãnh đạo
                      ký duyệt.
                      <br></br>
                      Ví dụ: Nghỉ cưới, nghỉ đi học, nghỉ đi du lịch,...
                    </p>
                    <div className={styles.switch_area}>
                      <Switch
                        id="PPCT"
                        check={false}
                        label="Thời gian duyệt đề xuất có kế hoạch"
                        toggleShow={toggleShow_plan_propose_confirm_time}
                      />
                    </div>
                    {showPPCT && (
                      <div className={styles.viewOption}>
                        <p className={styles.plan_propose_time_label}>
                          Thời gian duyệt đề xuất có kế hoạch
                          <span className={styles.font_w400}>(Giờ)</span>
                        </p>
                        <div className={styles.plan_propose_time_input_area}>
                          <input
                            type="number"
                            placeholder="Nhập số giờ"
                            name="time_limit"
                            defaultValue={setting?.time_limit}
                            className={styles.plan_propose_time_input}
                            onChange={handleInputChange}
                          />
                          <span className={styles.dv_h}>h</span>
                        </div>
                        <button
                          onClick={handleEditSetting}
                          className={styles.update_btn}
                        >
                          Cập nhật
                        </button>
                        <p className={styles.plan_propose_time_description}>
                          Là việc thiết lập thời gian tối đa để lãnh đạo duyệt
                          phép cho nhân viên, nếu quá thời gian đó mà lãnh đạo
                          không duyệt phép thì hệ thống tính lương sẽ xét nhân
                          viên đó vào diện nghỉ không phép.
                        </p>
                        <p className={styles.plan_propose_time_description_2}>
                          <span
                            className={styles.plan_propose_time_description_red}
                          >
                            - Lưu ý:{" "}
                          </span>
                          chỗ này nếu để trống, tức là không cài đặt thời gian
                          thì lãnh đạo có thể duyệt phép bất cứ khi nào.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.wapper_content_item}>
                    <h3>Thời gian duyệt đề xuất đột xuất</h3>
                    <p>
                      Ứng với việc nhân viên nghỉ đột xuất, áp dụng đối với
                      những trường hợp không có dự kiến từ trước mà xảy ra mang
                      tính đột xuất, bất ngờ như: Nghỉ ốm, nghỉ người nhà mất,
                      tai nạn....
                    </p>
                    <div className={styles.switch_area}>
                      <Switch
                        id="SPCT"
                        check={false}
                        label="Thời gian duyệt đề xuất đột xuất"
                        toggleShow={toggleShow_sudden_propose_confirm_time}
                      />
                    </div>
                    {showSPCT && (
                      <div className={styles.viewOption}>
                        <p className={styles.atl_list_label_text}>
                          Danh sách ca làm việc
                        </p>
                        <div className={styles.row}>
                          {dotxuatData &&
                            shift?.map((shift: any, index: any) => {
                              return (
                                <div key={index} className={styles.col_2}>
                                  <span className={styles.input_label_top}>
                                    {shift.shift_name}
                                  </span>
                                  <span className={styles.input_label_bot}>
                                    Thời gian duyệt trước
                                  </span>
                                  <Input_calender
                                    datetype="time"
                                    calender_class="setting_SPCT"
                                    calender_label_class="setting_SPCT_label"
                                    input_name={shift.shift_id}
                                    placeholder={defaultValue(shift)}
                                    handle_input={handleDateChange}
                                  />
                                </div>
                              );
                            })}
                        </div>
                        <button
                          onClick={handleEditSetting}
                          className={styles.update_btn_2}
                        >
                          Cập nhật
                        </button>
                        <p className={styles.sudden_propose_time_description}>
                          Là quy định mốc thời gian lãnh đạo phải duyệt phép cho
                          nhân viên trước khoảng thời gian đó. Nếu lãnh đạo
                          không duyệt thì phần mềm tính lương sẽ tính nhân viên
                          đó nghỉ không phép.
                        </p>
                        <p className={styles.sudden_propose_time_description}>
                          <span className={styles.font_w550}> - Ví dụ: </span>
                          Cài đặt trước 8h sáng đối với ca sáng, thì lãnh đạo
                          phải duyệt phép cho nhân viên trước 8h sáng. Nếu sau
                          8h mới duyệt thì lệnh duyệt không được phần mềm tính
                          lương công nhận.Áp dụng
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.wapper_content_item}>
                    <h3>Thời gian duyệt đề xuất thưởng phạt</h3>
                    <p>
                      Là thời gian (giờ) tối đa cho phép duyệt đề xuất cho ngày
                      thưởng.
                    </p>
                    <div className={styles.switch_area}>
                      <Switch
                        id="SPPT"
                        check={false}
                        label="Thời gian duyệt đề xuất thưởng phạt"
                        toggleShow={toggleShow_bonus_payoff_propose_time}
                      />
                    </div>
                    {showSPPT && (
                      <div className={styles.viewOption}>
                        <p className={styles.plan_propose_time_label}>
                          Thời gian duyệt đề xuất thưởng phạt
                          <span className={styles.font_w400}>(Giờ)</span>
                        </p>
                        <div className={styles.plan_propose_time_input_area}>
                          <input
                            type="number"
                            placeholder="Nhập số giờ"
                            name="time_tp"
                            defaultValue={setting?.time_tp}
                            className={styles.plan_propose_time_input}
                            onChange={handleInputChange}
                          />
                          <span className={styles.dv_h}>h</span>
                        </div>
                        <button
                          onClick={handleEditSetting}
                          className={styles.update_btn}
                        >
                          Cập nhật
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.wapper_content_item}>
                    <h3>Thời gian duyệt đề xuất hoa hồng doanh thu</h3>
                    <p>
                      Là thời gian (giờ) tối đa cho phép duyệt đề xuất cho ngày
                      tính hoa hồng doanh thu đó.
                    </p>
                    <div className={styles.switch_area}>
                      <Switch
                        id="PPT"
                        check={false}
                        label="Thời gian duyệt đề xuất hoa hồng doanh thu"
                        toggleShow={toggleShow_percentage_propose_time}
                      />
                    </div>
                    {showPPT && (
                      <div className={styles.viewOption}>
                        <p className={styles.plan_propose_time_label}>
                          Thời gian duyệt đề xuất hoa hồng doanh thu
                          <span className={styles.font_w400}>(Giờ)</span>
                        </p>
                        <div className={styles.plan_propose_time_input_area}>
                          <input
                            type="number"
                            placeholder="Nhập số giờ"
                            name="time_hh"
                            className={styles.plan_propose_time_input}
                            defaultValue={setting?.time_hh}
                            onChange={handleInputChange}
                          />
                          <span className={styles.dv_h}>h</span>
                        </div>
                        <button
                          onClick={handleEditSetting}
                          className={styles.update_btn}
                        >
                          Cập nhật
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
