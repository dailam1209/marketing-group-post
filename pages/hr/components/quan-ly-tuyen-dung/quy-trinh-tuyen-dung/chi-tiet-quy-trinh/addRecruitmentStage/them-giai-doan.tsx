import React, { useState } from "react";
import styles from "./addRecruitmentStage.module.css";
import * as Yup from "yup";
import { AddDataRecruitmentStage } from "@/pages/hr/api/quan-ly-tuyen-dung/RecruitmentManagerService";
export interface AddRecruitmentStage { }

export default function AddRecruitmentStage({ recruitmentId, animation, onCloseModal, setData }: any) {

  const [formData, setFormData] = useState({
    nameStage: '',
    posAssum: '',
    target: '',
    time: '',
    des: ''
  })
  const [errors, setErrors] = useState<any>({});

  const schema = Yup.object().shape({
    nameStage: Yup.string().required("Vui lòng nhập tên giai đoạn"),
    posAssum: Yup.string().required("Vui lòng nhập bộ phận đảm nhận "),
    target: Yup.string().required("Vui lòng nhập mục tiêu giai đoạn"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any, recruitId: number, formData: any) => {
    try {
      e.preventDefault();
      await schema.validate(formData, { abortEarly: false });
      const response = await AddDataRecruitmentStage(recruitId, formData)
      if (response?.status === 403) {
        alert('Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!')
      }
      else if (response?.status !== 200) {
        alert('Thêm giai đoạn không thành công')
      }
      else {
        onCloseModal()
        setData(response?.data)
      }
    }
    catch (error: any) {
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
      <>
        <div className={`${styles.overlay}`}></div>
        <div
          className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
            }`}
        >
          <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
            <div className={`${styles.modal_content}`}>
              <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
                <h5 className={`${styles.modal_title}`}>THÊM GIAI ĐOẠN</h5>
              </div>

              <form onSubmit={(e) => handleSubmit(e, recruitmentId, formData)} className={`${styles.modal_form}`}>
                <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                  <div className={`${styles.form_groups}`}>
                    <label>
                      Tên giai đoạn
                      <span className={`${styles.red}`}> *</span>
                    </label>
                    <div className={`${styles.inputright}`}>
                      <input
                        name="nameStage"
                        type="text"
                        className={`${styles.inputquytrinh}`}
                        placeholder="Nhập tên giai đoạn"
                        onChange={handleChange}
                      ></input>
                      {errors.nameStage && (
                        <>
                          <picture>
                            <img
                              className={`${styles.icon_err}`}
                              src={`${"/danger.png"}`}
                              alt="Lỗi"
                            ></img>
                          </picture>
                          <div className={`${styles.errors}`}>
                            {errors.nameStage}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.form_groups}`}>
                    <label>
                      Bộ phận đảm nhận công việc
                      <span className={`${styles.red}`}> *</span>
                    </label>
                    <div className={`${styles.inputright}`}>
                      <input
                        name='posAssum'
                        type="text"
                        className={`${styles.inputquytrinh}`}
                        placeholder="Nhập bộ phận đảm nhận công việc"
                        onChange={handleChange}
                      ></input>
                      {errors.posAssum && (
                        <>
                          <picture>
                            <img
                              className={`${styles.icon_err}`}
                              src={`${"/danger.png"}`}
                              alt="Lỗi"
                            ></img>
                          </picture>
                          <div className={`${styles.errors}`}>
                            {errors.posAssum}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.form_groups}`}>
                    <label>
                      Mục tiêu
                      <span className={`${styles.red}`}> *</span>
                    </label>
                    <div className={`${styles.inputright}`}>
                      <input
                        name="target"
                        type="text"
                        className={`${styles.inputquytrinh}`}
                        placeholder="Nhập mục tiêu giai đoạn"
                        onChange={handleChange}
                      ></input>
                      {errors.target && (
                        <>
                          <picture>
                            <img
                              className={`${styles.icon_err}`}
                              src={`${"/danger.png"}`}
                              alt="Lỗi"
                            ></img>
                          </picture>
                          <div className={`${styles.errors}`}>
                            {errors.target}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.form_groups}`}>
                    <label>
                      Thời gian định lượng
                      <span className={`${styles.red}`}></span>
                    </label>
                    <div className={`${styles.inputright}`}>
                      <input
                        name="time"
                        type="text"
                        className={`${styles.inputquytrinh}`}
                        placeholder="Nhập thời gian định lượng"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>

                  <div className={`${styles.form_groups}`}>
                    <label>Mô tả công việc</label>
                    <div>
                      <textarea
                        name="des"
                        className={`${styles.inputquytrinh} ${styles.textarea}`}
                        placeholder="Nhập mô tả giai đoạn "
                        spellCheck="false"
                        style={{ height: "100px", marginTop: "10px" }}
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
                    onClick={onCloseModal}
                  >
                    <span>Hủy</span>
                  </button>
                  <button type="submit" className={`${styles.success}`}>
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
