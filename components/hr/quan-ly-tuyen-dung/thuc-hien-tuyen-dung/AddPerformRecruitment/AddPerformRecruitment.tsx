import React, { useState, useEffect } from 'react'
import styles from './AddPerformRecruitment.module.css'
import Select from 'react-select'
import * as Yup from 'yup'
import {
  CreateNewsRecruitment,
  GetDataCategory,
  getDataAddress,
  getDataUser,
  GetListNews
} from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { GetDataRecruitment } from '@/pages/api/api-hr/quan-ly-tuyen-dung/RecruitmentManagerService'
import nganh_nghe from '@/components/hr/util/listNganhNghe'
import tinh_thanh from '@/components/hr/util/listTinhThanh'
export interface AddPerformRecruitment { }

export default function AddPerformRecruitment({
  animation,
  handleCloseModalAdd,
  addData,
}: any) {
  const [dataListNews, setDataListNews] = useState<any>()
  const [content, setContent] = useState<any>()

  const [address, setAddress] = useState<any>()
  const [recruitmentId, setRecruitmentId] = useState<any>()
  const [userMemberFollow, setUserMemberFollow] = useState<any>()
  const [hrName, setHrName] = useState<any>()
  const [cateId, setCateId] = useState<any>()
  const [errors, setErrors] = useState<any>({})
  const [selectedOption, setSelectedOption] = useState<any | null>(
  )

  const [title, setTitle] = useState<any>('')
  const [formDate, setFormDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [onDelete, setOnDelete] = useState<any>()
  const [currentPage, setCurrenPage] = useState<any>(1)
  const [isFoundSalary, setFoundSalary] = useState<any>()
  const [isFoundPosition, setFoundPosition] = useState<any>()

  const schema = Yup.object().shape({
    title: Yup.string().required('Hãy nhập tiêu đề'),
    posApply: Yup.string().required('Hãy chọn vị trí tuyển dụng'),
    cityId: Yup.string().required('Hãy chọn địa điểm làm việc'),
    salaryId: Yup.string().required('Hãy chọn mức lương'),
    number: Yup.string().required('Hãy nhập số ứng viên'),
    timeStart: Yup.string().required('Hãy nhập thời gian ứng tuyển'),
    timeEnd: Yup.string().required('Hãy nhập thời gian ứng tuyển'),
    jobDetail: Yup.string().required('Hãy nhập chi tiết công việc'),
    wokingForm: Yup.string().required('Hãy chọn hình thức'),
    jobDes: Yup.string().required('Hãy nhập mô tả công việc'),
    interest: Yup.string().required('Hãy nhập quyền lợi ứng viên'),
    jobExp: Yup.string().required('Hãy chọn kinh nghiệm '),
    gender: Yup.string().required('Hãy chọn giới tính'),
    degree: Yup.string().required('Hãy chọn bằng cấp'),
    jobRequire: Yup.string().required('Hãy nhập yêu cầu công việc'),
  })

  const handleContentChange = (event) => {
    const { name, value } = event.target
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (dataListNews?.job_description) {
      setContent({
        ...content,
        jobDes: dataListNews.job_description,
      });
    }
  }, [dataListNews]);


  useEffect(() => {
    if (dataListNews?.salary_id && dataListNews?.position_apply) {
      setSelectedOption({
        ...selectedOption,
        posApply: dataListNews?.position_apply,
        salaryId: dataListNews?.salary_id
      });
    }
  }, [dataListNews]);

  const handleSelectionChange = (option: any | null, optionsArray: any[]) => {
    if (option) {
      const { name, value, label } = option
      setSelectedOption((prevSelectedOption) => ({
        ...prevSelectedOption,
        [name]: Number(value),
      }))
      if (name === "salaryId") {
        setFoundSalary([{ value: value, label: label }])
      }
      if (name === "posApply") {
        setFoundPosition([{ value: value, label: label }])
      }
    }
  }

  useEffect(() => {
    const GetDataListNews = async () => {
      try {
        const response = await GetListNews(
          currentPage,
          10000,
          title,
          formDate,
          toDate
        )
        if (response) {
          const findIsSample = response?.data?.success?.data?.data?.find((item: any) => item?.is_sample === 1)
          setDataListNews(findIsSample)
        }
      } catch (err) { }
    }
    GetDataListNews()
  }, [title, currentPage, onDelete, formDate, toDate])

  useEffect(() => {
    const getData = async () => {
      try {
        const responseAddress = await getDataAddress()
        const responseRecruitmentId = await GetDataRecruitment(1, 10000, '')
        const responseDataUser = await getDataUser()
        const responseCareer = await GetDataCategory()

        Promise.all([
          responseAddress,
          responseRecruitmentId,
          responseDataUser,
          responseCareer,
        ]).then(async (response) => {
          const dataAddress = await response[0]?.data.data
          const dataRecruitmentId = await response[1]?.data?.success
          const dataUser = await response[2]?.data?.data
          const dataCategory = await response[3]?.data.data
          setRecruitmentId(
            dataRecruitmentId?.data?.data.map((item) => ({
              value: item.id,
              label: `QTTD${item.id} ${item.name}`,
              name: 'recruitmentId',
            }))
          )
          setUserMemberFollow(
            dataUser?.items?.map((item) => ({
              name: 'memberFollow',
              value: item.ep_id,
              label: `${item.ep_name} ${item.dep_name}`,
            }))
          )
          setHrName(
            dataUser?.items?.map((item) => ({
              name: 'hrName',
              value: item.ep_id,
              label: `${item.ep_name} ${item.dep_name}`,
            }))
          )
        })
      } catch (err) { }
    }
    getData()
  }, [])

  const options = {
    vitrituyendung: [
      { name: 'posApply', value: '1', label: 'Mới tốt nghiệp' },
      { name: 'posApply', value: '6', label: 'Thực tập sinh' },
      { name: 'posApply', value: '3', label: 'Nhân viên' },
      { name: 'posApply', value: '2', label: 'Trưởng phòng' },
    ],

    diaiemlamviec: address,

    nganhnghe: cateId,

    mucluong: [
      { name: 'salaryId', value: '1', label: 'Thỏa thuận' },
      { name: 'salaryId', value: '2', label: '1 - 3 triệu' },
      { name: 'salaryId', value: '3', label: '3 - 5 triệu' },
      { name: 'salaryId', value: '4', label: '5 - 7 triệu' },
      { name: 'salaryId', value: '5', label: '7 - 10 triệu' },
      { name: 'salaryId', value: '6', label: '10 - 15 triệu' },
      { name: 'salaryId', value: '7', label: '15 - 20 triệu' },
      { name: 'salaryId', value: '8', label: '20 - 30 triệu' },
      { name: 'salaryId', value: '9', label: 'Trên 30 triệu' },
      { name: 'salaryId', value: '10', label: 'Trên 50 Triệu' },
      { name: 'salaryId', value: '11', label: 'Trên 100 Triệu' },
    ],

    hinhthuclamviec: [
      { name: 'wokingForm', value: '1', label: 'Toàn thời gian cố định' },
      { name: 'wokingForm', value: '2', label: 'Toàn thời gian tạm thời' },
      { name: 'wokingForm', value: '3', label: 'Bán thời gian' },
      { name: 'wokingForm', value: '4', label: 'Bán thời gian tạm thời' },
      { name: 'wokingForm', value: '5', label: 'Hợp đồng' },
      { name: 'wokingForm', value: '6', label: 'Khác' },
    ],

    maquytrinhapdung: recruitmentId,

    kinhnghiem: [
      { name: 'jobExp', value: '0', label: 'Chưa có kinh nghiệm' },
      { name: 'jobExp', value: '1', label: '0 - 1 năm kinh nghiệm' },
      { name: 'jobExp', value: '2', label: '1 - 2 năm kinh nghiệm' },
      { name: 'jobExp', value: '3', label: '2 - 5 năm kinh nghiệm' },
      { name: 'jobExp', value: '4', label: '5 - 10 năm kinh nghiệm' },
      { name: 'jobExp', value: '5', label: 'Trên 10 năm kinh nghiệm' },
    ],

    gioitinh: [
      { name: 'gender', value: '1', label: 'Nam' },
      { name: 'gender', value: '2', label: 'Nữ' },
      { name: 'gender', value: '0', label: 'Không yêu cầu' },
    ],

    yeucaubangcap: [
      { name: 'degree', value: '0', label: 'Không yêu cầu' },
      { name: 'degree', value: '1', label: 'THPT trở lên' },
      { name: 'degree', value: '2', label: 'Trung học trở lên' },
      { name: 'degree', value: '3', label: 'Chứng chỉ' },
      { name: 'degree', value: '4', label: 'Trung cấp trở lên' },
      { name: 'degree', value: '5', label: 'Cao đẳng trở lên' },
      { name: 'degree', value: '6', label: 'Cử nhân trở lên' },
      { name: 'degree', value: '7', label: 'Đại học trở lên' },
      { name: 'degree', value: '8', label: 'Thạc sĩ trở lên' },
      { name: 'degree', value: '9', label: 'Thạc sĩ Nghệ thuật' },
      { name: 'degree', value: '10', label: 'Thạc sĩ Thương mại' },
      { name: 'degree', value: '11', label: 'Thạc sĩ Khoa học' },
      { name: 'degree', value: '12', label: 'Thạc sĩ Kiến trúc' },
      { name: 'degree', value: '13', label: 'Thạc sĩ QTKD' },
      { name: 'degree', value: '14', label: 'Thạc sĩ Kỹ thuật ứng dụng' },
      { name: 'degree', value: '15', label: 'Thạc sĩ Luật' },
      { name: 'degree', value: '16', label: 'Thạc sĩ Y học' },
      { name: 'degree', value: '17', label: 'Thạc sĩ Dược phẩm' },
      { name: 'degree', value: '18', label: 'Tiến sĩ' },
      { name: 'degree', value: '19', label: 'Khác' },
    ],

    nhanvientheodoi: userMemberFollow,

    nhanvienphutrach: hrName,
  }


  useEffect(() => {

    const foundSalary = options?.mucluong?.find((item) => item?.value === dataListNews?.salary_id?.toString())
    if (foundSalary) {
      setFoundSalary(foundSalary)
    }
    const foundPositionsApply = options?.vitrituyendung?.find((item) => item?.value === dataListNews?.position_apply?.toString())
    if (foundPositionsApply) {
      setFoundPosition(foundPositionsApply)
    }
  }, [dataListNews])

  const formData = Object.assign({}, content, selectedOption)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      const response = await CreateNewsRecruitment(content, selectedOption)

      if (response?.status !== 200) {
      } else {
        handleCloseModalAdd()
        addData(response?.data)
      }
    } catch (error: any) {
      const validationErrors = {}
      if (error?.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message
        })
      }
      setErrors(validationErrors)
    }
  }

  useEffect(() => {
    if (tinh_thanh) {
      setAddress(
        tinh_thanh?.map((item) => ({
          value: item.cit_id,
          label: item.cit_name,
          name: 'cityId',
        }))
      )
    }
    if (nganh_nghe) {
      setCateId(
        nganh_nghe?.map((item) => ({
          value: item.cat_id,
          label: item.cat_name,
          name: 'cateId',
        }))
      )
    }
  }, [tinh_thanh, nganh_nghe])

  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleCloseModalAdd}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
        style={{ display: 'block' }}>
        <div className={` ${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>THÊM TIN MỚI</h5>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodytuyendung}`}>
                <div className={`${styles.form_groups}`}>
                  <label style={{ display: 'contents' }}>
                    Tiêu đề tin tuyển dụng
                    <span className={`${styles.red}`}> *</span>
                    {errors.title && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.title}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='title'
                      placeholder='Nhập tiêu đề tin tuyển dụng'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Vị trí tuyển dụng
                    <span className={`${styles.red}`}> *</span>
                    {errors.posApply && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.posApply}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      value={isFoundPosition}
                      onChange={(option) =>
                        handleSelectionChange(option, options.vitrituyendung)
                      }
                      options={options.vitrituyendung}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Địa điểm làm việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.cityId && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.cityId}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.diaiemlamviec)
                      }
                      options={options.diaiemlamviec}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
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
                    Địa chỉ tuyển dụng
                    <span className={`${styles.red}`}> </span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='address'
                      placeholder='Nhập địa chỉ tuyển dụng'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Ngành nghề
                    <span className={`${styles.red}`}> </span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nganhnghe)
                      }
                      options={options.nganhnghe}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Mức lương
                    <span className={`${styles.red}`}> *</span>
                    {errors.salaryId && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.salaryId}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      value={isFoundSalary}
                      onChange={(option) =>
                        handleSelectionChange(option, options.mucluong)
                      }
                      options={options.mucluong}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.form_groups} ${styles.small_left}  ${styles.full_width}`}>
                  <label>
                    Số lượng ứng tuyển
                    <span className={`${styles.red}`}> *</span>
                    {errors.number && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.number}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='number'
                      name='number'
                      placeholder='Nhập số lượng ứng viên cần tuyển'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>
                <div className={`${styles.form_groups} ${styles.big_right}`}>
                  <label>
                    Thời hạn tuyển
                    <span className={`${styles.red}`}> *</span>
                    {errors.timeStart ||
                      (errors.timeEnd && (
                        <div className={`${styles.red} ${styles.float_right}`}>
                          {errors.timeStart || errors.timeEnd}
                        </div>
                      ))}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      style={{ fontWeight: '600' }}
                      name='timeStart'
                      type='date'
                      className={`${styles.form_date}`}
                      onChange={handleContentChange}></input>
                    <span className={`${styles.formto}`}>đến</span>
                    <input
                      style={{ fontWeight: '600' }}
                      type='date'
                      className={`${styles.to_date}`}
                      name='timeEnd'
                      onChange={handleContentChange}></input>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Chi tiết công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobDetail && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobDetail}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobDetail'
                      placeholder='Mô tả chi tiết công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Hình thức làm việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.wokingForm && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.wokingForm}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.hinhthuclamviec)
                      }
                      options={options.hinhthuclamviec}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Thời gian thử việc
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      style={{ width: '96%' }}
                      type='text'
                      name='probationaryTime'
                      placeholder='Nhập thời gian thử việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div
                  className={`${styles.form_groups} ${styles.group_left}`}
                  style={{ width: '100%' }}>
                  <label>Hoa hồng (nếu có)</label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='number'
                      name='moneyTip'
                      placeholder='Nhập hoa hồng được nhận (nếu có)'
                      spellCheck='false'
                      style={{ width: '43%' }}
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Mô tả công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobDes && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobDes}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobDes'
                      defaultValue={dataListNews?.job_description}
                      placeholder='Mô tả công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Quyền lợi
                    <span className={`${styles.red}`}> *</span>
                    {errors.interest && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.interest}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='interest'
                      placeholder='Quyền lợi ứng viên'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Mã quy trình áp dụng
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.maquytrinhapdung)
                      }
                      options={options.maquytrinhapdung}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Kinh nghiệm
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobExp && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobExp}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.kinhnghiem)
                      }
                      options={options.kinhnghiem}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_left}`}>
                  <label>
                    Yêu cầu giới tính
                    <span className={`${styles.red}`}> *</span>
                    <span className={`${styles.red}`}></span>
                    {errors.gender && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.gender}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.gioitinh)
                      }
                      options={options.gioitinh}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} ${styles.group_right}`}>
                  <label>
                    Yêu cầu bằng cấp
                    <span className={`${styles.red}`}> *</span>
                    {errors.degree && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.degree}
                      </div>
                    )}
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.yeucaubangcap)
                      }
                      options={options.yeucaubangcap}
                      placeholder='-- Vui lòng chọn --'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
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
                    Yêu cầu công việc
                    <span className={`${styles.red}`}> *</span>
                    {errors.jobRequire && (
                      <div className={`${styles.red} ${styles.float_right}`}>
                        {errors.jobRequire}
                      </div>
                    )}
                  </label>
                  <div className={`${styles.tuyendungtext}`}>
                    <input
                      type='text'
                      name='jobRequire'
                      placeholder='Yêu cầu công việc'
                      spellCheck='false'
                      onChange={handleContentChange}
                    />
                  </div>
                </div>

                <div className={`${styles.form_groups} `}>
                  <label>
                    Thành viên theo dõi
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nhanvientheodoi)
                      }
                      options={options.nhanvientheodoi}
                      placeholder='Chọn nhân viên'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
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
                    Tên nhân viên phụ trách tuyển dụng
                    <span className={`${styles.red}`}></span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>

                  <div className={`${styles.tuyendungtext}`}>
                    <Select
                      className={`${styles.position_recruit}`}
                      defaultValue={selectedOption}
                      onChange={(option) =>
                        handleSelectionChange(option, options.nhanvienphutrach)
                      }
                      options={options.nhanvienphutrach}
                      placeholder='Chọn nhân viên'
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          height: 32,
                          fontSize: state.isFocused ? 14 : 14,
                          minHeight: state.isFocused ? 20 : 20,
                          width: state.isFocused ? '100%' : baseStyles.width,
                          fontWeight: state.isFocused ? 600 : 600,
                        }),
                        valueContainer: (baseStyles) => ({
                          ...baseStyles,
                          padding: '0',
                        }),
                        indicatorsContainer: (baseStyles) => ({
                          ...baseStyles,
                          height: 30,
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                <button
                  type='button'
                  className={`${styles.btn_huy}`}
                  onClick={handleCloseModalAdd}>
                  Hủy
                </button>
                <button type='submit' className={`${styles.update}`}>
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
