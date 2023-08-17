import React, { useState, useEffect } from 'react'
import styles from './detailModal.module.css'
import Select from 'react-select'
import { format, parseISO } from 'date-fns'

type SelectOptionType = { label: string; value: string }

export default function DetailCandidateList({ onCancel, infoList }: any) {
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    null
  )

  const handleSelectionChange = (
    option: SelectOptionType | null,
    optionsArray: SelectOptionType[]
  ) => {
    if (option) {
      setSelectedOption(option)
    }
  }

  const options = {
    tinhtranghonnhan: [
      { value: 'đã kết hôn', label: 'Đã kết hôn' },
      { value: 'độc thân', label: 'Độc th' },
    ],
    chongioitinh: [
      { value: 'Nam', label: 'Nam' },
      { value: 'Nữ', label: 'Nữ' },
    ],
    chonchinhanh: [
      { value: 'PT shop', label: 'PT shop' },
      { value: 'LT legend', label: 'LT legend' },
      { value: 'LT pay 3', label: 'LT pay 3' },
      {
        value: 'Công ty cổ phần Thanh toán Hưng Hà 2 ',
        label: 'Công ty cổ phần Thanh toán Hưng Hà 2 ',
      },
    ],
    chonphongban: [{ value: infoList?.nameDep, label: infoList?.nameDep }],
    chonnhanvien: [
      { value: 'Lê Hồng Anh', label: 'Lê Hồng Anh (KỸ THUẬT - ID:284670)' },
      {
        value: 'Phan Mạnh Hùng',
        label: 'Phan Mạnh Hùng (SÁNG TẠO - ID:153846)',
      },
    ],
    chucvuhientai: [
      { value: infoList?.infoList?.position_id, label: infoList?.position },
    ],
    bophan: [
      {
        value: infoList?.infoList?.dep_id,
        label: infoList?.infoList?.nameDeparment,
      },
    ],
  }

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <p>CHI TIẾT</p>
              </div>
              <form action=''>
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Tên nhân viên <span style={{ color: 'red' }}> * </span>
                    </label>
                    <input
                      type='text'
                      defaultValue={infoList?.infoList?.userName}
                      id='names'
                      placeholder=''
                      className={`${styles.form_control}`}
                    />
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mã ID nhân viên <span style={{ color: 'red' }}> * </span>
                    </label>
                    <input
                      type='text'
                      id='names'
                      value={infoList?.infoList?.idQLC}
                      placeholder=''
                      className={`${styles.form_control} ${styles.read_only}`}
                    />
                  </div>
                  <div
                    className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_left}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups3} `}>
                        <label htmlFor=''>Ngày sinh </label>
                        {infoList?.infoList?.birthday && (
                          <input
                            style={{ height: 20 }}
                            type='date'
                            defaultValue={format(
                              parseISO(
                                new Date(
                                  infoList?.infoList?.birthday * 1000
                                ).toISOString()
                              ),
                              'yyyy-MM-dd'
                            )}
                            id='names'
                            placeholder=''
                            className={`${styles.form_control} `}
                          />
                        )}
                      </div>
                    </div>
                    <div className={`${styles.content_right}`}>
                      <div
                        className={`${styles.form_groups}  ${styles.form_groups5} `}>
                        <label htmlFor=''>
                          Điện thoại <span style={{ color: 'red' }}> * </span>
                        </label>
                        <input
                          type='text'
                          id='names'
                          defaultValue={infoList?.infoList?.phoneTK}
                          placeholder=''
                          className={`${styles.form_control} `}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Địa chỉ</label>
                    <input
                      type='text'
                      id='names'
                      defaultValue={infoList?.infoList?.address}
                      placeholder=''
                      className={`${styles.form_control}`}
                    />
                  </div>
                  <div
                    className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_left}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups3} ${styles.form_groups5} `}>
                        <label htmlFor=''>Giới tính </label>
                        <Select
                          defaultValue={options.chongioitinh}
                          onChange={(option) =>
                            handleSelectionChange(option, options.chongioitinh)
                          }
                          options={options.chongioitinh}
                          placeholder='Chọn giới tính'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600,
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
                              color: '#444444',
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_right}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor=''>Tình trạng hôn nhân </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={(option) =>
                            handleSelectionChange(
                              option,
                              options.tinhtranghonnhan
                            )
                          }
                          options={options.tinhtranghonnhan}
                          placeholder='Chọn tình trạng'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '103%',
                              fontWeight: state.isFocused ? 600 : 600,
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
                              color: '#444444',
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Email <span style={{ color: 'red' }}> * </span>
                    </label>
                    <input
                      type='text'
                      value={infoList?.infoList?.emailContact}
                      id='names'
                      placeholder=''
                      className={`${styles.form_control} ${styles.read_only}`}
                    />
                  </div>
                  <div
                    className={`${styles.form_groups} ${styles.form_groups2}`}>
                    <div className={`${styles.content_item}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups3} ${styles.form_groups5} `}>
                        <label htmlFor=''>Chi nhánh </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={(option) =>
                            handleSelectionChange(option, options.chonchinhanh)
                          }
                          options={options.chonchinhanh}
                          placeholder='Chọn chi nhánh'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600,
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
                              color: '#444444',
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_item}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor=''>Bộ phận </label>
                        <Select
                          value={options.bophan}
                          onChange={(option) =>
                            handleSelectionChange(option, options.chonphongban)
                          }
                          options={options.chonphongban}
                          placeholder={infoList.nameDep}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '100%',
                              fontWeight: state.isFocused ? 600 : 600,
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
                              color: '#444444',
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className={`${styles.content_item}`}>
                      <div
                        className={`${styles.form_groups} ${styles.form_groups5} `}>
                        <label htmlFor=''>Chức vụ </label>
                        <Select
                          value={options.chucvuhientai}
                          onChange={(option) =>
                            handleSelectionChange(option, options.chucvuhientai)
                          }
                          options={options.chucvuhientai}
                          placeholder='Chọn chức vụ'
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '107%',
                              fontWeight: state.isFocused ? 600 : 600,
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
                              color: '#444444',
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Ngày vào công ty </label>
                    <input
                      type='date'
                      id='names'
                      defaultValue={format(
                        parseISO(
                          new Date(
                            infoList?.infoList?.start_working_time * 1000
                          ).toISOString()
                        ),
                        'yyyy-MM-dd'
                      )}
                      placeholder=''
                      className={`${styles.form_control}`}
                    />
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Kinh nghiệm làm việc </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.chucvuhientai)
                      }
                      options={options.chucvuhientai}
                      placeholder=''
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 4,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: '99%',
                          fontWeight: state.isFocused ? 600 : 600,
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
                          color: '#444444',
                        }),
                      }}
                    />
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Trình độ học vấn </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.chucvuhientai)
                      }
                      options={options.chucvuhientai}
                      placeholder=''
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 4,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: '99%',
                          fontWeight: state.isFocused ? 600 : 600,
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
                          color: '#444444',
                        }),
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.modal_footer} ${styles.footer_process}`}>
                  <button className={`${styles.btn_cancel}`} onClick={onCancel}>
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
