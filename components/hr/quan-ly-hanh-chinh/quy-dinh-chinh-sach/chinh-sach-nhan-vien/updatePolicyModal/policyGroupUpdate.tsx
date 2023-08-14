import React, { useState, useEffect } from "react";
import styles from '../../quy-dinh-lam-viec/addRegulationsModal/addRegulationsModal.module.css'
import MyEditorNew from "@/components/hr/myEditor";
import { GroupPolicyUpdate } from "@/pages/hr/api/quy_dinh_chinh_sach";
import { PolicyGroupDetail } from "@/pages/hr/api/quy_dinh_chinh_sach";
import { format } from 'date-fns';

interface InputTextareaProps {
    onDescriptionChange: (data: any) => void;
    content: any
}

interface UpdatePolicyModalProps {
    onCancel: () => void;
    idGroup: any
}

function Input_textarea({ onDescriptionChange, content }: InputTextareaProps) {
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
                value={content}
            />
        </div>
    );
}

export default function UpdatePolicyGroupsModal({ onCancel, idGroup }: UpdatePolicyModalProps) {


    const [content, setContent] = useState('');
    const [provisionFile, setProvisionFile] = useState<File | null>(null);
    const [descriptions, setDescription] = useState("");
    const [DetailData, setDetailData] = useState<any | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PolicyGroupDetail(idGroup)
                setDetailData(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const timeStart = DetailData?.data[0]?.timeStart;
        const inputElement = document.getElementById('time-start') as HTMLInputElement;

        if (timeStart && inputElement) {
            const formattedDate = format(new Date(timeStart), 'yyyy-MM-dd');
            inputElement.defaultValue = formattedDate;
        }
    }, [DetailData]);


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            // Lấy giá trị từ các trường input
            const name = (document.getElementById('names') as HTMLInputElement)?.value;
            const time_start = (document.getElementById('time-start') as HTMLInputElement)?.value;
            const supervisor_name = (document.getElementById('supervisor-name') as HTMLInputElement)?.value;
            const description = descriptions;


            const formData = new FormData();
            formData.append("name", name);
            formData.append("time_start", time_start);
            formData.append("supervisor_name", supervisor_name);
            formData.append("id", idGroup);
            if (description) {
                formData.append("description", description);
            }
            else {
                formData.append("description", DetailData?.data[0]?.description);
            }
            if (provisionFile) {
                formData.append("employeePolicy", provisionFile);
            }

            // Gọi API AddSpecifiedGroup
            const response = await GroupPolicyUpdate(formData);
            onCancel()
        } catch (error) {
            throw error
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
        const file = event.target.files && event.target.files[0];
        setProvisionFile(file);
    };

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHỈNH SỬA NHÓM CHÍNH SÁCH</h5>
                            </div>
                            <form action="">
                                {DetailData?.data[0] &&
                                    <div className={`${styles.modal_body} ${styles.body_process}`}>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Tên nhóm <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="text" id="names" defaultValue={DetailData?.data[0]?.name} placeholder="Nhập tên nhóm" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Thời gian bắt đầu hiệu lực <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="date" id="time-start" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Người giám sát <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="text" id="supervisor-name" placeholder="Người giám sát" defaultValue={DetailData?.data[0]?.supervisorName} className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups} ${styles.cke}`}>
                                            <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.ckeditor}`}>
                                                <Input_textarea content={DetailData?.data[0]?.description} onDescriptionChange={handleDescriptionChange} />
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
                                }
                                <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                    <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                    <button className={`${styles.btn_add}`} onClick={handleSubmit} >Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}