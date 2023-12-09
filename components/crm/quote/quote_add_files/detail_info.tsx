import { ChangeEvent, useContext, useEffect, useState } from "react";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import CustomerSelectBoxStep from "../quote_steps/select_box_step_customer";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Spin, Tooltip } from 'antd';
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import useLoading from "../../hooks/useLoading";
import { useRouter } from "next/router";

export default function AddDetailInfo({ id: quoteId = 0 }) {
  const { newQuote, inputQuote, allAvailableStatusString, statusStrToNum, statusNumToStr,
    listCusOption, getCusId, keyword, setKeyword, setShouldFetchCus, setShouldFetchDetailData,
    isCreate, setIsCreate, detailData, setRecordId, shouldFetchDetailData, getPropOrDefault } = useContext(QuoteContext)
  const [localStatus, setLocalStatus] = useState('Chọn')
  const [localCustomer, setLocalCustomer] = useState('Chọn')
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const { id } = router.query

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
    inputQuote('status', statusStrToNum(str))
  }

  const handleCusId = (str) => {
    setLocalCustomer(str)
    inputQuote('customer_id', getCusId(str))
    getCusDataFromId(getCusId(str))
  }

  const getCusDataFromId = (id) => {
    axiosCRMCall
      .post('/customerdetails/detail', { cus_id: id })
      .then(res => {
        if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
          inputQuote('address', getPropOrDefault(res?.data?.data, 'address.info'))
          inputQuote('phone_number', getPropOrDefault(res?.data?.data, 'phone_number.info'))
          inputQuote('tax_code', getPropOrDefault(res?.data?.data, 'tax_code'))
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setShouldFetchCus(true)
    if (Number(id) && Number(id) !== 0) {
      setRecordId(Number(id))
      setIsCreate(false)
      setShouldFetchDetailData(true)
    } else {
      setIsCreate(true)
    }
  }, [router.query])

  // Nếu là chỉnh sửa
  useEffect(() => {
    if (!isCreate) {
      setLocalStatus(statusNumToStr(detailData.status))
      if (detailData.customer_id && detailData.customer_id !== 0) {
        axiosCRMCall
          .post('/customerdetails/detail', { cus_id: detailData.customer_id })
          .then(res => {
            if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
              setLocalCustomer(`${detailData.customer_id} - ${res?.data?.data.name}`)
            }
          })
          .catch((err) => console.log(err))
      }
    }
    stopLoading();
  }, [detailData])

  return (
    <>
      {isLoading && (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      )}
      <div>
        <p className={styles.main__body__type}>Thông tin chi tiết</p>

        <div className={styles.row_input}>
          <InputText
            label="Ngày báo giá"
            placeholder=""
            type="date"
            name="date_quote"
            value={newQuote.date_quote}
            onChange={handleSimpleInput}
            require={true}
          />
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <InputText
              label="Hạn thanh toán"
              placeholder="Nhập"
              type="date"
              name="date_quote_end"
              value={newQuote.date_quote_end}
              onChange={handleSimpleInput}
              require={true}
            />
          </div>
        </div>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} required`}>Tình trạng</label>
            <OrderSelectBoxStep
              value={localStatus}
              placeholder="Chọn"
              data={allAvailableStatusString()}
              setValue={handleStatus}
            />
          </div>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} required`}>Khách hàng</label>
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
    </>
  );
}
