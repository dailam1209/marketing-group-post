import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import TableData from './table/table'
import BodyFrameFooter from '../bodyFrame/bodyFrame_footer/bodyFrame_footer'
import Restore from './khoi-phuc'
import DeleteData from './xoa-du-lieu'
import { getDataDeleteComponent } from '@/pages/api/api-hr/du-lieu-da-xoa-gan-day/DeletedDataComPonentService'

export default function DeletedDataComPonent({ iconEdit, iconDelete }) {
  const [openModal, setOpenModal] = useState(0)
  const [animation, setAnimation] = useState(false)
  const [data, setData] = useState<any>()
  const [handleData, setHandleData] = useState<any>()
  const [listCheck, setListCheck] = useState([])
  const [newData, setNewData] = useState<any>()
  const [search, setSearch] = useState<any>('')

  const handleDataCheckChange = (newListCheck) => {
    setListCheck(newListCheck)
  }

  const handleNewData = (newData) => {
    setNewData(newData)
  }
  const handleSearch = (keyword) => {
    setSearch(keyword)
  }
  const dataCheck = (data) => {
    setHandleData((prev) => ({
      ...prev,
      ...{ ...data },
    }))
  }

  const handleClose = () => {
    setAnimation(false)
    setTimeout(() => {
      setOpenModal(0)
    }, 300)
  }
  const handleOpen = (number: any) => {
    setOpenModal(number)
    setAnimation(true)
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataDeleteComponent(search)
        setData(response?.success)
      }
      fetchData()
    } catch (error: any) { }
  }, [newData, search])

  return (
    <>
      {openModal === 1 && (
        <Restore
          animation={animation}
          handleClose={handleClose}
          handleData={handleData}></Restore>
      )}
      {openModal === 2 && (
        <DeleteData
          animation={animation}
          handleClose={handleClose}
          handleData={handleData}></DeleteData>
      )}
      <div className={`${styles.l_body}`}>
        <div className={`${styles.t_delete_head}`}>
          <div className={`${styles.header_left}`}>
            <p>DỮ LIỆU ĐÃ XÓA GẦN ĐÂY</p>
          </div>

          {iconDelete || iconEdit ? (
            <div className={`${styles.between}`}>
              {iconEdit && (
                <div
                  className={`${styles.between_time}`}
                  onClick={() => handleOpen(1)}>
                  <picture>
                    <img src={`${'/icon-time.svg'}`} alt=''></img>
                  </picture>
                </div>
              )}
              {iconDelete && (
                <div className={`${styles.between_delete}`}>
                  <picture onClick={() => handleOpen(2)}>
                    <img src={`${'/icon-trash.svg'}`} alt=''></img>
                  </picture>
                </div>
              )}
            </div>
          ) : null}
          <div className={`${styles.right}`}>
            <form className={`${styles.form}`}>
              <div className={`${styles.t_div_search}`}>
                <input
                  type='search'
                  placeholder='Tìm kiếm'
                  name='search'
                  spellCheck={false}
                  onChange={(e) => handleSearch(e.target.value)}></input>
                <picture>
                  <img src={`${'/t-icon-search.png'}`} alt=''></img>
                </picture>
              </div>
            </form>
          </div>
        </div>
        <TableData
          data={data}
          dataCheck={dataCheck}
          listCheck={listCheck}></TableData>
        <BodyFrameFooter src='https://www.youtube.com/embed/XEAFwQRkBfQ'></BodyFrameFooter>
      </div>
    </>
  )
}
