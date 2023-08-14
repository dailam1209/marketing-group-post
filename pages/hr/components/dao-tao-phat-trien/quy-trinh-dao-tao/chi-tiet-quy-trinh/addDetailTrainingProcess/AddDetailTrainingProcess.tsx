import React, { useState, useEffect } from "react";
import styles from "./AddDetailTrainingProcess.module.css";
import * as Yup from "yup";
import { addDetailTrainingStage } from "@/pages/api/dao-tao-phat-trien/TrainingProcess";
export default function AddDetailTrainingProcess({
  animation,
  closeModal,
  id,
  setData
}: any) {
  const [formData, setFormData] = useState<any>();
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    objectTraining: Yup.string().required("Đối tượng đào tạo không được để trống"),
    content: Yup.string().required("Nội dung không được để trống"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await addDetailTrainingStage(id, formData);
      if (response?.status !== 200) {
        alert("Thêm vị trí công việc thất bại");
      } else {
        closeModal();
        setData(response?.data);
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
      <div className={`${styles.overlay}`} onClick={handleCloseModalAdd}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${
          animation ? styles.fade_in : styles.fade_out
        }`}
      >
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                THÊM GIAI ĐOẠN ĐÀO TẠO
              </h5>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.modal_form}`}
            >
              <div className={`${styles.modal_body} ${styles.bodytuyendung}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên giai đoạn
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Giai đoạn đào tạo"
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
                    Đối tượng đào tạo
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="objectTraining"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Đối tượng đào tạo"
                    ></input>
                    {errors.objectTraining && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>{errors.objectTraining}</div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Nội dung giai đoạn
                    <span className={`${styles.red}`}> *</span>
                    {errors.content && (
                      <>
                        <div className={`${styles.errors}`}>{errors.content}</div>
                      </>
                    )}
                  </label>
                  <div className={`${styles.textarea}`}>
                    <textarea
                      name="content"
                      onChange={handleChange}
                      className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                      placeholder="Nội dung giai đoạn "
                      spellCheck="false"
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
