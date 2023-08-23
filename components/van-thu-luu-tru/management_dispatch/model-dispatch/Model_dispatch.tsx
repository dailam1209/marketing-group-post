import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./Model_dispatch.module.css";
import { Input_ckeditor } from "@/components/van-thu-luu-tru/components/Input/Input_text/Input_text";
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
const Modal: React.FC<ModalProps> = ({
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
  const options_type_vbden: Option[] = [
    { value: 1, label: "Văn bản khẩn cấp" },
    { value: 2, label: "Văn bản bảo mật" },
  ];

  interface FormValues {
    name_vbden: string;
    type_vbden: any[];
    so_vbden: string;
    type_gui_vbden: string;
    noi_gui_vbden: string;
    noi_gui_vbden1: string;
    user_gui_vbden: string;
    user_gui_vbden1: string;
    date_nhan: string;
    use_nhan_vbden: string;
    use_luu_vbden: string;
    book_vb: string;
    trich_yeu_vbden: string;
    ghi_chu_vbden: string;
    file: File | null;
  }

  const initialValues: FormValues = {
    name_vbden: "",
    type_vbden: [],
    so_vbden: "",
    type_gui_vbden: "1",
    noi_gui_vbden: "",
    noi_gui_vbden1: "",
    user_gui_vbden: "",
    user_gui_vbden1: "",
    date_nhan: "",
    use_nhan_vbden: "",
    use_luu_vbden: "",
    book_vb: "",
    trich_yeu_vbden: "",
    ghi_chu_vbden: "",
    file: null,
  };
  // Xử lý validate
  const validationSchema = Yup.object().shape({
    name_vbden: Yup.string().required("Name is required"),
    type_vbden: Yup.array().min(1, "Select at least one type"),
    so_vbden: Yup.string().required("Number is required"),
    type_gui_vbden: Yup.string().required("Type is required"),
    noi_gui_vbden: Yup.string().required("Sending location is required"),
    noi_gui_vbden1: Yup.string().required("Sending location is required"),
    user_gui_vbden: Yup.string().required("Sending user is required"),
    user_gui_vbden1: Yup.string().required("Sending user is required"),
    date_nhan: Yup.date().required("Receiving date is required").nullable(),
    use_nhan_vbden: Yup.string().required("Receiving user is required"),
    use_luu_vbden: Yup.string().required("Saving user is required"),
    book_vb: Yup.string().required("Book is required"),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Xử lý truyền data lên
  const formik = useFormik({
    initialValues,
    // validationSchema,
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
          formdata.append("name_vbden", values.name_vbden);
          formdata.append("type_vbden[]", values.type_vbden.join(","));
          formdata.append("so_vbden", values.so_vbden);
          formdata.append("type_gui_vbden", values.type_gui_vbden);
          formdata.append("text_gui_vbden", "hoi non");
          formdata.append("date_nhan", values.date_nhan);
          // Cần optional
          if (values.type_gui_vbden == "2") {
            formdata.append("user_gui_vbden", values.user_gui_vbden1);
            formdata.append("noi_gui_vbden", "122");
          } else if (values.type_gui_vbden == "1") {
            formdata.append("user_gui_vbden", values.user_gui_vbden);
            formdata.append("noi_gui_vbden", values.noi_gui_vbden);
          }
          formdata.append("text_user_gui_vbden", "cai gi ma ga");
          formdata.append("use_nhan_vbden", values.use_nhan_vbden);
          formdata.append("use_luu_vbden", values.use_luu_vbden);
          formdata.append("book_vb", values.book_vb);
          formdata.append("trich_yeu_vbden", values.trich_yeu_vbden);
          formdata.append("ghi_chu_vbden", values.ghi_chu_vbden);
          if (values.file) {
            formdata.append("file", values.file);
          }
          try {
            const apiURL = `${baseURL}api/vanthu/listVanBan/createIncomingText`;
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
    const currentValues = formik.values.type_vbden;
    const isChecked = currentValues.includes(value);
    let updatedValues: any[];
    if (isChecked) {
      updatedValues = currentValues.filter((val) => val !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    formik.setFieldValue("type_vbden", updatedValues);
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
    formik.setFieldValue("trich_yeu_vbden", e.value);
  };
  const handeCKEChange = (e: any) => {
    formik.setFieldValue("ghi_chu_vbden", e.value);
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
                    name="name_vbden"
                    placeholder={"Nhập tên văn bản"}
                    value={formik.values.name_vbden}
                    onChange={formik.handleChange}
                  />
                  {errors.name_vbden && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {errors.name_vbden}
                    </div>
                  )}
                </div>
                {/*  Chọn kiểu văn bản */}
                <div className={styles.checkbox_type}>
                  {options_type_vbden.map((option) => (
                    <label key={option.value} className={styles.label_type}>
                      <input
                        className={styles.checkout_input}
                        type="checkbox"
                        name="type_vbden"
                        value={option.value}
                        checked={formik.values.type_vbden.includes(
                          option.value
                        )}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                  <br />
                  {errors.type_vbden && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {errors.type_vbden}
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
                    name="so_vbden"
                    placeholder={"Nhập số văn bản"}
                    value={formik.values.so_vbden}
                    onChange={formik.handleChange}
                  />
                </div>
                {errors.so_vbden && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.so_vbden}
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
                {/* Chọn nơi gửi nhận */}
                <>
                  <div className={styles.div_input_radio}>
                    <p className={styles.where_send}>Nơi gửi:</p>
                    <div className={styles.box_radio}>
                      <label className={styles.radio}>
                        <input
                          type="radio"
                          name="type_gui_vbden"
                          value="1"
                          checked={formik.values.type_gui_vbden === "1"}
                          onChange={formik.handleChange}
                        />{" "}
                        Nội bộ
                      </label>
                      <label className={styles.radio}>
                        <input
                          type="radio"
                          name="type_gui_vbden"
                          value="2"
                          checked={formik.values.type_gui_vbden === "2"}
                          onChange={formik.handleChange}
                        />{" "}
                        Lưu hành bên ngoài
                      </label>
                    </div>
                  </div>
                  {formik.values.type_gui_vbden === "1" && (
                    <>
                      <div
                        className={styles.form_group}
                        style={{ marginTop: "10px" }}
                      >
                        <Select
                          placeholder="Chọn nơi gửi"
                          name="noi_gui_vbden"
                          options={ds_dep_options}
                          value={ds_dep_options?.find(
                            (option: any) =>
                              option.value === formik.values.noi_gui_vbden
                          )}
                          onChange={(option) =>
                            formik.setFieldValue("noi_gui_vbden", option?.value)
                          }
                        />
                      </div>
                      {errors.noi_gui_vbden && (
                        <div style={{ color: "red", fontSize: "14px" }}>
                          {errors.noi_gui_vbden}
                        </div>
                      )}
                      <div
                        className={styles.form_group}
                        style={{ marginTop: "10px" }}
                      >
                        <label className={styles.label_name}>
                          Người gửi:
                          <span style={{ color: "red" }}> *</span>
                        </label>
                        <Select
                          placeholder="Chọn người gửi"
                          name="user_gui_vbden"
                          options={ds_empla_options}
                          value={ds_empla_options?.find(
                            (option: any) =>
                              option.value === formik.values.user_gui_vbden
                          )}
                          // fake tạm thời đang sai thêm văn bản đi
                          onChange={(option) =>
                            formik.setFieldValue(
                              "user_gui_vbden",
                              option?.value ? option?.value : "12312"
                            )
                          }
                        />
                      </div>
                      {errors.user_gui_vbden && (
                        <div style={{ color: "red", fontSize: "14px" }}>
                          {errors.user_gui_vbden}
                        </div>
                      )}
                    </>
                  )}
                  {formik.values.type_gui_vbden === "2" && (
                    <>
                      <div className={styles.form_group}>
                        <input
                          type="text"
                          className={styles.input_form}
                          name="noi_gui_vbden1"
                          placeholder={"Nhập nơi gửi"}
                          value={formik.values.noi_gui_vbden1}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {errors.noi_gui_vbden1 && (
                        <div style={{ color: "red", fontSize: "14px" }}>
                          {errors.noi_gui_vbden1}
                        </div>
                      )}
                      <div className={styles.form_group}>
                        <label className={styles.label_name}>
                          Người gửi
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={styles.input_form}
                          name="user_gui_vbden1"
                          placeholder={"Nhập người gửi"}
                          value={formik.values.user_gui_vbden1}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {errors.user_gui_vbden && (
                        <div style={{ color: "red", fontSize: "14px" }}>
                          {errors.user_gui_vbden}
                        </div>
                      )}
                    </>
                  )}
                </>
                {/* Ngày nhận*/}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Ngày nhận
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className={styles.input_form}
                    placeholder={"Chọn người lưu trữ"}
                    name="date_nhan"
                    value={formik.values.date_nhan}
                    onChange={formik.handleChange}
                  />
                </div>
                {errors.date_nhan && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.date_nhan}
                  </div>
                )}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Nơi nhận
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn nơi nhận"
                    name="use_nhan_vbden"
                    options={ds_dep_options}
                    value={ds_dep_options?.find(
                      (option: any) =>
                        option.value === formik.values.use_nhan_vbden
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("use_nhan_vbden", option?.value)
                    }
                  />
                </div>
                {errors.use_nhan_vbden && (
                  <div style={{ color: "red" }}>{errors.use_nhan_vbden}</div>
                )}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Người lưu trữ
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <Select
                    placeholder="Chọn người lưu trữ"
                    name="use_luu_vbden"
                    options={ds_empla_options}
                    value={ds_empla_options?.find(
                      (option: any) =>
                        option.value === formik.values.use_luu_vbden
                    )}
                    onChange={(option) =>
                      formik.setFieldValue("use_luu_vbden", option?.value)
                    }
                  />
                </div>
                {errors.use_luu_vbden && (
                  <div style={{ color: "red" }}>{errors.use_luu_vbden}</div>
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
                    input_name="trich_yeu"
                  />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Ghi chú {"  "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input_ckeditor
                    handleChange={handeCKEChange}
                    input_name="ghi_chu"
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

export default Modal;
