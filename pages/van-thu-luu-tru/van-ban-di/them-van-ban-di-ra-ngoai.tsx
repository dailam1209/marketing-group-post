import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import Head from "next/head";
import styles from "./vanbandi.module.css";
import Link from "next/link";
import {
  fetch_department,
  fetch_employee,
  fetch_position,
} from "@/utils/api/dexuat/api_fetch";
import * as Yup from "yup";
import {
  post_findUserByEmail,
  post_vanbandi_out,
} from "@/utils/api/dexuat/api_post";
import Image from "next/image";
import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import { Input_file_2 } from "@/components/van-thu-luu-tru/components/Input/Input_file/Input_file";
import Input_select, { Old_input_select } from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import SwitchInput from "@/components/van-thu-luu-tru/components/Input/Input_switch/Input_switch";
import Input_text, { Input_ckeditor, Custom_input_textarea } from "@/components/van-thu-luu-tru/components/Input/Input_text/Input_text";
import Label, { Required_label, Required_sign } from "@/components/van-thu-luu-tru/components/Input/Label/Label";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";

function Destination({ des }: { des: string }) {
  return (
    <Link
      href="/van-thu-luu-tru/van-ban-di/them-van-ban-di-noi-bo"
      className={`${styles.destination_target_2}`}
    >
      {des}
    </Link>
  );
}
function Destination2({ des }: { des: string }) {
  return (
    <Link
      href="/van-thu-luu-tru/van-ban-di/them-van-ban-di-ra-ngoai"
      className={`${styles.destination_target}`}
    >
      {des}
    </Link>
  );
}
const Index = () => {
  const validationSchema = Yup.object().shape({
    ten_vanban: Yup.string().required("Vui lòng nhập tên văn bản"),
    trich_yeu: Yup.string().required(
      "Vui lòng nhập trích yếu nội dung văn bản"
    ),
    so_vanban: Yup.string().required("Vui lòng nhập số văn bản"),
    nam_vb: Yup.string().required("Vui lòng chọn năm"),
    thoi_gian_ban_hanh: Yup.string().required(
      "Vui lòng nhập thời gian ban hành"
    ),
    nhom_van_ban: Yup.string().required("Vui lòng chọn nhóm văn bản"),
    type_vb: Yup.string().required("Vui lòng chọn loại văn bản"),
    nguoi_theo_doi: Yup.string().required("Vui lòng chọn người theo dõi"),
    xet_duyet_van_ban: Yup.string().required("Vui lòng chọn kiểu xét duyệt"),
    ten_so_vanban: Yup.string().required("Vui lòng chọn loại sổ văn bản"),
    noidung_vanban: Yup.string().required("Vui lòng nhập nội dung văn bản"),
  });
  const optionalSchema = Yup.object().shape({
    so_vb_tt: Yup.string().required("Vui lòng nhập số văn bản thay thế"),
    ten_vb_tt: Yup.string().required("Vui lòng nhập tên văn bản thay thế"),
    trich_yeu_tt: Yup.string().required(
      "Vui lòng nhập trích yếu văn bản thay thế"
    ),
  });
  const optionalSchema2 = Yup.object().shape({
    loai_xet_duyet: Yup.string().required("Vui lòng loại xét duyệt"),
    thoi_gian_duyet: Yup.string().required("Vui lòng nhập thời gian xét duyệt"),
    data_nguoi_duyet: Yup.mixed().required("Vui lòng chọn người duyệt"),
  })
  const [employee, setEmployee] = useState<any>();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchdata = async () => {
      const res_employee = await fetch_employee(token);
      setEmployee(res_employee?.data.items);
    };
    fetchdata();
  }, []);
  const emp_duyet_options = employee?.map((opts: any) => {
    return {
      value: opts.ep_id,
      label: opts.ep_name,
      name: "data_nguoi_duyet",
      role: opts.position_id,
    };
  });
  const emp_theodoi_options = employee?.map((opts: any) => {
    return {
      value: opts.ep_id,
      label: opts.ep_name,
      name: "nguoi_theo_doi",
      role: opts.position_id,
    };
  });
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    nam_vb: "2023",
    xet_duyet_van_ban: "2",
    loai_xet_duyet: "1",
    nhom_van_ban: "3",
    id_cong_ty: "12345",
  });
  const [userByEmail, setUserByEmail] = useState<any>();
  const [userByEmailList, setUserByEmailList] = useState<any>([]);
  const handeInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "thoi_gian_ban_hanh") {
      const date = new Date(value);
      const numberDate = date.getTime();
      setFormData((prev: any) => ({
        ...prev,
        [name]: numberDate,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handeCKEChange = (e: any) => {
    const { name, value } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: any) => {
    const { name, value } = e;
    if (name) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        data_nguoi_duyet: [...e.map((rec: any) => rec.value)],
      }));
    }
  };
  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: files,
    }));
  };
  const handleFileChange2 = useCallback((e: any) => {
    const { name, files } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: files,
    }));
  }, []);
  const handleSwitchChange = (e: any) => {
    const { name, value } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (formData.type_thay_the === "1") {
        await optionalSchema.validate(formData, { abortEarly: false });
      }
      if(duyet_type === "1") {
        await optionalSchema2.validate(formData, { abortEarly: false });
      }
      var form_data = new FormData();
      for (var key in formData) {
        if (
          key !== "data_nguoi_duyet" &&
          key !== "id_user_nhan" &&
          key !== "file_vb"
        ) {
          form_data.append(key, formData[key]);
        }
      }
      if (formData.file_vb) {
        if (formData.file_vb.length > 0) {
          for (var i = 0; i < formData.file_vb.length; i++) {
            form_data.append(`file_vb[${i}]`, formData.file_vb[i]);
          }
        }
      }
      if (formData.data_nguoi_duyet) {
        for (var i = 0; i < formData.data_nguoi_duyet.length; i++) {
          form_data.append(
            `data_nguoi_duyet[${i}]`,
            formData.data_nguoi_duyet[i].toString()
          );
        }
      }
      if (formData.id_user_nhan) {
        for (var i = 0; i < formData.id_user_nhan.length; i++) {
          form_data.append(
            `id_user_nhan[${i}]`,
            formData.id_user_nhan[i].toString()
          );
        }
      }
      const res = await post_vanbandi_out(form_data);
      console.log(res);
      alert("Tạo văn bản đi thành công");
    } catch (error: any) {
      const newErrors: any = {};
      if (error?.inner) {
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      console.log(error);
    }
  };
  const options_xetduyet = [
    { name: "loai_xet_duyet", value: "1", label: "Duyệt lần lượt" },
    { name: "loai_xet_duyet", value: "2", label: "Duyệt đồng thời" },
  ];
  const [showAddEmail, setShowAddEmail] = useState(false);
  const handleShowAddEmail = () => {
    setShowAddEmail(!showAddEmail);
  };
  const [isShow, setShow] = React.useState(false);
  const options_date = [
    { name: "nam_vb", value: "2018", label: "2018" },
    { name: "nam_vb", value: "2019", label: "2019" },
    { name: "nam_vb", value: "2020", label: "2020" },
    { name: "nam_vb", value: "2021", label: "2021" },
    { name: "nam_vb", value: "2022", label: "2022" },
    { name: "nam_vb", value: "2023", label: "2023" },
    { name: "nam_vb", value: "2024", label: "2024" },
    { name: "nam_vb", value: "2025", label: "2025" },
    { name: "nam_vb", value: "2026", label: "2026" },
  ];
  const checkHandle = () => {
    setShow(!isShow);
    if (!isShow) {
      handleSwitchChange({ name: "type_thay_the", value: "1" });
    } else {
      handleSwitchChange({ name: "type_thay_the", value: "" });
    }
  };
  const options_so_vanban = [
    { name: "ten_so_vanban", value: "0", label: "Văn bản đi" },
    { name: "ten_so_vanban", value: "285", label: "Lưu trữ" },
    { name: "ten_so_vanban", value: "284", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "283", label: "Ytetre" },
    { name: "ten_so_vanban", value: "225", label: "Ytetre" },
    { name: "ten_so_vanban", value: "216", label: "Văn bản đi" },
    { name: "ten_so_vanban", value: "215", label: "Lưu trữ" },
    { name: "ten_so_vanban", value: "214", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "31", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "30", label: "Lưu trữ" },
  ];
  const options_loai_van_ban = [
    { name: "type_vb", value: "1", label: "Nghị quyết" },
    { name: "type_vb", value: "2", label: "Quyết định" },
    { name: "type_vb", value: "3", label: "Chỉ thị" },
    { name: "type_vb", value: "4", label: "Quy chế" },
    { name: "type_vb", value: "5", label: "Quy định" },
    { name: "type_vb", value: "6", label: "Thông cáo" },
    { name: "type_vb", value: "7", label: "Thông báo" },
    { name: "type_vb", value: "8", label: "Hướng dẫn" },
    { name: "type_vb", value: "9", label: "Chương trình" },
    { name: "type_vb", value: "10", label: "Kế hoạch" },
    { name: "type_vb", value: "11", label: "Phương án" },
    { name: "type_vb", value: "12", label: "Đề án" },
    { name: "type_vb", value: "13", label: "Dự án" },
    { name: "type_vb", value: "14", label: "Báo cáo" },
    { name: "type_vb", value: "15", label: "Biên bản" },
    { name: "type_vb", value: "16", label: "Tờ trình" },
    { name: "type_vb", value: "17", label: "Hợp đồng" },
    { name: "type_vb", value: "18", label: "Công văn" },
    { name: "type_vb", value: "19", label: "Công điện" },
    { name: "type_vb", value: "20", label: "Bản ghi nhớ" },
    { name: "type_vb", value: "21", label: "Bản thỏa thuận" },
    { name: "type_vb", value: "22", label: "Giấy ủy quyền" },
    { name: "type_vb", value: "23", label: "Giấy mời" },
    { name: "type_vb", value: "24", label: "Giấy giới thiệu" },
    { name: "type_vb", value: "25", label: "Giấy nghỉ phép" },
    { name: "type_vb", value: "26", label: "Phiếu gửi" },
    { name: "type_vb", value: "27", label: "Phiếu chuyển" },
    { name: "type_vb", value: "28", label: "Phiếu báo" },
    { name: "type_vb", value: "29", label: "Thư công" },
  ];
  const handle_com_email_input = async (e: any) => {
    try {
      const { value } = e.target;
      if (e.target.value) {
        const res = await post_findUserByEmail(1, value);
        setUserByEmail(res?.data.user);
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const handle_user_email_input = async (e: any) => {
    try {
      const { value } = e.target;
      if (e.target.value) {
        const res = await post_findUserByEmail(0, value);
        setUserByEmail(res?.data.user);
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (
      userByEmail &&
      !userByEmailList.map((user: any) => user._id).includes(userByEmail._id)
    ) {
      setUserByEmailList((prev: any) => [...prev, userByEmail]);
      setUserByEmail(null);
    }
  }, [userByEmail, userByEmailList]);
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      id_user_nhan: [...userByEmailList.map((user: any) => user.idQLC)],
      name_cty_nhan: userByEmailList
        .map((user: any) => user.userName)
        .join(", "),
      mail_congty: userByEmailList.map((user: any) => user.email).join(", "),
    }));
  }, [userByEmailList]);
  const handleDeleteUserList = (id: any) => {
    setUserByEmailList((prev: any) =>
      prev?.filter((user: any) => user._id !== id)
    );
  };
  const [duyet_type,setDuyet_type] = useState('0')
  const handleXetDuyetTypeChange = (e: any)=>{
    const { name, value } = e.target;
    setDuyet_type(value);
  }
  return (
    <div>
      <Head>
        <title> Thêm văn bản đi </title>
        <meta name="keywords" content="Home" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={styles.body}>
        <div className={styles.destination}>
          <Destination des="Gửi trong công ty"></Destination>
          <Destination2 des="Gửi ngoài công ty"></Destination2>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div className={styles.form_container}>
            <div className={`${styles.form_left}`}>
              <h3 className={`${styles.header}`}>Tạo mới văn bản</h3>
              <Section
                style="section"
                label={<Required_label title="Tên văn bản" />}
                input={
                  <Input_text
                    placeholder="Nhập tên văn bản"
                    handleChange={handeInputChange}
                    input_name="ten_vanban"
                  />
                }
                validation={
                  errors.ten_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.ten_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Required_label title="Số văn bản" />}
                input={
                  <Input_text
                    placeholder="Số /...................-..................."
                    handleChange={handeInputChange}
                    input_name="so_vanban"
                  />
                }
                validation={
                  errors.so_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.so_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Required_label title="Trích yếu nội dung văn bản" />}
                input={
                  <Input_ckeditor
                    handleChange={handeCKEChange}
                    input_name="trich_yeu"
                  />
                }
                validation={
                  errors.trich_yeu && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.trich_yeu}
                    </p>
                  )
                }
              />
              <p className={styles.receiver_label}>
                Nguời nhận
                <Required_sign />
              </p>
              <div className={styles.receiver_container}>
                <Section
                  style="receiver_section"
                  label={<Label title="Công ty" />}
                  input={
                    <Input_text
                      placeholder="Gmail"
                      input_name="tai_khoan_nhan_cty"
                      handleBlur={handle_com_email_input}
                    />
                  }
                />
                <div className={styles.p_hoac}>
                  <p className={styles.p_p_hoac}>Hoặc</p>
                </div>
                <Section
                  style="receiver_section"
                  label={<Label title="Cá nhân" />}
                  input={
                    <Input_text
                      placeholder="Gmail"
                      input_name="tai_khoan_nhan"
                      handleBlur={handle_user_email_input}
                    />
                  }
                />
              </div>
              {userByEmailList.length > 0 && (
                <div className={styles.box_user_nhan}>
                  <div className={styles.header_box_user}>
                    <p className={styles.box_p_box_p1}>Stt</p>
                    <p className={styles.box_p_box_p2}>Tên</p>
                    <p className={styles.box_p_box_p3}>Email</p>
                    <p className={styles.box_p_box_p6}></p>
                  </div>
                  {userByEmailList.map((user: any, index: any) => {
                    return (
                      <div className={styles.main_box_user} key={index}>
                        <p className={styles.box_p_box_p1}>{index + 1}</p>
                        <p className={styles.box_p_box_p3}>{user.userName}</p>
                        <p className={styles.box_p_box_p3}>{user.email}</p>
                        <p className={styles.box_p_box_p6}>
                          <div
                            onClick={() => handleDeleteUserList(user._id)}
                            className={styles.func}
                          >
                            <Image
                              alt=""
                              src="/icon/icon_loai_bo.png"
                              width={20}
                              height={20}
                            />
                          </div>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              <Section
                style="custom_section"
                label={<Label title="Bút phê lãnh đạo" />}
                input={
                  <Input_ckeditor
                    input_name="noidung_vanban"
                    handleChange={handeCKEChange}
                  />
                }
                validation={
                  errors.noidung_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.noidung_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Label title="Người theo dõi" />}
                input={
                  <Input_select
                    options={emp_theodoi_options}
                    placeholder="Chọn người theo dõi"
                    onChange={handleSelectChange}
                  />
                }
                validation={
                  errors.nguoi_theo_doi && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.nguoi_theo_doi}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Required_label title="Tệp đính kèm" />}
                input={
                  <Input_file_2
                    input_name="file_vb"
                    handleInputChange={handleFileChange2}
                  />
                }
              />
              <Section
                style="section"
                label={<Label title="Ghi chú" />}
                input={
                  <Input_ckeditor
                    input_name="ghi_chu"
                    handleChange={handeCKEChange}
                  />
                }
              />
              <div className={styles.checkbox_3}>
                <p className={styles.checkbox_3_text}>
                  <input
                    onChange={handleShowAddEmail}
                    className={styles.check_add_email}
                    type="checkbox"
                    id="check_add_email"
                  />
                  <label
                    htmlFor="check_add_email"
                    className={styles.p_check_add_email}
                  >
                    Đ/c có muốn gửi thêm đến email
                  </label>
                </p>
              </div>
              {showAddEmail && (
                <Section
                  style="inline_section"
                  input={
                    <Input_text
                      placeholder="Nhập email"
                      input_name="email_add_them"
                      handleChange={handeInputChange}
                    />
                  }
                />
              )}
              <div className={styles.khoixetduyet}>
                <div className={styles.khoixetduyet_2}>
                  <Required_label title="Xét duyệt văn bản"/>
                  <select name='xet_duyet_van_ban' onChange={handleXetDuyetTypeChange} className={styles.xetduyet_select}>
                      <option value='0' className={styles.xetduyet_option}>Ban hành</option>
                      <option value='1' className={styles.xetduyet_option}>Xét duyệt</option>
                  </select>
                  <Image src={"/icon/arr_down_select.png"} alt="arrow" width={13} height={15} className={styles.xetduyet_arrow_icon} />
                  </div>
              </div>
              {duyet_type === '1' && (
                <div>
                  <div className={styles.confirm_area_top}>
                    <Section
                      style="medium_section"
                      label={<Required_label title="Kiểu xét duyệt văn bản" />}
                      input={
                        <Input_select
                          options={options_xetduyet}
                          placeholder=""
                          defautlValue={options_xetduyet[0]}
                          onChange={handleSelectChange}
                        />
                      }
                      validation={
                        errors.loai_xet_duyet && (
                          <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                            {errors.loai_xet_duyet}
                          </p>
                        )
                      }
                    />
                    <Section
                      style="medium_section"
                      label={<Required_label title="Thời gian phê duyệt" />}
                      input={
                        <Input_calender
                          datetype="datetime-local"
                          placeholder="Nhập thời gain / Giờ"
                          input_name="thoi_gian_duyet"
                          handle_input={handeInputChange}
                        />
                      }
                      validation={
                        errors.thoi_gian_duyet && (
                          <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                            {errors.thoi_gian_duyet}
                          </p>
                        )
                      }
                    />
                  </div>
                  <div className={styles.confirm_area_bot}>
                    <Section
                      style="section"
                      label={<Required_label title="Người xét duyệt" />}
                      input={
                        <Input_select
                          options={emp_duyet_options}
                          placeholder=""
                          onChange={handleSelectChange}
                          isMulti
                        />
                      }
                      validation={
                        errors.data_nguoi_duyet && (
                          <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                            {errors.data_nguoi_duyet}
                          </p>
                        )
                      }
                    />
                  </div>
                </div>
              )}
              <div className={styles.submit_section_1}>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={styles.submit_button}
                >
                  Hoàn thành
                </button>
                <button className={styles.sign_approval_button}>
                  Ký duyệt
                </button>
              </div>
            </div>
            <div className={`${styles.form_right}`}>
              <div className={styles.form_right_top}>
                <Section
                  style="section"
                  label={<Required_label title="Năm" />}
                  input={
                    <Input_select
                      options={options_date}
                      defautlValue={options_date[5]}
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.nam_vb && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.nam_vb}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Required_label title="Sổ văn bản" />}
                  input={
                    <Input_select
                      options={options_so_vanban}
                      placeholder="Chọn sổ văn bản"
                      defautlValue={undefined}
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.ten_so_vanban && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.ten_so_vanban}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Required_label title="Loại văn bản" />}
                  input={
                    <Input_select
                      options={options_loai_van_ban}
                      placeholder="Chọn loại văn bản"
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.type_vb && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.type_vb}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Label title="Ngày ban hành" />}
                  input={
                    <Input_calender
                      datetype="date"
                      placeholder="Chọn thời gian có hiệu lực"
                      input_name="thoi_gian_ban_hanh"
                      handle_input={handeInputChange}
                    />
                  }
                  validation={
                    errors.thoi_gian_ban_hanh && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.thoi_gian_ban_hanh}
                      </p>
                    )
                  }
                />
              </div>
              <div className={styles.form_right_top2}>
                <p className={styles.right_checkbox_section}>
                  <input
                    onChange={checkHandle}
                    type="checkbox"
                    className={styles.check_add_mail}
                  ></input>
                  <label className={styles.checkbox_label_2}>
                    Là văn bản thay thế
                  </label>
                </p>
                {isShow && (
                  <>
                    <Section
                      style="section"
                      label={<Required_label title="Số văn bản" />}
                      input={
                        <Input_text
                          placeholder="Số /...................-..................."
                          input_name="so_vb_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.so_vb_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.so_vb_tt}
                          </p>
                        )
                      }
                    />
                    <Section
                      style="section"
                      label={<Required_label title="Tên văn bản" />}
                      input={
                        <Input_text
                          placeholder="Nhập tên văn bản"
                          input_name="ten_vb_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.ten_vb_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.ten_vb_tt}
                          </p>
                        )
                      }
                    />
                    <Section
                      style="section"
                      label={
                        <Required_label title="Trích yếu văn bản bị thay thế" />
                      }
                      input={
                        <Custom_input_textarea
                          inputclass="custom_input_textarea"
                          placeholder="Nhập trích yếu nội dung văn bản"
                          input_name="trich_yeu_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.trich_yeu_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.trich_yeu_tt}
                          </p>
                        )
                      }
                    />
                  </>
                )}
              </div>
              <div className={styles.form_right_bot}>
                <SwitchInput
                  label="Văn bản khẩn cấp"
                  id="switch1"
                  input_name="type_khan_cap"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Văn bản bảo mật"
                  id="switch2"
                  input_name="type_bao_mat"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép tải xuống"
                  id="switch3"
                  input_name="type_tai"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép người duyệt chuyển tiếp"
                  id="switch4"
                  input_name="type_duyet_chuyen_tiep"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép người nhận chuyển tiếp"
                  id="switch5"
                  input_name="type_nhan_chuyen_tiep"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <div className={styles.submit_section_2}>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className={styles.submit_button}
                  >
                    Hoàn thành
                  </button>
                  <button className={styles.sign_approval_button}>
                    Ký duyệt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
