import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from './addPlanningModal.module.css'
import Select from 'react-select';
import MyEditorNew from "@/components/hr/myEditor";
import * as Yup from "yup";
import { FetchDataDep, FetchDataEmployee, FetchDataPosition, FetchDataSpecifiedGroup } from "@/components/hr/util/listAll";
import { AddPlanningAppointment } from "@/pages/hr/api/bien_dong_nhan_su";
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

export default function AddPlanningModal({ onCancel }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isEmpList, setEmpList] = useState<any>(null)
    const [isPositionList, setPositionList] = useState<any>(null)
    const [isSpecifiedList, setSpecifiedList] = useState<any>(null)
    const [isDepList, setDeptList] = useState<any>(null)
    const [isReason, setReason] = useState<any>("")

    const [isPosition_name, setPosition_name] = useState<any>(null)
    const [isSpecified_id, setSpecified_id] = useState<any>(null)
    const [isPosition_id, setPosition_id] = useState<any>(null)
    const [isPosition_idNew, setPosition_idNew] = useState<any>(null)
    const [isDep_name, setDep_name] = useState<any>(null)
    const [infoList, setInfoList] = useState<any>(null)
    const [isEmp_id, setEmp_id] = useState<any>(null)
    const [isDep_id, setDep_id] = useState<any>(null)
    const [isDep_idNew, setDep_idNew] = useState<any>(null)
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

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const empData = await FetchDataEmployee();
            setEmpList(empData);

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
        if (isPositionList && Array.isArray(isPositionList.data)) {
            const PositionList = isPositionList?.data?.flat();
            if (PositionList && isPosition_id) {
                const position = PositionList.find((pos: any) => pos?.positionId === isPosition_id);
                if (position) {
                    setPosition_name(position.positionName);
                }
            }
        }
    }, [isPositionList, isPosition_id]);

    const validationSchema = Yup.object().shape({
        chonnhanvien: Yup.string().required("Vui lòng chọn nhân viên"),
        chucvuhientai: Yup.string().required("Vui lòng chọn chức vụ hiện tại"),
        chonphongban: Yup.string().required("Vui lòng chọn phòng ban"),
        quyhoachbonhiem: Yup.string().required("Vui lòng chọn quy hoạch bổ nhiệm"),
        phongbanmoi: Yup.string().required("Vui lòng chọn phòng ban mới"),
        chonquydinh: Yup.string().required("Vui lòng chọn quy định"),
        created_at: Yup.string().required("Vui lòng chọn thời gian quy hoạch bổ nhiệm"),
        note: Yup.string().required("Vui lòng nhập lý do"),
    });

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const formDatas = {
                chonnhanvien: selectedOption?.value || "",
                chucvuhientai: isPosition_id || "",
                chonphongban: isDep_id || "",
                quyhoachbonhiem: isPosition_idNew || "",
                phongbanmoi: isDep_idNew || "",
                chonquydinh: isSpecified_id || "",
                created_at: (document.getElementById('created_at') as HTMLInputElement)?.value || "",
                note: isReason || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            const created_at = (document.getElementById('created_at') as HTMLInputElement)?.value
            const formData = new FormData();
            formData.append('ep_id', isEmp_id)
            formData.append('current_position', isPosition_id)
            formData.append('current_dep_id', isDep_id)
            formData.append('created_at', created_at)
            formData.append('decision_id', isSpecified_id)
            formData.append('update_position', isPosition_idNew)
            formData.append('update_dep_id', isDep_idNew)
            formData.append('note', isReason)

            const response = await AddPlanningAppointment(formData)
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

    const handleInputAreaChange = (data: string) => {
        setReason(data);
    };

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
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

    const chonphongbanOptions = useMemo(
        () =>
            isDepList &&
            isDepList?.data?.map((dep: any) => ({
                value: dep.dep_id,
                label: dep.dep_name
            })),
        [isDepList]
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

    const chonchucvuOptions = useMemo(
        () =>
            isPositionList &&
            isPositionList?.data?.flat()?.map((pos: any) => ({
                value: pos.positionId,
                label: pos.positionName
            })),
        [isPositionList]
    );

    const options = {
        chonnhanvien: chonnhanvienOptions,
        chucvuhientai: [
            { value: isPosition_id && isPosition_id, label: isPosition_name ? isPosition_name : 'Chọn chức vụ ' },
        ],
        chonphongban: [
            { value: isDep_id && isDep_id, label: isDep_name ? isDep_name : 'Chọn phòng ban' },
        ],
        quyhoachbonhiem: chonchucvuOptions,
        phongbanmoi: chonphongbanOptions,
        chonquydinh: chonquydinhOptions,
    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM MỚI BỔ NHIỆM, QUY HOẠCH</h5>
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
                                                onChange={(option) => handleSelectChange(option, setPosition_id)}
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
                                        <label htmlFor="">Phòng ban <span style={{ color: 'red' }}> *
                                            <span> {errors.chonphongban && <div className={`${styles.t_require}`}>{errors.chonphongban}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chonphongban}
                                                onChange={(option) => handleSelectChange(option, setDep_id)}
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
                                        <label htmlFor=""> Quy hoạch bổ nhiệm <span style={{ color: 'red' }}> *
                                            <span> {errors.quyhoachbonhiem && <div className={`${styles.t_require}`}>{errors.quyhoachbonhiem}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setPosition_idNew)}
                                                options={options.quyhoachbonhiem}
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
                                        <label htmlFor="">Phòng ban mới <span style={{ color: 'red' }}> *
                                            <span> {errors.phongbanmoi && <div className={`${styles.t_require}`}>{errors.phongbanmoi}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setDep_idNew)}
                                                options={options.phongbanmoi}
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
                                        <label htmlFor="">Thời gian quy hoạch bổ nhiệm <span style={{ color: 'red' }}> *
                                            <span> {errors.created_at && <div className={`${styles.t_require}`}>{errors.created_at}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="created_at" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn quy định <span style={{ color: 'red' }}> *
                                            <span> {errors.chonquydinh && <div className={`${styles.t_require}`}>{errors.chonquydinh}</div>}</span>
                                        </span></label>
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
                                        <label htmlFor="">Lý do <span style={{ color: 'red' }}> *
                                            <span> {errors.note && <div className={`${styles.t_require}`}>{errors.note}</div>}</span>
                                        </span></label>
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