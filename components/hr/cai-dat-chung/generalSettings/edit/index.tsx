import React, { useEffect, useState } from 'react'
import styles from './edit.module.css'
import { updateInfoCompany } from '@/pages/api/api-hr/cai-dat/generalSettings'

export default function Edit({ dataDisplay, onClickButton }) {
  console.log(dataDisplay)
  const defaultValueInputName = dataDisplay?.userName
  const defaultValueInputPhone = dataDisplay?.phone
  const defaultValueInputDep = dataDisplay?.description
  const defaultValueInputCom_size = dataDisplay?.com_size
  const defaultValueInputAddress = dataDisplay?.address
  const defaultValueInputEmail = dataDisplay?.emailContact

  const [inputValue, setInputValue] = useState({
    userName: dataDisplay?.userName,
    emailContact: dataDisplay?.emailContact,
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClickEdit = async (e: any) => {
    try {
      const response = await updateInfoCompany(inputValue)
      if (response?.status !== 200) {
        alert('Cập nhật thông tin công ty không thành công')
      }
    } catch (error) {}
  }
  return (
    <>
      <div className={`${styles.l_drop_chinhsua}`}>
        <form onSubmit={(e) => handleClickEdit(e)}>
          <div className={`${styles.l_chinhsua_item}`}>
            <div className={`${styles.l_chinhsua_item_left}`}>
              <label>Tên công ty:</label>
              <div>
                <input
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputName}
                  disabled={true}
                />
              </div>
            </div>

            <div className={`${styles.l_chinhsua_item_right}`}>
              <label>Điện thoại:</label>
              <div>
                <input
                  name='phone'
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.l_chinhsua_item}`}>
            <div className={`${styles.l_chinhsua_item_left}`}>
              <label>Lĩnh vực hoạt động:</label>
              <div>
                <input
                  name='description'
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputDep}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={`${styles.l_chinhsua_item_right}`}>
              <label>Quy mô nhân sự:</label>
              <div>
                <input
                  name='com_size'
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputCom_size}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.l_chinhsua_item}`}>
            <div className={`${styles.l_chinhsua_item_left}`}>
              <label>Địa chỉ liên lạc:</label>
              <div>
                <input
                  name='address'
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={`${styles.l_chinhsua_item_right}`}>
              <label>Email:</label>
              <div>
                <input
                  className={`${styles.l_chinhsua_item_input}`}
                  defaultValue={defaultValueInputEmail}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.l_chinhsua_item_button}`}>
            <div className={`${styles.l_button_left}`}>
              <button onClick={onClickButton}>Hủy bỏ</button>
            </div>

            <div className={`${styles.l_button_right}`}>
              <button type='submit' onClick={(e) => handleClickEdit(e)}>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
