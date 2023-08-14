import React, { useEffect, useState } from "react";
import styles from "./editRecruitmentStage.module.css";
import * as Yup from "yup";
import { editDetailTrainingStage } from "@/pages/api/dao-tao-phat-trien/TrainingProcess";

export default function EditDetailTrainingProcess({ data, animation, onCloseModal, newData }: any) {

  const name = data?.name
  const objectTraining = data?.objectTraining
  const content = data?.content
  const stageProcessTrainingId = data?.id
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    name: name,
    objectTraining: objectTraining,
    content: content
  })

  const schema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    objectTraining: Yup.string().required("Đối tượng đào tạo không được để trống"),
    content: Yup.string().required("Nội dung không được để trống"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await editDetailTrainingStage(stageProcessTrainingId, formData)
      if( response?.status !== 200) {
        alert('Sửa quy trình thất bại')
      }else {
        onCloseModal();
        newData(response?.data)
      }

    } catch (error:any) {
      const validationErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
   };

  const CloseModal = () => {
    onCloseModal();
  };

  return (
    <>
      <div className={`${styles.overlay}`} onClick={onCloseModal}></div>
      <div className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out}`}>
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content}`}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                CẬP NHẬT GIAI ĐOẠN ĐÀO TẠO
              </h5>
            </div>

            {/* body */}
            <form onSubmit={(e) => handleSubmit(e)} className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên giai đoạn
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      defaultValue={name}
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
                      defaultValue={objectTraining}
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
                      className={`${styles.inputquytrinh} ${styles.textareapolicy}`}
                      placeholder="Nội dung giai đoạn "
                      defaultValue={content}
                      spellCheck="false"
                      name="content"
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
                  onClick={CloseModal}
                >
                  <span>Hủy</span>
                </button>
                <button type="submit" className={`${styles.success}`}>
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
