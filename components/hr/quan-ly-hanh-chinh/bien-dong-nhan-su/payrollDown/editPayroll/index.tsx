import React, { useState, useEffect, useMemo } from "react";
import styles from '../../planningAppointment/addPlanningModal/addPlanningModal.module.css'
import Select from 'react-select';
import MyEditorNew from "@/components/hr/myEditor";
import { parseISO, format } from 'date-fns';
import { FetchDataOrganizationalStructure, FetchDataDep, FetchDataPosition, FetchDataSpecifiedGroup } from "@/components/hr/util/listAll";
import { ShiftList, AddPayrollDown } from "@/pages/hr/api/bien_dong_nhan_su";
import GetComId from "@/components/hr/getComID";
interface InputTextareaProps {
    onDescriptionChange: (data: any) => void
    reason: any
}
type SelectOptionType = { label: string, value: string }

function Input_textarea({ onDescriptionChange, reason }: InputTextareaProps) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState(reason);

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
export default function EditPayroll({ onCancel, infoList }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isDepList, setDepList] = useState<any>(null)
    const [isPositionList, setPositionList] = useState<any>(null)
    const [isSpecifiedList, setSpecifiedList] = useState<any>(null)
    const [isOrganizationalStructureList, setOrganizationalStructureList] = useState<any>(null)
    const [isShiftList, setShiftList] = useState<any>(null)

    const [isReason, setReason] = useState<any>("")
    const [isCom_id, setCom_id] = useState<any>("")
    const [isDep_id, setDep_id] = useState<any>("")
    const [isType_id, setType_id] = useState<any>("")
    const [isShift_id, setShift_id] = useState<any>("")
    const [isPosition_name, setPosition_name] = useState<any>("")
    const [isSpecified_id, setSpecified_id] = useState<any>("")
    const [isPosition_id, setPosition_id] = useState<any>("")
    const [isDep_name, setDep_name] = useState<any>("")
    const comid: any = GetComId()

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
        const matchingDep = isDepList?.data?.find((item: any) => item?.dep_name === infoList?.dep_name);
        const matchingPos = isPositionList?.data?.flat()?.find((item: any) => item?.positionName === infoList.position_name)
        if (matchingDep) {
            setDep_id(matchingDep.dep_id);
            setCom_id(matchingDep.com_id)
        }
        if (matchingPos) {
            setPosition_id(matchingPos.positionId)
        }
    }, [infoList.dep_id, isDepList, isPositionList, infoList.position_name]);

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

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const created_at = (document.getElementById('created_at') as HTMLInputElement)?.value
            const formData = new FormData();
            formData.append('ep_id', infoList.ep_id)
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
            throw error
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
            { value: isDep_id, label: infoList.dep_name },
        ],
        chonnhanvien: [
            { value: infoList?.ep_id, label: infoList?.ep_name },
        ],
        chucvuhientai: [
            { value: isPosition_id, label: infoList?.position_name },
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
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CẬP NHẬT GIẢM BIÊN CHẾ</h5>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <form action="">
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chonnhanvien}
                                                onChange={(option) => handleSelectChange(option, options.chonnhanvien)}
                                                options={options.chonnhanvien}
                                                placeholder="Chọn nhân viên"
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
                                        <label htmlFor="">Chức vụ hiện tại <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chucvuhientai}
                                                onChange={(option) => handleSelectChange(option, options.chucvuhientai)}
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
                                        <label htmlFor="">Đơn vị công tác hiện tại</label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                value={options.chonchinhanh}
                                                onChange={(option) => handleSelectChange(option, options.chonchinhanh)}
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
                                        <label htmlFor="">Thời gian bắt đầu nghỉ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="created_at" defaultValue={format(parseISO(infoList?.time), 'yyyy-MM-dd')} className={`${styles.input_process}`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn ca nghỉ </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setShift_id)}
                                                options={options.choncanghi}
                                                placeholder="Chọn ca nghỉ"
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
                                        <label htmlFor="">Hình thức </label>
                                        <div className={`${styles.input_right}`}>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(option) => handleSelectChange(option, setType_id)}
                                                options={options.hinhthuc}
                                                placeholder="Chọn hình thức"
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
                                    <div className={`${styles.form_groups}`} >
                                        <label htmlFor="">Chọn quy định <span style={{ color: 'red' }}> * </span></label>
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
                                                        fontWeight: state.isFocused ? 600 : 600,

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
                                            <Input_textarea onDescriptionChange={handleInputAreaChange} reason={infoList.note} />
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