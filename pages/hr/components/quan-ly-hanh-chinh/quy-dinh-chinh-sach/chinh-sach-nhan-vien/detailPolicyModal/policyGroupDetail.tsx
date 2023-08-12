import React, { useState, useEffect } from "react";
import styles from '../../quy-dinh-lam-viec/detailReguulationModal/detailRegulationModal.module.css'
import MyEditor from "@/components/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/components/Editor";
import { AddSpecifiedGroup } from "@/pages/api/quy_dinh_chinh_sach";
import { PolicyGroupDetail } from "@/pages/api/quy_dinh_chinh_sach";
import { format } from "date-fns";

interface GroupDetailModalProps {
    onCancel: () => void;
    idGroup: number
}

export default function PolicyGroupDetailModal({ onCancel, idGroup }: GroupDetailModalProps) {
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



    return (
        <>
            <div className={`${styles.modal_open}`}>
                <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
                    <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
                        <div className={`${styles.modal_content}`}>
                            <div className={`${styles.modal_header} ${styles.header_process}`}>
                                <h5 className={`${styles.modal_tittle}`}>CHI TIẾT NHÓM CHÍNH SÁCH</h5>
                            </div>
                            {DetailData?.data[0] &&
                                <div className={`${styles.modal_body} ${styles.body_process}`}>
                                    <div className={`${styles.infors}`}>
                                        <div className={`${styles.info_left}`}>
                                            <li>
                                                <label>Nhóm chính sách:</label>
                                                <span className={`${styles.nqd_nqd}`}>{DetailData?.data[0]?.name}</span>
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
                                        </div>
                                    </div>
                                    <div className={`${styles.infors1}`}>
                                        <p>Nội dung nhóm chính sách</p>
                                        <div className={`${styles.info_left}`} style={{ width: '100%' }}>
                                            <li className={`${styles.nqd_content}`}>
                                                <p>{DetailData?.data[0]?.supervisorName}</p>
                                            </li>
                                        </div>
                                    </div>
                                    <div className={`${styles.infors1} ${styles.preview_file_provision}`}>
                                        <a style={{ color: '#337ab7', fontWeight: 600 }} href="" >Xem chi tiết file đính kèm</a>
                                    </div>
                                </div>}
                            <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                                <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}