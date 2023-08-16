import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from '../../planningAppointment/addPlanningModal/addPlanningModal.module.css'
import Select from 'react-select';
import MyEditorNew from "@/components/hr/myEditor";
import { AddWorkingRotation } from "@/pages/hr/api/bien_dong_nhan_su";
import { FetchDataOrganizationalStructure, FetchDataDep, FetchDataPosition, FetchDataSpecifiedGroup } from "@/components/hr/util/listAll";
import * as Yup from "yup";

type SelectOptionType = { label: string, value: string }

interface InputTextareaProps {
    onDescriptionChange: (data: any) => void
}

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


export default function EditWorkingModal({ onCancel, infoList }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isMission, setMission] = useState("");
    const [isNote, setNote] = useState("");
    const [isDepList, setDepList] = useState<any>(null)
    const [isPositionList, setPositionList] = useState<any>(null)
    const [isSpecifiedList, setSpecifiedList] = useState<any>(null)
    const [isOrganizationalStructureList, setOrganizationalStructureList] = useState<any>(null)
    const [isCom_id, setCom_id] = useState<any>(null)
    const [isCom_idNew, setCom_idNew] = useState<any>(null)
    const [isDep_id, setDep_id] = useState<any>(null)
    const [isDep_idNew, setDep_idNew] = useState<any>(null)
    const [isPosition_id, setPosition_id] = useState<any>(null)
    const [isPosition_idNew, setPosition_idNew] = useState<any>(null)
    const [isSpecified_id, setSpecified_id] = useState<any>(null)
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

            const organizationStructure = await FetchDataOrganizationalStructure();
            setOrganizationalStructureList(organizationStructure);

            const department = await FetchDataDep();
            setDepList(department);

            const position = await FetchDataPosition()
            setPositionList(position)

            const specifiedGroup = await FetchDataSpecifiedGroup()
            setSpecifiedList(specifiedGroup)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const matchingDep = isDepList?.data?.find((item: any) => item?.dep_id === infoList?.dep_id);
        const matchingPos = isPositionList?.data?.flat()?.find((item: any) => item?.positionName === infoList.position_name)
        if (matchingDep) {
            setDep_id(matchingDep.dep_id);
            setCom_id(matchingDep.com_id)
        }
        if (matchingPos) {
            setPosition_id(matchingPos.positionId)
        }
    }, [infoList.dep_id, isDepList, isPositionList, infoList.position_name]);


    const validationSchema = Yup.object().shape({
        chonnhanvien: Yup.string().required("Vui lòng chọn nhân viên"),
        donvicongtacmoi: Yup.string().required("Vui lòng chọn đơn vị công tác mới"),
        phongbanmoi: Yup.string().required("Vui lòng chọn phòng ban mới"),
        chucvuhientai: Yup.string().required("Vui lòng chọn chức vụ hiện tại"),
        chucvumoi: Yup.string().required("Vui lòng chọn chức vụ mới"),
        created_at: Yup.string().required("Vui lòng chọn thời gian luân chuyển công tác"),
        mission: Yup.string().required("Vui lòng nhập nhiệm vụ"),
    });


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {

            const formDatas = {
                chonnhanvien: infoList.ep_id || "",
                donvicongtacmoi: isCom_idNew || "",
                phongbanmoi: isDep_idNew || "",
                chucvuhientai: isPosition_id || "",
                chucvumoi: isPosition_idNew || "",
                created_at: (document.getElementById('created_at') as HTMLInputElement)?.value || "",
                mission: isMission || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            const created_at = (document.getElementById('created_at') as HTMLInputElement)?.value
            const formData = new FormData();
            formData.append('ep_id', infoList.ep_id)
            formData.append('current_position', isPosition_id)
            formData.append('current_dep_id', isDep_id)
            formData.append('created_at', created_at)
            formData.append('com_id', isCom_id)
            formData.append('new_com_id', isCom_idNew)
            formData.append('decision_id', isSpecified_id)
            formData.append('update_position', isPosition_idNew)
            formData.append('update_dep_id', isDep_idNew)
            formData.append('mission', isMission)
            formData.append('note', isNote)

            const response = await AddWorkingRotation(formData)
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

    const handleInputAreaChange = (data: string, setState: any) => {
        setState(data);
    };

    // push danh sách công ty
    const companyNames: any = [];
    const companyNamesNew: any = [];
    if (isOrganizationalStructureList?.infoCompany) {
        companyNames.push({ key: isOrganizationalStructureList?.infoCompany?.companyName, value: isOrganizationalStructureList?.infoCompany?.parent_com_id });
        for (const company of isOrganizationalStructureList?.infoCompany?.infoChildCompany) {
            companyNames.push({ key: company.com_name, value: company.com_id });
            companyNamesNew.push({ key: company.com_name, value: company.com_id });
        }
    }

    // push danh sách phòng ban theo công ty
    const depInfoArrayNew: any = [];
    function isValidComId(com_id: any) {
        return isOrganizationalStructureList?.infoCompany?.parent_com_id === com_id ||
            isOrganizationalStructureList?.infoChildCompany?.some(company => company.com_id === com_id);
    }

    if (isOrganizationalStructureList?.infoCompany) {
        for (const infoDep of isOrganizationalStructureList?.infoCompany?.infoDep) {
            if (isValidComId(isCom_idNew)) {
                depInfoArrayNew.push({
                    dep_name: infoDep.dep_name,
                    dep_id: infoDep.dep_id
                });
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

    const chonphongbanmoiOptions = useMemo(
        () =>
            depInfoArrayNew && depInfoArrayNew?.map((dep: any) => ({
                value: dep.dep_id,
                label: dep.dep_name,
            })),
        [depInfoArrayNew]
    );

    const PositionList = isPositionList?.data?.flat();

    const chonchucvuOptions = useMemo(
        () =>
            PositionList &&
            PositionList?.map((pos: any) => ({
                value: pos.positionId,
                label: pos.positionName
            })),
        [PositionList]
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
        chonchinhanh: [{ value: isCom_id, label: infoList.com_name }],
        chonphongban: [{ value: infoList.dep_id, label: infoList.dep_name }],
        chonnhanvien: [{ value: infoList.ep_id, label: infoList.emp_name }],
        chucvuhientai: [{ value: isPosition_id, label: infoList.position_name }],
        donvicongtacmoi: chonchinhanhOptions,
        phongbanmoi: chonphongbanmoiOptions,
        to: [{ value: '  BAN GIÁM ĐỐC', label: 'BAN GIÁM ĐỐC' }],
        nhom: [{ value: '  BAN GIÁM ĐỐC', label: 'BAN GIÁM ĐỐC' }],
        chucvumoi: chonchucvuOptions,
        chonquydinh: chonquydinhOptions,
    };


    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CẬP NHẬT LUÂN PHIÊN CÔNG TÁC</h5>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <form action="">
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Đơn vị công tác hiện tại</label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chonchinhanh}

                                                options={options.chonchinhanh}
                                                placeholder="Chọn chi nhánh"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Phòng ban hiện tại </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                options={options.chonphongban}
                                                placeholder="Chọn phòng ban"
                                                value={options.chonphongban}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> *
                                            <span> {errors.chonnhanvien && <div className={`${styles.t_require} `}>{errors.chonnhanvien}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                options={options.chonnhanvien}
                                                placeholder="Chọn nhân viên"
                                                value={options.chonnhanvien}
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                            <span> {errors.chucvuhientai && <div className={`${styles.t_require} `}>{errors.chucvuhientai}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chucvuhientai}
                                                options={options.chucvuhientai}
                                                placeholder="Chọn chức vụ"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Đơn vị công tác mới <span style={{ color: 'red' }}> *
                                            <span> {errors.donvicongtacmoi && <div className={`${styles.t_require} `}>{errors.donvicongtacmoi}</div>}</span> </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setCom_idNew)}
                                                options={options.donvicongtacmoi}
                                                placeholder="Chọn chi nhánh"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                            <span> {errors.phongbanmoi && <div className={`${styles.t_require} `}>{errors.phongbanmoi}</div>}</span> </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setDep_idNew)}
                                                options={options.phongbanmoi}
                                                placeholder="Chọn phòng ban"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Tổ </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, options.to)}
                                                options={options.to}
                                                placeholder="Chọn tổ"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Nhóm </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, options.nhom)}
                                                options={options.nhom}
                                                placeholder="Chọn nhóm"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Chức vụ mới <span style={{ color: 'red' }}> *
                                            <span> {errors.chucvumoi && <div className={`${styles.t_require} `}>{errors.chucvumoi}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setPosition_idNew)}
                                                options={options.chucvumoi}
                                                placeholder="Chọn chức vụ"
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Thời gian luân chuyển công tác <span style={{ color: 'red' }}> *
                                            <span> {errors.created_at && <div className={`${styles.t_require} `}>{errors.created_at}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="created_at" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
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
                                                        borderRadius: 8,
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
                                        <label htmlFor="">Nhiệm vụ công việc mới <span style={{ color: 'red' }}> *
                                            <span> {errors.mission && <div className={`${styles.t_require} `}>{errors.mission}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.ckeditor}`}>
                                            <Input_textarea onDescriptionChange={(data) => handleInputAreaChange(data, setMission)} />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.cke}`}>
                                        <label htmlFor="">Ghi chú</label>
                                        <div className={`${styles.ckeditor}`}>
                                            <Input_textarea onDescriptionChange={(data) => handleInputAreaChange(data, setNote)} />
                                        </div>
                                    </div>
                                    <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                        <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                        <button className={`${styles.btn_add}`} onClick={handleSubmit}>Cập nhật</button>
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