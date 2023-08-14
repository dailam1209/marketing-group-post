import React, { useEffect, useState } from "react";
import styles from "./EditModalCollectiveDiscipline.module.css";
import Select from "react-select";
import { UpdateInfringes } from "@/pages/hr/api/luong-thuong-phuc-loi/discipline";
import { GetDepartmentList } from "@/pages/hr/api/luong-thuong-phuc-loi/reward";
import { getDataUser } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";
import { format } from "date-fns";

function EditModalListDiscipline({ animation, onClose, dataOld }: any) {
  const id = dataOld?.id
  const comId = dataOld?.comId;
  const typeEdit = dataOld.listUser.length
  const infringeName = dataOld?.infringeName;
  const regulatoryBasis = dataOld?.regulatoryBasis;
  const numberViolation = dataOld?.numberViolation;
  const infringeAt = format(new Date(dataOld.infringeAt), "yyyy-MM-dd");
  const infringeType = dataOld?.infringeType;
  const createdBy = dataOld?.createdBy;

  const [dep, setDep] = useState<any>();
  const [listUser, setListUser] = useState<any>();
  const [user, setUser] = useState<any>();
  const [content, setContent] = useState<any>({
    infringe_name: infringeName,
    regulatory_basis: regulatoryBasis,
    number_violation: numberViolation,
    infringe_at: infringeAt,
    infringe_type: infringeType,
    created_by: createdBy,
  });

  useEffect(() => {
    if (typeEdit !== 0) {
      const getData1 = async () => {
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
      getData1();
    } else {
      const getData2 = async () => {
        try {
          const response = await GetDepartmentList(comId.toString());
          setDep(
            response?.data.data.data.map((item) => ({
              name: "depId",
              value: item.dep_id,
              label: `${item.dep_name}`,
            }))
          );
        } catch (err) { }
      };
      getData2();
    }
  }, []);

  const options = {
    tendoituong: user,

    tenphongban: dep,
  };

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    if (Array.isArray(selectedOptions)) {
      const selectedValues = selectedOptions.map((option) => option.value);
      const selectedLabels = selectedOptions.map((option) => option.label);
      setListUser((prevSelectedOption) => ({
        ...prevSelectedOption,
        list_user: selectedValues,
        list_user_name: selectedLabels,
      }));
    }
    else {
      const { value, label } = selectedOptions;
      setListUser((prevState) => ({
        ...prevState,
        depId: value,
        depName: label
      }));
    }
  };

  const mergedObject = { ...content, ...listUser }
  console.log(mergedObject)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await schema.validate(mergedObject, { abortEarly: false });
      const response = await UpdateInfringes(id, mergedObject);
      console.log(response)
      if (response?.status !== 200) {
        alert('Sửa khen thưởng không thành công')
      }
      else {
        onClose()
      }
    } catch (error: any) {
      const validationErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      // setErrors(validationErrors);
    }
  };
  return (
    <>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out}`} style={{ display: 'block' }}>
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>CẬP NHẬT VI PHẠM TẬP THỂ</h5>
            </div>
            {/* body */}
            <form onSubmit={handleSubmit} className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên lỗi vi phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      className={`${styles.inputquytrinh}`}
                      name='infringe_name'
                      defaultValue={infringeName}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      className={`${styles.inputquytrinh}`}
                      name='regulatory_basis'
                      defaultValue={regulatoryBasis}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      className={`${styles.inputquytrinh}`}
                      name='number_violation'
                      defaultValue={numberViolation}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      className={`${styles.inputquytrinh}`}
                      style={{ height: '30.6px' }}
                      name='infringe_at'
                      defaultValue={infringeAt}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      className={`${styles.inputquytrinh}`}
                      name='infringe_type'
                      defaultValue={infringeType}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
                  </div>
                </div>

                {typeEdit === 0 && (
                  <div className={`${styles.form_groups}`}>
                    <label>
                      Tập thể vi phạm
                      <span className={`${styles.red}`}> *</span>
                      <div
                        className={`${styles.red} ${styles.float_right}`}
                      ></div>
                    </label>
                    <div
                      style={{ marginRight: "2%" }}
                      className={`${styles.select}`}
                    >
                      <Select
                        options={options.tenphongban}
                        onChange={handleSelectionChange}
                        placeholder={"--Vui lòng chọn--"}
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
                )}

                {typeEdit !== 0 && (
                  <div className={`${styles.form_groups}`}>
                    <label>
                      Cá nhân vi phạm
                      <span className={`${styles.red}`}> *</span>
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
                        onChange={handleSelectionChange}
                        placeholder={"--Vui lòng chọn--"}
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
                )}

                <div className={`${styles.form_groups}`}>
                  <label>
                    Người ký quyết định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      className={`${styles.inputquytrinh}`}
                      name='created_by'
                      defaultValue={createdBy}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img
                        src={`${'/danger.png'}`}
                        alt="Lỗi"
                      ></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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

export default EditModalListDiscipline;
