import React, { useState, useEffect } from "react";
import styles from '../addRegulationsModal/addRegulationsModal.module.css'
import MyEditorNew from "@/components/myEditor";
import { SpecifiedGroupList } from "@/pages/api/quy_dinh_chinh_sach";
import { UpdateRegulation } from "@/pages/api/quy_dinh_chinh_sach";
import { RegulationsDetails } from "@/pages/api/quy_dinh_chinh_sach";
import { format } from 'date-fns'


interface InputTextareaProps {
    onDescriptionChange: (data: any) => void;
    content: string
}
interface UpdateRegulationsModal2Props {
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

export default function UpdateRegulationsModal({ onCancel, idGroup }: UpdateRegulationsModal2Props) {
    const [provisionFile, setProvisionFile] = useState<File | null>(null);
    const [descriptions, setDescription] = useState("");
    const [ListRegulationsGroup, setListRegulationsGroup] = useState<any | null>(null)
    const [provisionId, setProvisionId] = useState<number | null>(null)
    const [DetailData, setDetailData] = useState<any | null>(null)
    const [keyWords, setKeyWords] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SpecifiedGroupList(10000, 1, keyWords)
                setListRegulationsGroup(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RegulationsDetails(idGroup)
                setDetailData(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const timeStart = DetailData?.data[0]?.timeStart;
        const inputElement = document.getElementById('time_start') as HTMLInputElement;

        if (timeStart && inputElement) {
            const formattedDate = format(new Date(timeStart), 'yyyy-MM-dd');
            inputElement.defaultValue = formattedDate;
        }
    }, [DetailData]);


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const name = (document.getElementById('names') as HTMLInputElement)?.value
            const provision_id = (document.getElementById('provision_id') as HTMLInputElement)?.value
            const time_start = (document.getElementById('time_start') as HTMLInputElement)?.value
            const supervisor_name = (document.getElementById('supervisor_name') as HTMLInputElement)?.value
            const apply_for = (document.getElementById('apply_for') as HTMLInputElement)?.value
            const content = descriptions

            const formData = new FormData()
            formData.append('provision_id', DetailData?.data[0]?.provisionId)
            formData.append('name', name)
            formData.append('id', DetailData?.data[0]?.id)
            formData.append('time_start', time_start)
            formData.append('supervisor_name', supervisor_name)
            formData.append('apply_for', apply_for)
            formData.append('content', content)
            if (provisionFile) {
                formData.append("policy", provisionFile);
            }

            const response = await UpdateRegulation(formData)
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
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHỈNH SỬA QUY ĐỊNH</h5>
                            </div>
                            <form action="">
                                {DetailData?.data[0] &&
                                    <div className={`${styles.modal_body} ${styles.body_process}`}>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Tên quy định <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="text" defaultValue={DetailData?.data[0]?.name} id="names" placeholder="Nhập tên quy định" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Chọn nhóm quy định <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <select onChange={handleProvisionChange} name="" id="provision_id" className={`${styles.input_process}`}>
                                                    {ListRegulationsGroup?.data?.map((item: any, index: any) => (
                                                        <option selected={item.id === DetailData?.data[0]?.provisionId} value={item.id} key={index}>-- {item.name} --</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Thời gian bắt đầu hiệu lực <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="date" id="time_start" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Người giám sát <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="text" value={DetailData?.data[0]?.supervisorName} id="supervisor_name" placeholder="Người giám sát" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups}`}>
                                            <label htmlFor="">Đối tượng thi hành <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.input_right}`}>
                                                <input type="text" value={DetailData?.data[0]?.applyFor} id="apply_for" placeholder="Đối tượng thi hành" className={`${styles.input_process}`} />
                                            </div>
                                        </div>
                                        <div className={`${styles.form_groups} ${styles.cke}`}>
                                            <label htmlFor="">Nội dung quy định <span style={{ color: 'red' }}> * </span></label>
                                            <div className={`${styles.ckeditor}`}>
                                                <Input_textarea onDescriptionChange={handleDescriptionChange} content={DetailData?.data[0]?.content} />
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