import { ChangeEvent, useContext, useEffect, useState } from "react";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import CustomerSelectBoxStep from "../quote_steps/select_box_step_customer";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';
import { QuoteContext } from "../quoteContext";

export default function AddDetailInfo() {
  const { newQuote, inputQuote, allAvailableStatusString, statusStrToNum,
  listCusOption, getCusId, keyword, setKeyword, setShouldFetchCus } = useContext(QuoteContext)
  const [localStatus, setLocalStatus] = useState('Chọn')
  const [localCustomer, setLocalCustomer] = useState('Chọn')
  const [localPhoneNum, setLocalPhoneNum] = useState('')

  const handleSimpleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    inputQuote(name, value);
  }

  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '').slice(0, 11);
    inputQuote('phone_number', newPhone)
  }

  const handleStatus = (str) => {
    setLocalStatus(str)
    // if (str === 'Chọn') {
    //   inputQuote('status', 0)
    // } else {
    inputQuote('status', statusStrToNum(str))
    // }
  }

  const handleCusId = (str) => {
    setLocalCustomer(str)
    inputQuote('customer_id', getCusId(str))
  }

  useEffect(()=>{
    setShouldFetchCus(true)
  },[])

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chi tiết</p>

      <div className={styles.row_input}>
        <InputText
          label="Ngày báo giá*"
          placeholder=""
          type="date"
          name="date_quote"
          value={newQuote.date_quote}
          onChange={handleSimpleInput}
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText
            label="Hạn thanh toán*"
            placeholder="Nhập"
            type="date"
            name="date_quote_end"
            value={newQuote.date_quote_end}
            onChange={handleSimpleInput}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <OrderSelectBoxStep
            value={localStatus}
            placeholder="Chọn"
            data={allAvailableStatusString()}
            setValue={handleStatus}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Khách hàng</label>
          <CustomerSelectBoxStep
            value={localCustomer}
            placeholder="Chọn"
            data={listCusOption}
            setValue={handleCusId}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText
            label="Mã số thuế"
            placeholder="Nhập mã số thuế"
            name="tax_code"
            value={newQuote.tax_code}
            onChange={handleSimpleInput}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            name="address"
            value={newQuote.address}
            onChange={handleSimpleInput}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          name="phone_number"
          value={newQuote.phone_number}
          onChange={handlePhoneInput}
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Cơ hội</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>

      </div>


      <div className={styles.row_input}>
        <label className={`${styles["form-label"]}`}>Lời giới thiệu</label>
        <textarea
          placeholder="Nhập lời giới thiệu"
          style={{ width: "100%", fontSize: 15, padding: 10, height: 80 }}
          name="introducer"
          value={newQuote.introducer}
          onChange={handleSimpleInput}
        ></textarea>
      </div>
    </div>
  );
}
