import React, { useEffect, useState } from "react";
import styles from "./AddModalPersonalDiscipline.module.css";
import Select from "react-select";
import { getDataUser } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";
import { AddInfringes } from "@/pages/hr/api/luong-thuong-phuc-loi/discipline";
import * as Yup from "yup";
function AddModalPersonalDiscipline({ animation, onClose, updateData }: any) {
  const [user, setUser] = useState<any>();
  const [content, setContent] = useState<any>();
  const [listUser, setListUser] = useState<any>();
  const [errors, setErrors] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataUser();
        setUser(
          response?.data.data.data.map((item) => ({
            name: "list_user",
            value: item.idQLC,
            label: `${item.userName} ${item.nameDeparment}`,
          }))
        );
      } catch (err) { }
    };
    getData();
  }, []);

  const options = {
    tendoituong: user,
  };

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const selectedLabels = selectedOptions.map((option) => option.label);
    setListUser((prevSelectedOption) => ({
      ...prevSelectedOption,
      list_user: selectedValues,
      list_user_name: selectedLabels,
    }));
  };

  const schema = Yup.object().shape({
    infringe_name: Yup.string().required("Tên lỗi không được để trống"),
    regulatory_basis: Yup.string().required("Căn cứ không được để trống"),
    number_violation: Yup.string().required("Số quy định không được để trống"),
    list_user: Yup.array().required("Chọn cá nhân vi phạm"),
    created_by: Yup.string().required("Người ký không được để trống"),
    infringe_at: Yup.string().required("Thời gian không được để trống"),
    infringe_type: Yup.string().required("Hình thức không được để trống"),
  });

  const mergedObject = { ...content, ...listUser };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await schema.validate(mergedObject, { abortEarly: false });
      const response = await AddInfringes(mergedObject);
      if (response?.status === 200) {
        onClose();
        updateData(response?.data)
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
      <div className={`${styles.overlay}`} onClick={onClose}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
        style={{ display: "block" }}
      >
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>THÊM MỚI VI PHẠM</h5>
            </div>
            {/* body */}
            <form onSubmit={(e) => handleSubmit(e)} className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên lỗi vi phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="infringe_name"
                      placeholder={'Tên lỗi vi phạm'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                    {errors.infringe_name && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.infringe_name}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Căn cứ quy định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="regulatory_basis"
                      placeholder={'Căn cứ quy định'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                    {errors.regulatory_basis && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.regulatory_basis}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Số quy định xử lý vi phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="number_violation"
                      placeholder={'Số quy định xử lý vi phạm'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                    {errors.number_violation && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.number_violation}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Thời gian vi phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="date"
                      name="infringe_at"
                      className={`${styles.inputquytrinh}`}
                      style={{ height: "30.6px" }}
                      onChange={handleContentChange}
                    ></input>
                    {errors.infringe_at && (
                      <>
                        <div className={`${styles.errors}`}>
                          {errors.infringe_at}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Hình thức xử lý sai phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="infringe_type"
                      placeholder={'Hình thức xử lý sai phạm'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                    {errors.infringe_type && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.infringe_type}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Cá nhân vi phạm
                    <span className={`${styles.red}`}> *</span>
                    {errors.list_user && (
                      <>
                        <div className={`${styles.errors}`} style={{ marginTop: 6 }}>
                          {errors.list_user}
                        </div>
                      </>
                    )}
                    <div
                      className={`${styles.red} ${styles.float_right}`}
                    ></div>
                  </label>
                  <div
                    style={{ marginRight: "2%" }}
                    className={`${styles.select}`}
                  >
                    <Select
                      isMulti={true}
                      options={options.tendoituong}
                      placeholder={"--Vui lòng chọn-- "}
                      onChange={(option) =>
                        handleSelectionChange(option, options.tendoituong)
                      }
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          borderColor: "#4747477a",
                          height: "auto",
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? "100%" : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: "0",
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Người ký quyết định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="created_by"
                      placeholder={'Người ký quyết định'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                    {errors.created_by && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.created_by}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Số tiền phạt
                    <span className={`${styles.red}`}></span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="price"
                      placeholder={'Số tiền phạt'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                    ></input>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Lý do phạt
                    <span className={`${styles.red}`}></span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <textarea
                      name="resion"
                      placeholder={'Lý do phạt'}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
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
                  onClick={onClose}
                >
                  Hủy
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
  );
}

export default AddModalPersonalDiscipline;
