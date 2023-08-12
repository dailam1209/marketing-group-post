import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import styles from '../candidateAddModal/candidateAddModal.module.css'
import { ProcessList } from '@/pages/api/quan-ly-tuyen-dung/candidateList';
import { ProcessAdd } from '@/pages/api/quan-ly-tuyen-dung/candidateList';
import * as Yup from "yup";

type SelectOptionType = { label: string, value: string }

export default function StageAddModal({ onCancel, animation }: any) {
    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isProcessList, setProcessList] = useState<any>(null)
    const [isProcess_id, setProcess_id] = useState<any>(null)
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                if (formData) {
                    const response = await ProcessList(formData)
                    setProcessList(response?.data)
                }
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên giai đoạn không được để trống"),
        process_befor: Yup.lazy((value) =>
            value.isProcess_id === 0
                ? Yup.number()
                : Yup.string().required("Chọn giai đoạn đứng trước")
        ),
    });

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {

            const formData = new FormData()
            const processName = (document.getElementById('names') as HTMLInputElement)?.value
            const formDatas = {
                name: processName || "",
                process_befor: isProcess_id || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            formData.append('name', processName)
            formData.append('processBefore', isProcess_id)
            const response = await ProcessAdd(formData)
            if (response) {
                setTimeout(() => {
                    onCancel()
                }, 1500)
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

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value);
        }
    };

    const chongiaidoandungtruocOptions = useMemo(
        () =>
            isProcessList &&
            isProcessList?.data?.map((process: any) => ({
                value: process.id,
                label: process.name
            })),
        [isProcessList]
    );

    const options = {
        chongiaidoandungtruoc: chongiaidoandungtruocOptions,
    };
    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.modal_setting} ${animation ? styles.fade_in : styles.fade_out
                    }`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM GIAI ĐOẠN</h5>
                            </div>
                            <form action="">
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên giai đoạn <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="names" placeholder="Nhập tên giai đoạn tuyển dụng" className={`${styles.input_process}`} />
                                            <span> {errors.name && <div className={`${styles.t_require} `}>{errors.name}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn giai đoạn đứng trước <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(option) => handleSelectChange(option, setProcess_id)}
                                                    options={options.chongiaidoandungtruoc}
                                                    placeholder="-- Vui lòng chọn --"
                                                    styles={{
                                                        container: (baseStyles) => ({
                                                            ...baseStyles,
                                                            paddingRight: 16
                                                        }),
                                                        menu: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            width: '97%'
                                                        }),
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 8,
                                                            borderColor: "#4747477a",
                                                            height: "auto",
                                                            fontSize: state.isFocused ? 14 : 14,
                                                            width: '100%',
                                                            fontWeight: state.isFocused ? 600 : 600,
                                                            minHeight: 20
                                                        }),
                                                        valueContainer: (baseStyles) => ({
                                                            ...baseStyles,
                                                            height: 31.6,
                                                        }),
                                                        indicatorsContainer: (baseStyles) => ({
                                                            ...baseStyles,
                                                            height: 31.6,
                                                        }),
                                                        placeholder: (baseStyles) => ({
                                                            ...baseStyles,
                                                            color: "#444444",
                                                        }),
                                                    }}
                                                />
                                                <span> {errors.process_befor && <div className={`${styles.t_require} `}>{errors.process_befor}</div>}</span>
                                            </div>
                                        </div>
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

        </>
    )
}