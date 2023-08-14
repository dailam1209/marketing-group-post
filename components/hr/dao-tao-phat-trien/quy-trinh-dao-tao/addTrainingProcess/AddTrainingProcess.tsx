import React, { useState, useEffect } from "react";
import styles from "./AddTrainingProcess.module.css";
import * as Yup from "yup";
import { addDataListProcessTrain } from "@/pages/hr/api/dao-tao-phat-trien/TrainingProcess";
export default function AddTrainingProcess({ animation, closeModal, handleNewData }: any) {
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>();

  const schema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    description: Yup.string().required("Bộ phận không được để trống"),
  });

  const handleChange = (dataChange) => {
    const { name, value } = dataChange.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCloseModalAdd = () => {
    closeModal();
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await addDataListProcessTrain(formData)
      if (response?.status !== 200) {
        alert("Thêm mới quy trình đào tạo không thành công");
      } else {
        closeModal();
        handleNewData(response?.data)
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
              <h5 className={`${styles.modal_title}`}>
                THÊM QUY TRÌNH ĐÀO TẠO
              </h5>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodytuyendung}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên quy trình
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên quy trình"
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
                    Mô tả ngắn
                    <span className={`${styles.red}`}> *</span>
                    {errors.description && (
                      <>
                        <div className={`${styles.errors}`}>
                          {errors.description}
                        </div>
                      </>
                    )}
                  </label>
                  <div className={`${styles.textarea}`}>
                    <textarea
                      className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                      placeholder="Nhập mô tả "
                      spellCheck="false"
                      name="description"
                      onChange={handleChange}
                    ></textarea>
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
