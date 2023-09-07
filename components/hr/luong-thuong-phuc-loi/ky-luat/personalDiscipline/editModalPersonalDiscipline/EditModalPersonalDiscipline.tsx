import React, { useEffect, useState } from 'react'
import styles from './EditModalPersonalDiscipline.module.css'
import Select from 'react-select'
import { format } from 'date-fns'
import { getDataUser } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { UpdateInfringes } from '@/pages/api/api-hr/luong-thuong-phuc-loi/discipline'

function EditModalPersonalDiscipline({ animation, onClose, dataOld }: any) {
  const id = dataOld?.id
  const infringeName = dataOld?.infringe_name
  const infringeType = dataOld?.infringe_type
  const numberViolation = dataOld?.number_violation
  const regulatoryBasis = dataOld?.regulatory_basis
  const createdBy = dataOld?.created_by
  const formattedDate: string = format(
    new Date(dataOld.created_at),
    'yyyy-MM-dd'
  )

  const [user, setUser] = useState<any>()
  const [errors, setErrors] = useState<any>({})
  const [listUser, setListUser] = useState<any>({
    list_user: dataOld?.list_user.split(',') || "",
    list_user_name: dataOld?.list_user_name.split(',') || "",
  })
  const [content, setContent] = useState<any>({
    infringe_name: infringeName,
    regulatory_basis: regulatoryBasis,
    number_violation: numberViolation,
    infringe_at: formattedDate,
    infringe_type: infringeType,
    created_by: createdBy,
  })

  const userIds = dataOld?.list_user.split(',');
  const userNames = dataOld?.list_user_name.split(',');

  const tendoituongdefault = userIds.map((userId, index) => ({
    value: userId,
    label: userNames[index]
  }));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataUser()
        setUser(
          response?.data?.data?.items?.map((item) => ({
            name: 'list_user',
            value: item.ep_id,
            label: `${item.ep_name} ${item.dep_name}`,
          }))
        )
      } catch (err) { }
    }
    getData()
  }, [])

  const options = {
    tendoituong: user,
  }

  const handleContentChange = (event) => {
    const { name, value } = event.target
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    const selectedLabels = selectedOptions.map((option) => option.label)
    setListUser((prevSelectedOption) => ({
      ...prevSelectedOption,
      list_user: selectedValues,
      list_user_name: selectedLabels,
    }))
  }

  const mergedObject = { ...content, ...listUser }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // await schema.validate(mergedObject, { abortEarly: false });
      const response = await UpdateInfringes(id, mergedObject)

      if (response?.status !== 200) {
        alert('Sửa khen thưởng không thành công')
      } else {
        onClose()
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
              <h5 className={`${styles.modal_title}`}>CẬP NHẬT VI PHẠM </h5>
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
                      defaultValue={infringeName}
                      className={`${styles.inputquytrinh}`}
                      name='infringe_name'
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
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
                      defaultValue={regulatoryBasis}
                      name='regulatory_basis'
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
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
                      defaultValue={infringeType}
                      name='number_violation'
                      className={`${styles.inputquytrinh}`}
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
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
                      defaultValue={formattedDate}
                      name='infringe_at'
                      className={`${styles.inputquytrinh}`}
                      style={{ height: '30.6px' }}
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
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
                      defaultValue={numberViolation}
                      name='infringe_type'
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
                  </div>
                </div>

                <div className={`${styles.form_groups}`}>
                  <label>
                    Cá nhân vi phạm
                    <span className={`${styles.red}`}> *</span>
                    <div
                      className={`${styles.red} ${styles.float_right}`}></div>
                  </label>
                  <div
                    style={{ marginRight: '2%' }}
                    className={`${styles.select}`}>
                    <Select
                      isMulti={true}
                      defaultValue={tendoituongdefault}
                      options={options.tendoituong}
                      placeholder={'--Vui lòng chọn--'}
                      onChange={(option) =>
                        handleSelectionChange(option, options.tendoituong)
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
                      defaultValue={createdBy}
                      name='created_by'
                      onChange={handleContentChange}></input>
                    <picture style={{ display: 'none' }}>
                      <img src={`${'/danger.png'}`} alt='Lỗi'></img>
                    </picture>
                    <div
                      className={`${styles.errors}`}
                      style={{ display: 'none' }}></div>
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
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditModalPersonalDiscipline
