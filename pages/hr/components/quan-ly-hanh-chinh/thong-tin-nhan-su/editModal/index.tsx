import React, { useState, useEffect, useMemo } from "react";
import styles from './editModal.module.css'
import Select from 'react-select';
import { EmployeeUpdate } from "@/pages/api/quan_ly_nhan_vien";
import { PostionCharData } from '@/pages/api/co_cau_to_chuc';
import { format, parseISO } from "date-fns";
import * as Yup from "yup";
type SelectOptionType = { label: string, value: any }

export default function EditCandidateList({ onCancel, infoList, position }: any) {

    console.log(infoList);

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [isGender, setGender] = useState<any>(1)
    const [isMaritalStatus, setMaritalStatus] = useState<any>("")
    const [isPosition_id, setPosition_id] = useState<any>(infoList?.infoList?.position_id)
    const [isExp, setExp] = useState<any>("")
    const [isEducation, setEducation] = useState<any>("")
    const [PostionCharDatas, setPosttionCharData] = useState<any>("")
    const [errors, setErrors] = useState<any>({});

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

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên nhân viên không được để trống"),
        phone: Yup.string().required("Điện thoại không được để trống"),

    });


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            const names = (document.getElementById('names') as HTMLInputElement)?.value
            const dateInCom = (document.getElementById('date_in_com') as HTMLInputElement)?.value
            const birthday = (document.getElementById('birthday') as HTMLInputElement)?.value
            const phoneNumber = (document.getElementById('phone') as HTMLInputElement)?.value
            const address = (document.getElementById('address') as HTMLInputElement)?.value
            const formDatas = {
                name: names || "",
                phone: phoneNumber || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            formData.append('com_id', infoList?.infoList?.com_id)
            formData.append('dep_id', infoList?.infoList?.dep_id)
            formData.append('role', infoList?.infoList?.role)
            formData.append('userName', names)
            formData.append('_id', infoList?.infoList?._id)
            formData.append('birthday', birthday)
            formData.append('phoneTk', phoneNumber)
            formData.append('address', address)
            formData.append('gender', isGender)
            formData.append('position_id', isPosition_id)
            formData.append('experience', isExp)
            formData.append('start_working_time', dateInCom)
            formData.append('education', isEducation)
            formData.append('married', isMaritalStatus)
            formData.append('password', isMaritalStatus)

            const response = await EmployeeUpdate(formData)
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

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const allPositions = PostionCharDatas?.data?.flat();

    const chonpchưvuOptions = useMemo(
        () =>
            allPositions?.map((position: any) => ({
                value: position.positionId,
                label: position.positionName,
            })),
        [allPositions]
    );

    const options = {
        tinhtranghonnhan: [
            { value: 1, label: 'Độc thân' },
            { value: 2, label: 'Đã kết hôn' },
            { value: 3, label: 'Khác' },
        ],
        chongioitinh: [
            { value: '1', label: 'Nam' },
            { value: '2', label: 'Nữ' },
        ],
        trinhdohocvan: [
            { value: 7, label: 'Đại học trở lên' },
            { value: 5, label: 'Cao đẳng trở lên' },
            { value: 1, label: 'THPT trở lên' },
            { value: 2, label: 'Trung học trở lên' },
            { value: 3, label: 'Chứng chỉ' },
            { value: 4, label: 'Trung cấp trở lên' },
            { value: 6, label: 'Cử nhân trở lên' },
            { value: 8, label: 'Thạc sỹ' },
            { value: 9, label: 'Thạc sỹ Nghệ thuật' },
            { value: 10, label: 'Thạc sỹ Thương mại' },
            { value: 11, label: 'Thạc sỹ Khoa học' },
            { value: 12, label: 'Thạc sỹ Kiến trúc' },
            { value: 13, label: 'Thạc sỹ QTKD' },
            { value: 14, label: 'Thạc sỹ Kỹ thuật ứng dụng' },
            { value: 15, label: 'Thạc sỹ Luật' },
            { value: 16, label: 'Thạc sỹ Y học' },
            { value: 17, label: 'Thạc sỹ Dược phẩm' },
            { value: 18, label: 'Tiến sỹ' },
            { value: 19, label: 'Khác' },

        ],
        kinhnghiemlamviec: [
            { value: 0, label: 'Chưa có kinh nghiệm' },
            { value: 1, label: '0 - 1 năm kinh nghiệm' },
            { value: 2, label: '1 - 2 năm kinh nghiệm' },
            { value: 3, label: '2 - 5 năm kinh nghiệm' },
            { value: 4, label: '5 - 10 năm kinh nghiệm' },
            { value: 5, label: 'Hơn 10 năm kinh nghiệm' },
        ],
        chucvuhientai: chonpchưvuOptions

    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <p>CẬP NHẬT THÔNG TIN NHÂN VIÊN</p>
                            </div>
                            <form action="">
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> * </span>
                                            <span> {errors.name && <div className={`${styles.t_require} `}>{errors.name}</div>}</span></label>
                                        <input type="text" defaultValue={infoList?.infoList?.userName} id="names" placeholder="" className={`${styles.form_control}`} />
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Mã ID nhân viên <span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" value={infoList?.infoList?.idQLC} placeholder="" className={`${styles.form_control} ${styles.read_only}`} />
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.form_groups2}`}>
                                        <div className={`${styles.content_left}`}>
                                            <div className={`${styles.form_groups} ${styles.form_groups3}`}>
                                                <label htmlFor="">Ngày sinh </label>
                                                <input style={{ height: 20 }} type="date" defaultValue={format(
                                                    parseISO(new Date(infoList?.infoList?.birthday * 1000).toISOString()),
                                                    "yyyy-MM-dd"
                                                )} id="birthday" placeholder="" className={`${styles.form_control} `} />
                                            </div>
                                        </div>
                                        <div className={`${styles.content_right}`}>
                                            <div className={`${styles.form_groups} ${styles.form_groups5} ${styles.form_groups6}   `}>
                                                <label htmlFor="">Điện thoại <span style={{ color: 'red' }}> *
                                                    <span> {errors.phone && <div className={`${styles.t_require} `}>{errors.phone}</div>}</span>
                                                </span>
                                                </label>
                                                <input type="text" id="phone" defaultValue={infoList?.infoList?.phoneTK} placeholder="" className={`${styles.form_control} `} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Địa chỉ</label>
                                        <input type="text" id="address" defaultValue={infoList?.infoList?.address} placeholder="" className={`${styles.form_control}`} />
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.form_groups2}`}>
                                        <div className={`${styles.content_left}`}>
                                            <div className={`${styles.form_groups} ${styles.form_groups3}`}>
                                                <label htmlFor="">Giới tính </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(option) => handleSelectChange(option, setGender)}
                                                    options={options.chongioitinh}
                                                    placeholder="Chọn giới tính"
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 4,
                                                            fontSize: state.isFocused ? 14 : 14,
                                                            minHeight: state.isFocused ? 20 : 20,
                                                            width: '100%',
                                                            fontWeight: state.isFocused ? 600 : 600
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
                                        </div>
                                        <div className={`${styles.content_right}`}>
                                            <div className={`${styles.form_groups} ${styles.form_groups5}`}>
                                                <label htmlFor="">Tình trạng hôn nhân </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(option) => handleSelectChange(option, setMaritalStatus)}
                                                    options={options.tinhtranghonnhan}
                                                    placeholder="Chọn tình trạng"
                                                    styles={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderRadius: 4,
                                                            fontSize: state.isFocused ? 14 : 14,
                                                            minHeight: state.isFocused ? 20 : 20,
                                                            width: '105%',
                                                            fontWeight: state.isFocused ? 600 : 600
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
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Email <span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" value={infoList?.infoList?.emailContact} id="email" placeholder="" className={`${styles.form_control} ${styles.read_only}`} />
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chức vụ </label>
                                        <Select
                                            defaultValue={selectedOption}
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
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Kinh nghiệm làm việc </label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={(option) => handleSelectChange(option, setExp)}
                                            options={options.kinhnghiemlamviec}
                                            placeholder=""
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: 4,
                                                    fontSize: state.isFocused ? 14 : 14,
                                                    minHeight: state.isFocused ? 20 : 20,
                                                    width: '100%',
                                                    fontWeight: state.isFocused ? 600 : 600
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
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Ngày vào công ty </label>
                                        <input type="date" id="date_in_com" defaultValue={format(
                                            parseISO(new Date(infoList?.infoList?.start_working_time * 1000).toISOString()),
                                            "yyyy-MM-dd"
                                        )} placeholder="" className={`${styles.form_control}`} />
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Trình độ học vấn </label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={(option) => handleSelectChange(option, setEducation)}
                                            options={options.trinhdohocvan}
                                            placeholder=""
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: 4,
                                                    fontSize: state.isFocused ? 14 : 14,
                                                    minHeight: state.isFocused ? 20 : 20,
                                                    width: '100%',
                                                    fontWeight: state.isFocused ? 600 : 600
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
                                </div>
                                <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                    <button className={`${styles.btn_cancel}`} onClick={onCancel}>Đóng</button>
                                    <button className={`${styles.btn_add}`} onClick={handleSubmit}>Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}