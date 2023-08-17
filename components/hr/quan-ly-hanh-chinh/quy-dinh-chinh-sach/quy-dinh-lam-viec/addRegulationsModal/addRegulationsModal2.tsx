import React, { useState, useEffect, useRef } from "react";
import styles from './addRegulationsModal.module.css'
import MyEditorNew from "@/components/hr/myEditor";
import { AddRulesByGroupList } from "@/pages/hr/api/quy_dinh_chinh_sach";
import { SpecifiedGroupList } from "@/pages/hr/api/quy_dinh_chinh_sach";
import * as Yup from "yup";
interface InputTextareaProps {
    onDescriptionChange: (data: any) => void
}
interface AddRegulationsModal2Props {
    onCancel: () => void;
}

function Input_textarea({ onDescriptionChange }: InputTextareaProps) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <div>
            <MyEditorNew
                name="Editor"
                onChange={(data: React.SetStateAction<string>) => {
                    setData(data);
                    onDescriptionChange(data)
                }}
                editorLoaded={editorLoaded}
                value={data}
            />
        </div>
    );
}

export default function AddRegulationsModal2({ onCancel }: AddRegulationsModal2Props) {
    const [provisionFile, setProvisionFile] = useState<File | null>(null);
    const [descriptions, setDescription] = useState("");
    const [ListRegulationsGroup, setListRegulationsGroup] = useState<any | null>(null)
    const [provisionId, setProvisionId] = useState<number | null>(null)
    const [keyWords, setKeyWords] = useState('')
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
        const fetchData = async () => {
            try {
                const response = await SpecifiedGroupList(50, 1, keyWords)
                setListRegulationsGroup(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])
    const name = (document.getElementById('names') as HTMLInputElement)?.value

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên quy định không được để trống"),
        provision_id: Yup.string().required("Nhóm quy định không được để trống"),
        time: Yup.string().required("Thời gian không được để trống"),
        supervisor: Yup.string().required("Người giám sát không được để trống"),
        apply_for: Yup.string().required("Đối tượng thi hành không được để trống"),
        note: Yup.string().required("Mô tả không được để trống không được để trống"),
    });

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const name = (document.getElementById('names') as HTMLInputElement)?.value
            const provision_id = (document.getElementById('provision_id') as HTMLInputElement)?.value
            const time_start = (document.getElementById('time_start') as HTMLInputElement)?.value
            const supervisor_name = (document.getElementById('supervisor_name') as HTMLInputElement)?.value
            const apply_for = (document.getElementById('apply_for') as HTMLInputElement)?.value
            const content = descriptions
            const formDatas = {
                name: name || "",
                time: time_start || "",
                provision_id: provision_id || "",
                apply_for: apply_for || "",
                supervisor: supervisor_name || "",
                note: content || "",
            };

            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });
            const formData = new FormData()
            formData.append('name', name)
            formData.append('provision_id', provision_id)
            formData.append('time_start', time_start)
            formData.append('supervisor_name', supervisor_name)
            formData.append('apply_for', apply_for)
            formData.append('content', content)
            if (provisionFile) {
                formData.append("policy", provisionFile);
            }

            const response = await AddRulesByGroupList(formData)
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



    function handleUploadClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const uploadInput = document.getElementById('upload_cv') as HTMLInputElement;
        if (uploadInput) {
            uploadInput.click();
        }
    }

    const handleDescriptionChange = (data: string) => {
        setDescription(data);
    };

    const handleProvisionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        setProvisionFile(file)

    }
    const handleProvisionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvisionId = parseInt(event.target.value, 10);
        setProvisionId(selectedProvisionId);
    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>THÊM QUY ĐỊNH</h5>
                            </div>
                            <form action="">
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Tên quy định <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="names" placeholder="Nhập tên quy định" className={`${styles.input_process}`} />
                                            <span> {errors.name && <div className={`${styles.t_require} `}>{errors.name}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Chọn nhóm quy định <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <select onChange={handleProvisionChange} name="" id="provision_id" className={`${styles.input_process}`}>
                                                {ListRegulationsGroup?.data?.map((item: any, index: any) => (
                                                    <option value={item.id} key={index}>-- {item.name} --</option>
                                                ))}
                                            </select>
                                            <span> {errors.provision_id && <div className={`${styles.provision_id} `}>{errors.provision_id}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Thời gian bắt đầu hiệu lực <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="date" id="time_start" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                                            <span> {errors.time && <div className={`${styles.t_require} `}>{errors.time}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Người giám sát <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="supervisor_name" placeholder="Người giám sát" className={`${styles.input_process}`} />
                                            <span> {errors.supervisor && <div className={`${styles.t_require} `}>{errors.supervisor}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Đối tượng thi hành <span style={{ color: 'red' }}> * </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <input type="text" id="apply_for" placeholder="Đối tượng thi hành" className={`${styles.input_process}`} />
                                            <span> {errors.apply_for && <div className={`${styles.t_require} `}>{errors.apply_for}</div>}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups} ${styles.cke}`}>
                                        <label htmlFor="">Nội dung quy định <span style={{ color: 'red' }}> *
                                            <span > {errors.note && <div className={`${styles.t_require} `}>{errors.note}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.ckeditor}`}>
                                            <Input_textarea onDescriptionChange={handleDescriptionChange} />
                                        </div>
                                    </div>
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">File đính kèm </label>
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