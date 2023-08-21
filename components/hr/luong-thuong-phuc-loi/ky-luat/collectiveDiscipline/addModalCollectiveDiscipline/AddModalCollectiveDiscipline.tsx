import React, { useEffect, useState } from 'react'
import styles from './AddModalPersonalDiscipline.module.css'
import Select from 'react-select'

import * as Yup from 'yup'
import jwt_decode from 'jwt-decode'
import { getToken } from '@/pages/api/api-hr/token'
import { GetDepartmentList } from '@/pages/api/api-hr/luong-thuong-phuc-loi/reward'
import { AddInfringesGroup } from '@/pages/api/api-hr/luong-thuong-phuc-loi/discipline'

function AddModalCollectiveDiscipline({ animation, onClose, updateData }: any) {
  const [content, setContent] = useState<any>()
  const [listDep, setListDep] = useState<any>()
  const [dep, setDep] = useState<any>()
  const [errors, setErrors] = useState<any>({})
  const [tokenComId, setComId] = useState<any>(null)
  const COOKIE_KEY = 'token_base365'

  useEffect(() => {
    const currentCookie = getToken(COOKIE_KEY)
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie)
      setComId(decodedToken?.data?.com_id)
    }
  }, [])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetDepartmentList(tokenComId.toString())
        setListDep(
          response?.data.data.data.map((item) => ({
            name: 'depId',
            value: item.dep_id,
            label: `${item.dep_name}`,
          }))
        )
      } catch (err) { }
    }
    getData()
  }, [tokenComId])

  const options = {
    tenphongban: listDep,
  }

  const handleContentChange = (event) => {
    const { name, value } = event.target
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSelectionChange = (selectedOptions, actionMeta) => {
    setDep((prevSelectedOption) => ({
      ...prevSelectedOption,
      dep_id: selectedOptions.value,
      dep_name: selectedOptions.label,
    }))
  }
  const mergedObject = { ...content, ...dep }
  const schema = Yup.object().shape({
    infringe_name: Yup.string().required('Tên lỗi không được để trống'),
    regulatory_basis: Yup.string().required('Căn cứ không được để trống'),
    number_violation: Yup.string().required('Số quy định không được để trống'),
    dep_id: Yup.string().required('Chọn tập thể vi phạm'),
    created_by: Yup.string().required('Người ký không được để trống'),
    infringe_at: Yup.string().required('Thời gian không được để trống'),
    infringe_type: Yup.string().required('Hình thức không được để trống'),
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await schema.validate(mergedObject, { abortEarly: false })
      const response = await AddInfringesGroup(mergedObject)
      if (response?.status === 404) {
        alert('Không tìm thấy nhân viên trong phòng ban ')
      } else if (response?.status === 200) {
        onClose()
        updateData(response?.data)
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
      <div className={`${styles.overlay}`} onClick={onClose}></div>
      <div
        className={`${styles.modal} ${styles.modal_setting}  ${animation ? styles.fade_in : styles.fade_out
          }`}
        style={{ display: 'block' }}>
        <div className={`${styles.modal_dialog} ${styles.contentquytrinh}`}>
          <div className={`${styles.modal_content} `}>
            {/* header */}
            <div className={`${styles.modal_header} ${styles.headquytrinh}`}>
              <h5 className={`${styles.modal_title}`}>
                THÊM MỚI VI PHẠM TẬP THỂ
              </h5>
            </div>
            {/* body */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.modal_form}`}>
              <div className={`${styles.modal_body} ${styles.bodyquytrinh}`}>
                <div className={`${styles.form_groups}`}>
                  <label>
                    Tên lỗi vi phạm
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type='text'
                      className={`${styles.inputquytrinh}`}
                      placeholder={'Tên lỗi vi phạm'}
                      name='infringe_name'
                      onChange={handleContentChange}></input>
                    {errors.infringe_name && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
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
                      type='text'
                      placeholder={'Căn cứ quy định'}
                      className={`${styles.inputquytrinh}`}
                      name='regulatory_basis'
                      onChange={handleContentChange}></input>
                    {errors.regulatory_basis && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
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
                      type='text'
                      className={`${styles.inputquytrinh}`}
                      placeholder={'Số quy định xử lý vi phạm'}
                      name='number_violation'
                      onChange={handleContentChange}></input>
                    {errors.number_violation && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
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
                      type='date'
                      className={`${styles.inputquytrinh}`}
                      style={{ height: '30.6px' }}
                      name='infringe_at'
                      onChange={handleContentChange}></input>
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
                      type='text'
                      className={`${styles.inputquytrinh}`}
                      placeholder={'Hình thức xử lý sai phạm'}
                      name='infringe_type'
                      onChange={handleContentChange}></input>
                    {errors.infringe_type && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
                        </picture>
                        <div className={`${styles.errors}`}>
                          {errors.infringe_type}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Tập thể vi phạm
                    <span className={`${styles.red}`}> *</span>
                    {errors.dep_id && (
                      <>
                        <div
                          className={`${styles.errors}`}
                          style={{ marginTop: 6 }}>
                          {errors.dep_id}
                        </div>
                      </>
                    )}
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div
                    style={{ marginRight: '2%' }}
                    className={`${styles.select}`}>
                    <Select
                      options={options.tenphongban}
                      placeholder={'--Vui lòng chọn--'}
                      onChange={(option) =>
                        handleSelectionChange(option, options.tenphongban)
                      }
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: 8,
                          borderColor: '#4747477a',
                          height: 'auto',
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
                    Người ký quyết định
                    <span className={`${styles.red}`}> *</span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type='text'
                      className={`${styles.inputquytrinh}`}
                      placeholder={'Người ký quyết định'}
                      name='created_by'
                      onChange={handleContentChange}></input>
                    {errors.created_by && (
                      <>
                        <picture>
                          <img
                            className={`${styles.icon_err}`}
                            src={`${'/danger.png'}`}
                            alt='Lỗi'></img>
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
                    Số tiền phạt
                    <span className={`${styles.red}`}></span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <input
                      type='number'
                      className={`${styles.inputquytrinh}`}
                      placeholder={'Số tiền phạt'}
                      name='price'
                      onChange={handleContentChange}></input>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Lý do phạt
                    <span className={`${styles.red}`}></span>
                  </label>
                  <div className={`${styles.inputright}`}>
                    <textarea
                      className={`${styles.inputquytrinh}`}
                      name='resion'
                      onChange={handleContentChange}
                      placeholder={'Lý do phạt'}></textarea>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.modal_footer} ${styles.footerquytrinh}`}>
                <button
                  type='button'
                  className={`${styles.btn_huy}`}
                  onClick={onClose}>
                  Hủy
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

export default AddModalCollectiveDiscipline
