import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Select from 'react-select';
import styles from '@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateAddModal/candidateAddModal.module.css'
import { DepartmentList } from "@/pages/hr/api/listPhongBan";
import { EmployeeList } from "@/pages/hr/api/listNhanVien";
import { PostionCharData } from "@/pages/hr/api/co_cau_to_chuc";
import { AddUserSignature } from "@/pages/hr/api/co_cau_to_chuc";
import GetComId from "@/components/hr/getComID";
import * as Yup from "yup";

type SelectOptionType = { label: string, value: string }

export default function AddSealModal({ onCancel }: any) {

    const [departmentList, setDepartmentList] = useState<any>(null)
    const [EmployeeLists, setEmployeeList] = useState<any>(null)
    const [isDep_id, setIsDep_id] = useState<any>("")
    const [isPosition_id, setIsPosition_id] = useState<any>("")
    const [isEmp_id, setIsEmp_id] = useState<any>("")
    const [PostionCharDatas, setPosttionCharData] = useState<any>(null)
    const [errors, setErrors] = useState<any>({});
    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCancel()
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onCancel]);

    const com_id: any = GetComId()

    // Fetch data for department
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', com_id)
                const response = await DepartmentList(formData)
                setDepartmentList(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    // Fetch data for Employee
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', com_id)
                const response = await EmployeeList(formData)
                setEmployeeList(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    // Fetch data for Position
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

    const validationSchema = Yup.object().shape({
        chonnhanvien: Yup.string().required("Vui lòng chọn nhân viên"),
        chucvuhientai: Yup.string().required("Vui lòng chọn chức vụ hiện tại"),
        chonphongban: Yup.string().required("Vui lòng chọn phòng ban")
    });


    const handleAddUserSignature = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();

            const formDatas = {
                chonnhanvien: isEmp_id || "",
                chucvuhientai: isPosition_id || "",
                chonphongban: isDep_id || ""
            };
            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            formData.append('empId', isEmp_id)
            const response = await AddUserSignature(formData)
            if (response) {
                onCancel()
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const yupErrors = {};
                error.inner.forEach((yupError: any) => {
                    yupErrors[yupError.path] = yupError.message;
                });
                setErrors(yupErrors);
            } else {
                console.error("Lỗi validate form:", error);
            }
        }

    }

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectChangeDepartment = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setIsDep_id(selectedOption.value);
        }
    };

    const handleSelectChangePosition = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setIsPosition_id(selectedOption.value);
        }
    };

    const handleSelectChangeEmployee = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setIsEmp_id(selectedOption.value);
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

    const chonchucvuOptions = useMemo(
        () =>
            PostionCharDatas?.data?.flatMap((position: any) =>
                Array.isArray(position)
                    ? position.map((pos: any) => ({
                        value: pos.positionId,
                        label: pos.positionName,
                    }))
                    : {
                        value: position.positionId,
                        label: position.positionName,
                    }
            ).reverse(),
        [PostionCharDatas?.data]
    );

    const filteredEmployees = useMemo(
        () =>
            EmployeeLists?.data?.filter(
                (emp: any) => emp.dep_id[0] === isDep_id && emp.position_id === isPosition_id
            ),
        [EmployeeLists?.data, isDep_id, isPosition_id]
    );

    const chonnhanvienOptions = useMemo(
        () =>
            filteredEmployees?.map((emp: any) => ({
                value: emp.idQLC,
                label: emp.userName,
            })),
        [filteredEmployees]
    );

    const options = {

        chonnhanvien: chonnhanvienOptions,
        chucvu: chonchucvuOptions,
        chonphongban: chonphongbanOptions

    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM MỚI NHÂN VIÊN ĐƯỢC SỬ DỤNG DẤU CÔNG TY</h5>
                            </div>
                            <form action="">
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Phòng ban <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={handleSelectChangeDepartment}
                                                    options={options.chonphongban}
                                                    placeholder="Chọn phòng ban"
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 8,
                                                            fontSize: state.isFocused ? 15 : 15,
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
                                                <span> {errors.chonphongban && <div className={`${styles.t_require} `}>{errors.chonphongban}</div>}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chức vụ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={handleSelectChangePosition}
                                                    options={options.chucvu}
                                                    placeholder="Chọn chức vụ"
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 8,
                                                            fontSize: state.isFocused ? 15 : 15,
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
                                                <span> {errors.chucvuhientai && <div className={`${styles.t_require} `}>{errors.chucvuhientai}</div>}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Nhân viên <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={handleSelectChangeEmployee}
                                                    options={options.chonnhanvien}
                                                    placeholder="Chọn nhân viên"
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 8,
                                                            fontSize: state.isFocused ? 15 : 15,
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
                                                <span> {errors.chonnhanvien && <div className={`${styles.t_require} `}>{errors.chonnhanvien}</div>}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                    <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                    <button className={`${styles.btn_add}`} onClick={handleAddUserSignature}>Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}