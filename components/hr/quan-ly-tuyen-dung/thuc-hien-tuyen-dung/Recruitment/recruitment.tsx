import React, { useEffect, useState } from 'react'
import styles from './recruitment.module.css'
import AddPerformRecruitment from '../AddPerformRecruitment/AddPerformRecruitment'
import BodyFrameFooter from '../../../bodyFrame/bodyFrame_footer/bodyFrame_footer'
import ListRecruitment from '@/pages/hr/quan-ly-tuyen-dung/thuc-hien-tuyen-dung/danh-sach-tuyen-dung/ListRecruitment'
import { GetListNews } from '@/pages/api/api-hr/quan-ly-tuyen-dung/PerformRecruitment'
import MyPagination from '../../../pagination/Pagination'
import { getDataAuthentication } from '@/pages/api/api-hr/Home/HomeService'
import Head from 'next/head'

export interface Recruitment {}

export default function Recruitment() {
  const [animateModal, setAnimateModal] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [currentPage, setCurrenPage] = useState<any>(1)
  const [dataListNews, setDataListNews] = useState<any>()
  const [onDelete, setOnDelete] = useState<any>()
  const [title, setTitle] = useState<any>('')
  const [formDate, setFormDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [addData, setAddData] = useState<any>()
  const [editData, setEditData] = useState<any>()
  const [displayIcon, setDisplayIcon] = useState<any>()

  useEffect(() => {
    const GetDataListNews = async () => {
      try {
        const response = await GetListNews(
          currentPage,
          4,
          title,
          formDate,
          toDate
        )
        setDataListNews(response?.data)
      } catch (err) {}
    }
    GetDataListNews()
  }, [title, currentPage, onDelete, formDate, toDate, addData, editData])

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
  const iconAdd = perIdArray?.includes(2)
  const iconEdit = perIdArray?.includes(3)
  const iconDelete = perIdArray?.includes(4)

  const handleDelete = async () => {
    const itemsPerPage = dataListNews?.data.data.length
    const updatedPage =
      itemsPerPage > 1 ? currentPage : Math.max(currentPage - 1, 1)
    const newData = await GetListNews(updatedPage, 5, '', '', '')
    if (newData) {
      setDataListNews(newData?.data)
    }
  }
  const dataMapping = dataListNews?.data

  const handleCloseModalAdd = () => {
    setAnimateModal(false)
    setTimeout(() => {
      setOpenModalAdd(false)
    }, 300)
  }
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true)
    setAnimateModal(true)
  }

  const handlePageChange = (page: any) => {
    setCurrenPage(page)
  }

  const handleFormDateChange = (event) => {
    const selectedFormDate = event.target.value
    setFormDate(selectedFormDate)
  }

  const handleToDateChange = (event) => {
    const selectedToDate = event.target.value
    setToDate(selectedToDate)
  }

  const addDataRecruitment = (data) => {
    setAddData(data)
  }
  const EditDataRecruitment = (data) => {
    setEditData(data)
  }
  return (
    <>
      <Head>
        <title>Thực hiện tuyển dụng - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.tintuyendung}`}>
        <div className={`${styles.tuyendung1}`}>
          {iconAdd && (
            <button className={`${styles.adds}`} onClick={handleOpenModalAdd}>
              <picture style={{ paddingLeft: '12px' }}>
                <img src={`/add.png`} alt=''></img>
                <p>Thêm tin tuyển dụng</p>
              </picture>
            </button>
          )}
        </div>
        {openModalAdd && (
          <AddPerformRecruitment
            animation={animateModal}
            handleCloseModalAdd={handleCloseModalAdd}
            addData={addDataRecruitment}></AddPerformRecruitment>
        )}
        <div className={`${styles.tuyendung2}`}>
          <div className={`${styles.tuyendung2_1}`}>
            <li>
              <span>Xem từ ngày</span>
              <input
                type='date'
                defaultValue={formDate}
                className={`${styles.search_from_date}`}
                style={{ fontWeight: '600' }}
                onChange={handleFormDateChange}></input>
            </li>
            <li>
              <span>Đến ngày</span>
              <input
                defaultValue={toDate}
                type='date'
                className={`${styles.search_to_date}`}
                style={{ fontWeight: '600' }}
                onChange={handleToDateChange}></input>
            </li>
          </div>

          <div className={`${styles.tuyendung2_2}`}>
            <form className={`${styles.t_form_search}`}>
              <div className={`${styles.t_div_search}`}>
                <input
                  type='search'
                  className={`${styles.search_quytrinh}`}
                  placeholder='Tìm kiếm'
                  name='search'
                  spellCheck={false}
                  autoComplete='off'
                  onChange={(e) => setTitle(e.target.value)}></input>
                <button className={`${styles.button_search}`}>
                  <picture>
                    <img src={`/icon-search.png`} alt='search'></img>
                  </picture>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* body */}
        <div
          className={`${styles.new_r} ${styles.t_new_dom}`}
          style={{ display: 'inline-block' }}>
          {dataMapping?.data.length === 0 ? (
            <p className={`${styles.data_empty}`}>Không có dữ liệu</p>
          ) : (
            dataMapping?.data.map((item: any) => (
              <div key={item.id}>
                <ListRecruitment
                  data={item}
                  onDelete={handleDelete}
                  editData={EditDataRecruitment}
                  iconEdit={iconEdit}
                  iconDelete={iconDelete}></ListRecruitment>
              </div>
            ))
          )}
          {dataListNews?.data.totalCount > 4 && (
            <div className={`${styles.pagination}`}>
              <MyPagination
                current={currentPage}
                total={dataListNews?.data.totalCount}
                pageSize={4}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
        </div>
      </div>
      <BodyFrameFooter src='https://www.youtube.com/embed/v8FmUlUI1bs'></BodyFrameFooter>
    </>
  )
}
