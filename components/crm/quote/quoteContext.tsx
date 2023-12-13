import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { axiosQLC } from "@/utils/api/api_qlc";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";


export const QuoteContext = createContext<any>(false);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Filter tìm kiếm
    const [dateQuote, setDateQuote] = useState<null | Date>(null) // Ngày báo giá
    const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null) // Hạn báo giá
    const [quoteCode, setQuoteCode] = useState('') // Mã báo giá

    const [shouldFetchData, setShouldFetchData] = useState(false) // Trigger gọi API danh sách báo giá
    // Hàm gọi ở màn trang chính

    // Lưu lại cho modal và thao tác
    const [recordId, setRecordId] = useState<Number>() // Lưu id 1 bản ghi được chọn
    const [listRecordId, setListRecordId] = useState([]) // Lưu id nhiều bản ghi được chọn
    const [recordName, setRecordName] = useState('') // Lưu tên bản ghi được chọn (cho phần modal)
    const [listRecordName, setListRecordName] = useState([]) // Lưu nhiều tên (cho modal)

    // Trạng thái báo giá
    const [status, setStatus] = useState<Number>(0) // Lưu trạng thái cho phần filter
    const statusArray = [
        { key: 0, value: "Tất cả" },
        { key: 1, value: "Bản thảo" },
        { key: 2, value: "Đàm phán" },
        { key: 3, value: "Đã gửi" },
        { key: 4, value: "Chờ xác nhận" },
        { key: 5, value: "Đồng ý" },
        { key: 6, value: "Từ chối" },
    ]
    const statusNumToStr = (num: Number) => { // Trạng thái số -> tên
        const item = statusArray.find((pair) => pair.key === num)
        return item ? item.value : ""
    }
    const statusStrToNum = (str: String) => { // Trạng thái tên -> số
        const item = statusArray.find((pair) => pair.value === str)
        return item ? item.key : 0
    }
    const allStatusString = () => statusArray.map((pair) => pair.value) // Trả về danh sách các tên trạng thái
    const allAvailableStatusString = () => statusArray.slice(1).map((pair) => pair.value) // Bỏ "Tất cả"
    const statusStrToColor = (status: String) => { // Trạng thái tên -> màu tương ứng
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
    const statusToColor = (status: Number) => { // Trạng thái số -> màu
        return statusStrToColor(statusNumToStr(status))
    }

    // Chi tiết báo giá
    const [shouldFetchDetailData, setShouldFetchDetailData] = useState(false) // Trigger gọi API chi tiết báo giá
    const [detailData, setDetailData] = useState<any>({}) // Lưu dữ liệu chi tiết báo giá trả về
    useEffect(() => { // Gọi API lấy chi tiết báo giá
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

    function getPropOrDefault(obj, propPath, defaultValue = '') { // Lấy của đối tượng theo trường, nếu không có trả giá trị mặc định
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
    const [isCreate, setIsCreate] = useState(true) // Trigger thêm mới / chỉnh sửa
    const [newQuote, setNewQuote] = useState({ // Lưu thông tin báo giá khi người dùng nhập liệu
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
    const clearQuote = () => { // Reset nhập liệu
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

    // Có thể sử dụng trực tiếp detailData
    const [editQuote, setEditQuote] = useState({ // Lưu dữ liệu sẵn có khi chỉnh sửa
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

    useEffect(() => {
        if (isCreate) {
            clearQuote();
            setDetailData({})
        } else {
            setShouldFetchDetailData(true)
        }
    }, [isCreate])

    // If edit (not create)
    useEffect(() => {
        if (!isCreate) {
            setNewQuote({
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
    // useEffect(() => {
    //     setNewQuote(editQuote)
    // }, [editQuote])

    const validateQuote = () => { // Kiểm tra giá trị nhập liệu
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

    const stringifyObject = (obj) => { // Chuyển dữ liệu thành string trước khi gửi
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

    const inputQuote = (fieldName: string, value: any) => { // Nhập liệu vào theo tên trường 
        setNewQuote((prev) => {
            if (prev.hasOwnProperty(fieldName)) {
                return { ...prev, [fieldName]: value }
            }
            return prev
        })
    }

    // Khách hàng trong báo giá
    const [listCusOption, setListCusOption] = useState([]) // Lưu danh sách lựa chọn khách hàng (id - tên)
    const [keyword, setKeyword] = useState('') // Lưu từ khóa tìm kiếm
    const [shouldFetchCus, setShouldFetchCus] = useState(false) // Trigger gọi API danh sách khách hàng

    useEffect(() => { // Gọi khi từ khóa đổi
        setShouldFetchCus(true)
    }, [keyword])

    useEffect(() => { // Gọi API danh sách khách hàng - Chỉ tìm được theo tên, không có tìm theo id
        if (shouldFetchCus) {
            axiosCRMCall
                .post('/customer/list', { keyword: keyword })
                .then((res) => {
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

    const getCusId = (str: string) => { // Lấy íd từ lựa chọn
        const match = str.match(/^(\d+) -/);
        return match ? Number(match[1]) : 0;
    }

    // Hàng hóa trong báo giá
    const [listProduct, setListProduct] = useState([]) // Lưu danh sách hàng hóa từ API
    const [listProductOptions, setListProductOptions] = useState([]) // Lưu danh sách lựa chọn hàng hóa (id - tên)
    const [prodName, setProdName] = useState('') // Lưu từ khóa tìm kiếm
    const [shouldFetchProd, setShouldFetchProd] = useState(false); // Trigger gọi API danh sách hàng hóa
    const [tempListProd, setTempListProd] = useState([]) // Lưu danh sách hàng hóa từ nhập liệu

    useEffect(() => { // Tìm kiếm khi từ khóa đổi
        setShouldFetchProd(true)
    }, [prodName])

    useEffect(() => { // Gọi API danh sách hàng hóa
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

    useEffect(() => { // Lưu danh sách lựa chọn khi trả về
        setListProductOptions(listProduct.map(prod => `${prod.id} - ${prod.name}`))
    }, [listProduct])

    useEffect(() => { // Lưu vào báo giá khi nhập liệu hàng hóa
        setNewQuote(prevData => (
            { ...prevData, product_list: tempListProd.map(({ total, ...prod }) => prod) }
        ))
    }, [tempListProd])

    // Lấy dữ liệu bổ sung cho mẫu báo giá
    const [companyData, setCompanyData] = useState<any>({})
    const [customerData, setCustomerData] = useState<any>({})
    const [shouldGetCus, setShouldGetCus] = useState(false)
    const [shouldGetCom, setShouldGetCom] = useState(false)

    useEffect(() => {
        if (shouldGetCus && Object.keys(detailData).length > 0) {
            setShouldGetCus(false)
            axiosCRMCall
                .post('/customerdetails/detail', { cus_id: getPropOrDefault(detailData, 'customer_id', '0') })
                .then(res => {
                    if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
                        setCustomerData(res?.data?.data)
                    } else {
                        setCustomerData({})
                    }
                })
                .catch((err) => {console.log(err); setCustomerData({})})
        }
    }, [shouldGetCus])

    useEffect(() => {
        if (shouldGetCom) {
            setShouldGetCom(false)
            axiosQLC
                .post('/company/info')
                .then(res => {
                    res?.data?.data?.data ?
                        setCompanyData(res?.data?.data?.data) :
                        setCompanyData({})
                })
                .catch((err) => {console.log(err); setCompanyData({})})
        }
    }, [shouldGetCom])

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

                // Lấy dữ liệu bổ sung cho mẫu báo giá
                companyData, setCompanyData,
                customerData, setCustomerData,
                shouldGetCus, setShouldGetCus,
                shouldGetCom, setShouldGetCom,
            }
        }
        >
            {children}
        </QuoteContext.Provider>
    )
}