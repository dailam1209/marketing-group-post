import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { createContext, useEffect, useState } from "react";


export const QuoteContext = createContext<any>(false);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Filter tìm kiếm
    const [dateQuote, setDateQuote] = useState<null | Date>(null)
    const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null)
    const [quoteCode, setQuoteCode] = useState('')

    const [shouldFetchData, setShouldFetchData] = useState(false)

    // Lưu lại cho modal và thao tác
    const [recordId, setRecordId] = useState<Number>()
    const [listRecordId, setListRecordId] = useState([])
    const [recordName, setRecordName] = useState('')
    const [listRecordName, setListRecordName] = useState([])

    // Trạng thái báo giá
    const [status, setStatus] = useState<Number>(0)
    const statusArray = [
        { key: 0, value: "Tất cả" },
        { key: 1, value: "Bản thảo" },
        { key: 2, value: "Đàm phán" },
        { key: 3, value: "Đã gửi" },
        { key: 4, value: "Chờ xác nhận" },
        { key: 5, value: "Đồng ý" },
        { key: 6, value: "Từ chối" },
    ]
    const statusNumToStr = (num: Number) => {
        const item = statusArray.find((pair) => pair.key === num)
        return item ? item.value : ""
    }
    const statusStrToNum = (str: String) => {
        const item = statusArray.find((pair) => pair.value === str)
        return item ? item.key : 0
    }
    const allStatusString = () => statusArray.map((pair) => pair.value)
    const allAvailableStatusString = () => statusArray.slice(1).map((pair) => pair.value) // Bỏ "Tất cả"
    const statusStrToColor = (status: String) => {
        switch (status) {
            case "Bản thảo":
            case "Chờ xác nhận": return '#FFA800'
            case "Đàm phán":
            case "Đã gửi": return '#4C5BD4'
            case "Đồng ý": return '#34B632'
            case "Từ chối": return '#FF3333'
            default: return 'inherit'
        }
    }
    const statusToColor = (status: Number) => {
        return statusStrToColor(statusNumToStr(status))
    }

    // Chi tiết
    const [shouldFetchDetailData, setShouldFetchDetailData] = useState(false)
    const [detailData, setDetailData] = useState<any>({})
    useEffect(() => {
        if (shouldFetchDetailData && Number(recordId) && Number(recordId) != 0) {
            axiosCRMCall
                .post('/quote/getDetail', { id: Number(recordId) || 0 })
                .then((res) => {
                    res?.data?.data?.data ?
                        setDetailData(res?.data?.data?.data) :
                        setDetailData({})
                })
                .catch((err) => console.log(err))
        }
        setShouldFetchDetailData(false)
    }, [shouldFetchDetailData])
    function getPropOrDefault(obj, propPath, defaultValue = '') {
        const props = propPath.split('.');
        let currentObj = obj;

        for (const prop of props) {
            if (currentObj && currentObj.hasOwnProperty(prop)) {
                currentObj = currentObj[prop];
            } else {
                return defaultValue;
            }
        }

        return currentObj ?? defaultValue;
    }

    return (
        <QuoteContext.Provider value={
            {
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                status, setStatus,
                quoteCode, setQuoteCode,
                shouldFetchData, setShouldFetchData,
                recordId, setRecordId,
                listRecordId, setListRecordId,
                // createQuoteCode, createListQuoteCode,
                recordName, setRecordName,
                listRecordName, setListRecordName,
                statusArray, statusNumToStr: statusNumToStr, statusStrToNum: statusStrToNum,
                allStatusString, allAvailableStatusString,
                statusStrToColor, statusToColor,
                detailData, setDetailData,
                shouldFetchDetailData, setShouldFetchDetailData,
                getPropOrDefault
            }
        }
        >
            {children}
        </QuoteContext.Provider>
    )
}