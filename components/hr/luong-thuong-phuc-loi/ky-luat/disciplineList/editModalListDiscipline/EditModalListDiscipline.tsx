import React, { useEffect, useState } from "react";
import styles from "./EditModalCollectiveDiscipline.module.css";
import Select from "react-select";
import * as Yup from "yup";
import { format } from "date-fns";
import { UpdateInfringes } from "@/pages/api/api-hr/luong-thuong-phuc-loi/discipline";
import { GetDepartmentList } from "@/pages/api/api-hr/luong-thuong-phuc-loi/reward";
import { getDataUser } from "@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment";

function EditModalListDiscipline({
  animation,
  onClose,
  dataOld,
  updateData,
}: any) {
  const id = dataOld?.id;
  const comId = dataOld?.com_id;
  const typeEdit = dataOld.dep_id;
  const infringeName = dataOld?.infringe_name;
  const regulatoryBasis = dataOld?.regulatory_basis;
  const numberViolation = dataOld?.number_violation;
  const infringeAt = format(new Date(dataOld.infringe_at), "yyyy-MM-dd");
  const infringeType = dataOld?.infringe_type;
  const createdBy = dataOld?.created_by;

  const [dep, setDep] = useState<any>();
  const [listUser, setListUser] = useState<any>({
    depId: dataOld?.dep_id || "", // Sử dụng giá trị ban đầu từ dataOld hoặc để một giá trị mặc định (trong trường hợp dataOld không tồn tại)
    depName: dataOld?.dep_name || "", // Sử dụng giá trị ban đầu từ dataOld hoặc để một giá trị mặc định (trong trường hợp dataOld không tồn tại)
    list_user: dataOld?.list_user.split(",") || "",
    list_user_name: dataOld?.list_user_name.split(",") || "",
  });
  const [listOld, setOld] = useState<any>();
  useEffect(() => {
    setOld({
      list_user: dataOld?.list_user.split(",") || "",
    });
  }, []);
  const [user, setUser] = useState<any>();
  const [errors, setErrors] = useState<any>({});
  const [content, setContent] = useState<any>({
    infringe_name: infringeName,
    regulatory_basis: regulatoryBasis,
    number_violation: numberViolation,
    infringe_at: infringeAt,
    infringe_type: infringeType,
    created_by: createdBy,
  });

  useEffect(() => {
    if (!typeEdit) {
      const getData1 = async () => {
        try {
          const response = await getDataUser();
          setUser(
            response?.data?.data?.items.map((item) => ({
              name: "list_user",
              value: item.ep_id,
              label: `${item.ep_name} ${item.dep_name}`,
            }))
          );
        } catch (err) {}
      };
      getData1();
    } else if (typeEdit != 0) {
      const getData2 = async () => {
        try {
          const response = await GetDepartmentList(comId);
          setDep(
            response?.data?.data?.items?.map((item) => ({
              name: "depId",
              value: item.dep_id,
              label: `${item.dep_name}`,
            }))
          );
        } catch (err) {}
      };
      getData2();
    }
  }, [comId]);

  // Tách chuỗi thành mảng
  const userIds = dataOld?.list_user.split(",");
  const userNames = dataOld?.list_user_name.split(",");

  const tendoituongdefault = userIds.map((userId, index) => ({
    value: userId,
    label: userNames[index],
  }));

  const options = {
    tendoituong: user,

    tenphongban: dep,

    chonphongbandefault: [{ value: dataOld?.dep_id, label: dataOld?.dep_name }],
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
    } else {
      const { value, label } = selectedOptions;
      setListUser((prevState) => ({
        ...prevState,
        depId: value,
        depName: label,
      }));
    }
  };

  const mergedObject = { ...content, ...listUser };

  const schema = Yup.object().shape({
    infringe_name: Yup.string().required("Tên lỗi không được để trống"),
    regulatory_basis: Yup.string().required("Căn cứ không được để trống"),
    number_violation: Yup.string().required("Số quy định không được để trống"),
    list_user: Yup.array().required("Chọn cá nhân vi phạm"),
    created_by: Yup.string().required("Người ký không được để trống"),
    infringe_at: Yup.string().required("Thời gian không được để trống"),
    infringe_type: Yup.string().required("Hình thức không được để trống"),
  });
  const [errListUser, setErrListUser] = useState<any>();
  const [errDep, setErrDep] = useState<any>();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mergedObject.depId === "" && mergedObject.depName === "") {
        setErrDep("Nhập phòng ban");
      }
      if (listOld.list_user.length > 1 && mergedObject.list_user.length <= 1) {
        setErrListUser("Chọn ít nhất 2 nhân viên");
      } else if (mergedObject.list_user.length == 0) {
        setErrListUser("Chọn nhân viên");
      } else {
        await schema.validate(mergedObject, { abortEarly: false });
        const response = await UpdateInfringes(id, mergedObject);
        if (response?.status !== 200) {
          alert("Sửa vi phạm không thành công");
        } else {
          onClose();
          updateData(response);
        }
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
        className={`${styles.modal} ${styles.modal_setting}  ${
          animation ? styles.fade_in : styles.fade_out
        }`}
        style={{ display: "block" }}
      >
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                CẬP NHẬT VI PHẠM TẬP THỂ
              </h5>
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
                      name="infringe_name"
                      defaultValue={infringeName}
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
                      className={`${styles.inputquytrinh}`}
                      name="regulatory_basis"
                      defaultValue={regulatoryBasis}
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
                      className={`${styles.inputquytrinh}`}
                      name="number_violation"
                      defaultValue={numberViolation}
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
                      className={`${styles.inputquytrinh}`}
                      style={{ height: "30.6px" }}
                      name="infringe_at"
                      defaultValue={infringeAt}
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
                      className={`${styles.inputquytrinh}`}
                      name="infringe_type"
                      defaultValue={infringeType}
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

                {typeEdit && (
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
                        defaultValue={options.chonphongbandefault}
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
                    {errDep && typeEdit && (
                      <div className={`${styles.errors}`}>{errDep}</div>
                    )}
                  </div>
                )}

                {!typeEdit && (
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
                        defaultValue={tendoituongdefault}
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
                    {errListUser && !typeEdit && (
                      <div
                        className={`${styles.errors}`}
                        style={{ marginTop: 32 }}
                      >
                        {errListUser}
                      </div>
                    )}
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
                      name="created_by"
                      defaultValue={createdBy}
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
