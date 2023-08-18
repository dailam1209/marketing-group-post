/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from 'react'
import styles from './addRecruitmentProcess.module.css'
import AddAdditionalRecruitmentProcess from '../addAdditionalRecruitmentProcess/addAdditionalRecruitmentProcess'
import * as Yup from 'yup'
import { AddDataRecruitment } from '@/pages/api/api-hr/quan-ly-tuyen-dung/RecruitmentManagerService'
export default function AddRecruitmentProcess({
  animation,
  handleCloseModalAdd,
  addRecruitmentProcess,
}: any) {
  const [additionalProcesses, setAdditionalProcesses] = useState<JSX.Element[]>(
    []
  )
  const [lastAddedIndex, setLastAddedIndex] = useState(-1)
  const [errors, setErrors] = useState<any>({})
  const [formData, setFormData] = useState<any>({
    nameProcess: '',
    applyFor: '',
    listStage: [{}],
  })
  const schema = Yup.object().shape({
    nameProcess: Yup.string().required('Tên quy trình không được để trống'),
    applyFor: Yup.string().required('Đối tượng không được để trống'),
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddProcess = () => {
    const newStage = {
      nameStage: '',
      posAssum: '',
      target: '',
      time: '',
      des: '',
    }

    const updatedFormData = {
      ...formData,
      listStage: [...formData.listStage, newStage],
    }
    const newProcess = (
      <AddAdditionalRecruitmentProcess
        postData={(data) => createListData(data, additionalProcesses.length)}
        key={additionalProcesses.length}
      />
    )
    setAdditionalProcesses([...additionalProcesses, newProcess])
    setLastAddedIndex(additionalProcesses.length)
    setFormData(updatedFormData)
  }

  const createListData = (data, index) => {
    setFormData((prevState) => {
      const updatedListStage = prevState.listStage.map((stage, i) => {
        if (i === index) {
          return data
        }
        return stage
      })

      return {
        ...prevState,
        listStage: updatedListStage,
      }
    })
  }

  const handleDeleteProcess = (index) => {
    const updatedProcesses = [...additionalProcesses]
    updatedProcesses.splice(lastAddedIndex, 1)
    setAdditionalProcesses(updatedProcesses)
    setLastAddedIndex(updatedProcesses.length - 1)
    const updatedStages = [...formData.listStage]
    updatedStages.splice(index, 1)
    setFormData((prevFormData) => ({
      ...prevFormData,
      listStage: updatedStages,
    }))
  }

  useEffect(() => {
    setAdditionalProcesses([
      <AddAdditionalRecruitmentProcess
        postData={(data) => createListData(data, additionalProcesses.length)}
        key={additionalProcesses.length}
      />,
    ])
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      const response = await AddDataRecruitment(formData)
      if (response?.status === 403) {
        alert(
          'Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng liên hệ quản trị viên để biết thêm chi tiết!'
        )
      } else if (response?.status !== 200) {
        alert('Thêm giai đoạn không thành công')
      } else {
        addRecruitmentProcess(response?.data)
        handleCloseModalAdd()
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

  return (
    <>
      <div className={`${styles.overlay} `} onClick={handleCloseModalAdd}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${
          animation ? styles.fade_in : styles.fade_out
        }`}>
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                THÊM QUY TRÌNH TUYỂN DỤNG
              </h5>
            </div>

            {/* body */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên quy trình
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type='text'
                      name='nameProcess'
                      className={`${styles.inputquytrinh}`}
                      placeholder='Nhập tên quy trình tuyển dụng'
                      onChange={handleChange}></input>
                    {errors.nameProcess && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.nameProcess}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Đối tượng áp dụng
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type='text'
                      name='applyFor'
                      className={`${styles.inputquytrinh}`}
                      placeholder='Nhập đối tượng áp dụng'
                      onChange={handleChange}></input>
                    {errors.applyFor && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.applyFor}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.dom_gd}`}>
                  {additionalProcesses.map((process, index) => (
                    <div key={index}>
                      {index === lastAddedIndex && index >= 1 && (
                        <button
                          onClick={() => handleDeleteProcess(index)}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            marginLeft: '94%',
                            position: 'relative',
                            top: '25px',
                          }}>
                          <picture>
                            <img
                              src={`${'/icon-remove-quytrinh.svg'}`}
                              alt='Xóa'
                            />
                          </picture>
                        </button>
                      )}
                      {process}
                    </div>
                  ))}
                </div>

                {/* thêm giai đoạn */}
                <div className={`${styles.clearfix}`}>
                  <p
                    style={{ cursor: 'default' }}
                    className={`${styles.pull_right} ${styles.add_gd}`}
                    onClick={handleAddProcess}>
                    Thêm mới giai đoạn
                  </p>
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                <button
                  type='button'
                  className={`${styles.btn_huy}`}
                  onClick={handleCloseModalAdd}>
                  <span>Hủy</span>
                </button>
                <button type='submit' className={`${styles.success}`}>
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
