import React, { useState, useEffect, useRef, MouseEventHandler, useCallback, useMemo } from "react";
import Select from 'react-select'
import styles from '../../thong-tin-nhan-su/tab/employeeManagement.module.css'
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import AddOutJobModal from "./addOutJobModal";
import EditOutJobModal from "./editOutJobModal";
import DeleteOutJobs from "./deleteOutJobModal";
import { parseISO, format } from 'date-fns';
import { DeleteOutJob, OutJobList } from "@/pages/hr/api/bien_dong_nhan_su";
import { EmployeeList } from "@/pages/hr/api/listNhanVien";
import { DepartmentList } from "@/pages/hr/api/listPhongBan";
import GetComId from "@/components/hr/getComID";

type SelectOptionType = { label: string, value: string }

export default function TabOutJob({ iconAdd, iconEdit, iconDelete }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [activeButton, setActiveButton] = useState(0)
    const [isPageSize, setPageSize] = useState<any>(10)
    const [isDep_id, setDep_id] = useState<any>("")
    const [isEmp_id, setEmp_id] = useState<any>("")
    const [isOutJobList, setOutJobList] = useState<any>(null)
    const [isSeach, setSearch] = useState<any>(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(0)
    const [openModal, setOpenModal] = useState(0)
    const [EmpData, setEmpData] = useState<any>(null)
    const [departmentList, setDepartmentList] = useState<any>(null)
    const tableContentRef = useRef<HTMLDivElement>(null);
    const currentPositionRef = useRef(0);
    const com_id: any = GetComId()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('pageSize', isPageSize)
                const fromDate = (document.getElementById('from_date') as HTMLInputElement)?.value
                const toDate = (document.getElementById('to_date') as HTMLInputElement)?.value
                formData.append('ep_id', isEmp_id)
                formData.append('update_dep_id', isDep_id)
                formData.append('fromDate', fromDate)
                formData.append('toDate', toDate)
                const response = await OutJobList(formData)
                setOutJobList(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [isPageSize, isSeach])

    // -- lấy dữ liệu phòng ban --
    useEffect(() => {
        const fetchData = async () => {
            try {

                const formData = new FormData()
                formData.append('com_id', com_id)
                const response = await DepartmentList(formData)
                setDepartmentList(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    // -- lấy dữ liệu nhân viên --
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                const response = await EmployeeList(formData)
                setEmpData(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    const handleSearch = useCallback(() => {
        setSearch({ isDep_id, isEmp_id });
    }, [isDep_id, isEmp_id]);


    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };


    const handleChoose = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setPageSize(value)
        window.scrollTo(0, 0);
    }

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

    const handleCloseModal = () => {
        setOpenModal(0)
        setOpenEditModal(false)
        setOpenDeleteModal(0)
    }

    const handleOpenEdit: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setOpenEditModal(true);
    }


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
                value: emp.idQLC,
                label: emp.userName,
            })),
        [EmpData?.data]
    );

    const options = {
        chonnhanvien: chonnhanvienOptions,
        chonphongban: chonphongbanOptions
    };

    return (
        <>
            <div className={`${styles.tab_content}`}>
                <div className={`${styles.tab_pane}`}>
                    <div className={`${styles.body} ${styles.body_planning}`}>
                        <div className={`${styles.recruitment}`}>
                            {iconAdd && <button className={`${styles.add} ${styles.add_planning}`} onClick={() => setOpenModal(1)}>
                                <img style={{ verticalAlign: 'middle' }} src={`/add.png`} alt="" />Thêm mới nghỉ việc sai quy định
                            </button>}
                        </div>
                        {openModal === 1 && <AddOutJobModal onCancel={handleCloseModal}></AddOutJobModal>}
                        {openEditModal && <EditOutJobModal onCancel={handleCloseModal} />}
                        {openDeleteModal !== 0 && <DeleteOutJobs onCancel={handleCloseModal} ep_id={openDeleteModal} />}
                        <div className={`${styles.bg_search}`}>
                            <div className={`${styles.search_new_t}`}>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(option) => handleSelectChange(option, setEmp_id)}
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
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(option) => handleSelectChange(option, setDep_id)}
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
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <input type="date" id="from_date" className={`${styles.search_date} ${styles.form_control}`} placeholder='Từ dd/mm/yyyy' />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning}`}>
                                    <input type="date" id="to_date" className={`${styles.search_date} ${styles.form_control}`} placeholder='Từ dd/mm/yyyy' />
                                </div>
                                <div className={`${styles.div_no_pad_search}   `}>
                                    <a className={`${styles.icon_search_top} ${styles.div_search_salary} `} onClick={handleSearch}>
                                        <img style={{ verticalAlign: '-webkit-baseline-middle' }} src={`/t-icon-search-n.svg`} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.member_list} ${styles.member_list_salary}`}>
                            <div className={`${styles.navigate_next} ${styles.navigate_next_salary}`} >
                                <div className={`${styles.turn} ${styles.turn_left}`} onClick={handleLeftClick}>
                                    <img src={`/arrow_left.png`} alt="" />
                                </div>
                                <div className={`${styles.turn} ${styles.turn_right}`} onClick={handleRightClick}>
                                    <img src={`/arrow_right.png`} alt="" />
                                </div>
                            </div>
                            <div className={`${styles.table_content}`} ref={tableContentRef}>
                                <table className={`${styles.table} ${styles.table_list}`} style={{ width: '150%' }}>
                                    <thead>
                                        <tr>
                                            <th>ID nhân viên</th>
                                            <th>Họ và tên</th>
                                            <th>Phòng ban</th>
                                            <th>Chức vụ</th>
                                            <th>Ngày bắt đầu nghỉ</th>
                                            {iconDelete || iconEdit ? <th>Tùy chỉnh</th> : null}
                                        </tr>
                                    </thead>
                                    <tbody className={`${styles.filter_body}`}>
                                        {isOutJobList?.data?.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td>{item.ep_id}</td>
                                                <td>{item.ep_name}</td>
                                                <td>{item.dep_name}</td>
                                                <td>{item.position_name}</td>
                                                <td>{format(parseISO(item?.time), 'dd/MM/yyyy')}</td>
                                                {iconDelete || iconEdit ? (
                                                    <td>
                                                        {iconEdit && <a onClick={() => handleOpenEdit(item)} className={`${styles.btn_edit}`} style={{ cursor: "pointer" }}><img src={`/icon_edit.svg`} alt="" /></a>}
                                                        {iconDelete && <a onClick={() => setOpenDeleteModal(item.ep_id)} className={`${styles.btn_delete}`} style={{ cursor: 'pointer' }}><img src={`/icon_delete.svg`} alt="" /></a>}
                                                    </td>
                                                ) : null}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="choose_limit" className={`${styles.pull_left}`}>
                            <select name="" id="choose_limit_page" className={`${styles.form_control}`} onChange={(event) => handleChoose(event)}>
                                <option value="10"  >10</option>
                                <option value="20" >20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                    <BodyFrameFooter src="https://www.youtube.com/embed/e29o-TSnbeE"></BodyFrameFooter>
                </div>
            </div>
        </>
    )
}