import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./Moda_contact.module.css";
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

type ModalProps = {
  isOpen?: boolean;
  item?: any;
  title?: string;
  feature?: string;
  onClose: () => void;
  href: string;
};
const Modal_Update_contract_go: React.FC<ModalProps> = ({
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

  const [nameVbden, setNameVbden] = useState<string>("");
  const [soVbdi, setSoVbdi] = useState<string>("");
  const [dvstVbdi, setDvstVbdi] = useState<string>("");
  const [nstVbdi, setNstVbdi] = useState<string>("");
  const [dateGuidi, setDateGuidi] = useState<string>("");
  const [useLuuVbdi, setUseLuuVbdi] = useState<string>("");
  const [useKyVbdi, setUseKyVbdi] = useState<string>("");
  const [nhanvbDep, setNhanvbDep] = useState<number[]>([]);
  const [nhanNoiboVbDi, setNhanNoiboVbDi] = useState<string>("");
  const [nhanNgoaiDepVbdi, setNhanNgoaiDepVbdi] = useState<string>("");
  const [nhanvbUse, setNhanvbUse] = useState<number[]>([]);
  const [nhanUseVbdi, setNhanUseVbdi] = useState<string>("");
  const [nhanNgoaiUserVbdi, setNhanNgoaiUserVbdi] = useState<string>("");
  const [bookVb, setBookVb] = useState<string>("");
  const [moneyHd, setMoneyHd] = useState<string>("");
  const [trichYeuVbdi, setTrichYeuVbdi] = useState<string>("");
  const [ghiChuVbdi, setGhiChuVbdi] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [dataSovb, setDataSovb] = useState<any>(null);
  const [department, setDepartment] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any[]>([]);
  const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
  const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (item) {
      setNameVbden(item?.cv_name);
      setSoVbdi(item?.cv_so);
      setDvstVbdi(item?.cv_phong_soan);
      setNstVbdi(item?.cv_user_soan);
      setDateGuidi(formatDate(item?.cv_date));
      setUseLuuVbdi(item?.cv_user_save);
      setUseKyVbdi(item?.cv_user_ky);
      let nhanvbDep =
        item?.cv_type_nhan !== null &&
        item?.cv_type_nhan.split(" ").map(Number);
      setNhanvbDep(nhanvbDep);
      setNhanNoiboVbDi(item?.cv_nhan_noibo);
      setNhanNgoaiDepVbdi(item?.cv_nhan_ngoai);
      let nhanvbUser = item?.cv_type_chuyenden.split(" ").map(Number);
      setNhanvbUse(nhanvbUser);
      setNhanUseVbdi(item?.cv_chuyen_noibo);
      setNhanNgoaiUserVbdi(item?.cv_chuyen_ngoai);
      setBookVb(item?.cv_id_book);
      setMoneyHd(item?.cv_money);
      setTrichYeuVbdi(item?.cv_trich_yeu);
      setGhiChuVbdi(item?.cv_ghi_chu);
      setFile(item?.cv_file || null);
    }
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

  const handleCheckboxChangeNoiNhan = (value: any) => {
    if (nhanvbDep?.includes(value)) {
      setNhanvbDep((prev) => prev.filter((val) => val !== value));
    } else {
      setNhanvbDep((prev) => [...prev, value]);
    }
  };
  const handleCheckboxChangeChuyenden = (value: any) => {
    if (nhanvbUse?.includes(value)) {
      setNhanvbUse((prev) => prev.filter((val) => val !== value));
    } else {
      setNhanvbUse((prev) => [...prev, value]);
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
    setTrichYeuVbdi(e.value);
  };
  const handeCKEChange = (e: any) => {
    setGhiChuVbdi(e.value);
  };
  let newErrors: { [key: string]: string } = {};

  // Đã lấy hết dữ liệu form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(newErrors).length === 0) {
      const formdata = new FormData();
      formdata.append("name_vbdi", nameVbden);
      formdata.append("so_vbdi", soVbdi);
      formdata.append("dvst_vbdi", dvstVbdi);
      formdata.append("nst_vbdi", nstVbdi);
      formdata.append("date_guidi", dateGuidi);
      formdata.append("use_luu_vbdi", useLuuVbdi);
      formdata.append("use_ky_vbdi", useKyVbdi);
      formdata.append("nhan_noibo_vb_di", nhanNoiboVbDi);
      formdata.append("nhan_use_vbdi", nhanUseVbdi);
      nhanvbDep.forEach((dep) => {
        formdata.append("nhanvb_dep[]", dep.toString());
        if (dep == 2 && nhanNgoaiDepVbdi) {
          formdata.append("nhan_ngoai_dep_vbdi", nhanNgoaiDepVbdi);
        }
      });
      nhanvbUse.forEach((user) => {
        formdata.append("nhanvb_use[]", user.toString());
        if (user == 2 && nhanNgoaiUserVbdi) {
          formdata.append("nhan_ngoai_user_vbdi", nhanNgoaiUserVbdi);
        }
      });
      formdata.append("book_vb", bookVb);
      formdata.append("trich_yeu_vbdi", trichYeuVbdi);
      formdata.append("ghi_chu_vbdi", ghiChuVbdi);
      formdata.append("money_hd", moneyHd);
      formdata.append("id", item?._id);
      if (file) {
        formdata.append("file", file);
      }
      try {
        const apiURL = `${baseURL}/api/vanthu/contract/updateContract`;
        const response = await axios.put(apiURL, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          alert("Dữ liệu đã được cập nhật thành công!");
        }

        if (href) {
          router.push(href);
        }
        onClose();
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
              {/* Tên hợp đồng */}
              <div className={styles.form_body}>
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Tên hợp đồng
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input_form}
                    name="name_vbdi"
                    placeholder={"Nhập tên hợp đồng"}
                    value={nameVbden}
                    onChange={(e) => setNameVbden(e.target.value)}
                  />
                </div>
                {/*  Số hợp đồng */}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Số hợp đồng
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input_form}
                    name="so_vbdi"
                    placeholder={"Nhập số hợp đồng"}
                    value={soVbdi}
                    onChange={(e) => setSoVbdi(e.target.value)}
                  />
                </div>
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
                      (option: any) => option.value === dvstVbdi
                    )}
                    onChange={(option) => setDvstVbdi(option?.value)}
                  />
                </div>
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
                      (option: any) => option.value === nstVbdi
                    )}
                    onChange={(option) => setNstVbdi(option?.value)}
                  />
                </div>
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
                    value={dateGuidi}
                    onChange={(e) => {
                      setDateGuidi(e.target.value);
                    }}
                  />
                </div>
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
                      (option: any) => option.value === useLuuVbdi
                    )}
                    onChange={(option) => setUseLuuVbdi(option?.value)}
                  />
                </div>
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
                      (option: any) => option.value === useKyVbdi
                    )}
                    onChange={(option) => setUseKyVbdi(option?.value)}
                  />
                </div>
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
                    {options_noinhan.map((option) => (
                      <label key={option.value} className={styles.label_type}>
                        <input
                          className={styles.checkout_input}
                          type="checkbox"
                          name="type_loai_vb"
                          value={option.value}
                          checked={nhanvbDep?.includes(option.value)}
                          onChange={() =>
                            handleCheckboxChangeNoiNhan(option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                    <br />
                  </div>
                </div>
                {nhanvbDep?.includes(1) && (
                  <>
                    <br />
                    <Select
                      placeholder="Chọn nơi nhận văn bản gốc"
                      name="nhan_noibo_vb_di"
                      options={ds_dep_options}
                      value={ds_dep_options.find(
                        (option) => option.value === nhanNoiboVbDi
                      )}
                      onChange={(option) => setNhanNoiboVbDi(option?.value)}
                    />
                  </>
                )}

                {nhanvbDep?.includes(2) && (
                  <>
                    <br />
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        className={styles.input_form}
                        name="nhan_ngoai_dep_vbdi"
                        placeholder="Nhập nơi nhận văn bản gốc"
                        value={nhanNgoaiDepVbdi}
                        onChange={(e) => setNhanNgoaiDepVbdi(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {/* Chuyển đến */}
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
                    {options_noinhan.map((option) => (
                      <label key={option.value} className={styles.label_type}>
                        <input
                          className={styles.checkout_input}
                          type="checkbox"
                          name="cv_type_chuyenden"
                          value={option.value}
                          checked={nhanvbUse?.includes(option.value)}
                          onChange={() =>
                            handleCheckboxChangeChuyenden(option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                    <br />
                  </div>
                </div>
                {nhanvbUse?.includes(1) && (
                  <>
                    <br />
                    <Select
                      placeholder="Chọn người nhận văn bản gốc"
                      name="nhan_use_vbdi"
                      options={ds_empla_options}
                      value={ds_empla_options?.find(
                        (option) => option.value === nhanUseVbdi
                      )}
                      onChange={(option) => setNhanUseVbdi(option?.value)}
                    />
                  </>
                )}

                {nhanvbUse?.includes(2) && (
                  <>
                    <br />
                    <div className={styles.form_group}>
                      <input
                        type="text"
                        className={styles.input_form}
                        name="nhan_ngoai_dep_vbdi"
                        placeholder="Nhập người nhận văn bản gốc"
                        value={nhanNgoaiUserVbdi}
                        onChange={(e) => setNhanNgoaiUserVbdi(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {/* Tổng tiền */}
                <div className={styles.form_group}>
                  <label className={styles.label_name}>
                    Tổng tiền hợp đồng
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className={styles.input_form}
                    name="money_hd"
                    placeholder={"Nhập tổng tiền hợp đồng (VNĐ)"}
                    value={moneyHd}
                    onChange={(e) => setMoneyHd(e.target.value)}
                  />
                </div>
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
                    value={trichYeuVbdi}
                  />
                </div>
                {trichYeuVbdi === "" && (
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
                    value={ghiChuVbdi}
                  />
                </div>
                {ghiChuVbdi === "" && (
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

export default Modal_Update_contract_go;
