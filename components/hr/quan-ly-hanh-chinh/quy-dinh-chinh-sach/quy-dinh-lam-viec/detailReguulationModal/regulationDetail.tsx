import React, { useState, useEffect, useRef } from 'react'
import styles from './detailRegulationModal.module.css'
import { format } from 'date-fns'
import UpdateRegulationsModal from '../updateRegulationModal/updateRegulation'
import {
  RegulationsDetails,
  SpecifiedGroupList,
} from '@/pages/api/api-hr/quy_dinh_chinh_sach'

interface RegulationDetailModalProps {
  onCancel: () => void
  idGroup: number
}

export default function RegulationDetailModal({
  onCancel,
  idGroup,
}: RegulationDetailModalProps) {
  const [DetailData, setDetailData] = useState<any | null>(null)
  const [dataGroup, setDataGroup] = useState<any | null>(null)
  const [openUpdate, setOpenUpdate] = useState(0)
  const [keyWords, setKeyWords] = useState('')
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RegulationsDetails(idGroup)
        setDetailData(response?.success)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SpecifiedGroupList(10000, 1, keyWords)
        setDataGroup(response?.success)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  const handleOpenUpdate = (
    idRegulation: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    setOpenUpdate(idRegulation)
  }
  const handleCloseModal = () => {
    setOpenUpdate(0)
  }

  console.log(DetailData?.data?.data);


  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div
                className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>CHI TIẾT QUY ĐỊNH</h5>
              </div>
              {openUpdate !== 0 && (
                <UpdateRegulationsModal
                  idGroup={openUpdate}
                  onCancel={handleCloseModal}
                />
              )}
              {DetailData?.data?.data && (
                <div className={`${styles.modal_body} ${styles.body_process}`}>
                  <div className={`${styles.infors}`}>
                    <p
                      style={{ marginBottom: 24 }}
                      className={`${styles.qd_name}`}>
                      {DetailData?.data?.data?.name}
                    </p>
                    <div className={`${styles.info_left}`}>
                      <li>
                        <label>Nhóm quy định:</label>
                        <span className={`${styles.nqd_nqd}`}>
                          {dataGroup?.data?.data?.find(
                            (item: any) =>
                              item.id === DetailData?.data?.data?.provision_id
                          )?.name || ''}
                        </span>
                      </li>
                      <li>
                        <label>Tạo bởi:</label>
                        <span className={`${styles.nqt_supervisor_name}`}>
                          {DetailData?.data?.data?.created_by}
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
                      <li>
                        <label>Đối tượng thi hành:</label>
                        <span className={`${styles.nqt_created_at}`}>
                          {DetailData?.data?.data?.apply_for}
                        </span>
                      </li>
                    </div>
                  </div>
                  <div className={`${styles.infors1}`}>
                    <p>Nội dung quy định</p>
                    <div
                      className={`${styles.info_left}`}
                      style={{
                        width: '100%',
                        minHeight: 50,
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                      }}>
                      <li className={`${styles.nqd_content}`}>
                        <p>{DetailData?.data?.data?.content}</p>
                      </li>
                    </div>
                  </div>
                  <div
                    className={`${styles.infors1} ${styles.preview_file_provision}`}>
                    <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} >
                      Xem chi tiết file đính kèm <span className={`${styles.green}`}>(Tải về)</span>
                    </a>
                  </div>
                </div>
              )}
              <div
                className={`${styles.modal_footer} ${styles.footer_process}`}>
                <button className={`${styles.btn_cancel}`} onClick={onCancel}>
                  Hủy
                </button>
                <button
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#337ab7',
                    color: '#fff',
                  }}
                  className={`${styles.btn_cancel}`}
                  onClick={(event: any) =>
                    handleOpenUpdate(DetailData?.data?.data?.id, event)
                  }>
                  Sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
