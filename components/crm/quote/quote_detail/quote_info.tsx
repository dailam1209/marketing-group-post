// import OrderSelectBoxStep from "../order_steps/select_box_step";
import React, { useContext, useEffect, useState } from "react";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Spin, Tooltip } from "antd";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import dayjs from "dayjs";
import useLoading from "../../hooks/useLoading";

export default function AddQuoteInfo({ id = null }) {
  const { recordId, setRecordId, detailData, setShouldFetchDetailData, shouldFetchDetailData, statusToColor, statusNumToStr, getPropOrDefault } = useContext(QuoteContext)
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<any>({
    quote_code_str: '',
    date_quote: '',
    date_quote_end: '',
    status: 0
  })

  const convertData = () => {
    const newData = {
      quote_code_str: getPropOrDefault(detailData, 'quote_code_str'),
      date_quote: getPropOrDefault(detailData, 'date_quote'),
      date_quote_end: getPropOrDefault(detailData, 'date_quote_end'),
      status: getPropOrDefault(detailData, 'status', 0),
    }
    setData(newData)
  }

  useEffect(()=>{
    shouldFetchDetailData && startLoading();
  }, [shouldFetchDetailData])

  useEffect(() => {
    setRecordId(Number(id) || 0)
  }, [])

  useEffect(() => {
    setShouldFetchDetailData(true)
  }, [recordId])

  useEffect(() => {
    startLoading();
    convertData()
    stopLoading();
  }, [detailData])

  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : (
        <div>
          <div className={styles.main__content__body}>
            <div className={styles.row}>
              <div className={styles.row1quote}>
                <div className={styles.row1quote_left}>
                  <b>Số báo giá:</b>
                </div>
                <div className={styles.row1quote_right}>{data.quote_code_str || 'Chưa cập nhật'}</div>
              </div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className={styles.row1quote}>
                <div className={styles.row1quote_left}>
                  <b>Ngày báo giá:</b>
                </div>

                <div className={styles.row1quote_right}>{data.date_quote ? dayjs(data.date_quote).format('DD/MM/YYYY') : 'Chưa cập nhật'}</div>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: -10 }}>
              <div className={styles.full_width_div}>
                <span></span>
              </div>     <div className={styles.full_width_div}>
                <span></span>
              </div>
            </div>



            <div className={styles.row}>
              <div className={styles.row1quote}>
                <div className={styles.row1quote_left}>
                  <b>Hiệu lực đến ngày:</b>
                </div>
                <div className={styles.row1quote_right}>{data.date_quote_end ? dayjs(data.date_quote_end).format('DD/MM/YYYY') : 'Chưa cập nhật'}</div>
              </div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className={styles.row1quote}>
                <div className={styles.row1quote_left}>
                  <b>Tình trạng</b>
                </div>
                <div
                  className={styles.row1quote_right}
                  style={{ color: statusToColor(Number(data.status) || 0) }}
                >
                  {data.status ? statusNumToStr(data.status) : 'Chưa cập nhật'}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: -10 }}>
              <div className={styles.full_width_div}>
                <span></span>
              </div>     <div className={styles.full_width_div}>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
