import React, { useState, useEffect } from 'react'
import styles from './DetailTrainingProcess.module.css'
import { useRouter } from 'next/router'
import ListDetailTrainingProcess from '@/components/hr/dao-tao-phat-trien/quy-trinh-dao-tao/chi-tiet-quy-trinh/listDetailTrainingProcess/ListDetailTrainingProcess'
import AddDetailTrainingProcess from '@/components/hr/dao-tao-phat-trien/quy-trinh-dao-tao/chi-tiet-quy-trinh/addDetailTrainingProcess/AddDetailTrainingProcess'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import {
  DataDetailProcess,
  GetDataDetailProcess,
} from '@/pages/api/api-hr/dao-tao-phat-trien/TrainingProcess'
import Head from 'next/head'
import { getTokenFromCookie } from '@/pages/api/api-hr/token'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  }
}
export default function DetailTrainingProcess({ query }: any) {
  const idTrainingProcess = query.idTrainingProcess
  const [active, setActive] = useState(1)
  const [openModal, setOpenModal] = useState(0)
  const [animateModal, setAnimateModal] = useState(false)
  const [newData, setNewData] = useState<any>()
  const router = useRouter()
  const [dataDetail, setDataDetail] = useState<any>()
  const trainingProcessName = dataDetail?.processTrain.name
  const [trainingProcess, setTrainingProcess] = useState<any>()
  const [displayIcon, setDisplayIcon] = useState<any>()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleHNNV)
      }
      fetchData()
    } catch (error) {}
  }, [])

  const perIdArray = displayIcon?.map((item) => item.perId)
  const authen = perIdArray?.includes(1)
  const iconAdd = perIdArray?.includes(2)
  const iconEdit = perIdArray?.includes(3)
  const iconDelete = perIdArray?.includes(4)
  useEffect(() => {
    const filteredStages = dataDetail?.listStage?.filter(
      (stage) => stage.isDelete === 0
    )
    setTrainingProcess(filteredStages)
  }, [dataDetail])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await GetDataDetailProcess(idTrainingProcess)
        setDataDetail(response?.data?.data)
      }
      fetchData()
    } catch (error) {}
  }, [])

  const handleOpenModal = (type: any) => {
    setOpenModal(type)
    setAnimateModal(true)
  }

  const handleCloseModal = () => {
    setAnimateModal(false)
    setTimeout(() => {
      setOpenModal(0)
    }, 300)
  }

  const handleUpdateData = (newData) => {
    setNewData(newData)
  }
  const listTab = [
    {
      key: 1,
      header: 'QUY TRÌNH ĐÀO TẠO',
    },
  ]

  useEffect(() => {
    const fetchDataDetailProcess = async () => {
      try {
        const response = await DataDetailProcess(idTrainingProcess)
        setTrainingProcess(
          response?.data.data.listStage?.filter((stage) => stage.isDelete === 0)
        )
      } catch (error) {}
    }
    fetchDataDetailProcess()
  }, [newData])
  return (
    <>
      <Head>
        <title>Quy trình đào tạo - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.ct_quytrinh}`}>
        <div className={`${styles.l_body}`}>
          <ul className={`${styles.nav} ${styles.nav_tabs}`}>
            {listTab.map((item) => (
              <div key={item.key}>
                <li className={`${styles.li_tabs}`}>
                  <span
                    className={`${
                      active === item?.key ? styles.active : styles.hover
                    } `}
                    onClick={() => setActive(item.key)}>
                    {item.header}
                  </span>
                </li>
              </div>
            ))}
          </ul>

          <div className={`${styles.add_quytrinh}`}>
            <div className={`${styles.back_quytrinh}`}>
              <button style={{ display: 'flex' }} onClick={() => router.back()}>
                <picture>
                  <img src={`/left_arrow.png`} alt=''></img>
                </picture>
                <p>Danh sách quy trình đào tạo</p>
              </button>
            </div>

            {iconAdd && (
              <div className={`${styles.add_quytrinh1}`}>
                <button
                  style={{ display: 'flex' }}
                  onClick={() => handleOpenModal(1)}>
                  <picture>
                    <img src={`/add.png`} alt=''></img>
                  </picture>
                  <p>Thêm giai đoạn đào tạo</p>
                </button>
              </div>
            )}
          </div>
          {openModal === 1 && (
            <AddDetailTrainingProcess
              animation={animateModal}
              closeModal={handleCloseModal}
              id={idTrainingProcess}
              setData={setNewData}></AddDetailTrainingProcess>
          )}

          <div className={`${styles.giaidoans}`}>
            <div className={`${styles.title_giaidoans}`}>
              <h4>
                QTDT{`${idTrainingProcess}`} {trainingProcessName}
              </h4>
            </div>

            {trainingProcess?.map((item, index) => (
              <div key={index}>
                <ListDetailTrainingProcess
                  item={item}
                  index={index}
                  setData={handleUpdateData}
                  iconEdit={iconEdit}
                  iconDelete={iconDelete}></ListDetailTrainingProcess>
              </div>
            ))}
          </div>
        </div>
        <BodyFrameFooter src='https://www.youtube.com/embed/U0c_dQb-6z0'></BodyFrameFooter>
      </div>
    </>
  )
}
