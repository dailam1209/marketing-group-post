import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../addRecruitmentProcess/addRecruitmentProcess.module.css";
import MyEditor from "../components/Editor";
import * as Yup from "yup";
export interface AddAdditionalRecruitmentProcess {}

export default function AddAdditionalRecruitmentProcess({ postData }: any) {
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState<any>({});
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


  useEffect(() => {
      postData(formData)
  }, [formData]);

  return (
    <>
      <div className={`${styles.list_process}`} style={{ marginTop: "5px" }}>
        <div className={`${styles.form_groups}`}>
          <label>
            Tên giai đoạn
            <span className={`${styles.red}`}> *</span>
          </label>
          <div className={`${styles.inputright}`}>
            <input
              id="nameStage"
              name="nameStage"
              type="text"
              className={`${styles.inputquytrinh}`}
              placeholder="Nhập tên giai đoạn tuyển dụng"
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
                <div className={`${styles.errors}`}>{errors.nameStage}</div>
              </>
            )}
            <div
              className={`${styles.errors}`}
              style={{ display: "none" }}
            ></div>
          </div>
        </div>

        <div className={`${styles.form_groups}`}>
          <label>
            Bộ phận đảm nhận
            <span className={`${styles.red}`}> *</span>
          </label>
          <div className={`${styles.inputright}`}>
            <input
              type="text"
              id="posAssum"
              name="posAssum"
              className={`${styles.inputquytrinh}`}
              placeholder="Nhập bộ phận đảm nhận"
              onChange={handleInputChange}
            ></input>
            {errors.posAssum  && (
              <> 
                <picture>
                  <img
                    className={`${styles.icon_err}`}
                    src={`${"/danger.png"}`}
                    alt="Lỗi"
                  ></img>
                </picture>
                <div className={`${styles.errors}`}>{errors.posAssum}</div>
              </>
            )}
            <div
              className={`${styles.errors}`}
              style={{ display: "none" }}
            ></div>
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
              id="target"
              name="target"
              className={`${styles.inputquytrinh}`}
              placeholder="Nhập mục tiêu tuyển dụng"
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
                <div className={`${styles.errors}`}>{errors.target}</div>
              </>
            )}
            <div
              className={`${styles.errors}`}
              style={{ display: "none" }}
            ></div>
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
              id="time"
              name="time"
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
          <div className={`${styles.input_full}`}>
            <Input_textarea name="des" handleChange={handleCKEChange} />
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
