import React, { useState, useRef, useEffect } from "react";
import styles from './editPositionModal.module.css'
import Select from 'react-select';
import { PostionCharUpdate } from "@/pages/hr/api/co_cau_to_chuc";
import * as Yup from "yup";

export default function EditPositionCharModal({ idPosition, mission, onCancel }: any) {
    const modalRef = useRef(null);
    const [errors, setErrors] = useState<any>({});

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

    const validationSchema = Yup.object().shape({
        description: Yup.string().required("Mô tả không được để trống"),
    });


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const description = (document.getElementById('mota_nhiemvu') as HTMLTextAreaElement)?.value
            const formData = new FormData();

            const formDatas = {
                description: description || ""

            };
            await validationSchema.validate(formDatas, {
                abortEarly: false,
            });
            formData.append('positionId', idPosition)
            formData.append('description', description)
            const response = await PostionCharUpdate(formData)
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

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHỈNH SỬA NHIỆM VỤ</h5>
                            </div>
                            <div className={`${styles.modal_body}`}>
                                <form action="">
                                    <div className={`${styles.form_groups}`}>
                                        <label htmlFor="">Mô tả <span style={{ color: 'red' }}> *
                                            <span> {errors.description && <div className={`${styles.t_require} `}>{errors.description}</div>}</span>
                                        </span></label>
                                        <div className={`${styles.input_right}`}>
                                            <textarea defaultValue={mission} className={`${styles.inputquytrinh} ${styles.textareapolicy}`} id="mota_nhiemvu"></textarea>
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