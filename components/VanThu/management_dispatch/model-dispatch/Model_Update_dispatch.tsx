import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./Model_dispatch.module.css";
import { Input_ckeditor } from "@/components/VanThu/components/Input/Input_text/Input_text";
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
import axios from "axios";
import { useRouter } from "next/router";
const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;

type ModalProps = {
  isOpen?: boolean;
  item?: any;
  title?: string;
  feature?: string;
  href?: string;
  onClose: () => void;
};

const Modal_Update_dispatch: React.FC<ModalProps> = ({
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

  const [nameVbden, setNameVbden] = useState<string>("");
  const [typeVbden, setTypeVbden] = useState<string[]>([]);
  const [soVbden, setSoVbden] = useState<string>("");
  const [typeGuiVbden, setTypeGuiVbden] = useState<string>("");
  const [noiGuiVbden, setNoiGuiVbden] = useState<string>("");
  const [userGuiVbden, setUserGuiVbden] = useState<string>("");
  const [dateNhan, setDateNhan] = useState<string>("");
  const [useNhanVbden, setUseNhanVbden] = useState<string>("");
  const [useLuuVbden, setUseLuuVbden] = useState<string>("");
  const [bookVb, setBookVb] = useState<string>("");
  const [trichYeuVbden, setTrichYeuVbden] = useState<string>("");
  const [ghiChuVbden, setGhiChuVbden] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [dataSovb, setDataSovb] = useState<any>(null);
  const [department, setDepartment] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any[]>([]);
  const [checkdate, setCheckDate] = useState(false);
  const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    setNameVbden(item?.cv_name);
    let typevbDen = item?.cv_kieu.split(",").map(Number);
    setTypeVbden(typevbDen);
    setSoVbden(item?.cv_so);
    setTypeGuiVbden(item?.cv_type_soan);
    setNoiGuiVbden(item?.cv_phong_soan);
    setUserGuiVbden(item?.cv_user_soan);
    setDateNhan(formatDate(item?.cv_date));
    setUseNhanVbden(item?.cv_nhan_noibo);
    setUseLuuVbden(item?.cv_user_save);
    setBookVb(item?.cv_id_book);
    setTrichYeuVbden(item?.cv_trich_yeu);
    setGhiChuVbden(item?.cv_ghi_chu);
    setFile(item?.cv_file);
  }, [item]);

  useEffect(() => {
    const fetchGetData = async () => {
      if (token) {
        try {
          const response = await fetchDataSoVB();
          setDataSovb(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, [token]);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch_list_department();
      setDepartment(response?.data?.data);
    };
    fetchDepartment();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch_list_employee();
      setEmployee(response?.data?.data);
    };
    fetchEmployee();
  }, []);

  const so_vb_options = dataSovb?.message?.listSoVanBan?.map((opt: any) => {
    return { value: opt._id, label: opt?.name_book };
  });

  const ds_dep_options = department?.map((opt: any) => {
    return { value: opt.dep_id, label: opt?.dep_name };
  });

  const ds_empla_options = employee?.map((opt: any) => {
    return { value: opt?._id, label: opt?.userName };
  });

  const handleCheckboxChange = (value: any) => {
    if (typeVbden?.includes(value)) {
      setTypeVbden((prev) => prev.filter((val) => val !== value));
    } else {
      setTypeVbden((prev) => [...prev, value]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFile(event.currentTarget.files[0]);
    }
  };

  const handleDownload = () => {
    if (file) {
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }
  };
  // Trích yêu
  const handeCKETrichYeu = (e: any) => {
    setTrichYeuVbden(e.value);
  };
  const handeCKEChange = (e: any) => {
    setGhiChuVbden(e.value);
  };
  let newErrors: { [key: string]: string } = {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(newErrors).length === 0) {
      const formdata = new FormData();
      formdata.append("name_vbden", nameVbden);
      formdata.append("type_vbden[]", typeVbden.join(","));
      formdata.append("so_vbden", soVbden);
      formdata.append("type_gui_vbden", typeGuiVbden);
      formdata.append("text_gui_vbden", "hoi non");
      formdata.append("user_gui_vbden", userGuiVbden);
      formdata.append("date_nhan", dateNhan);
      formdata.append("noi_gui_vbden", noiGuiVbden); // Cần optional
      formdata.append("text_user_gui_vbden", "cai gi ma ga");
      formdata.append("use_nhan_vbden", useNhanVbden);
      formdata.append("use_luu_vbden", useLuuVbden);
      formdata.append("book_vb", bookVb);
      formdata.append("trich_yeu_vbden", trichYeuVbden);
      formdata.append("ghi_chu_vbden", ghiChuVbden);
      formdata.append("id", item?._id);
      if (file) {
        formdata.append("file[]", file);
      }
      try {
        const apiURL = `${baseURL}/api/vanthu/listVanBan/updateIncomingText`;
        const response = await axios.put(apiURL, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Dữ liệu đã được cập nhật thành công!");
        onClose();
        if (href) {
          router.push(href);
        }
      } catch (error) {
        alert("Vui lòng kiểm tra lại các trường!");
      }
    }
  };

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
            <form onSubmit={handleSubmit}>
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
                    value={nameVbden}
                    onChange={(e) => setNameVbden(e.target.value)}
                  />
                </div>
                {nameVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
                )}
                {/*  Chọn kiểu văn bản */}
                <div className={styles.checkbox_type}>
                  {options_type_vbden.map((option) => (
                    <label key={option.value} className={styles.label_type}>
                      <input
                        className={styles.checkout_input}
                        type="checkbox"
                        name="type_vbden"
                        value={option.value}
                        checked={typeVbden?.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                  <br />
                </div>
                {!typeVbden && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
                )}
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
                    value={soVbden}
                    onChange={(e) => setSoVbden(e.target.value)}
                  />
                </div>
                {soVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
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
                      (option: any) => option.value === bookVb
                    )}
                    onChange={(option) => setBookVb(option?.value)}
                  />
                </div>
                {bookVb === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
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
                          value={typeGuiVbden}
                          checked={typeGuiVbden == "1"}
                          onChange={(e) => {
                            setTypeGuiVbden(e.target.value);
                          }}
                        />{" "}
                        Nội bộ
                      </label>
                      <label className={styles.radio}>
                        <input
                          type="radio"
                          name="type_gui_vbden"
                          value={typeGuiVbden}
                          checked={typeGuiVbden == "2"}
                          onChange={(e) => setTypeGuiVbden(e.target.value)}
                        />{" "}
                        Lưu hành bên ngoài
                      </label>
                    </div>
                  </div>
                  {typeGuiVbden == "1" && (
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
                            (option: any) => option.value === noiGuiVbden
                          )}
                          onChange={(option) => setNoiGuiVbden(option?.value)}
                        />
                      </div>
                      {noiGuiVbden === "" && (
                        <div style={{ fontSize: "14px", color: "red" }}>
                          Vui lòng nhập dữ liệu
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
                            (option: any) => option.value === userGuiVbden
                          )}
                          onChange={(option) => setUserGuiVbden(option?.value)}
                        />
                      </div>
                      {userGuiVbden === "" && (
                        <div style={{ fontSize: "14px", color: "red" }}>
                          Vui lòng nhập dữ liệu
                        </div>
                      )}
                    </>
                  )}
                  {typeGuiVbden == "2" && (
                    <>
                      <div className={styles.form_group}>
                        <input
                          type="text"
                          className={styles.input_form}
                          name="noi_gui_vbden"
                          placeholder={"Nhập nơi gửi"}
                          value={noiGuiVbden}
                          onChange={(e) => setNoiGuiVbden(e.target.value)}
                        />
                      </div>
                      {noiGuiVbden === "" && (
                        <div style={{ fontSize: "14px", color: "red" }}>
                          Vui lòng nhập dữ liệu
                        </div>
                      )}
                      <div className={styles.form_group}>
                        <label className={styles.label_name}>
                          Người gửi
                          <span style={{ color: "red" }}> *</span>
                        </label>
                        <input
                          type="text"
                          className={styles.input_form}
                          name="user_gui_vbden"
                          placeholder={"Nhập người gửi"}
                          value={userGuiVbden}
                          onChange={(e) => setUserGuiVbden(e.target.value)}
                        />
                      </div>
                      {userGuiVbden === "" && (
                        <div style={{ fontSize: "14px", color: "red" }}>
                          Vui lòng nhập dữ liệu
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
                    value={dateNhan}
                    onChange={(e) => {
                      setCheckDate(true);
                      setDateNhan(e.target.value);
                    }}
                  />
                </div>
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
                      (option: any) => option.value === useNhanVbden
                    )}
                    onChange={(option) => setUseNhanVbden(option?.value)}
                  />
                </div>
                {useNhanVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
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
                      (option: any) => option.value === useLuuVbden
                    )}
                    onChange={(option) => setUseLuuVbden(option?.value)}
                  />
                </div>
                {useLuuVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
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
                  {file && (
                    <div className={styles.file_info}>
                      {file.type.startsWith("image/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={URL.createObjectURL(file)}
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
                                <p>{file.name}</p>
                                <span>{(file.size / 1024).toFixed(2)} KB</span>
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
                    value={trichYeuVbden}
                  />
                </div>
                {trichYeuVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
                )}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Ghi chú {"  "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input_ckeditor
                    handleChange={handeCKEChange}
                    input_name="ghi_chu"
                    value={ghiChuVbden}
                  />
                </div>
                {ghiChuVbden === "" && (
                  <div style={{ fontSize: "14px", color: "red" }}>
                    Vui lòng nhập dữ liệu
                  </div>
                )}
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

export default Modal_Update_dispatch;
