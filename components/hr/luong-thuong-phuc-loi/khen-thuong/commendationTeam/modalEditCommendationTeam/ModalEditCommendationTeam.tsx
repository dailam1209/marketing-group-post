import React, { useEffect, useState } from "react";
import styles from "../../personalReward/modalAddPersonalCompliments/ModalAddReward.module.css";
import Select from "react-select";
import { format } from "date-fns";
import { GetDepartmentList, UpdateAchievement } from "@/pages/hr/api/luong-thuong-phuc-loi/reward";
import { getDataUser } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";
import { getToken } from "@/pages/hr/api/token";
import jwt_decode from "jwt-decode";

function ModalEditCommendationTeam({ animation, onClose, dataOld }: any) {

  const typeEdit = dataOld.depId
  const id = dataOld.id
  const achievement_id = dataOld.achievementId;
  const contentOld = dataOld.content;
  const created_by = dataOld.createdBy;
  const achievement_level = dataOld.achievementLevel;
  const appellationOld = dataOld.appellation;
  const achievementTypeOld = dataOld.achievementType;
  const formattedDate: string = format(
    new Date(dataOld.createdAt),
    "yyyy-MM-dd"
  );

  const [dep, setDep] = useState<any>();
  const [listUser, setListUser] = useState<any>();
  const [user, setUser] = useState<any>()
  const [content, setContent] = useState<any>({
    achievement_id: achievement_id,
    content: contentOld,
    created_by: created_by,
    achievement_at: formattedDate,
    achievement_level: achievement_level,
    appellation: appellationOld,
  });
  const [achievementType, setAchievementType] = useState<any>({
    achievementType: achievementTypeOld.toString(),
  });

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

  const handleSelectionChangeAppellation = (
    option: any | null,
    optionsArray: any[]
  ) => {
    if (option) {

      const { name, value } = option;
      setAchievementType(() => ({
        [name]: String(value),
      }));
    }
  };
  const mergedObject = { ...content, ...achievementType, ...listUser }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UpdateAchievement(id, mergedObject);
      if (response?.status !== 200) {
        alert('Sửa khen thưởng không thành công')
      }
      else {
        onClose()
      }

    } catch (error: any) {
    }
  };

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
    if (typeEdit === 0) {
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
    }
    else {
      const getData2 = async () => {
        try {
          const response = await GetDepartmentList(tokenComId.toString())
          setDep(response?.data.data.data.map(item => ({ name: "depId", value: item.dep_id, label: `${item.dep_name}` })))
        } catch (err) {

        }
      }
      getData2()
    }
  }, []);

  const options = {
    tendoituong: user,

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



  return (
    <>
      <div className={`${styles.overlay}`} onClick = {onClose}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
        style={{ display: "block" }}
      >
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>CẬP NHẬT THÀNH TÍCH</h5>
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
                      defaultValue={dataOld.achievementId}
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}
                      placeholder="Nhập tên giai đoạn"
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      defaultValue={dataOld.content}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Nhập nội dung khen thưởng"
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
                  </div>
                </div>

                {typeEdit === 0 && (
                  <>
                    <div className={`${styles.form_groups}`}>
                      <label>
                        Tên đối tượng
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
                          isMulti
                          options={options.tendoituong}
                          placeholder="Chọn đối tượng"
                          onChange={handleSelectionChange}
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
                  </>
                )}

                {typeEdit !== 0 && (
                  <>
                    <div className={`${styles.form_groups}`}>
                      <label>
                        Tên phòng ban
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
                          placeholder="Chọn phòng ban"
                          onChange={handleSelectionChange}
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
                  </>
                )}

                <div className={`${styles.form_groups}`}>
                  <label>
                    Người ký quyết định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="created_by"
                      defaultValue={dataOld.createdBy}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Người ký quyết định"
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      defaultValue={formattedDate}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Chọn thời điểm"
                      style={{ height: "30.6px" }}
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                  <div
                    style={{ marginRight: "2%" }}
                    className={`${styles.select}`}
                  >
                    <Select
                      onChange={(option) =>
                        handleSelectionChangeAppellation(
                          option,
                          options.hinhthuckhenthuong
                        )
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
                    Danh hiệu
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type="text"
                      name="appellation"
                      defaultValue={dataOld.appellation}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Danh hiệu"
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: "none" }}
                    ></div>
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
                      defaultValue={dataOld.achievementLevel}
                      className={`${styles.inputquytrinh}`}
                      placeholder="Cấp khen"
                      onChange={handleContentChange}
                    ></input>
                    <picture style={{ display: "none" }}>
                      <img src={`${"/danger.png"}`} alt="Lỗi"></img>
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

export default ModalEditCommendationTeam;
