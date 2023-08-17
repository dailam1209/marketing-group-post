import React, { useState } from "react";
import styles from "./EditRecruitmentProcess.module.css";
import * as Yup from "yup";
import { UpdateDataRecruitment } from "@/pages/hr/api/quan-ly-tuyen-dung/RecruitmentManagerService";

export interface EditRecruitmentProcess { }
export default function EditRecruitmentProcess({
  animation,
  onClose,
  data,
  setData,
}: any) {
  const nameProcess = data.name;
  const applyFor = data.applyFor;
  const recruitId = data.id;
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    nameProcess: nameProcess,
    applyFor: applyFor,
  });

  const schema = Yup.object().shape({
    nameProcess: Yup.string().required("Vui lòng nhập tên quy trình"),
    applyFor: Yup.string().required("Vui lòng nhập đối tượng áp dụng"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async (e: any, recruitId: number, formData: any) => {
    try {
      e.preventDefault();
      await schema.validate(formData, { abortEarly: false });
      const response = await UpdateDataRecruitment(recruitId, formData);
      console.log(response)
      if (response?.status === 403) {
        alert('Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!')
      }
      else if (response?.status !== 200) {
        alert("Cập nhật quy trình thất bại");
      } else {
        onClose();
        setData(response.data);
      }
    } catch (error: any) {
      const validationErrors = {};
      error?.inner?.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleCancel}
      ></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
      >
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                CẬP NHẬT QUY TRÌNH TUYỂN DỤNG
              </h5>
            </div>

            {/* body */}
            <form
              className={`${styles.modal_form}`}
              onSubmit={(e) => handleSubmitUpdate(e, recruitId, formData)}
            >
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên quy trình
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      name="nameProcess"
                      defaultValue={data.name}
                      type="text"
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên giai đoạn"
                      onChange={handleChange}
                    ></input>
                    {errors.nameProcess && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.nameProcess}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Đối tượng áp dụng
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      name="applyFor"
                      defaultValue={data.applyFor}
                      type="text"
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên giai đoạn"
                      onChange={handleChange}
                    ></input>
                    {errors.applyFor && (
                      <div>
                        <picture style={{ float: 'right', marginTop: '-30px', marginRight: '4%' }}>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          />
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.applyFor}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}
              >
                <button
                  type="button"
                  className={`${styles.btn_huy}`}
                  onClick={handleCancel}
                >
                  <span>Hủy</span>
                </button>
                <button type="submit" className={`${styles.success}`}>
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
