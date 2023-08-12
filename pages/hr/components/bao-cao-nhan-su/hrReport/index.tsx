import React, { useState, useEffect, ChangeEvent, MouseEventHandler, useMemo } from 'react';
import styles from './hrReport.module.css'
import Select from 'react-select'
import BodyFrameFooter from '@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer';
import EmployeeInformation from './bodySection1';
import InformationSection2 from './bodySection2';
import InfomationSection3 from './bodySection3';
import { addDays, format } from 'date-fns';
import { GetDataHrReports, ReportCharts } from '@/pages/api/bao-cao-nhan-su/HrReportService'
import { DepartmentList } from "@/pages/api/listPhongBan";
import GetComId from '@/components/getComID';
type SelectOptionType = { label: string, value: any }

export default function TabHRReport({ dateRangeDatas }: any) {

    const defaultStartDate = format(addDays(new Date(), -12), 'yyyy-MM-dd');
    const defaultEndDate = format(new Date(), 'yyyy-MM-dd');
    const [tokenComId, setComId] = useState<any>(null);
    const COOKIE_KEY = "user_365";

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [isStartYear, setStartYear] = useState<any>(null);
    const [isEndYear, setEndYear] = useState<any>(null);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [dateRangeData, setDateRangeData] = useState<String[]>(dateRangeDatas);
    const [hrReportList, setHrReportList] = useState<any>(null)
    const [EmpData, setEmpData] = useState<any>(null)
    const [departmentList, setDepartmentList] = useState<any>(null)
    const [isDep_id, setIsDep_id] = useState<any>("")
    const [isSelect, setSelect] = useState<any>("date")
    const [ReportChart, setReportChart] = useState<any>(null)
    const comid: any = GetComId()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('depId', isDep_id)
                formData.append('from_date', startDate)
                formData.append('to_date', endDate)
                const response = await GetDataHrReports(formData)
                if (response) {
                    setHrReportList(response.data)
                }
            } catch (error) {

            }
        }
        fetchData()
    }, [dateRangeData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                const start_month = (document.getElementById("start_month") as HTMLInputElement)?.value
                const end_month = (document.getElementById("end_month") as HTMLInputElement)?.value
                formData.append('depId', isDep_id)

                const type_date: any = 3
                const type_month: any = 2
                const type_year: any = 1
                if (isSelect === "date") {
                    formData.append('type', type_date)
                    formData.append('from_date', startDate)
                    formData.append('to_date', endDate)
                }
                if (isSelect === "month") {
                    formData.append('type', type_month)
                    formData.append('from_date', start_month)
                    formData.append('to_date', end_month)
                }
                if (isSelect === "year") {
                    formData.append('type', type_year)
                    formData.append('from_date', isStartYear)
                    formData.append('to_date', isEndYear)
                }
                const response = await ReportCharts(formData)
                if (response) {
                    setReportChart(response.data)
                }
            } catch (error) {

            }
        }
        fetchData()
    }, [dateRangeData])

    // -- lấy dữ liệu phòng ban --
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', comid)
                const response = await DepartmentList(formData)
                setDepartmentList(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    // Hàm xử lý khi ngày bắt đầu thay đổi
    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);
    };

    // Hàm xử lý khi ngày kết thúc thay đổi
    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);
    };

    const handleSearch: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const datesInRange: String[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startMonth = (document.getElementById('start_month') as HTMLInputElement)?.value;
        const endMonth = (document.getElementById('end_month') as HTMLInputElement)?.value;

        const startDateParts = startMonth.split('-');
        const endDateParts = endMonth.split('-');

        const startYear = parseInt(startDateParts[0]);
        const startMonthValue = parseInt(startDateParts[1]);

        const endYear = parseInt(endDateParts[0]);
        const endMonthValue = parseInt(endDateParts[1]);

        // Xóa hết dữ liệu trong mảng
        datesInRange.length = 0;

        if (isSelect === "date") {
            // Lặp qua từng tháng trong khoảng
            for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                const formattedDate = format(new Date(date), 'dd/MM/yyyy');
                datesInRange.push(formattedDate);
            }
        } else if (isSelect === "month") {
            // Lặp qua từng tháng trong khoảng
            for (
                let year = startYear, month = startMonthValue;
                year < endYear || (year === endYear && month <= endMonthValue);
                month++
            ) {
                if (month > 12) {
                    month = 1;
                    year++;
                }

                const formattedMonth = `${month < 10 ? '0' + month : month}/${year}`;
                datesInRange.push(formattedMonth);
            }
        } else if (isSelect === "year") {
            // Lặp qua từng năm trong khoảng
            for (let year = isStartYear; year <= isEndYear; year++) {
                datesInRange.push(year);
            }
        }
        setDateRangeData([...datesInRange]); // Tạo một bản sao để cập nhật state
    };

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value);
        }
    };

    const chonphongbanOptions = useMemo(
        () =>
            departmentList?.data?.map((department: any) => ({
                value: department.dep_id,
                label: department.dep_name,
            })),
        [departmentList?.data]
    );

    const currentYear: number = new Date().getFullYear();
    const startYears: number = 1970;
    const chonnam: SelectOptionType[] = [];

    for (let year: number = startYears; year <= currentYear; year++) {
        chonnam.push({ value: year, label: year.toString() });
    }

    const options = {
        chonphongban: chonphongbanOptions,
        chonnam: chonnam
    };

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.content_header}`}>
                        <div className={`${styles.bg_search}`}>
                            <div className={`${styles.search_new_t}`}>
                                <div className={`${styles.div_no_pad}   `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(option) => handleSelectChange(option, setIsDep_id)}
                                        options={options.chonphongban}
                                        placeholder="Chọn phòng ban"
                                        styles={{
                                            container: (baseStyles) => ({
                                                ...baseStyles,
                                                paddingRight: '5%',
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                width: '95%'
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                fontSize: state.isFocused ? 14 : 14,
                                                minHeight: state.isFocused ? 20 : 20,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600
                                            }),
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad}  `}>
                                    <select name="" id="" className={`${styles.form_control} ${styles.chart_type}`}
                                        onChange={(event) => {
                                            setSelect(event.target.value);
                                        }}
                                    >
                                        <option value="date">Các ngày trong năm</option>
                                        <option value="month">Các tháng trong năm</option>
                                        <option value="year">Các năm</option>
                                    </select>
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}  `} style={{ display: isSelect === "date" ? "block" : " none" }}>
                                    <input type="date" className={`${styles.search_date} ${styles.form_control}`}
                                        placeholder='Từ dd/mm/yyyy'
                                        defaultValue={startDate}
                                        onChange={handleStartDateChange} />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}  `} style={{ display: isSelect === "date" ? "block" : " none" }}>
                                    <input type="date" className={`${styles.search_date} ${styles.form_control}`}
                                        placeholder='Từ dd/mm/yyyy'
                                        defaultValue={endDate}
                                        onChange={handleEndDateChange} />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}   `} style={{ display: isSelect === "month" ? "block" : " none" }}>
                                    <input type="month" id='start_month' className={`${styles.search_date} ${styles.form_control}`}
                                        placeholder='Từ dd/mm/yyyy'
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}   `} style={{ display: isSelect === "month" ? "block" : " none" }}>
                                    <input type="month" id='end_month' className={`${styles.search_date} ${styles.form_control}`}
                                        placeholder='Từ dd/mm/yyyy'
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}   `} style={{ display: isSelect === "year" ? "block" : " none" }}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(option) => handleSelectChange(option, setStartYear)}
                                        options={options.chonnam}
                                        placeholder="Chọn năm"
                                        styles={{
                                            container: (baseStyles) => ({
                                                ...baseStyles,
                                                paddingRight: '5%',
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                width: '95%'
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                fontSize: state.isFocused ? 14 : 14,
                                                minHeight: state.isFocused ? 20 : 20,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600
                                            }),
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_input}   `} style={{ display: isSelect === "year" ? "block" : " none" }}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(option) => handleSelectChange(option, setEndYear)}
                                        options={options.chonnam}
                                        placeholder="Chọn năm"
                                        styles={{
                                            container: (baseStyles) => ({
                                                ...baseStyles,
                                                paddingRight: '5%',
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                width: '95%'
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                fontSize: state.isFocused ? 14 : 14,
                                                minHeight: state.isFocused ? 20 : 20,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600
                                            }),
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad_search}   `}>
                                    <a href="" className={`${styles.icon_search_top} ${styles.div_search_hrreport} `} onClick={handleSearch}>
                                        <img style={{ verticalAlign: 'middle', height: 30 }} src={`/t-icon-search-n.svg`} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content_body}`}>
                        <div className={`${styles.body_section1}`}>
                            <EmployeeInformation hrReportList={hrReportList} />
                        </div>
                        <div className={`${styles.body_section2}`}>
                            <InformationSection2 hrReportList={hrReportList} />
                        </div>
                        <div className={`${styles.body_section3}`}>
                            <InfomationSection3 hrReportList={ReportChart} dateInRange={dateRangeData.length === 0 ? dateRangeDatas : dateRangeData} />
                        </div>
                    </div>
                    <div className={`${styles.content_footer}`}>
                        <BodyFrameFooter src="https://www.youtube.com/embed/OwBZVEW66_s" />
                    </div>
                </div>
            </div>
        </>
    )

}