import React, { useState, useEffect, useRef } from 'react'
import styles from './fileGroupDetail.module.css'

interface GroupDetailModalProps {
    onCancel: () => void
    file: any
}

export default function FilePolicyGroupDetail({
    onCancel,
    file
}: GroupDetailModalProps) {
    const [DetailData, setDetailData] = useState<any | null>(null)
    const modalRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCancel()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [onCancel])

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`} ref={modalRef}>
                            <div
                                className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>
                                    Chi tiết file đính kèm
                                </h5>
                            </div>
                            <div className={`${styles.body_process} ${styles.capnhatkq}`}>
                                <iframe className={`${styles.iframe_preview_nqd}`} src={file}  ></iframe>
                            </div>
                            <div
                                className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button className={`${styles.btn_cancel}`} onClick={onCancel}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
