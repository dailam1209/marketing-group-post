import React, { useState, useEffect } from "react";
import styles from '../../quy-dinh-lam-viec/detailReguulationModal/detailRegulationModal.module.css'
import { PolicyDetails } from "@/pages/hr/api/quy_dinh_chinh_sach";
import { format } from "date-fns";
import UpdatePolicyModal from "../updatePolicyModal/policyUpdate";

interface PolicyDetailModalProps {
    onCancel: () => void;
    idGroup: number;
}

export default function PolicyDetailModal({ onCancel, idGroup }: PolicyDetailModalProps) {

    const [DetailData, setDetailData] = useState<any | null>(null)
    const [dataGroup, setDataGroup] = useState<any | null>(null)
    const [openUpdate, setOpenUpdate] = useState(0)
    const [keyWords, setKeyWords] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PolicyDetails(idGroup)
                setDetailData(response?.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()
    }, [])

    const handleOpenUpdate = (idRegulation: number, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setOpenUpdate(idRegulation)
    }
    const handleCloseModal = () => {
        setOpenUpdate(0)
    }

    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHI TIẾT CHÍNH SÁCH</h5>
                            </div>
                            {openUpdate !== 0 && <UpdatePolicyModal idGroup={openUpdate} onCancel={handleCloseModal} />}
                            {DetailData?.data[0] &&
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.infors}`}>
                                        <p style={{ marginBottom: 24 }} className={`${styles.qd_name}`}>{DetailData?.data[0]?.name}</p>
                                        <div className={`${styles.info_left}`}>
                                            <li>
                                                <label>Nhóm quy định:</label>
                                                <span className={`${styles.nqd_nqd}`}>{DetailData?.data[0]?.EmployeePolicys[0]?.name}</span>
                                            </li>
                                            <li>
                                                <label>Tạo bởi:</label>
                                                <span className={`${styles.nqt_supervisor_name}`}>{DetailData?.data[0]?.createdBy}</span>
                                            </li>
                                            <li>
                                                <label>Người giám sát:</label>
                                                <span className={`${styles.nqt_supervisor_name}`}>{DetailData?.data[0]?.supervisorName}</span>
                                            </li>
                                        </div>
                                        <div className={`${styles.info_right}`}>
                                            <li>
                                                <label>Trạng thái:</label>
                                                <span className={`${styles.green}`}>đã ban hành</span>
                                            </li>
                                            <li>
                                                <label>Có hiệu lực từ:</label>
                                                <span className={`${styles.nqt_created_at}`}>{format(new Date(DetailData?.data[0]?.timeStart), 'dd/MM/yyyy')}</span>
                                            </li>
                                            <li>
                                                <label>Đối tượng thi hành:</label>
                                                <span className={`${styles.nqt_created_at}`}>{DetailData?.data[0]?.applyFor}</span>
                                            </li>
                                        </div>
                                    </div>
                                    <div className={`${styles.infors1}`}>
                                        <p>Nội dung quy định</p>
                                        <div className={`${styles.info_left}`} style={{ width: '100%' }}>
                                            <li className={`${styles.nqd_content}`}>
                                                <p>{DetailData?.data[0]?.content}</p>
                                            </li>
                                        </div>
                                    </div>
                                    <div className={`${styles.infors1} ${styles.preview_file_provision}`}>
                                        <a style={{ color: '#337ab7', fontWeight: 600 }} href="" >Xem chi tiết file đính kèm</a>
                                    </div>
                                </div>}
                            <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                                <button style={{ marginLeft: 10, backgroundColor: '#337ab7', color: '#fff' }} className={`${styles.btn_cancel}`} onClick={(event: any) => handleOpenUpdate(DetailData?.data[0]?.id, event)}>Sửa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}