import React, { useState, useEffect, useMemo, useRef } from 'react'
import styles from '../../candidateAddModal/candidateAddModal.module.css'
import { Rating } from 'react-simple-star-rating'
import Selects from '@/components/hr/select'
import { parseISO, format } from 'date-fns'
import * as Yup from 'yup'
import GetComId from '@/components/hr/getComID'
import { GetListNews } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import {
  AddInterview,
  GetJobDetails,
} from '@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList'
import { EmployeeList } from '@/pages/api/api-hr/listNhanVien'
import Select from 'react-select';

type SelectOptionType = { label: string; value: any }

export default function EditCandidateIntrview({
  onCancel,
  candidate,
  processName,
  candidateAll,
  processBefore
}: any) {

  const [rating, setRating] = useState<any>(candidate?.star_vote)
  const [addAnotherSkill, setAddAnotherSkill] = useState<JSX.Element[]>([])
  const [skills, setSkills] = useState<{ skillName: string; skillVote: any }[]>(
    []
  )
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    null
  )
  const [isGender, setGender] = useState<any>(candidate?.can_gender)
  const [isEducation, setEducation] = useState<any>(candidate?.can_education)
  const [isUserHiring, setUserHiring] = useState<any>(candidate?.user_hiring)
  const [isEmpInterview, setEmpInterview] = useState<any>(candidate?.user_hiring)
  const [isExp, setExp] = useState<any>(candidate?.can_exp)
  const [isMarried, setMarried] = useState<any>(candidate?.can_is_married)
  const [isUserRecommend, setUserRecommend] = useState<any>(
    candidate?.user_recommend
  )
  const [isRecruitmentNewsId, setRecruitmentNewsId] = useState<any>(
    candidate?.recruitment_news_id
  )
  const [isEmpList, setEmpList] = useState<any>(null)
  const [isNewList, setNewsList] = useState<any>(null)
  const [isCandidate, setCandidate] = useState<any>(null)
  const [errors, setErrors] = useState<any>({})
  const comid: any = GetComId()
  const modalRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onCancel])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('com_id', comid)
        const response = await EmployeeList(formData)
        if (response) {
          setEmpList(response.data)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('canId', candidate?.id)
        const response = await GetJobDetails(formData)
        if (response) {
          setCandidate(response.data)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetListNews(1, 2000, '', '', '')
        if (response) {
          setNewsList(response.data)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được để trống'),
    email: Yup.string().required('email không được để trống'),
    phone: Yup.string().required('Số điện thoại không được để trống'),
    gender: Yup.string().required('Chọn giới tính'),
    birthday: Yup.string().required('Chọn ngày sinh'),
    education: Yup.string().required('Chọn trình độ học vấn'),
    exp: Yup.string().required('Chọn kinh nghiệm làm việc'),
    meried: Yup.string().required('Chọn tình trạng hôn nhân'),
    address: Yup.string().required('Địa chỉ không được để trống'),
    cvFrom: Yup.string().required('Nhập nguồn ứng viên'),
    userHiring: Yup.string().required('Chọn nhân viên tuyển dụng'),
    recruitment: Yup.string().required('Chọn vị trí tuyển dụng'),
    timeSendCv: Yup.string().required('Thời gian gửi không được để trống'),
    starVote: Yup.string().required('Đánh giá không được để trống'),
    resiredSalary: Yup.string().required('Nhập mức lương mong muốn'),
    empInterview: Yup.string().required('Chọn nhân viên tham gia'),
    timeInterView: Yup.string().required('Thời gian hẹn không được để trống'),
  })

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const name = (document.getElementById('name') as HTMLInputElement)?.value
      const email = (document.getElementById('email') as HTMLInputElement)
        ?.value
      const phone = (document.getElementById('phone') as HTMLInputElement)
        ?.value
      const birthday = (document.getElementById('birthday') as HTMLInputElement)
        ?.value
      const hometown = (document.getElementById('hometown') as HTMLInputElement)
        ?.value
      const school = (document.getElementById('school') as HTMLInputElement)
        ?.value
      const address = (document.getElementById('address') as HTMLInputElement)
        ?.value
      const cvFrom = (document.getElementById('cvFrom') as HTMLInputElement)
        ?.value
      const timeSendCv = (
        document.getElementById('timeSendCv') as HTMLInputElement
      )?.value
      const salary = (document.getElementById('salary') as HTMLInputElement)
        ?.value
      const resiredSalary = (
        document.getElementById('resiredSalary') as HTMLInputElement
      )?.value
      const timeInterView = (
        document.getElementById('timeInterView') as HTMLInputElement
      )?.value
      const note = (document.getElementById('note') as HTMLInputElement)?.value

      const formDatas = {
        name: name || '',
        email: email || '',
        phone: phone || '',
        gender: isGender || '',
        birthday: birthday || '',
        education: isEducation || '',
        exp: isExp || '',
        meried: isMarried || '',
        address: address || '',
        cvFrom: cvFrom || '',
        userHiring: isUserHiring || '',
        recruitment: isRecruitmentNewsId || '',
        timeSendCv: timeSendCv || '',
        starVote: rating || '',
        resiredSalary: resiredSalary || '',
        empInterview: isEmpInterview || '',
        timeInterView: timeInterView || '',
      }

      await validationSchema.validate(formDatas, {
        abortEarly: false,
      })

      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('gender', isGender)
      formData.append('birthday', birthday)
      formData.append('hometown', hometown)
      formData.append('education', isEducation)
      formData.append('school', school)
      formData.append('exp', isExp)
      formData.append('isMarried', isMarried)
      formData.append('address', address)
      formData.append('userHiring', isUserHiring)
      formData.append('userRecommend', isUserRecommend)
      formData.append('recruitmentNewsId', isRecruitmentNewsId)
      formData.append('cvFrom', cvFrom)
      formData.append('timeSendCv', timeSendCv)
      formData.append('starVote', rating)
      formData.append('canId', candidate?.id)
      formData.append('salary', salary)
      formData.append('resiredSalary', resiredSalary)
      formData.append('empInterview', isEmpInterview)
      formData.append('interviewTime', timeInterView)
      formData.append('processInterviewId', processBefore)
      formData.append('note', note)
      formData.append('contentsend', note)

      const response = await AddInterview(formData)
      if (response) {
        setTimeout(() => {
          onCancel()
        }, 1500)
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {}
        error.inner.forEach((yupError: any) => {
          yupErrors[yupError.path] = yupError.message
        })
        setErrors(yupErrors)
      } else {
        console.error('Lỗi validate form:', error)
      }
    }
  }

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const handleSelectChange = (
    selectedOption: SelectOptionType | null,
    setState: any
  ) => {
    setSelectedOption(selectedOption)
    if (selectedOption) {
      setState(selectedOption.value)
    }
  }

  const chonnhanvienOptions = useMemo(
    () =>
      isEmpList &&
      isEmpList?.items?.map((emp: any) => ({
        value: emp.ep_id,
        label: emp.ep_name,
      })),
    [isEmpList]
  )

  const chonvitrituyendungOptions = useMemo(
    () =>
      isNewList &&
      isNewList?.data?.data?.map((news: any) => ({
        value: news.id,
        label: news.title,
      })),
    [isNewList]
  )

  const options = {
    chongioitinh: [
      { value: 1, label: 'Nam' },
      { value: 2, label: 'Nữ' },
      { value: 0, label: 'Giới tính khác' },
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
      { value: '0', label: 'Chưa có kinh nghiệm' },
      { value: '1', label: '0 - 1 năm kinh nghiệm' },
      { value: '2', label: '1 - 2 năm kinh nghiệm' },
      { value: '3', label: '2 - 5 năm kinh nghiệm' },
      { value: '4', label: '5 - 10 năm kinh nghiệm' },
      { value: '5', label: 'Hơn 10 năm kinh nghiệm' },
    ],
    tinhtranghonnhan: [
      { value: 1, label: 'Độc thân' },
      { value: 2, label: 'Đã kết hôn' },
      { value: 3, label: 'Khác' },
    ],
    tennhanvientuyendung: chonnhanvienOptions,
    tennhanviengioithieu: chonnhanvienOptions,
    vitrituyendung: chonvitrituyendungOptions,
    vitrituyendungdefault: [
      { value: candidate?.recruitment_news_id, label: candidate?.title },
    ],
    tennhanvienphongvan: chonnhanvienOptions,
    tennhanvienphongvandefault: [
      { value: candidateAll?.data?.idnhanvien, label: candidateAll?.data?.nhanvien }],
  }

  const selectedGender: any = options.chongioitinh?.find(
    (item) => item.value === candidate?.can_gender
  )
  const selectedEducation: any = options.trinhdohocvan?.find(
    (item) => item.value === candidate?.can_education
  )
  const selectedExp: any = options.kinhnghiemlamviec?.find(
    (item) => item.value === candidate?.can_exp.toString()
  )
  const selectedMarried: any = options.tinhtranghonnhan?.find(
    (item) => item.value === candidate?.can_is_married
  )
  const selectedUseHiring: any = options.tennhanvientuyendung?.find(
    (item: any) => item.value === candidate?.user_hiring
  )
  const selectedUseRecomment: any = options.tennhanviengioithieu?.find(
    (item: any) => item.value === candidate?.user_recommend
  )

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5
                  className={`${styles.modal_tittle}`}
                  style={{ textTransform: 'uppercase' }}>
                  CHỈNH SỬA HỒ SƠ ỨNG VIÊN {processName}
                </h5>
              </div>
              <form action=''>
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Tên ứng viên <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        value={candidate?.name}
                        id='name'
                        placeholder='Nhập tên ứng viên'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.name && (
                          <div className={`${styles.t_require} `}>
                            {errors.name}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      E-mail <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        value={candidate?.email}
                        id='email'
                        placeholder='Nhập Email ứng viên'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.email && (
                          <div className={`${styles.t_require} `}>
                            {errors.email}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Số điện thoại <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='phone'
                        value={candidate?.phone}
                        placeholder='Nhập SĐt ứng viên'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.phone && (
                          <div className={`${styles.t_require} `}>
                            {errors.phone}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Giới tính <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Selects
                          selectedOption={selectedGender}
                          onChange={handleSelectChange}
                          padding={15}
                          width_control={100}
                          width_menu={97}
                          height={33.6}
                          setState={setGender}
                          option={options.chongioitinh}
                          placeholder={'Chọn giới tính'}
                        />
                        <span>
                          {' '}
                          {errors.gender && (
                            <div className={`${styles.t_require} `}>
                              {errors.gender}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Ngày sinh <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='date'
                        id='birthday'
                        value={format(
                          parseISO(candidate?.can_birthday),
                          'yyyy-MM-dd'
                        )}
                        placeholder='dd/mm/yyyy'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.birthday && (
                          <div className={`${styles.t_require} `}>
                            {errors.birthday}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Quê quán </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='hometown'
                        value={candidate?.hometown}
                        placeholder='Nhập quê quán'
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Trình độ học vấn <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Selects
                          selectedOption={selectedEducation}
                          onChange={handleSelectChange}
                          padding={15}
                          width_control={100}
                          width_menu={97}
                          height={33.6}
                          setState={setEducation}
                          option={options.trinhdohocvan}
                          placeholder={'-- Vui lòng chọn --'}
                        />
                        <span>
                          {' '}
                          {errors.education && (
                            <div className={`${styles.t_require} `}>
                              {errors.education}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Trường học</label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='school'
                        value={candidate?.school}
                        placeholder='Nhập trường học'
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Kinh nghiệm làm việc{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Selects
                          selectedOption={selectedExp}
                          onChange={handleSelectChange}
                          padding={15}
                          width_control={100}
                          width_menu={97}
                          height={33.6}
                          setState={setExp}
                          option={options.kinhnghiemlamviec}
                          placeholder={'-- Vui lòng chọn --'}
                        />
                        <span>
                          {' '}
                          {errors.exp && (
                            <div className={`${styles.t_require} `}>
                              {errors.exp}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Tình trạng hôn nhân{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Selects
                          selectedOption={selectedMarried}
                          onChange={handleSelectChange}
                          padding={15}
                          width_control={100}
                          width_menu={97}
                          height={33.6}
                          setState={setMarried}
                          option={options.tinhtranghonnhan}
                          placeholder={'-- Vui lòng chọn --'}
                        />
                        <span>
                          {' '}
                          {errors.meried && (
                            <div className={`${styles.t_require} `}>
                              {errors.meried}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Địa chỉ <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right} `}>
                      <input
                        type='text'
                        id='address'
                        value={candidate?.can_address}
                        placeholder='Nhập địa chỉ ứng viên'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.address && (
                          <div className={`${styles.t_require} `}>
                            {errors.address}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Nguồn ứng viên <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right} `}>
                      <input
                        type='text'
                        id='cvFrom'
                        value={candidate?.cvFrom}
                        placeholder='Nhập nguồn ứng viên'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.cvFrom && (
                          <div className={`${styles.t_require} `}>
                            {errors.cvFrom}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Tên nhận viên tuyển dụng{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Select
                          value={selectedUseHiring}
                          placeholder="Nhân viên tuyển dụng"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '97%',
                              color: state.isFocused ? '#444444' : '#444444',
                              fontWeight: state.isFocused ? 600 : 600
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "#444444",
                            }),
                          }}
                        />
                        <span>
                          {' '}
                          {errors.userHiring && (
                            <div className={`${styles.t_require} `}>
                              {errors.userHiring}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Tên nhận viên giới thiệu{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Select
                          value={selectedUseRecomment}
                          placeholder="Nhân viên giới thiệu"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: 4,
                              fontSize: state.isFocused ? 14 : 14,
                              minHeight: state.isFocused ? 20 : 20,
                              width: '97%',
                              color: state.isFocused ? '#444444' : '#444444',
                              fontWeight: state.isFocused ? 600 : 600
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
                    <label htmlFor='' style={{ color: '#337AB7' }}>
                      Giai đoạn nhận hồ sơ{' '}
                    </label>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Thời gian nhận hồ sơ{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='date'
                        id='timeSendCv'
                        value={format(
                          parseISO(candidate?.timeSendCv),
                          'yyyy-MM-dd'
                        )}
                        placeholder='dd/mm/yyyy --:--:--'
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Thời gian chuyển giai đoạn{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='date'
                        id='timeSendCv'
                        value={format(
                          parseISO(candidate?.timeSendCv),
                          'yyyy-MM-dd'
                        )}
                        placeholder='dd/mm/yyyy --:--:--'
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groupss}`}>
                    <label htmlFor=''>
                      Đánh giá hồ sơ <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <Rating
                        size={27}
                        initialValue={candidate?.star_vote}
                        disableFillHover
                        className={`${styles.star_rating}`}
                        onClick={handleRating}
                      />
                      {candidate?.listSkill?.map((item: any, index: any) => {
                        return (
                          <div key={index} className={`${styles.another_add_uv_1}`} style={{ marginLeft: 95, marginBottom: 15 }}>
                            <div className={`${styles.another_skill}`} style={{ marginTop: 10 }}>
                              <p style={{ color: "black", display: 'inline-block', paddingRight: 20 }}>{item?.skillName}: </p>
                              <Rating size={27} disableFillHover initialValue={item?.skillVote} className={`${styles.star_rating}`} />
                            </div>
                          </div>
                        )
                      })}
                      <span>
                        {' '}
                        {errors.starVote && (
                          <div className={`${styles.t_require} `}>
                            {errors.starVote}
                          </div>
                        )}
                      </span>
                      <div className={`${styles.skills_container}`}>
                        {addAnotherSkill}
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mức lương mong muốn{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right} `}>
                      <input
                        type='text'
                        id='resiredSalary'
                        defaultValue={candidateAll?.data?.resiredSalary}
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.resiredSalary && (
                          <div className={`${styles.t_require} `}>
                            {errors.resiredSalary}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mức lương thực <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right} `}>
                      <input
                        type='text'
                        id='salary'
                        defaultValue={candidateAll?.data?.salaryyyy}
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Thời gian hẹn <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='date'
                        id='timeInterView'
                        defaultValue={format(
                          parseISO(candidateAll?.data?.interview_time),
                          'yyyy-MM-dd'
                        )}
                        placeholder='dd/mm/yyyy'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.timeInterView && (
                          <div className={`${styles.t_require} `}>
                            {errors.timeInterView}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Nhân viên tham gia{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        <Selects
                          selectedOption={options.tennhanvienphongvandefault}
                          onChange={handleSelectChange}
                          padding={15}
                          width_control={100}
                          width_menu={97}
                          height={33.6}
                          setState={setEmpInterview}
                          option={options.tennhanvientuyendung}
                          placeholder={'Chọn nhân viên'}
                        />
                        <span>
                          {' '}
                          {errors.empInterview && (
                            <div className={`${styles.t_require} `}>
                              {errors.empInterview}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Ghi chú <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right} `}>
                      <textarea
                        style={{ height: 60 }}
                        id='note'
                        defaultValue={candidate?.can_address}
                        className={`${styles.input_process}`}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.modal_footer} ${styles.footer_process}`}>
                  <button className={`${styles.btn_cancel}`} onClick={onCancel}>
                    Hủy
                  </button>
                  <button
                    className={`${styles.btn_add}`}
                    onClick={handleSubmit}>
                    Thêm
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
