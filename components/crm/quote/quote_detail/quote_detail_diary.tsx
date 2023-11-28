// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useContext, useEffect, useState } from "react";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Spin, Tooltip } from 'antd';
import { QuoteContext } from "../quoteFilterContext";
import useLoading from "../../hooks/useLoading";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

export default function AddQuoteDetailInfo() {
    const { recordId, setRecordId, getPropOrDefault, shouldFetchDetailData } = useContext(QuoteContext)
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [shouldFetchHistory, setShouldFetchHistory] = useState(false);
    const [apiData, setApiData] = useState<any>([])
    const [data, setData] = useState<any>([])

    const convertData = () => {
        if (apiData.length > 0) {
            setData(apiData.map((item) => ({
                user
            })))
        }
    }

    useEffect(() => {
        startLoading();
        setShouldFetchHistory(true)
    }, [])

    useEffect(() => {
        startLoading();
        setShouldFetchHistory(true)
    }, [shouldFetchDetailData])

    useEffect(() => {
        axiosCRMCall
            .post('/quote/getQuoteHistory', { quote_id: Number(recordId) || 0 })
            .then((res) => {
                res?.data?.data?.data ?
                    setApiData(res?.data?.data?.data) :
                    setApiData([])
            })
    }, [shouldFetchHistory])

    useEffect(() => {
        startLoading();
        convertData()
        stopLoading();
        console.log(apiData)
    }, [apiData])

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
            ) : (<div>

                <div className={styles.main__content__body}>
                    <div className={`${styles.main_content_nhatky} ${styles.row1}`}>
                        <div className={`${styles["col-lg-12"]} ${styles.content_nhatky}`}>
                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                            <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>)}
        </>
    );
}
