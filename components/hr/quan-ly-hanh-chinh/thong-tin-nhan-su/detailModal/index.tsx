import React, { useState, useEffect } from "react";
import styles from './detailModal.module.css'
import Select from 'react-select';
import { format, parseISO } from "date-fns";

type SelectOptionType = { label: string, value: any }

export default function DetailCandidateList({ onCancel, infoList }: any) {

  console.log(infoList);

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

  const handleSelectionChange = (option: SelectOptionType | null, optionsArray: SelectOptionType[]) => {
    if (option) {
      setSelectedOption(option)
    }
  };

  const options = {
    tinhtranghonnhan: [
      { value: 1, label: 'Độc thân' },
      { value: 2, label: 'Đã kết hôn' },
      { value: 0, label: 'Khác' },
    ],
    chongioitinh: [
      { value: 1, label: 'Nam' },
      { value: 2, label: 'Nữ' },
      { value: 0, label: 'khác' },
    ],
    chonchinhanh: [
      { value: infoList?.infoList?.com_id, label: infoList?.branch },
    ],
    chonphongban: [
      { value: infoList?.nameDep, label: infoList?.nameDep },

    ],
    chucvuhientai: [
      { value: infoList?.infoList?.position_id, label: infoList?.position },
    ],
    bophan: [
      { value: infoList?.infoList?.dep_id, label: infoList?.infoList?.dep_name },
    ],
    trinhdohocvan: [
      { value: 7, label: 'Đại học trở lên' },
      { value: 5, label: 'Cao đẳng trở lên' },
      { value: 1, label: 'THPT trở lên' },
      { value: 2, label: 'Trung học trở lên' },
      { value: 3, label: 'Chứng chỉ' },
      { value: 4, label: 'Trung cấp trở lên' },
      { value: 6, label: 'Cử nhân trở lên' },
      { value: 8, label: 'Thạc sỹ' },
      { value: 9, label: 'Thạc sỹ Nghệ thuật' },
      { value: 10, label: 'Thạc sỹ Thương mại' },
      { value: 11, label: 'Thạc sỹ Khoa học' },
      { value: 12, label: 'Thạc sỹ Kiến trúc' },
      { value: 13, label: 'Thạc sỹ QTKD' },
      { value: 14, label: 'Thạc sỹ Kỹ thuật ứng dụng' },
      { value: 15, label: 'Thạc sỹ Luật' },
      { value: 16, label: 'Thạc sỹ Y học' },
      { value: 17, label: 'Thạc sỹ Dược phẩm' },
      { value: 18, label: 'Tiến sỹ' },
      { value: 19, label: 'Khác' },

    ],
    kinhnghiemlamviec: [
      { value: 0, label: 'Chưa có kinh nghiệm' },
      { value: 1, label: '0 - 1 năm kinh nghiệm' },
      { value: 2, label: '1 - 2 năm kinh nghiệm' },
      { value: 3, label: '2 - 5 năm kinh nghiệm' },
      { value: 4, label: '5 - 10 năm kinh nghiệm' },
      { value: 5, label: 'Hơn 10 năm kinh nghiệm' },
    ],
  };

  const genderMatch = options.chongioitinh.find((item) => item.value === infoList?.infoList?.ep_gender)
  const mariedMatch = options.tinhtranghonnhan.find((item) => item.value === infoList?.infoList?.ep_married)
  const expMatch = options.kinhnghiemlamviec.find((item) => item.value === infoList?.infoList?.ep_exp)
  const educationMatch = options.trinhdohocvan.find((item) => item.value === infoList?.infoList?.ep_education)

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`}>
              <div className={`${styles.modal_header} ${styles.header_process}`}>
                <p>CHI TIẾT</p>
              </div>
              <form action="">
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> * </span></label>
                    <input type="text" defaultValue={infoList?.infoList?.ep_name} id="names" placeholder="" className={`${styles.form_control}`} />
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Mã ID nhân viên <span style={{ color: 'red' }}> * </span></label>
                    <input type="text" id="names" value={infoList?.infoList?.ep_id} placeholder="" className={`${styles.form_control} ${styles.read_only}`} />
                  </div>
                  <div className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_left}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups3} `}>
                        <label htmlFor="">Ngày sinh </label>
                        {infoList?.infoList?.ep_birth_day &&
                          <input style={{ height: 20 }} type="date" defaultValue={format(
                            parseISO(new Date(infoList?.infoList?.ep_birth_day * 1000).toISOString()),
                            "yyyy-MM-dd"
                          )} id="names" placeholder="" className={`${styles.form_control} `} />
                        }
                      </div>
                    </div>
                    <div className={`${styles.content_right}`}>
                      <div className={`${styles.form_groups}  ${styles.form_groups5} `}>
                        <label htmlFor="">Điện thoại <span style={{ color: 'red' }}> * </span></label>
                        <input type="text" id="names" defaultValue={infoList?.infoList?.ep_phone} placeholder="" className={`${styles.form_control} `} />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Địa chỉ</label>
                    <input type="text" id="names" defaultValue={infoList?.infoList?.ep_address} placeholder="" className={`${styles.form_control}`} />
                  </div>
                  <div className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_left}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups3} ${styles.form_groups5} `}>
                        <label htmlFor="">Giới tính </label>
                        <Select
                          defaultValue={genderMatch}
                          onChange={(option) => handleSelectionChange(option, options.chongioitinh)}
                          options={options.chongioitinh}
                          placeholder="Chọn giới tính"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,

                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_right}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor="">Tình trạng hôn nhân </label>
                        <Select
                          defaultValue={mariedMatch}
                          onChange={(option) => handleSelectionChange(option, options.tinhtranghonnhan)}
                          options={options.tinhtranghonnhan}
                          placeholder="Chọn tình trạng"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '103%',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,

                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Email <span style={{ color: 'red' }}> * </span></label>
                    <input type="text" value={infoList?.infoList?.emailContact} id="names" placeholder="" className={`${styles.form_control} ${styles.read_only}`} />
                  </div>
                  <div className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_item}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups3} ${styles.form_groups5} `}>
                        <label htmlFor="">Chi nhánh </label>
                        <Select
                          value={options.chonchinhanh}
                          onChange={(option) => handleSelectionChange(option, options.chonchinhanh)}
                          options={options.chonchinhanh}
                          placeholder="Chọn chi nhánh"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,

                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_item}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor="">Bộ phận </label>
                        <Select
                          value={options.bophan}
                          onChange={(option) => handleSelectionChange(option, options.chonphongban)}
                          options={options.chonphongban}
                          placeholder={infoList.nameDep}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,

                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_item}`}>
                      <div className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor="">Chức vụ </label>
                        <Select
                          value={options.chucvuhientai}
                          onChange={(option) => handleSelectionChange(option, options.chucvuhientai)}
                          options={options.chucvuhientai}
                          placeholder="Chọn chức vụ"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '107%',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,

                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: 33.6,
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Ngày vào công ty </label>
                    {infoList?.infoList?.start_working_time &&
                      <input type="date" id="names" defaultValue={format(
                        parseISO(new Date(infoList?.infoList?.start_working_time * 1000).toISOString()),
                        "yyyy-MM-dd"
                      )} placeholder="" className={`${styles.form_control}`} />
                    }

                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Kinh nghiệm làm việc </label>
                    <Select
                      value={expMatch}
                      onChange={(option) => handleSelectionChange(option, options.chucvuhientai)}
                      options={options.chucvuhientai}
                      placeholder=""
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 4,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: '99%',
                          fontWeight: state.isFocused ? 600 : 600
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 33.6,

                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 33.6,
                        }),
                        placeholder: (baseStyles) => ({
                          ...baseStyles,
                          color: "#444444",
                        }),
                      }}
                    />
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Trình độ học vấn </label>
                    <Select
                      value={educationMatch}
                      onChange={(option) => handleSelectionChange(option, options.chucvuhientai)}
                      options={options.chucvuhientai}
                      placeholder=""
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 4,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: '99%',
                          fontWeight: state.isFocused ? 600 : 600
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 33.6,

                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 33.6,
                        }),
                        placeholder: (baseStyles) => ({
                          ...baseStyles,
                          color: "#444444",
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                  <button className={`${styles.btn_cancel}`} onClick={onCancel}>Đóng</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}