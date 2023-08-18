/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "./modalAddTeamCompliments.module.css";
import Select from "react-select";
import * as Yup from "yup";
import { AddAchievementGroup, GetDepartmentList } from "@/pages/api/api-hr/luong-thuong-phuc-loi/reward";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";

function ModalAddTeamCompliments({ animation, onClose, updateData }: any) {
  const [dep, setDep] = useState<any>()
  const [content, setContent] = useState<any>();
  const [listUser, setListUser] = useState<any>()
  const [appellation, setAppellation] = useState<any>({})
  const [errors, setErrors] = useState<any>({});
  const [hidden, setHidden] = useState(false)
  const mergedObject = { ...content, ...listUser, ...appellation };

  const schema = Yup.object().shape({
    achievement_id: Yup.string().required("Số quyết định không được để trống"),
    content: Yup.string().required("Nội dung khen không được để trống"),
    depId: Yup.array().required("Chọn phòng ban"),
    created_by: Yup.string().required("Người ký không được để trống"),
    achievement_at: Yup.string().required("Thời điểm không được để trống"),
    achievement_type: Yup.string().required("Chọn hình thức"),
    appellation: Yup.string().required("Danh hiệu không được để trống"),
    achievement_level: Yup.string().required("Cấp khen không được để trống"),
  });

  const [tokenComId, setComId] = useState<any>(null);
  const COOKIE_KEY = "token_base365";

  useEffect(() => {
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setComId(decodedToken?.data?.com_id);
    }
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetDepartmentList(tokenComId.toString())
        setDep(response?.data?.data?.data?.map(item => ({ name: "depId", value: item.dep_id, label: `${item.dep_name}` })))

      } catch (err) {
      }
    }
    getData()
  }, [])

  const options = {
    tenphongban: dep,

    hinhthuckhenthuong: [
      { name: "achievement_type", value: "1", label: "Huân Chương" },
      { name: "achievement_type", value: "2", label: "Huy Chương" },
      { name: "achievement_type", value: "3", label: "Giấy khen" },
      { name: "achievement_type", value: "4", label: "Thăng chức" },
      { name: "achievement_type", value: "5", label: "Kỉ niệm chương" },
      { name: "achievement_type", value: "6", label: "Tiền mặt" },
    ],
  };

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    setListUser((prevSelectedOption) => ({
      ...prevSelectedOption,
      dep_id: selectedOptions.value,
      dep_name: selectedOptions.label
    }));
  };

  const handleSelectionChangeAppellation = (
    option: any | null,
    optionsArray: any[]
  ) => {
    if (option) {
      const { name, value } = option;
      setAppellation((prevSelectedOption) => ({
        ...prevSelectedOption,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (appellation.achievement_type === "6") {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }, [appellation.achievement_type])


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await schema.validate(mergedObject, { abortEarly: false });
      const response = await AddAchievementGroup(mergedObject)
      if (response?.status !== 200) {
        alert('Thêm mới khen thưởng không thành công')
      }
      if (response?.status === 400) {
        setErrors('Phòng ban của bạn không có nhân viên')
      }
      if (response?.status === 200) {
        onClose()
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
      <div className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out}`} style={{ display: 'block' }}>
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                THÊM THÀNH TÍCH TẬP THỂ
              </h5>
            </div>
            {/* body */}
            <form onSubmit={(e) => handleSubmit(e)} className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Số quyết định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="achievement_id"
                      onChange={handleContentChange}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập số quyết định"

                    ></input>
                    {errors.achievement_id && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.achievement_id}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Nội dung khen thưởng
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="content"
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập nội dung khen thưởng"
                      onChange={handleContentChange}
                    ></input>
                    {errors.content && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.content}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên phòng ban
                    <span className={`${styles.red}`}> *</span>
                    {errors.depId && (
                      <>
                        <div className={`${styles.errors}`} style={{ marginTop: '6px' }}>
                          {errors.depId}
                        </div>
                      </>
                    )}
                    <div
                      className={`${styles.red} ${styles.float_right}`}
                    ></div>
                  </label>
                  <div style={{ marginRight: "2%" }} className={`${styles.select}`}>
                    <Select
                      options={options.tenphongban}
                      placeholder="Chọn phòng ban"
                      onChange={(option) => handleSelectionChange(option, options.tenphongban)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          borderColor: "#4747477a",
                          height: "auto",
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
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
                      name='created_by'
                      className={`${styles.inputquytrinh}`}
                      placeholder="Người ký quyết định"
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
                    Thời điểm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="date"
                      name="achievement_at"
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập tên giai đoạn"
                      style={{ height: '30.6px' }}
                      onChange={handleContentChange}
                    ></input>
                    {errors.achievement_at && (
                      <>
                        <picture style={{ display: 'none' }}>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.achievement_at}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Hình thức khen thưởng
                    <span className={`${styles.red}`}> *</span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}
                    ></div>
                  </label>
                  <div style={{ marginRight: "2%" }} className={`${styles.select}`}>
                    <Select

                      onChange={(option) =>
                        handleSelectionChangeAppellation(option, options.hinhthuckhenthuong)
                      }
                      options={options.hinhthuckhenthuong}
                      placeholder="-- Vui lòng chọn -- "
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          borderColor: "#4747477a",
                          height: "auto",
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
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
                    {errors.achievement_type && (
                      <>
                        <picture style={{ display: 'none' }}>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.achievement_type}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {hidden && (
                  <>
                    <div className={`${styles.form_groups}`}>
                      <label>
                        Số tiền
                        <span className={`${styles.red}`}> *</span>
                      </label>
                      <div className={`${styles.inputright}`}>
                        <input
                          style={{ height: '28px' }}
                          type="text"
                          name='price'
                          className={`${styles.inputquytrinh}`}
                          placeholder="Số tiền"
                          onChange={handleContentChange}
                        ></input>
                        {errors.price && (
                          <>
                            <picture>
                              <img
                                className={`${styles.icon_err}`}
                                src={`${"/danger.png"}`}
                                alt="Lỗi"
                              ></img>
                            </picture>
                            <div className={`${styles.errors}`}>
                              {errors.price}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={`${styles.form_groups}`}>
                      <label>
                        Lý do
                        <span className={`${styles.red}`}> *</span>
                      </label>
                      <div className={`${styles.inputright}`}>
                        <textarea
                          className={`${styles.inputquytrinh}`}
                          onChange={handleContentChange}
                          name='resion'
                        ></textarea>
                        {errors.resion && (
                          <>
                            <picture>
                              <img
                                className={`${styles.icon_err}`}
                                src={`${"/danger.png"}`}
                                alt="Lỗi"
                              ></img>
                            </picture>
                            <div className={`${styles.errors}`}>
                              {errors.resion}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className={`${styles.form_groups}`}>
                  <label>
                    Danh hiệu
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name='appellation'
                      className={`${styles.inputquytrinh}`}
                      placeholder="Danh hiệu"
                      onChange={handleContentChange}
                    ></input>
                    {errors.appellation && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.appellation}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Cấp khen
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="achievement_level"
                      className={`${styles.inputquytrinh}`}
                      placeholder="Cấp khen"
                      onChange={handleContentChange}
                    ></input>
                    {errors.achievement_level && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${"/danger.png"}`}
                            alt="Lỗi"
                          ></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.achievement_level}
                        </div>
                      </>
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

export default ModalAddTeamCompliments;