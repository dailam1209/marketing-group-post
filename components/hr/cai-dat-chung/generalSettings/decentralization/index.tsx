import React, { useEffect, useState } from 'react'
import styles from './Decentralization.module.css'
import Select from 'react-select'
import { getDataUser } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import { SettingPermission, GetListPermision } from '@/pages/api/api-hr/cai-dat/generalSettings'


export default function Decentralization({ }) {
  const [user, setUser] = useState<any>()
  const [userId, setUserId] = useState<any>()
  const [localListCheck, setLocalListCheck] = useState<any>([])
  const [listPermision, setListPermision] = useState<any>()

  const handleSelectionChange = (selectedOptions, actionMeta) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    const selectedValuesString = selectedValues.join(', ')
    setUserId((prevSelectedOption) => ({
      ...prevSelectedOption,
      userId: selectedValuesString,
    }))
  }

  console.log(userId);
  console.log(listPermision)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId.userId) {
          const formData = new FormData()
          formData.append("userId", userId.userId)
          const response = await GetListPermision(formData)
          if (response) {
            setListPermision(response?.data)
          }
        }
      } catch (error) {
      }
    }
    fetchData()
  }, [userId])


  const handleClickCheckBox = (event: any) => {
    const { name, checked, value } = event.target
    console.log(name, checked, value);

    if (name === 'role_td') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_ttns') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_ttvp') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_dldx') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_hnnv') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_bcns') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
    if (name === 'role_tgl') {
      setLocalListCheck((prev) => {
        const prevValueArray = prev[name] ? prev[name].split(',') : []

        if (checked) {
          if (!prevValueArray.includes(value)) {
            prevValueArray.push(value)
          }
        } else {
          const index = prevValueArray.indexOf(value)
          if (index !== -1) {
            prevValueArray.splice(index, 1)
          }
        }
        return {
          ...prev,
          [name]: prevValueArray.join(','),
        }
      })
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataUser()
        setUser(
          response?.data?.data?.items?.map((item) => ({
            name: 'userId',
            value: item.ep_id,
            label: `${item.ep_name} ${item.dep_name}`,
          }))
        )
      } catch (err) { }
    }
    getData()
  }, [])

  const dataRes = { ...userId, ...localListCheck }
  const handleUpdateRole = async (event: any) => {
    try {
      const response = await SettingPermission(dataRes)
      if (response?.status !== 200) {
        alert('Cấp quyền thất bại')
      }
    } catch (error) { }
  }

  const options = {
    tennhanvien: user,
  }

  console.log(listPermision?.infoRoleTTNS?.find((item: any) => item?.perId === 3) ? true : false);

  return (
    <>
      <div className={`${styles.l_phanquyen}`}>
        <div className={`${styles.l_phanquyen_item1}`}>
          QUẢN LÝ PHÂN QUYỀN CHUNG CHO NGƯỜI DÙNG
        </div>

        <div className={`${styles.l_phanquyen_item2}`}>
          <div className={`${styles.l_timkiem_nhanvien_item1}`}>
            Chọn nhân viên :
          </div>
          <div className={`${styles.l_timkiem_nhanvien_item2}`}>
            <Select
              isMulti
              options={options.tennhanvien}
              placeholder='Chọn đối tượng'
              onChange={(option) =>
                handleSelectionChange(option, options.tennhanvien)
              }
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: 4,
                  orderColor: '#4747477a',
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
          <div>
            <form onSubmit={(e) => handleUpdateRole(e)}>
              <div className={`${styles.l_tbl}`}>
                <div className={`${styles.l_tbl_row}`}>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center}`}>
                    Quyền người dùng
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Xem
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Tạo mới
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Chỉnh sửa
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_text} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    Xóa
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Quản lý tuyển dụng
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      type='checkbox'
                      defaultChecked={listPermision?.infoRoleTD?.find((item: any) => item?.perId === 1) ? true : false}
                      value='1'
                      onClick={(e) => handleClickCheckBox(e)}
                    >
                    </input>
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleTD?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleTD?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_td'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleTD?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Quản lý thông tin nhân sự
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleTTNS?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleTTNS?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleTTNS?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttns'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleTTNS?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Thành tích - Vi phạm
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleTTVP?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleTTVP?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleTTVP?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_ttvp'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleTTVP?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Hội nhập nhân viên
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleHNNV?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleHNNV?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleHNNV?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_hnnv'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleHNNV?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Báo cáo nhân sự
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleBCNS?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleBCNS?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleBCNS?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_bcns'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleBCNS?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Dữ liệu đã xóa gần đây
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleDXGD?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleDXGD?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleDXGD?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_dldx'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleDXGD?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>

                <div className={`${styles.l_tbl_row}`}>
                  <div className={`${styles.l_tbl_cell} ${styles.l_tbl_text1}`}>
                    Tăng/giảm lương
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      type='checkbox'
                      value='1'
                      defaultChecked={(listPermision?.infoRoleTGL?.find((item: any) => item?.perId === 1)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center}  ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      type='checkbox'
                      value='2'
                      defaultChecked={(listPermision?.infoRoleTGL?.find((item: any) => item?.perId === 2)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      type='checkbox'
                      value='3'
                      defaultChecked={(listPermision?.infoRoleTGL?.find((item: any) => item?.perId === 3)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>

                  <div
                    className={`${styles.l_tbl_cell} ${styles.l_tbl_center} ${styles.l_tbl_border}`}>
                    <input
                      className={`${styles.l_tbl_checkbox}`}
                      name='role_tgl'
                      type='checkbox'
                      value='4'
                      defaultChecked={(listPermision?.infoRoleTGL?.find((item: any) => item?.perId === 4)) ? true : false}
                      onClick={(e) => handleClickCheckBox(e)}></input>
                  </div>
                </div>
              </div>
              <button className={`${styles.l_btn_retypePass}`} type='submit'>
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
