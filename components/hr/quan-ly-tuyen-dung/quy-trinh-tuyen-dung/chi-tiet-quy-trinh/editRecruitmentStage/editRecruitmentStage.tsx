import React, { useEffect, useState } from "react";
import styles from "./editRecruitmentStage.module.css";
import MyEditor from "@/components/hr/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/components/Editor";
import DOMPurify from "dompurify";
import * as Yup from "yup";
import { EditDataRecruitmentStage } from "@/pages/hr/api/quan-ly-tuyen-dung/RecruitmentManagerService";

export interface EditRecruitmentStage { }

export default function EditRecruitmentStage({
  data,
  animation,
  onCloseModal,
  newDataEdit,
}: any) {
  const stageRecruitmentId = data.id;
  const nameStage = data.name;
  const posAssum = data.positionAssumed;
  const target = data.target;

  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    nameStage: nameStage,
    posAssum: posAssum,
    target: target,
  });

  const schema = Yup.object().shape({
    nameStage: Yup.string().required("Tên giai đoạn không được để trống"),
    posAssum: Yup.string().required("Bộ phận đảm nhận không được để trống"),
    target: Yup.string().required("Mục tiêu không được để trống"),
  });

  const handleSubmit = async (e: any, stageRecruitmentId: number, formData) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await EditDataRecruitmentStage(
        stageRecruitmentId,
        formData
      );
      if (response?.status === 403) {
        alert('Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!')
      }
      else if (response?.status !== 200) {
        alert("Chỉnh sửa giai đoạn không thành công");
      } else {
        onCloseModal();
        newDataEdit(response?.data);
      }
    } catch (error: any) {
      const validationErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCKEChange = (e: any) => {
    const { name, value } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CloseModal = () => {
    onCloseModal();
  };

  return (
    <>
      <div className={`${styles.overlay}`} onClick={CloseModal}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
      >
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content}`}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>CHỈNH SỬA GIAI ĐOẠN</h5>
            </div>

            {/* body */}
            <form
              onSubmit={(e) => handleSubmit(e, stageRecruitmentId, formData)}
              className={`${styles.modal_form}`}
            >
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
                      defaultValue={data.name}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên giai đoạn"
                      onChange={handleInputChange}
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
                      type="text"
                      name="posAssum"
                      defaultValue={data.positionAssumed}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên bộ phận đảm nhiệm"
                      onChange={handleInputChange}
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
                      type="text"
                      name="target"
                      defaultValue={data.target}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên mục tiêu "
                      onChange={handleInputChange}
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
                      type="text"
                      name="time"
                      defaultValue={data.completeTime}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập thời gian định lượng"
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Mô tả công việc
                    <span className={`${styles.red}`}></span>
                  </label>
                  <div className={`${styles.pull_right}`}>
                    <Input_textarea name="des" handleChange={handleCKEChange} />
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

function Input_textarea({ name, value, handleChange }: any) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div className={styles.ckeditor}>
      <MyEditor
        name={name}
        onChange={(data: React.SetStateAction<string>) => {
          setData(data);
          handleChange(data);
        }}
        editorLoaded={editorLoaded}
        value={value}
      />
    </div>
  );
}
