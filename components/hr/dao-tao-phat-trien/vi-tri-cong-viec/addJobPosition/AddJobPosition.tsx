import React, { useState, useEffect } from "react";
import styles from "./AddJobPosition.module.css";
import { addDataJobPosition } from "@/pages/hr/api/dao-tao-phat-trien/JobPosition";
import * as Yup from "yup";
export default function AddJobPosition({
  animation,
  closeModal,
  addData,
}: any) {
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    name: "",
    depName: "",
    des: "",
    jobRequire: "",
  });
  const handleChange = (dataChange) => {
    const { name, value } = dataChange.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [file, setFile] = useState<any>(null);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    depName: Yup.string().required("Bộ phận không được để trống"),
    des: Yup.string().required("Mô tả không được để trống"),
    jobRequire: Yup.string().required("Yêu cầu không được để trống"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      const body = new FormData();
      body.append("roadMap", file);
      body.append("name", formData.name);
      body.append("depName", formData.depName);
      body.append("des", formData.des);
      body.append("jobRequire", formData.jobRequire);
      const response = await addDataJobPosition(body);
      if (response?.status !== 200) {
        alert("Thêm vị trí công việc thất bại");
      } else {
        closeModal();
        addData(response?.data);
      }
    } catch (error: any) {
      const validationErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  const handleCloseModalAdd = () => {
    closeModal();
  };

  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
      >
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>THÊM VỊ TRÍ CÔNG VIỆC</h5>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
              className={`${styles.modal_form}`}
            >
              <div className={`${styles.modal_body} ${styles.bodytuyendung}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên vị trí
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên vị trí"
                    ></input>
                    {errors.name && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>{errors.name}</div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Bộ phận trực thuộc
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="depName"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên giai đoạn"
                    ></input>
                    {errors.depName && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.depName}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Mô tả ngắn
                    <span className={`${styles.red}`}> *</span>
                    {errors.des && (
                      <>
                        <div className={`${styles.errors}`}>{errors.des}</div>
                      </>
                    )}
                  </label>
                  <div className={`${styles.textarea}`}>
                    <textarea
                      className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                      placeholder="Nhập mô tả vị trí công việc"
                      spellCheck="false"
                      name="des"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Yêu cầu công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobRequire && (
                      <>
                        <div className={`${styles.errors}`}>
                          {errors.jobRequire}
                        </div>
                      </>
                    )}
                  </label>
                  <div className={`${styles.textarea}`}>
                    <textarea
                      className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                      placeholder="Nhập mô tả vị trí công việc"
                      spellCheck="false"
                      name="jobRequire"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    File lộ trình thăng tiến
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.file}`}>
                    <input
                      type="file"
                      name="roadMap"
                      onChange={uploadToClient}
                      accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                    ></input>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}
              >
                <button
                  type="button"
                  className={`${styles.btn_huy}`}
                  onClick={handleCloseModalAdd}
                >
                  Hủy
                </button>
                <button type="submit" className={`${styles.update}`}>
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
