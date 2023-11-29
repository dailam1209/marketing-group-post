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

    // Thêm mới báo giá
    const [newQuote, setNewQuote] = useState({
        id: 0,
        date_quote: '',
        date_quote_end: '',
        status: 0,
        customer_id: 0,
        tax_code: '',
        address: '',
        phone_number: '',
        introducer: '',
        product_list: [],
        discount_rate: 0,
        terms_and_conditions: '',
        note: '',
        creator_name: '',
        ceo_name: '',
        description: '',
        use_system_info: false,
    })

    const validateQuote = (fieldName: string, value: any) => {
        return true
    }

    const inputQuote = (fieldName: string, value: any) => {
        setNewQuote((prev) => {
            if (prev.hasOwnProperty(fieldName)) {
                if (validateQuote(fieldName, value)) {
                    return { ...prev, [fieldName]: value }
                }
            }
            return prev
        })
    }
    //test
    useEffect(() => {
        console.log(newQuote)
        // console.log(Object.keys(newQuote).map(key => `\x1b[96m${key}:\x1b[0m \x1b[36m${newQuote[key]}\x1b[0m`).join('\n'));
    }, [newQuote])

    // Khách hàng trong báo giá
    const [listCustomer, setListCustomer] = useState([])
    const [listCusOption, setListCusOption] = useState([])
    const [keyword, setKeyword] = useState('')
    const [shouldFetchCus, setShouldFetchCus] = useState(false)
    useEffect(() => {
        const newOption = listCustomer
            .filter(item => 'cus_id' in item && 'name' in item)
            .filter(item => item.cus_id && item.name)
            .map(item => ({ cus_id: Number(item.cus_id), name: item.name }));
        setListCusOption(newOption)
    }, [listCustomer])
    useEffect(() =>{
if(shouldFetchCus){
    axiosCRMCall
    .post('/customer/list', {keyword: keyword})
    .then((res)=>{
        
    })
}
    },[shouldFetchCus])

    return (
        <QuoteContext.Provider value={
            {
                // Filter tìm kiếm
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                shouldFetchData, setShouldFetchData,
                quoteCode, setQuoteCode,

                // Lưu lại cho modal và thao tác
                recordId, setRecordId,
                listRecordId, setListRecordId,
                recordName, setRecordName,
                listRecordName, setListRecordName,

                // Trạng thái báo giá
                status, setStatus,
                statusArray, statusNumToStr: statusNumToStr, statusStrToNum: statusStrToNum,
                allStatusString, allAvailableStatusString,
                statusStrToColor, statusToColor,

                // Chi tiết
                detailData, setDetailData,
                shouldFetchDetailData, setShouldFetchDetailData,
                getPropOrDefault,

                // Thêm mới
                newQuote, setNewQuote,
                inputQuote
            }
        }
        >
            {children}
        </QuoteContext.Provider>
    )
}