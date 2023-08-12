import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Select from 'react-select';
import styles from './employeeManagement.module.css'
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import DetailCandidateList from "../detailModal";
import EditCandidateList from "../editModal";
import { EmployeeList } from "@/pages/api/quan_ly_nhan_vien";
import { DepartmentList } from "@/pages/api/listPhongBan";
import MyPagination from "@/components/pagination/Pagination";
import { PostionCharData } from '@/pages/api/co_cau_to_chuc';
import { format, parseISO } from "date-fns";
import GetComId from "@/components/getComID";

type SelectOptionType = { label: string, value: string }
export interface TabEmployeeManagement {

}

export default function TabEmployeeManagement({ iconAdd, iconEdit }: any) {

    const [activeButton, setActiveButton] = useState(0)
    const [employeeCount, setEmployeeCount] = useState(10)
    const [detailModal, setDetailModal] = useState(false)
    const [editModal, setEditmodal] = useState<any>(null)
    const [EmpData, setEmpData] = useState<any>(null)
    const [departmentList, setDepartmentList] = useState<any>(null)
    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isDep_id, setIsDep_id] = useState<any>("")
    const [isUserName, setIsUserName] = useState<any>("")
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [PostionCharDatas, setPosttionCharData] = useState<any>(null)
    const [isSeach, setSearch] = useState<any>(null)
    const [visible, setVisible] = useState(false);
    const comid: any = GetComId()

    console.log(editModal);


    // -- đóng mở modal --
    const handleOpenDetailModal = () => {
        setDetailModal(!detailModal)
    }

    const handleCloseModal = () => {
        setDetailModal(false)
        setEditmodal(false)
        setVisible(false);
    }

    // -- lấy dữ liệu phòng ban --
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', comid)
                const response = await DepartmentList(formData)
                setDepartmentList(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    // -- lấy dữ liệu chức vụ --
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PostionCharData()
                setPosttionCharData(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])


    // -- lấy dữ liệu và phân trang --
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('dep_id', isDep_id)
                formData.append('userName', isUserName)
                formData.append('com_id', comid)
                formData.append('pageNumber', currentPage)
                const response = await EmployeeList(formData)
                setEmpData(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [currentPage, isSeach])

    // -- di chuyển trái phải của bảng --
    const tableContentRef = useRef<HTMLDivElement>(null);
    const currentPositionRef = useRef(0);

    const handleLeftClick = () => {
        if (tableContentRef.current) {
            const newPosition = currentPositionRef.current - 100;
            if (newPosition >= 0) {
                tableContentRef.current.scrollLeft = newPosition;
                currentPositionRef.current = newPosition;
            }
        }
    };

    const handleRightClick = () => {
        if (tableContentRef.current) {
            const newPosition = currentPositionRef.current + 100;
            if (newPosition <= tableContentRef.current.scrollWidth - tableContentRef.current.clientWidth) {
                tableContentRef.current.scrollLeft = newPosition;
                currentPositionRef.current = newPosition;
            }
        }
    };

    // -- set options cho thẻ select --

    const chonphongbanOptions = useMemo(
        () =>
            departmentList?.data?.map((department: any) => ({
                value: department.dep_id,
                label: department.dep_name,
            })),
        [departmentList?.data]
    );

    const chonnhanvienOptions = useMemo(
        () =>
            EmpData?.data?.map((emp: any) => ({
                value: emp.userName,
                label: emp.userName,
            })),
        [EmpData?.data]
    );

    const handleSearch = useCallback(() => {
        setSearch({ isDep_id, isUserName });
    }, [isDep_id, isUserName]);


    const handleSelectChangeDep = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
        if (selectedOption) {
            setIsDep_id(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const handleSelectChangeEmp = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
        if (selectedOption) {
            setIsUserName(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const options = {
        chonnhanvien: chonnhanvienOptions,
        chonphongban: chonphongbanOptions,
    };

    const handleSignaturePageChange = (page: number) => {
        setCurrentPage(page);
    };
    console.log(iconAdd)
    return (
        <>
            <div className={`${styles.tab_content} `} >
                <div className={`${styles.tab_pane}`}>
                    <div className={`${styles.body}`}>
                        <div className={`${styles.recruitment}`}>
                            {iconAdd && <a target="blank" href="https://chamcong.timviec365.vn/quan-ly-cong-ty/nhan-vien.html" className={`${styles.add}`} >
                                <img src={`/add.png`} alt="" />Thêm mới nhân viên
                            </a>}
                        </div>
                        <div className={`${styles.bg_search}`}>
                            <div className={`${styles.search_new_t}`}>
                                <div className={`${styles.div_no_pad} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeEmp}
                                        options={options.chonnhanvien}
                                        placeholder="Chọn nhân viên"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                borderColor: "#4747477a",
                                                height: "auto",
                                                fontSize: state.isFocused ? 14 : 14,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600,
                                                minHeight: 20
                                            }),
                                            valueContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            indicatorsContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeDep}
                                        options={options.chonphongban}
                                        placeholder="Chọn phòng ban"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                borderColor: "#4747477a",
                                                height: "auto",
                                                fontSize: state.isFocused ? 14 : 14,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600,
                                                minHeight: 20
                                            }),
                                            valueContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            indicatorsContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad_search} `}>
                                    <a className={`${styles.icon_search_top}`} onClick={handleSearch}>
                                        <img style={{ verticalAlign: '-webkit-baseline-middle' }} src={`/t-icon-search-n.svg`} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.export_excel} ${styles.export_excel_emp}`} style={{ paddingRight: 20, right: 0, position: 'relative' }}>
                            <a href="" className={`${styles.t_excel}`} >
                                <img src={`/t-icon-excel.svg`} alt="" />
                                Xuất file Excel
                            </a>
                        </div>
                        <div className={`${styles.member_list}`}>
                            <div className={`${styles.navigate_next}`} >
                                <div className={`${styles.turn} ${styles.turn_left}`} onClick={handleLeftClick}>
                                    <img src={`/arrow_left.png`} alt="" />
                                </div>
                                <div className={`${styles.turn} ${styles.turn_right}`} onClick={handleRightClick}>
                                    <img src={`/arrow_right.png`} alt="" />
                                </div>
                            </div>
                            <div className={`${styles.table_content}`} ref={tableContentRef}>
                                <table className={`${styles.table} ${styles.table_list}`} >
                                    <thead>
                                        <tr>
                                            <th>ID nhân viên</th>
                                            <th>Họ và tên</th>
                                            <th>Phòng ban</th>
                                            <th>Giới tính</th>
                                            <th>Tình trạng hôn nhân</th>
                                            <th>Vị trí</th>
                                            <th>Bộ phận</th>
                                            <th>Chi nhánh</th>
                                            <th>Thông tin liên hệ</th>
                                            <th>Ngày vào công ty</th>
                                            <th>Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${styles.filter_body}`}>
                                        {EmpData?.data?.map((item: any, index: any) => {
                                            const positionData = PostionCharDatas?.data?.find(
                                                (position: any) => position?.positionId === item?.position_id
                                            );
                                            const positionNameToShow = positionData ? positionData.positionName : item.vitri;
                                            return (
                                                <tr key={index}>
                                                    <td>{item._id}</td>
                                                    <td>   <a href="">{item.userName}</a></td>
                                                    <td>{item.nameDeparment}</td>
                                                    <td>{item.gioitinh}</td>
                                                    <td>{item.tinhtranghonnhan}</td>
                                                    <td>{positionNameToShow}</td>
                                                    <td>{item.nameDeparment}</td>
                                                    <td>{item.chinhanh}</td>
                                                    <td>
                                                        <p>Địa chỉ liên hệ:{item.address}</p>
                                                        <p>SDT: {item?.phoneTK}</p>
                                                        <p>Email: {item.email}</p>
                                                    </td>
                                                    <td>{format(
                                                        parseISO(new Date(item?.start_working_time * 1000).toISOString()),
                                                        "yyyy-MM-dd"
                                                    )}</td>
                                                    <td
                                                        className={`${styles.r_t_top_right}`} style={{ position: 'relative' }}>
                                                        <img src={`	/icon-settting.png`} alt=" " />
                                                        <div
                                                            className={`${styles.settings}`} style={{ width: '100%' }}>
                                                            <li onClick={handleOpenDetailModal}>Chi tiết</li>
                                                            {detailModal && <DetailCandidateList onCancel={handleCloseModal} infoList={{ infoList: item, position: positionNameToShow }} />}
                                                            {iconEdit && <li onClick={() => setEditmodal(item?._id)}>Chỉnh sửa</li>}
                                                            {editModal === item?._id && <EditCandidateList onCancel={handleCloseModal} infoList={{ infoList: item, position: positionNameToShow }} />}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.paginations}`} style={{ display: 'block' }}>
                        <MyPagination
                            current={currentPage}
                            total={EmpData?.count}
                            pageSize={10}
                            onChange={handleSignaturePageChange}
                        />
                    </div>
                    <BodyFrameFooter src="https://www.youtube.com/embed/Z8qtJ75of3g"></BodyFrameFooter>
                </div>
            </div>
        </>
    )
}

