import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from '../../planningAppointment/addPlanningModal/addPlanningModal.module.css'
import Select from 'react-select';
import MyEditorNew from "@/components/hr/myEditor";
import { FetchDataDep, FetchDataOrganizationalStructure, FetchDataEmployee, FetchDataPosition, FetchDataSpecifiedGroup } from "@/components/hr/util/listAll";
import { ShiftList, AddPayrollDown } from "@/pages/hr/api/bien_dong_nhan_su";
import GetComId from "@/components/hr/getComID";
import * as Yup from "yup";
interface InputTextareaProps {
    onDescriptionChange: (data: any) => void
}
type SelectOptionType = { label: string, value: string }

function Input_textarea({ onDescriptionChange }: InputTextareaProps) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const extractTextFromHTML = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const text = doc.querySelector("p")?.textContent || "";
        return text;
    };

    const handleEditorChange = (data: string) => {
        setData(data);
        const extractedText = extractTextFromHTML(data); // Lấy chỉ văn bản từ chuỗi HTML
        onDescriptionChange(extractedText);
    };

    return (
        <div>
            <MyEditorNew
                name="Editor"
                onChange={handleEditorChange}
                editorLoaded={editorLoaded}
                value={data}
            />
        </div>
    );
}
export default function AddPayrollModal({ onCancel }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isEmpList, setEmpList] = useState<any>(null)
    const [isPositionList, setPositionList] = useState<any>(null)
    const [isOrganizationalStructureList, setOrganizationalStructureList] = useState<any>(null)
    const [isSpecifiedList, setSpecifiedList] = useState<any>(null)
    const [isShiftList, setShiftList] = useState<any>(null)
    const [isDepList, setDeptList] = useState<any>(null)
    const [isReason, setReason] = useState<any>("")

    const [isPosition_name, setPosition_name] = useState<any>(null)
    const [isSpecified_id, setSpecified_id] = useState<any>(null)
    const [isPosition_id, setPosition_id] = useState<any>(null)
    const [isDep_name, setDep_name] = useState<any>(null)
    const [infoList, setInfoList] = useState<any>(null)
    const [isEmp_id, setEmp_id] = useState<any>(null)
    const [isCom_id, setCom_id] = useState<any>(null)
    const [isDep_id, setDep_id] = useState<any>(null)
    const [isType_id, setType_id] = useState<any>(null)
    const [isShift_id, setShift_id] = useState<any>(null)
    const [errors, setErrors] = useState<any>({});
    const comid: any = GetComId()
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

    useEffect(() => {
        const fetchDataEmp = async () => {
            const empData = await FetchDataEmployee();
            setEmpList(empData);
        }
        fetchDataEmp()
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const organizationStructure = await FetchDataOrganizationalStructure();
            setOrganizationalStructureList(organizationStructure);

            const position = await FetchDataPosition()
            setPositionList(position)

            const specifiedGroup = await FetchDataSpecifiedGroup()
            setSpecifiedList(specifiedGroup)

            const dep = await FetchDataDep()
            setDeptList(dep)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (infoList) {
            const valuesArray = infoList?.split(" ");
            if (valuesArray.length >= 4) {
                const depValue = valuesArray?.slice(3).join(" ");
                setEmp_id(Number(valuesArray[0]));
                setDep_id(Number(valuesArray[1]));
                setPosition_id(Number(valuesArray[2]));
                setDep_name(depValue);
            }
        }
    }, [infoList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('companyID', comid)
                const response = await ShiftList(formData)
                setShiftList(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (isPositionList && Array.isArray(isPositionList.data)) {
            const PositionList = isPositionList.data.flat();
            if (PositionList && isPosition_id) {
                const position = PositionList.find((pos: any) => pos?.positionId === isPosition_id);
                if (position) {
                    setPosition_name(position.positionName);
                }
            }
        }
    }, [isPositionList, isPosition_id]);

    useEffect(() => {
        const foundItem = isDepList?.data?.find((item: any) => item.dep_id === isDep_id);
        if (foundItem) {
            setCom_id(foundItem.com_id)
        }
    }, [isDep_id])

    const validationSchema = Yup.object().shape({
        chonnhanvien: Yup.string().required("Vui lòng chọn nhân viên"),
        chucvuhientai: Yup.string().required("Vui lòng chọn chức vụ hiện tại"),
        chonhinhthuc: Yup.string().required("Vui lòng chọn hình thức"),
        created_at: Yup.string().required("Vui lòng chọn thời gian giảm biên chế"),
    });

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const created_at = (document.getElementById('created_at') as HTMLInputElement)?.value

            const formDatas = {
                chonnhanvien: selectedOption?.value || "",
                chucvuhientai: isPosition_id || "",
                created_at: created_at || "",
                chonhinhthuc: isType_id || ""

            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });


            const formData = new FormData();
            formData.append('ep_id', isEmp_id)
            formData.append('current_position', isPosition_id)
            formData.append('current_dep_id', isDep_id)
            formData.append('com_id', isCom_id)
            formData.append('created_at', created_at)
            formData.append('decision_id', isSpecified_id)
            formData.append('note', isReason)
            formData.append('type', isType_id)
            formData.append('shift_id', isShift_id)

            const response = await AddPayrollDown(formData)
            setTimeout(() => {
                onCancel()
            }, 2000)
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

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const handleInputAreaChange = (data: string) => {
        setReason(data);
    };

    const chonnhanvienOptions = useMemo(
        () =>
            isEmpList &&
            isEmpList?.data?.map((emp: any) => ({
                value: `${emp.idQLC} ${emp.dep_id[0]} ${emp.position_id} ${emp.nameDeparment}`,
                label: emp.userName
            })),
        [isEmpList]
    );

    const companyNames: any = [];
    if (isCom_id && isOrganizationalStructureList?.infoCompany) {
        if (
            isOrganizationalStructureList?.infoCompany?.parent_com_id === isCom_id
        ) {
            companyNames.push({
                key: isOrganizationalStructureList?.infoCompany?.companyName,
                value: isOrganizationalStructureList?.infoCompany?.parent_com_id,
            });
        }
        for (const company of isOrganizationalStructureList?.infoCompany
            ?.infoChildCompany) {
            if (company.com_id === isCom_id) {
                companyNames.push({ key: company.com_name, value: company.com_id });
            }
        }
    }

    const chonchinhanhOptions = useMemo(
        () =>
            companyNames && companyNames?.map((organizational: any) => ({
                value: organizational.value,
                label: organizational.key,
            })),
        [companyNames]
    );

    const choncanghiOptions = useMemo(
        () =>
            isShiftList && isShiftList?.list?.map((shift: any) => ({
                value: shift?.shift_id,
                label: shift?.shift_name,
            })),
        [isShiftList]
    );

    const chonquydinhOptions = useMemo(
        () =>
            isSpecifiedList &&
            isSpecifiedList?.data?.map((spe: any) => ({
                value: spe.id,
                label: spe.name
            })),
        [isSpecifiedList]
    );


    const options = {
        chonchinhanh: chonchinhanhOptions,
        chonphongban: [
            { value: isDep_id && isDep_id, label: isDep_name ? isDep_name : 'Chọn phòng ban' },
        ],
        chonnhanvien: chonnhanvienOptions && chonnhanvienOptions,
        chucvuhientai: [
            { value: isPosition_id && isPosition_id, label: isPosition_name ? isPosition_name : 'Chọn chức vụ ' },

        ],
        choncanghi: choncanghiOptions,
        hinhthuc: [
            { value: '1', label: 'Giảm biên chế' },
            { value: '2', label: 'Nghỉ việc' },

        ],
        chonquydinh: chonquydinhOptions,

    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM MỚI GIẢM BIÊN CHẾ</h5>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <form action="">
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> *
                                            <span> {errors.chonnhanvien && <div className={`${styles.t_require} `}>{errors.chonnhanvien}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setInfoList)}
                                                options={options.chonnhanvien}
                                                placeholder="Chọn nhân viên"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chức vụ hiện tại <span style={{ color: 'red' }}> *
                                            <span> {errors.chucvuhientai && <div className={`${styles.t_require}`}>{errors.chucvuhientai}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chucvuhientai}
                                                onChange={(option) => handleSelectChange(option, options.chucvuhientai)}
                                                options={options.chucvuhientai}
                                                placeholder="Chọn chức vụ"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Phòng ban hiện tại </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chonphongban}
                                                onChange={(option) => handleSelectChange(option, options.chonphongban)}
                                                options={options.chonphongban}
                                                placeholder="Chọn phòng ban"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Đơn vị công tác hiện tại</label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={options.chonchinhanh}
                                                onChange={(option) => handleSelectChange(option, setCom_id)}
                                                options={options.chonchinhanh}
                                                placeholder="Chọn chi nhánh"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 4,
                                                        fontSize: state.isFocused ? 14 : 14,
                                                        minHeight: state.isFocused ? 20 : 20,
                                                        width: '100%',
                                                        color: state.isFocused ? '#444444' : '#444444',
                                                        fontWeight: state.isFocused ? 600 : 600
                                                    }),
                                                    placeholder: (baseStyles) => ({
                                                        ...baseStyles,
                                                        color: "#444444",
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Thời gian bắt đầu nghỉ <span style={{ color: 'red' }}> *
                                            <span> {errors.created_at && <div className={`${styles.t_require}`}>{errors.created_at}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="created_at" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />

                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn cả nghỉ </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setShift_id)}
                                                options={options.choncanghi}
                                                placeholder="Chọn ca nghỉ"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Hình thức <span style={{ color: 'red' }}> *
                                            <span> {errors.chonhinhthuc && <div className={`${styles.t_require}`}>{errors.chonhinhthuc}</div>}</span>
                                        </span> </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setType_id)}
                                                options={options.hinhthuc}
                                                placeholder="Chọn hình thức"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn quy định </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setSpecified_id)}
                                                options={options.chonquydinh}
                                                placeholder="Chọn quy định"
                                                styles={{
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
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.cke}`}>
                                        <label htmlFor="">Lý do </label>
                                        <div className={`${styles.ckeditor}`}>
                                            <Input_textarea onDescriptionChange={handleInputAreaChange} />
                                        </div>
                                    </div>
                                    <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                        <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                        <button className={`${styles.btn_add}`} onClick={handleSubmit}>Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}