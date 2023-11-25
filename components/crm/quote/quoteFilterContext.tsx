import { createContext, useState } from "react";


export const QuoteFilterContext = createContext<any>(false);

export const QuoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [dateQuote, setDateQuote] = useState<null | Date>(null)
    const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null)
    const [status, setStatus] = useState<Number>(0)
    const [quoteCode, setQuoteCode] = useState('')
    const [shouldFetchData, setShouldFetchData] = useState(false)
    const [recordId, setRecordId] = useState<Number>()
    const [listRecordId, setListRecordId] = useState([])
    const statusArray = [
        {key: 0, value: "Tất cả"},
        {key: 1, value: "Bản thảo"},
        {key: 2, value: "Đàm phán"},
        {key: 3, value: "Đã gửi"},
        {key: 4, value: "Chờ xác nhận"},
        {key: 5, value: "Đồng ý"},
        {key: 6, value: "Từ chối"},
    ]
    const statusStringFromNumber = (num: Number) => {
        const item = statusArray.find((pair) => pair.key === num)
        return item ? item.value : ""
    }
    const statusNumberFromString = (str: String) => {
        const item = statusArray.find((pair) => pair.value === str)
        return item ? item.key : 0
    }
    const allStatusString = () => statusArray.map((pair) => pair.value)
    const allAvailableStatusString = () => statusArray.slice(1).map((pair) => pair.value)

    return (
        <QuoteFilterContext.Provider value={
            {
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                status, setStatus,
                quoteCode, setQuoteCode,
                shouldFetchData, setShouldFetchData,
                recordId, setRecordId,
                listRecordId, setListRecordId,
                statusArray, statusStringFromNumber, statusNumberFromString, allStatusString, allAvailableStatusString
            }
        }
        >
            {children}
        </QuoteFilterContext.Provider>
    )
}