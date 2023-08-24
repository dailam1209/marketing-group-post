import React, { useState, useEffect, useRef } from 'react'
import styles from '../../quy-dinh-lam-viec/detailReguulationModal/detailRegulationModal.module.css'
import { format } from 'date-fns'
import { PolicyGroupDetail } from '@/pages/api/api-hr/quy_dinh_chinh_sach'
import FilePolicyGroupDetail from './filePolicyGroupDetail'
interface GroupDetailModalProps {
  onCancel: () => void
  idGroup: number
}

export default function PolicyGroupDetailModal({
  onCancel,
  idGroup,
}: GroupDetailModalProps) {
  const [DetailData, setDetailData] = useState<any | null>(null)
  const [isopenDetailFile, setOpenDetailFile] = useState<any | null>(false)
  const modalRef = useRef(null)

  console.log(DetailData);


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PolicyGroupDetail(idGroup)
        setDetailData(response?.success)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  const handlecloseModal = () => {
    setOpenDetailFile(false)
  }

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>
                  CHI TIẾT NHÓM CHÍNH SÁCH
                </h5>
              </div>
              {DetailData?.data?.data && (
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.infors}`}>
                    <div className={`${styles.info_left}`}>
                      <li>
                        <label>Nhóm chính sách:</label>
                        <span className={`${styles.nqd_nqd}`}>
                          {DetailData?.data?.data?.name}
                        </span>
                      </li>
                      <li>
                        <label>Người giám sát:</label>
                        <span className={`${styles.nqt_supervisor_name}`}>
                          {DetailData?.data?.data?.supervisor_name}
                        </span>
                      </li>
                    </div>
                    <div className={`${styles.info_right}`}>
                      <li>
                        <label>Trạng thái:</label>
                        <span className={`${styles.green}`}>đã ban hành</span>
                      </li>
                      <li>
                        <label>Có hiệu lực từ:</label>
                        <span className={`${styles.nqt_created_at}`}>
                          {format(
                            new Date(DetailData?.data?.data?.time_start),
                            'dd/MM/yyyy'
                          )}
                        </span>
                      </li>
                    </div>
                  </div>
                  <div className={`${styles.infors1}`}>
                    <p>Nội dung nhóm chính sách</p>
                    <div
                      className={`${styles.info_left}`}
                      style={{
                        width: '100%',
                        minHeight: 50,
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                      }}>
                      <li className={`${styles.nqd_content}`}>
                        <p>{DetailData?.data?.data?.description}</p>
                      </li>
                    </div>
                  </div>
                  <div
                    className={`${styles.infors1} ${styles.preview_file_provision}`} onClick={() => setOpenDetailFile(!isopenDetailFile)}>
                    <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} >
                      Xem chi tiết file đính kèm
                    </a>
                  </div>
                  {isopenDetailFile && <FilePolicyGroupDetail file={DetailData?.data?.data?.file} onCancel={handlecloseModal} />}
                </div>
              )}
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
