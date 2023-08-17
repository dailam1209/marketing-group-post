import React, { useEffect, useState } from 'react'
import styles from './recruitmentProcess.module.css'
import AddRecruitmentProcess from '@/components/hr/quan-ly-tuyen-dung/quy-trinh-tuyen-dung/addRecruitmentProcess/addRecruitmentProcess'
import ListRecruitmentProcess from './danh-sach-quy-trinh'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import PageAuthenticator from '@/components/hr/quyen-truy-cap'
import LoadingSpinner from '@/components/hr/loading'
import Head from 'next/head'
import jwt_decode from 'jwt-decode'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'
import { GetDataRecruitment } from '@/pages/api/api-hr/quan-ly-tuyen-dung/RecruitmentManagerService'

export default function RecruitmentProcess() {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [key, setKey] = useState('')
  const [dataAdd, setDataAdd] = useState<any>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [dataRecruitment, setDataRecruitment] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [displayIcon, setDisplayIcon] = useState<any>()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication()
        setDisplayIcon(response?.data?.data?.infoRoleTD)
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
    const fetchData = async () => {
      try {
        const response = await GetDataRecruitment(currentPage, 5, key)
        if (response?.status === 200) {
          setDataRecruitment(response?.data.data)
        }
      } catch (error) {
      } finally {
        setIsDataLoaded(true)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dataAdd, currentPage, key])

  const handleDelete = async () => {
    const itemsPerPage = dataRecruitment.length
    const updatedPage =
      itemsPerPage > 1 ? currentPage : Math.max(currentPage - 1, 1)
    const newData = await GetDataRecruitment(updatedPage, 5, key)
    if (newData) {
      setDataRecruitment(newData?.data.data)
    }
  }

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  const handleOpenModalAdd = () => {
    setOpenModalAdd(true)
    setAnimateModal(true)
  }

  const handleCloseModalAdd = () => {
    setAnimateModal(false)
    setTimeout(() => {
      setOpenModalAdd(false)
    }, 300)
  }

  const handleSearch = (key) => {
    setKey(key)
  }

  const newRecruitmentProcess = (data: any) => {
    setDataAdd(data)
  }

  return (
    <>
      <Head>
        <title>Quy trình tuyển dụng - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={styles.l_body}>
        {!isDataLoaded ? (
          <LoadingSpinner />
        ) : authen === false ? (
          <PageAuthenticator />
        ) : (
          <>
            <div className={styles.add_quytrinh}>
              <div className={styles.add_quytrinh1}>
                {iconAdd && (
                  <button
                    className={`${styles.adds}`}
                    onClick={handleOpenModalAdd}>
                    <picture
                      style={{ paddingLeft: '12px' }}
                      className={`${styles.display}`}>
                      <img src={`/add.png`} alt=''></img>
                      <p>Thêm tin tuyển dụng</p>
                    </picture>
                  </button>
                )}
              </div>
              {openModalAdd && (
                <AddRecruitmentProcess
                  animation={animateModal}
                  handleCloseModalAdd={handleCloseModalAdd}
                  addRecruitmentProcess={
                    newRecruitmentProcess
                  }></AddRecruitmentProcess>
              )}
              <div className={styles.search_quytrinh}>
                <form className={styles.t_form_search}>
                  <div className={styles.t_div_search}>
                    <input
                      type='search'
                      className={styles.search_quytrinh}
                      placeholder='Tìm kiếm'
                      name='search'
                      spellCheck={false}
                      autoComplete='off'
                      onChange={(e) => handleSearch(e.target.value)}></input>
                    <button className={styles.button_search}>
                      <div style={{ paddingLeft: '12px' }}>
                        <picture>
                          <img src={'/icon-search.png'} alt='search'></img>
                        </picture>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <ListRecruitmentProcess
              dataRecruitment={dataRecruitment}
              handlePage={handlePageChange}
              currentPage={currentPage}
              handleDelete={handleDelete}
              setDataUpDate={newRecruitmentProcess}
              iconAdd={iconAdd}
              iconEdit={iconEdit}
              iconDelete={iconDelete}></ListRecruitmentProcess>

            <BodyFrameFooter src='https://www.youtube.com/embed/J7JEoQkqarA'></BodyFrameFooter>
          </>
        )}
      </div>
    </>
  )
}
