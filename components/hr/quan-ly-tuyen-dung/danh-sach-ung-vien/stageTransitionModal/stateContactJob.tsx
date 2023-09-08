import React, { useState, useEffect, useMemo, useRef } from 'react'
import styles from '../candidateAddModal/candidateAddModal.module.css'
import { CandidateList } from '@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList'
import { GetListNews } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { Rating } from 'react-simple-star-rating'
import { EmployeeList } from '@/pages/api/api-hr/listNhanVien'
import { parseISO, format } from 'date-fns'
import Selects from '../../../select'
import HandleAddAnotherSkill from '../candidateAddModal/addAnotherSkill'
import { AddContactJob } from '@/pages/api/api-hr/quan-ly-tuyen-dung/candidateList'
import * as Yup from 'yup'

type SelectOptionType = { label: string; value: string }

export default function StageContactJob({
  onCancel,
  process_id,
  data,
  process_id_from,
}: any) {

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    null
  )
  const [isCandidate, setCandidate] = useState<any>(null)
  const [isEmpList, setEmpList] = useState<any>(null)
  const [empInterview, setEmpInterview] = useState<any>(null)
  const [isNewList, setNewsList] = useState<any>(null)
  const [isRecruitmentNewsId, setRecruitmentNewsId] = useState<any>(data?.recruitmentNewsId)
  const [addAnotherSkill, setAddAnotherSkill] = useState<JSX.Element[]>([])
  const [skills, setSkills] = useState<{ skillName: string; skillVote: any }[]>(
    []
  )
  const [lastAddedIndex, setLastAddedIndex] = useState(-1)
  const [rating, setRating] = useState<any>(data?.star_vote)
  const [isUserHiring, setUserHiring] = useState<any>(data?.user_hiring)
  const [errors, setErrors] = useState<any>({})
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
        const response = await CandidateList(formData)
        const responseData: any = response?.success
        if (responseData) {
          const candidateFound = responseData?.data?.data?.find(
            (item: any) =>
              item.id === Number(data?.id) || item.id === Number(data?.canId)
          )
          setCandidate(candidateFound)
        }
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        const comid: any = 121598
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
    cvFrom: Yup.string().required('Nhập nguồn ứng viên'),
    userHiring: Yup.string().required('Chọn nhân viên tuyển dụng'),
    recruitment: Yup.string().required('Chọn vị trí tuyển dụng'),
    timeSendCv: Yup.string().required('Thời gian gửi không được để trống'),
    empInterview: Yup.string().required('Chọn nhân viên tham gia'),
    salary: Yup.string().required('Chọn mức lương thực'),
    resiredSalary: Yup.string().required('Chọn mức lương mong muốn'),
    timeContact: Yup.string().required('Chọn ngày kí hợp đồng'),
  })

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const name = (document.getElementById('name') as HTMLInputElement)?.value
      const cvFrom = (document.getElementById('cvFrom') as HTMLInputElement)
        ?.value
      const timeSendCv = (
        document.getElementById('timeSendCv') as HTMLInputElement
      )?.value

      const note = (document.getElementById('note') as HTMLInputElement)?.value
      const salary = (document.getElementById('salary') as HTMLInputElement)
        ?.value
      const resiredSalary = (
        document.getElementById('resiredSalary') as HTMLInputElement
      )?.value
      const offerTime = (
        document.getElementById('offerTime') as HTMLInputElement
      )?.value
      const canid: any = process_id_from === 0 ? data?.id : data?.canId

      const formDatas = {
        name: name || '',
        cvFrom: cvFrom || '',
        userHiring: isUserHiring || '',
        recruitment: isRecruitmentNewsId || '',
        timeSendCv: timeSendCv || '',
        empInterview: empInterview || '',
        salary: salary || '',
        resiredSalary: resiredSalary || '',
        timeContact: offerTime || '',
      }
      await validationSchema.validate(formDatas, {
        abortEarly: false,
      })

      const formData = new FormData()
      formData.append('canId', canid)
      formData.append('name', name)
      formData.append('userHiring', isUserHiring)
      formData.append('recruitmentNewsId', isRecruitmentNewsId)
      formData.append('cvFrom', cvFrom)
      formData.append('timeSendCv', timeSendCv)
      formData.append('starVote', rating)
      formData.append('note', note)
      formData.append('epOffer', empInterview)
      formData.append('salary', salary)
      formData.append('resiredSalary', resiredSalary)
      formData.append('offerTime', offerTime)
      {
        skills?.map((item, index) => {
          const skillData = {
            skillName: item.skillName,
            skillVote: item.skillVote,
          }
          formData.append('listSkill', JSON.stringify(skillData))
        })
      }

      const response = await AddContactJob(formData)
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
        label: `(${emp.ep_id}) ${emp.ep_name} - ${emp.dep_name ? emp.dep_name : "Chưa cập nhật"}`,
      })),
    [isEmpList?.items]
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
    chontrangthai: [
      { value: 1, label: 'Trượt phỏng vấn' },
      { value: 2, label: 'Trượt học việc' },
      { value: 3, label: 'Trượt vòng loại hồ sơ' },
    ],
    tennhanvientuyendung: chonnhanvienOptions,
    vitrituyendung: [
      { value: data?.recruitmentNewsId, label: data?.new_title },
    ],

    tennhanvientuyendungdefault: [
      { value: data?.user_hiring, label: data?.hrName },
    ],

  }

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>CHUYỂN TRẠNG THÁI</h5>
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
                        id='name'
                        defaultValue={data?.name}
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
                      Nguồn ứng viên <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='cvFrom'
                        defaultValue={data?.cvFrom}
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
                      Tên nhân viên tuyển dụng{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        {options?.tennhanvientuyendungdefault && (
                          <Selects
                            selectedOption={
                              options?.tennhanvientuyendungdefault
                            }
                            onChange={handleSelectChange}
                            padding={15}
                            width_control={100}
                            width_menu={97}
                            height={33.6}
                            setState={setUserHiring}
                            option={options?.tennhanvientuyendung}
                            placeholder={'Chọn Nhân viên'}
                          />
                        )}
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
                      Vị trí tuyển dụng{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <div className={`${styles.div_no_pad} `}>
                        {options?.tennhanvientuyendungdefault && (
                          <Selects
                            selectedOption={options?.vitrituyendung}
                            onChange={handleSelectChange}
                            padding={15}
                            width_control={100}
                            width_menu={97}
                            height={33.6}
                            setState={setRecruitmentNewsId}
                            option={options?.vitrituyendung}
                            placeholder={'Chọn vị trí tuyển dụng'}
                          />
                        )}
                        <span>
                          {' '}
                          {errors.recruitment && (
                            <div className={`${styles.t_require} `}>
                              {errors.recruitment}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Thời gian gửi hồ sơ{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      {isCandidate?.timeSendCv && (
                        <input
                          type='date'
                          id='timeSendCv'
                          defaultValue={format(
                            parseISO(isCandidate?.timeSendCv),
                            'yyyy-MM-dd'
                          )}
                          placeholder='dd/mm/yyyy'
                          className={`${styles.input_process}`}
                        />
                      )}
                      <span>
                        {' '}
                        {errors.timeSendCv && (
                          <div className={`${styles.t_require} `}>
                            {errors.timeSendCv}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groupss}`}>
                    <label htmlFor=''>
                      Đánh giá hồ sơ <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <Rating
                        size={27}
                        initialValue={data?.star_vote}
                        disableFillHover
                        className={`${styles.star_rating}`}
                        onClick={handleRating}
                      />
                      <div className={`${styles.skills_container}`}>
                        {isCandidate?.listSkill?.map((item: any, index: any) => {
                          return (
                            <div key={index} className={`${styles.another_add_uv_1}`} style={{ marginLeft: 95, marginBottom: 15 }}>
                              <div className={`${styles.another_skill}`} style={{ marginTop: 10 }}>
                                <p style={{ display: 'inline-block', paddingRight: 20 }}>{item?.skillName}: </p>
                                <Rating size={27} disableFillHover initialValue={item?.skillVote} className={`${styles.star_rating}`} />
                              </div>
                            </div>
                          )
                        })}
                        {addAnotherSkill}
                      </div>
                      <a
                        className={`${styles.add_another_skill}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          HandleAddAnotherSkill({
                            lastAddedIndex,
                            setSkills,
                            setAddAnotherSkill,
                            setLastAddedIndex,
                          })
                        }>
                        Thêm Kỹ năng
                      </a>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mức lương mong muốn{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='resiredSalary'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.salary && (
                          <div className={`${styles.t_require} `}>
                            {errors.salary}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>
                      Mức lương thực <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='text'
                        id='salary'
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
                      Thời gian gửi hồ sơ{' '}
                      <span style={{ color: 'red' }}> * </span>
                    </label>
                    <div className={`${styles.input_right}`}>
                      <input
                        type='date'
                        id='offerTime'
                        placeholder='dd/mm/yyyy'
                        className={`${styles.input_process}`}
                      />
                      <span>
                        {' '}
                        {errors.timeContact && (
                          <div className={`${styles.t_require} `}>
                            {errors.timeContact}
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
                        {options?.tennhanvientuyendungdefault && (
                          <Selects
                            selectedOption={options?.tennhanvientuyendung}
                            onChange={handleSelectChange}
                            padding={15}
                            width_control={100}
                            width_menu={97}
                            height={33.6}
                            setState={setEmpInterview}
                            option={options?.tennhanvientuyendung}
                            placeholder={'Chọn Nhân viên'}
                          />
                        )}
                        <span>
                          {' '}
                          {errors.empInterView && (
                            <div className={`${styles.t_require} `}>
                              {errors.empInterView}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor=''>Ghi chú </label>
                    <div className={`${styles.input_right}`}>
                      <textarea
                        style={{ height: 50 }}
                        id='note'
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
