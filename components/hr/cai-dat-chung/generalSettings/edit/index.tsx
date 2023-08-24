import React, { useEffect, useState } from "react";
import styles from "./edit.module.css";
import { updateInfoCompany } from "@/pages/api/api-hr/cai-dat/generalSettings";
import Popup from "./popup";

export default function Edit({ dataDisplay, onClickButton }) {
  const defaultValueInputName = dataDisplay?.com_name;
  const defaultValueInputPhone = dataDisplay?.com_phone;
  const defaultValueInputDep = dataDisplay?.com_description;
  const defaultValueInputCom_size = dataDisplay?.com_size;
  const defaultValueInputAddress = dataDisplay?.com_address;
  const defaultValueInputEmail = dataDisplay?.com_email;
  const [popup, setPopup] = useState<any>(false)
  const [inputValue, setInputValue] = useState({
    userName: defaultValueInputName,
    emailContact: defaultValueInputEmail,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickEdit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await updateInfoCompany(inputValue);
      console.log(response);
      if (response?.data?.result == true) {
        setPopup(true)
      }
    } catch (error) {}
  };
  const onClosePopup = () => {
    setPopup(false)
  }
  return (
    <>
      {popup && <Popup onClosePopup = {onClosePopup}></Popup>}
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
                  name="phone"
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
                  name="description"
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
                  name="com_size"
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
                  name="address"
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
              <button type="submit" onClick={(e) => handleClickEdit(e)}>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}
