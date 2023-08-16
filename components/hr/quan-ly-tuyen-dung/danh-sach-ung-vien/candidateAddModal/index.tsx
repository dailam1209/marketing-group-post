import React, { useState, useEffect, useMemo, useRef } from "react";
import Select from 'react-select';
import styles from './candidateAddModal.module.css'
import { Rating } from 'react-simple-star-rating'
import { CandidateAdd } from "@/pages/hr/api/quan-ly-tuyen-dung/candidateList";
import { EmployeeList } from "@/pages/hr/api/listNhanVien";
import { GetListNews } from "@/pages/hr/api/quan-ly-tuyen-dung/PerformRecruitment";
import * as Yup from "yup";
import Selects from "../../../select";
import HandleAddAnotherSkill from "./addAnotherSkill";
import GetComId from "../../../getComID";

type SelectOptionType = { label: string, value: any }

export default function CandidateAddModal({ onCancel, animation }: any) {

    const [rating, setRating] = useState<any>(0)
    const [addAnotherSkill, setAddAnotherSkill] = useState<JSX.Element[]>([]);
    const [skills, setSkills] = useState<{ skillName: string; skillVote: any }[]>([]);
    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [lastAddedIndex, setLastAddedIndex] = useState(-1);
    const [provisionFile, setProvisionFile] = useState<File | null>(null)
    const [isGender, setGender] = useState<any>("")
    const [isEducation, setEducation] = useState<any>("")
    const [isUserHiring, setUserHiring] = useState<any>("")
    const [isExp, setExp] = useState<any>("")
    const [isMarried, setMarried] = useState<any>("")
    const [isUserRecommend, setUserRecommend] = useState<any>("")
    const [isRecruitmentNewsId, setRecruitmentNewsId] = useState<any>("")
    const [isEmpList, setEmpList] = useState<any>(null)
    const [isNewList, setNewsList] = useState<any>(null);
    const [errors, setErrors] = useState<any>({});
    const comid: any = GetComId()
    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onCancel]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', comid)
                const response = await EmployeeList(formData)
                if (response) {
                    setEmpList(response?.data)
                }
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetListNews(1, 2000, "", "", "")
                if (response) {
                    setNewsList(response?.data)
                }
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được để trống"),
        email: Yup.string().required("email không được để trống"),
        phone: Yup.string().required("Số điện thoại không được để trống"),
        gender: Yup.string().required("Chọn giới tính"),
        birthday: Yup.string().required("Chọn ngày sinh"),
        education: Yup.string().required("Chọn trình độ học vấn"),
        exp: Yup.string().required("Chọn kinh nghiệm làm việc"),
        meried: Yup.string().required("Chọn tình trạng hôn nhân"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        cvFrom: Yup.string().required("Nhập nguồn ứng viên"),
        userHiring: Yup.string().required("Chọn nhân viên tuyển dụng"),
        recruitment: Yup.string().required("Chọn vị trí tuyển dụng"),
        timeSendCv: Yup.string().required("Thời gian gửi không được để trống"),
        starVote: Yup.string().required("Đánh giá không được để trống"),
    });


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {

            const name = (document.getElementById('name') as HTMLInputElement)?.value
            const email = (document.getElementById('email') as HTMLInputElement)?.value
            const phone = (document.getElementById('phone') as HTMLInputElement)?.value
            const birthday = (document.getElementById('birthday') as HTMLInputElement)?.value
            const hometown = (document.getElementById('hometown') as HTMLInputElement)?.value
            const school = (document.getElementById('school') as HTMLInputElement)?.value
            const address = (document.getElementById('address') as HTMLInputElement)?.value
            const cvFrom = (document.getElementById('cvFrom') as HTMLInputElement)?.value
            const timeSendCv = (document.getElementById('timeSendCv') as HTMLInputElement)?.value

            const formDatas = {
                name: name || "",
                email: email || "",
                phone: phone || "",
                gender: isGender || "",
                birthday: birthday || "",
                education: isEducation || "",
                exp: isExp || "",
                meried: isMarried || "",
                address: address || "",
                cvFrom: cvFrom || "",
                userHiring: isUserHiring || "",
                recruitment: isRecruitmentNewsId || "",
                timeSendCv: timeSendCv || "",
                starVote: rating || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });

            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('gender', isGender)
            formData.append('birthday', birthday)
            formData.append('hometown', hometown)
            formData.append('education', isEducation)
            formData.append('school', school)
            formData.append('exp', isExp)
            formData.append('isMarried', isMarried)
            formData.append('address', address)
            formData.append('userHiring', isUserHiring)
            formData.append('userRecommend', isUserRecommend)
            formData.append('recruitmentNewsId', isRecruitmentNewsId)
            formData.append('cvFrom', cvFrom)
            formData.append('timeSendCv', timeSendCv)
            formData.append('firstStarVote', rating)
            {
                skills?.map((item, index) => {
                    const skillData = {
                        skillName: item.skillName,
                        skillVote: item.skillVote,
                    };
                    formData.append('listSkill', JSON.stringify(skillData));
                });
            }
            if (provisionFile) {
                formData.append('cv', provisionFile)
            }
            const response = await CandidateAdd(formData)
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

    function handleUploadClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const uploadInput = document.getElementById('upload_cv') as HTMLInputElement;
        if (uploadInput) {
            uploadInput.click();
        }
    }

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const handleProvisionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setProvisionFile(file);
    }

    const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            setState(selectedOption.value);
        }
    };

    const chonnhanvienOptions = useMemo(
        () =>
            isEmpList &&
            isEmpList?.data?.map((emp: any) => ({
                value: emp.idQLC,
                label: emp.userName
            })),
        [isEmpList]
    );

    const chonvitrituyendungOptions = useMemo(
        () =>
            isNewList &&
            isNewList?.data?.data?.map((news: any) => ({
                value: news.id,
                label: news.title
            })),
        [isNewList]
    );

    const options = {
        chongioitinh: [
            { value: 1, label: 'Nam' },
            { value: 2, label: 'Nữ' },
            { value: 0, label: 'Giới tính khác' },
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
            { value: "0", label: 'Chưa có kinh nghiệm' },
            { value: "1", label: '0 - 1 năm kinh nghiệm' },
            { value: "2", label: '1 - 2 năm kinh nghiệm' },
            { value: "3", label: '2 - 5 năm kinh nghiệm' },
            { value: "4", label: '5 - 10 năm kinh nghiệm' },
            { value: "5", label: 'Hơn 10 năm kinh nghiệm' },
        ],
        tinhtranghonnhan: [
            { value: 1, label: 'Độc thân' },
            { value: 2, label: 'Đã kết hôn' },
            { value: 3, label: 'Khác' },
        ],
        tennhanvientuyendung: chonnhanvienOptions,
        tennhanviengioithieu: chonnhanvienOptions,
        vitrituyendung: chonvitrituyendungOptions,

    };
    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.modal_setting} ${animation ? styles.fade_in : styles.fade_out
                    }`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM ỨNG VIÊN</h5>
                            </div>
                            <form action="">
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên ứng viên <span style={{ color: 'red' }}> *
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="name" placeholder="Nhập tên ứng viên" className={`${styles.input_process}`} />
                                            <span> {errors.name && <div className={`${styles.t_require} `}>{errors.name}</div>}</span>
                                        </div>
                                    </div>

                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">E-mail <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="email" placeholder="Nhập Email ứng viên" className={`${styles.input_process}`} />
                                            <span> {errors.email && <div className={`${styles.t_require} `}>{errors.email}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Số điện thoại <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="phone" placeholder="Nhập SĐt ứng viên" className={`${styles.input_process}`} />
                                            <span> {errors.phone && <div className={`${styles.t_require} `}>{errors.phone}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Giới tính <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setGender} option={options.chongioitinh} placeholder={"Chọn giới tính"} />
                                            </div>
                                            <span> {errors.gender && <div className={`${styles.t_require} `}>{errors.gender}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Ngày sinh <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="birthday" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                                            <span> {errors.birthday && <div className={`${styles.t_require} `}>{errors.birthday}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Quê quán </label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="hometown" placeholder="Nhập quê quán" className={`${styles.input_process}`} />

                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Trình độ học vấn <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setEducation} option={options.trinhdohocvan} placeholder={"-- Vui lòng chọn --"} />
                                            </div>
                                            <span> {errors.education && <div className={`${styles.t_require} `}>{errors.education}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Trường học</label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="school" placeholder="Nhập trường học" className={`${styles.input_process}`} />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Kinh nghiệm làm việc <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setExp} option={options.kinhnghiemlamviec} placeholder={"-- Vui lòng chọn --"} />
                                            </div>
                                            <span> {errors.exp && <div className={`${styles.t_require} `}>{errors.exp}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tình trạng hôn nhân <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setMarried} option={options.tinhtranghonnhan} placeholder={"-- Vui lòng chọn --"} />
                                            </div>
                                            <span> {errors.meried && <div className={`${styles.t_require} `}>{errors.meried}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Địa chỉ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right} `}>
                                            <input type="text" id="address" placeholder="Nhập địa chỉ ứng viên" className={`${styles.input_process}`} />
                                            <span> {errors.address && <div className={`${styles.t_require} `}>{errors.address}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Nguồn ứng viên <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right} `}>
                                            <input type="text" id="cvFrom" placeholder="Nhập nguồn ứng viên" className={`${styles.input_process}`} />
                                            <span> {errors.cvFrom && <div className={`${styles.t_require} `}>{errors.cvFrom}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên nhận viên tuyển dụng <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setUserHiring} option={options.tennhanvientuyendung} placeholder={"Chọn nhân viên"} />
                                            </div>
                                            <span> {errors.userHiring && <div className={`${styles.t_require} `}>{errors.userHiring}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên nhận viên giới thiệu </label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setUserRecommend} option={options.tennhanviengioithieu} placeholder={"Chọn nhân viên"} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Vị trí tuyển dụng <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <div className={`${styles.div_no_pad} `}>
                                                <Selects selectedOption={selectedOption} onChange={handleSelectChange} padding={15} width_control={100}
                                                    width_menu={97} height={33.6} setState={setRecruitmentNewsId} option={options.vitrituyendung} placeholder={"-- Vui lòng chọn --"} />
                                            </div>
                                            <span> {errors.recruitment && <div className={`${styles.t_require} `}>{errors.recruitment}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Thời gian gửi hồ sơ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="timeSendCv" placeholder="dd/mm/yyyy --:--:--" className={`${styles.input_process}`} />
                                            <span> {errors.timeSenCv && <div className={`${styles.t_require} `}>{errors.timeSenCv}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groupss}`} >
                                        <label htmlFor="">Đánh giá hồ sơ <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <Rating size={27} initialValue={0} disableFillHover className={`${styles.star_rating}`} onClick={handleRating} />
                                            <span> {errors.starVote && <div className={`${styles.t_require} `}>{errors.starVote}</div>}</span>
                                            <div className={`${styles.skills_container}`}>
                                                {addAnotherSkill}
                                            </div>
                                            <a className={`${styles.add_another_skill}`} style={{ cursor: 'pointer' }} onClick={() => HandleAddAnotherSkill({ lastAddedIndex, setSkills, setAddAnotherSkill, setLastAddedIndex })}>Thêm Kỹ năng</a>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groupss}`} >
                                        <label htmlFor="">Tải lên tệp CV </label>
                                        <div className={`${styles.input_right} ${styles.input_upload_t}`}>
                                            <input type="file" className={`${styles.upload_cv}`} id="upload_cv" accept="application/pdf, image/*" onChange={handleProvisionFileChange} />
                                            <a href="" className={`${styles.t_ion_file}`} onClick={handleUploadClick} >
                                                <img src={`/t-icon-file.svg`} alt="" />
                                            </a>
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