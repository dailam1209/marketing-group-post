import { axiosCRMCall } from "@/utils/api/api_crm_call";
import dayjs from "dayjs";
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

    // Chi tiết báo giá
    const [shouldFetchDetailData, setShouldFetchDetailData] = useState(false)
    const [detailData, setDetailData] = useState<any>({})
    useEffect(() => {
        if (shouldFetchDetailData && Number(recordId) && Number(recordId) !== 0) {
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
    const [isCreate, setIsCreate] = useState(true)
    const [shouldFetchEditData, setShouldFetchEditData] = useState(false)
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

    // Reset
    const clearQuote = () => {
        setNewQuote({
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
    }

    const [editQuote, setEditQuote] = useState({
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

    // TODO Conditional clear
    useEffect(() => {
        if (isCreate) {
            newQuote.id !== 0 && clearQuote();
        } else {
            setShouldFetchDetailData(true)
        }
    }, [isCreate])

    // If edit (not create)
    useEffect(() => {
        console.log(detailData)
        if (!isCreate) {
            setEditQuote({
                id: detailData.id ? detailData.id : 0,
                date_quote: detailData.date_quote ? dayjs(detailData.date_quote).format('YYYY-MM-DD') : '',
                date_quote_end: detailData.date_quote_end ? dayjs(detailData.date_quote_end).format('YYYY-MM-DD') : '',
                status: detailData.status ? detailData.status : 0,
                customer_id: detailData.customer_id ? detailData.customer_id : 0,
                tax_code: detailData.tax_code ? detailData.tax_code : '',
                address: detailData.address ? detailData.address : '',
                phone_number: detailData.phone_number ? detailData.phone_number : '',
                introducer: detailData.introducer ? detailData.introducer : '',
                product_list: detailData.product_list ? detailData.product_list : [],
                discount_rate: detailData.discount_rate ? detailData.discount_rate : 0,
                terms_and_conditions: detailData.terms_and_conditions ? detailData.terms_and_conditions : '',
                note: detailData.note ? detailData.note : '',
                creator_name: detailData.creator_name ? detailData.creator_name : '',
                ceo_name: detailData.ceo_name ? detailData.ceo_name : '',
                description: detailData.description ? detailData.description : '',
                use_system_info: detailData.use_system_info ? detailData.use_system_info : false,
            })
        }
    }, [detailData])
    useEffect(() => {
        setNewQuote(editQuote)
    }, [editQuote])

    const validateQuote = () => {
        let invalidMsg = []
        // Check empty check zero
        const requiredFields = ['date_quote', 'date_quote_end', 'status', 'customer_id', 'creator_name', 'ceo_name']
        let isEmptyField = false
        requiredFields.forEach((fieldName) => {
            const value = newQuote[fieldName]
            if (value === null || value === undefined || value === '' || value === 0) {
                isEmptyField = true
            }
        })
        if (isEmptyField) {
            invalidMsg.push(`Các trường bắt buộc không được để trống`)
        }

        // product check empty
        if (!newQuote.product_list || newQuote.product_list.length === 0) {
            invalidMsg.push(`Danh sách hàng hóa không được để trống`)
        }

        return invalidMsg
    }

    const stringifyObject = (obj) => {
        if (obj === null || obj === undefined) {
            return '';  // Convert null or undefined to an empty string
        }

        if (Array.isArray(obj)) {
            // If it's an array, use JSON.stringify
            return JSON.stringify(obj);
        }

        if (typeof obj === 'object') {
            const result = {};
            // Recursively stringify object properties
            for (let key in obj) {
                result[key] = stringifyObject(obj[key]);
            }
            return result;
        } else if (typeof obj === 'string') {
            return obj.trim();  // Trim string values
        }

        return obj.toString();  // Convert other values to strings
    }

    const inputQuote = (fieldName: string, value: any) => {
        setNewQuote((prev) => {
            if (prev.hasOwnProperty(fieldName)) {
                return { ...prev, [fieldName]: value }
            }
            return prev
        })
    }
    // TODO remove test log
    // useEffect(() => {
    //     console.log(newQuote)
    //     // console.log(Object.keys(newQuote).map(key => `\x1b[96m${key}:\x1b[0m \x1b[36m${newQuote[key]}\x1b[0m`).join('\n'));
    // }, [newQuote])

    // Khách hàng trong báo giá
    const [listCusOption, setListCusOption] = useState([])
    const [keyword, setKeyword] = useState('')
    const [shouldFetchCus, setShouldFetchCus] = useState(false)

    useEffect(() => {
        setShouldFetchCus(true)
    }, [keyword])

    useEffect(() => {
        if (shouldFetchCus) {
            axiosCRMCall
                .post('/customer/list', { keyword: keyword })
                .then((res) => {
                    // res?.data?.data?.data ?
                    //     setListCustomer(res?.data?.data?.data) :
                    //     setListCustomer([])
                    console.log(res?.data?.data)
                    if (res?.data?.data?.length > 0) {
                        const newArray = res?.data?.data
                            .filter(item => 'cus_id' in item && 'name' in item)
                            .filter(item => item.cus_id && item.name)
                            .map(item => `${item.cus_id} - ${item.name}`)
                        setListCusOption(newArray)
                    }
                })
                .catch((err) => console.log(err))
        }
        setShouldFetchCus(false)
    }, [shouldFetchCus])

    const getCusId = (str: string) => {
        const match = str.match(/^(\d+) -/);
        return match ? Number(match[1]) : 0;
    }

    // Hàng hóa trong báo giá
    const [listProduct, setListProduct] = useState([])
    const [listProductOptions, setListProductOptions] = useState([])
    const [prodName, setProdName] = useState('')
    const [shouldFetchProd, setShouldFetchProd] = useState(false);
    const [tempListProd, setTempListProd] = useState([])

    useEffect(() => {
        setShouldFetchProd(true)
    }, [prodName])

    useEffect(() => {
        if (shouldFetchProd) {
            axiosCRMCall
                .post('/product/show-product', { prod_name: prodName })
                .then((res) => {
                    if (res?.data?.data?.data.length > 0) {
                        setListProduct(res?.data?.data?.data.map(item => ({
                            id: item._id,
                            name: item.prod_name,
                            dvt: item.dvt.unit_name,
                            price: item.price
                        })))
                    } else {
                        setListProduct([])
                    }
                })
                .catch((err) => console.log(err))
        }
        setShouldFetchProd(false)
    }, [shouldFetchProd])

    useEffect(() => {
        setListProductOptions(listProduct.map(prod => `${prod.id} - ${prod.name}`))
    }, [listProduct])

    useEffect(() => {
        setNewQuote(prevData => (
            { ...prevData, product_list: tempListProd.map(({ total, ...prod }) => prod) }
        ))
    }, [tempListProd])

    return (
        <QuoteContext.Provider value={
            {
                // Filter tìm kiếm
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                shouldFetchData, setShouldFetchData,
                quoteCode, setQuoteCode,
                stringifyObject,
                isCreate, setIsCreate,

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
                inputQuote, clearQuote, validateQuote,
                // Chỉnh sửa
                editQuote, setEditQuote,

                // Khách hàng trong báo giá
                shouldFetchCus, setShouldFetchCus,
                listCusOption, getCusId,
                keyword, setKeyword,
                // Hàng hóa trong báo giá
                shouldFetchProd, setShouldFetchProd,
                listProduct, listProductOptions,
                prodName, setProdName,
                tempListProd, setTempListProd,
            }
        }
        >
            {children}
        </QuoteContext.Provider>
    )
}