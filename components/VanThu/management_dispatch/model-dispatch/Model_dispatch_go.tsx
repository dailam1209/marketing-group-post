import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./Model_dispatch.module.css";
import { Input_ckeditor } from "@/components/VanThu/components/Input/Input_text/Input_text";
import { useFormik } from "formik";
import Select from "react-select";
import { getCookie } from "cookies-next";
import {
  fetchDataSoVB,
  fetch_list_department,
  fetch_list_employee,
} from "@/utils/ShareApi";
import { FaFileUpload } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { AiOutlineArrowDown } from "react-icons/ai";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;

type ModalProps = {
  isOpen?: boolean;
  item?: any;
  title?: string;
  feature?: string;
  onClose: () => void;
  href: string;
};
const Modal_dis_go: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  item,
  feature,
  href,
}) => {
  const router = useRouter();
  interface Option {
    value: any;
    label: string;
  }
  const options_type_loai_vb: Option[] = [
    { value: 1, label: "Văn bản khẩn cấp" },
    { value: 2, label: "Văn bản bảo mật" },
  ];
  const options_noinhan: Option[] = [
    { value: 1, label: "Nội bộ" },
    { value: 2, label: "lưu hành bên ngoài" },
  ];

  interface FormValues {
    name_vbdi: string;
    type_loai_vb: any[];
    so_vbdi: string;
    dvst_vbdi: string;
    nst_vbdi: string;
    date_guidi: string;
    use_luu_vbdi: string;
    use_ky_vbdi: string;
    nhanvb_dep: any[];
    nhan_noibo_vb_di: string;
    nhan_ngoai_dep_vbdi: string;
    nhanvb_use: any[];
    nhan_use_vbdi: string;
    nhan_ngoai_user_vbdi: string;
    book_vb: string;
    trich_yeu_vbdi: string;
    ghi_chu_vbdi: string;
    file: File | null;
  }

  const initialValues: FormValues = {
    name_vbdi: "",
    type_loai_vb: [],
    so_vbdi: "",
    dvst_vbdi: "",
    nst_vbdi: "",
    date_guidi: "",
    use_luu_vbdi: "",
    use_ky_vbdi: "",
    nhanvb_dep: [1],
    nhan_noibo_vb_di: "",
    nhan_ngoai_dep_vbdi: "",
    nhanvb_use: [1],
    nhan_use_vbdi: "",
    nhan_ngoai_user_vbdi: "",
    book_vb: "",
    trich_yeu_vbdi: "",
    ghi_chu_vbdi: "",
    file: null,
  };

  // Xử lý validate
  const validationSchema = Yup.object().shape({
    name_vbdi: Yup.string().required("Name is required"),
    type_loai_vb: Yup.array().min(1, "Select at least one type"),
    so_vbdi: Yup.string().required("Number is required"),
    dvst_vbdi: Yup.string().required("DVST is required"),
    nst_vbdi: Yup.string().required("NST is required"),
    date_guidi: Yup.date().required("Date is required"),
    use_luu_vbdi: Yup.string().required("Use Luu VB is required"),
    use_ky_vbdi: Yup.string().required("Use Ky VB is required"),
    nhanvb_dep: Yup.array().min(1, "Select at least one department"),
    nhan_noibo_vb_di: Yup.string().required("Nhan Noi Bo VB is required"),
    // nhan_ngoai_dep_vbdi: Yup.string().required("Nhan Ngoai Dep VB is required"),
    nhanvb_use: Yup.array().min(1, "Select at least one user"),
    // nhan_use_vbdi: Yup.string().required("Nhan Use VB is required"),
    nhan_ngoai_user_vbdi: Yup.string().required(
      "Nhan Ngoai User VB is required"
    ),
    book_vb: Yup.string().required("Book VB is required"),
    trich_yeu_vbdi: Yup.string().required("Trich Yeu VB is required"),
    ghi_chu_vbdi: Yup.string(),
    file: Yup.mixed().required("File is required"),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Xử lý truyền data lên
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        setErrors({});
        validationSchema
          .validate(values, { abortEarly: false })
          .catch((error) => {
            const newErrors: { [key: string]: string } = {};
            error.inner.forEach((err: any) => {
              newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
          });
        if (Object.keys(errors).length === 0) {
          const formdata = new FormData();
          formdata.append("name_vbdi", values.name_vbdi);
          values.type_loai_vb.forEach((type) => {
            formdata.append("type_loai_vb[]", type);
          });
          formdata.append("so_vbdi", values.so_vbdi);
          formdata.append("dvst_vbdi", values.dvst_vbdi);
          formdata.append("nst_vbdi", values.nst_vbdi);
          formdata.append("date_guidi", values.date_guidi);
          formdata.append("use_luu_vbdi", values.use_luu_vbdi);
          formdata.append("use_ky_vbdi", values.use_ky_vbdi);
          formdata.append("nhan_noibo_vb_di", values.nhan_noibo_vb_di);
          formdata.append("nhan_use_vbdi", values.nhan_use_vbdi);
          values.nhanvb_dep.forEach((dep) => {
            formdata.append("nhanvb_dep[]", dep);
            if (dep == 2 && values.nhan_ngoai_dep_vbdi) {
              formdata.append(
                "nhan_ngoai_dep_vbdi",
                values.nhan_ngoai_dep_vbdi
              );
            }
          });
          values.nhanvb_use.forEach((user) => {
            formdata.append("nhanvb_use[]", user);
            if (user == 2 && values.nhan_ngoai_user_vbdi) {
              formdata.append(
                "nhan_ngoai_user_vbdi",
                values.nhan_ngoai_user_vbdi
              );
            }
          });
          formdata.append("book_vb", values.book_vb);
          formdata.append("trich_yeu_vbdi", values.trich_yeu_vbdi);
          formdata.append("ghi_chu_vbdi", values.ghi_chu_vbdi);
          if (values.file) {
            formdata.append("file", values.file);
          }
          try {
            const apiURL = `${baseURL}/api/vanthu/listVanBan/createSendText`;
            const response = await axios.post(apiURL, formdata, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            });
            if (response) {
              alert("Dữ liệu đã được thêm mới thành công!");
              resetForm();
              onClose();
            }
            if (href) {
              router.push(href);
            }
          } catch (error) {
            alert("vui lòng kiểm tra các trường dữ liệu!");
            console.error("Có lỗi xảy ra khi thêm mới dữ liệu.", error);
          }
        }
      } catch (error) {
        alert("Có lỗi xảy ra khi thực hiện submit:");
      }
    },
  });
  const [dataSovb, setdataSovb] = useState<any>(null);

  // Xử lý box
  const handleCheckboxChange = (value: any) => {
    const currentValues = formik.values.type_loai_vb;
    const isChecked = currentValues.includes(value);
    let updatedValues: any[];
    if (isChecked) {
      updatedValues = currentValues.filter((val) => val !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    formik.setFieldValue("type_loai_vb", updatedValues);
  };
  // Lấy ra sổ văn bản
  useEffect(() => {
    const fetchGetData = async () => {
      if (token) {
        try {
          const response = await fetchDataSoVB();
          setdataSovb(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);
  const so_vb_options = dataSovb?.message?.listSoVanBan?.map((opt: any) => {
    return { value: opt._id, label: opt?.name_book };
  });
  // Xử lý ds phòng ban
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_department();
      setDepartment(response?.data?.data);
    };
    fetchGetData();
  }, []);

  const ds_dep_options = department?.map((opt: any) => {
    return { value: opt.dep_id, label: opt?.dep_name };
  });

  // Lấy danh sách nhân viên
  const [employee, setemployee] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_employee();
      setemployee(response?.data?.data);
    };
    fetchGetData();
  }, []);
  const ds_empla_options = employee?.map((opt: any) => {
    return { value: opt?._id, label: opt?.userName };
  });
  // Xử lý nơi nhận
  const handleChangeNoiNhan = (value: any) => {
    const currentValues = formik.values.nhanvb_dep;
    const isChecked = currentValues.includes(value);
    let updatedValues: any[];
    if (isChecked) {
      updatedValues = currentValues.filter((val) => val !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    formik.setFieldValue("nhanvb_dep", updatedValues);
  };

  // Xử lý người chuyển đến
  const handleChangeNguoiChuyen = (value: any) => {
    const currentValues = formik.values.nhanvb_use;
    const isChecked = currentValues.includes(value);
    let updatedValues: any[];
    if (isChecked) {
      updatedValues = currentValues.filter((val) => val !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    formik.setFieldValue("nhanvb_use", updatedValues);
  };
  // Xử lý file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formik.setFieldValue("file", event.currentTarget.files[0]);
    }
  };

  const handleDownload = () => {
    if (formik.values.file) {
      const downloadUrl = URL.createObjectURL(formik.values.file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = formik.values.file.name;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }
  };
  // Trích yêu
  const handeCKETrichYeu = (e: any) => {
    formik.setFieldValue("trich_yeu_vbdi", e.value);
  };
  const handeCKEChange = (e: any) => {
    formik.setFieldValue("ghi_chu_vbdi", e.value);
  };
  // Đã lấy hết dữ liệu form
  if (!isOpen) return null;
  return (
    <div className={styles.modal_popup}>
      <div className={styles.container_modal}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <h4 className={styles.title_modal}>{title}</h4>
            <Image
              src={"/icon/dau_x.png"}
              width={17}
              height={17}
              alt=""
              className={styles.close_detl}
              onClick={onClose}
            />
          </div>
          <div className={styles.modal_body}>
            <form onSubmit={formik.handleSubmit}>
              {/* Tên văn bản */}
              <div className={styles.form_body}>
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Tên văn bản
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input_form}
                    name="name_vbdi"
                    placeholder={"Nhập tên văn bản"}
                    value={formik.values.name_vbdi}
                    onChange={formik.handleChange}
                  />
                  {errors.name_vbdi && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {errors.name_vbdi}
                    </div>
                  )}
                </div>
                {/*  Chọn kiểu văn bản */}
                <div className={styles.checkbox_type}>
                  {options_type_loai_vb.map((option) => (
                    <label key={option.value} className={styles.label_type}>
                      <input
                        className={styles.checkout_input}
                        type="checkbox"
                        name="type_loai_vb"
                        value={option.value}
                        checked={formik.values.type_loai_vb.includes(
                          option.value
                        )}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                  <br />
                  {errors.type_loai_vb && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {errors.type_loai_vb}
                    </div>
                  )}
                </div>
                {/*  Số văn bản */}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Số văn bản
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input_form}
                    name="so_vbdi"
                    placeholder={"Nhập số văn bản"}
                    value={formik.values.so_vbdi}
                    onChange={formik.handleChange}
                  />
                </div>
                {errors.so_vbdi && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.so_vbdi}
                  </div>
                )}
                {/* Chọn sổ văn bản */}
                <div
                  className={styles.form_group}
                  style={{ marginTop: "10px" }}
                >
                  <label className={styles.label_name}>
                    Sổ văn bản
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn sổ văn bạn"
                    name="book_vb"
                    options={so_vb_options}
                    value={so_vb_options?.find(
                      (option: any) => option.value === formik.values.book_vb
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("book_vb", option?.value)
                    }
                  />
                </div>
                {errors.book_vb && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.book_vb}
                  </div>
                )}
                {/* Chọn đơn vị soạn thảo */}
                <div
                  className={styles.form_group}
                  style={{ marginTop: "10px" }}
                >
                  <label className={styles.label_name}>
                    Đơn vị soạn thảo
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn đơn vị soạn thảo"
                    name="dvst_vbdi"
                    options={ds_dep_options}
                    value={ds_dep_options?.find(
                      (option: any) => option.value === formik.values.dvst_vbdi
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("dvst_vbdi", option?.value)
                    }
                  />
                </div>
                {errors.dvst_vbdi && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.dvst_vbdi}
                  </div>
                )}
                {/* Chọn người soạn thảo */}
                <div
                  className={styles.form_group}
                  style={{ marginTop: "10px" }}
                >
                  <label className={styles.label_name}>
                    Người soạn thảo
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn người soạn thảo"
                    name="nst_vbdi"
                    options={ds_empla_options}
                    value={ds_empla_options?.find(
                      (option: any) => option.value === formik.values.nst_vbdi
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("nst_vbdi", option?.value)
                    }
                  />
                </div>
                {errors.nst_vbdi && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.nst_vbdi}
                  </div>
                )}

                {/* Ngày gửi đi*/}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Ngày nhận
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className={styles.input_form}
                    name="date_guidi"
                    value={formik.values.date_guidi}
                    onChange={formik.handleChange}
                  />
                </div>
                {errors.date_guidi && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.date_guidi}
                  </div>
                )}
                {/* Chọn người lưu trữ */}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Người lưu trữ
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn người lưu trữ"
                    name="use_luu_vbdi"
                    options={ds_empla_options}
                    value={ds_empla_options?.find(
                      (option: any) =>
                        option.value === formik.values.use_luu_vbdi
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("use_luu_vbdi", option?.value)
                    }
                  />
                </div>
                {errors.use_luu_vbdi && (
                  <div style={{ color: "red" }}>{errors.use_luu_vbdi}</div>
                )}
                {/* Chọn người ký */}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Người ký
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn tên người ký"
                    name="use_ky_vbdi"
                    options={ds_empla_options}
                    value={ds_empla_options?.find(
                      (option: any) =>
                        option.value === formik.values.use_ky_vbdi
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("use_ky_vbdi", option?.value)
                    }
                  />
                </div>
                {errors.use_ky_vbdi && (
                  <div style={{ color: "red" }}>{errors.use_ky_vbdi}</div>
                )}
                {/* Nơi nhận */}
                <div className={styles.noinhan}>
                  <div style={{ width: "35%" }}>Nơi nhận văn bản gốc:</div>
                  <div
                    className={styles.div_input}
                    style={{
                      width: "65%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={formik.values.nhanvb_dep.includes(1)}
                        onChange={() => handleChangeNoiNhan(1)}
                        className={styles.checkout_input}
                      />
                      <span className={styles.checkboxCustom}> Nội bộ</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={formik.values.nhanvb_dep.includes(2)}
                        onChange={() => handleChangeNoiNhan(2)}
                        className={styles.checkout_input}
                      />
                      <span className={styles.checkboxCustom}>
                        {" "}
                        Lưu hành bên ngoài
                      </span>
                    </div>
                  </div>
                </div>
                {formik.values.nhanvb_dep.includes(1) && (
                  <>
                    <br />
                    <Select
                      placeholder="Chọn nơi nhận văn bản gốc"
                      name="nhan_noibo_vb_di"
                      options={ds_dep_options}
                      value={ds_dep_options?.find(
                        (option) =>
                          option.value === formik.values.nhan_noibo_vb_di
                      )}
                      onChange={(option) =>
                        formik.setFieldValue("nhan_noibo_vb_di", option?.value)
                      }
                    />
                  </>
                )}
                {formik.values.nhanvb_dep.includes(2) && (
                  <>
                    <br />
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        className={styles.input_form}
                        name="nhan_ngoai_dep_vbdi"
                        placeholder="Nhập nơi nhận văn bản gốc"
                        value={formik.values.nhan_ngoai_dep_vbdi}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </>
                )}
                {/*Chuyển đến */}
                <div className={styles.noinhan}>
                  <div style={{ width: "35%" }}>Chuyển đến:</div>
                  <div
                    className={styles.div_input}
                    style={{
                      width: "65%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={formik.values.nhanvb_use.includes(1)}
                        onChange={() => handleChangeNguoiChuyen(1)}
                        className={styles.checkout_input}
                      />
                      <span className={styles.checkboxCustom}> Nội bộ</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={formik.values.nhanvb_use.includes(2)}
                        onChange={() => handleChangeNguoiChuyen(2)}
                        className={styles.checkout_input}
                      />
                      <span className={styles.checkboxCustom}>
                        {" "}
                        Lưu hành bên ngoài
                      </span>
                    </div>
                  </div>
                </div>
                {formik.values.nhanvb_use.includes(1) && (
                  <>
                    <br />
                    <Select
                      placeholder="Chọn người nhận văn bản gốc"
                      name="nhan_use_vbdi"
                      options={ds_empla_options}
                      value={ds_empla_options?.find(
                        (option) => option.value === formik.values.nhan_use_vbdi
                      )}
                      onChange={(option) =>
                        formik.setFieldValue("nhan_use_vbdi", option?.value)
                      }
                    />
                  </>
                )}
                {formik.values.nhanvb_use.includes(2) && (
                  <>
                    <br />
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        className={styles.input_form}
                        name="nhan_ngoai_user_vbdi"
                        placeholder="Nhập  người nhận văn bản gốc"
                        value={formik.values.nhan_ngoai_user_vbdi}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </>
                )}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>Tệp đính kèm</label>
                  <p className={styles.label_p}>
                    <label htmlFor="file" className={styles.span_img}>
                      <FaFileUpload className={styles.upload_icon} /> Chọn tệp
                      đính kèm
                    </label>
                    <input
                      hidden
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                    />
                  </p>
                  {formik.values.file && (
                    <div className={styles.file_info}>
                      {formik.values.file.type.startsWith("image/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={URL.createObjectURL(formik.values.file)}
                          alt="Uploaded"
                          style={{ maxWidth: "200px" }}
                        />
                      ) : (
                        <div className={styles.content}>
                          <div
                            className={styles.info_user}
                            style={{
                              justifyContent: "space-between",
                              border: "1px solid #ccc",
                              padding: "10px",
                            }}
                          >
                            <div className={styles.info_user}>
                              <FcDocument size={"36px"} />
                              <div style={{ marginLeft: "12px" }}>
                                <p>{formik.values.file.name}</p>
                                <span>
                                  {(formik.values.file.size / 1024).toFixed(2)}{" "}
                                  KB
                                </span>
                                <span>7:31 pm - 2023-03-28</span>
                              </div>
                            </div>

                            <button
                              style={{ margin: "auto 0", fontSize: "16px" }}
                              onClick={handleDownload}
                            >
                              <AiOutlineArrowDown />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Trích yếu {"  "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input_ckeditor
                    handleChange={handeCKETrichYeu}
                    input_name="trich_yeu_vbdi"
                  />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Ghi chú {"  "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input_ckeditor
                    handleChange={handeCKEChange}
                    input_name="ghi_chu_vbdi"
                  />
                </div>
                <div className={styles.form_buttom}>
                  <button className={styles.btn_cancel} onClick={onClose}>
                    Hủy
                  </button>
                  <button className={styles.btn_save} type="submit">
                    {feature}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_dis_go;
