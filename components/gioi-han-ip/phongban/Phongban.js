/** @format */

import React, { useEffect, useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import styles from './phongban.module.scss'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ModalAddDepNew from '../../modal/ModalAddDepNew'
import ModalAddIPOld from '../../modal/ModalAddIPOld'
import ModalEditAddDeleteIP from '../../modal/ModalEditAddDeleteIP'

export default function Phongban() {
  const ctyData = ['Chọn', 'Hưng Hà', 'Hưng H']
  const [data, setData] = useState(ctyData[0])
  const [customers1, setCustomers1] = useState([])
  const [openModalAddDepNew, setOpenModalAddDepNew] = useState(false)
  const handleOnChange = (value) => {
    setData(ctyData[value])
  }
  useEffect(() => {
    fetch('data/customers-small.json')
      .then((res) => res.json())
      .then((d) => setCustomers1(d.data))
  }, [])

  //custom action
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={styles.action_wrap}>
          <img src='../img/qlc_edit.png' alt='' />
          <img src='../img/qlc_delete.png' alt='' />
        </div>
      </React.Fragment>
    )
  }

  // custom dep
  const depBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={styles.dep_wrap}>
          <div>{rowData.dep}</div>
          <span>(Xem chi tiết)</span>
        </div>
      </React.Fragment>
    )
  }
  // custom group
  const groupBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={styles.dep_wrap}>
          <div>{rowData.group}</div>
          <span>(Xem chi tiết)</span>
        </div>
      </React.Fragment>
    )
  }
  // custom numberofmembers
  const numberofmembersBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={styles.dep_wrap}>
          <div>{rowData.numberofmembers}</div>
          <span>(Xem chi tiết)</span>
        </div>
      </React.Fragment>
    )
  }

  return (
    <>
      <div className={styles.table_form}>
        <div
          className={styles.btn}
          onClick={() => {
            setOpenModalAddDepNew(true)
          }}>
          <span>+</span>
          <span>Thêm phòng ban mới</span>
        </div>
        <div className={styles.search_btn_wrap}>
          <span>Phòng ban</span>
          <div className={styles.search_btn}>
            <div className={styles.search}>
              <input type='text' placeholder='Từ khóa....' />
            </div>
            <div className={styles.btn_search}>
              <span className={styles.icon_search}>
                <img src='../img/Group.png' alt='' />
              </span>
              <span className={styles.btn_text}>Tìm kiếm</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <DataTable
            value={customers1}
            paginator
            rows={10}
            className={styles.table}>
            <Column field='id' header='STT'></Column>
            <Column
              field='dep'
              header='Phòng/ban'
              body={depBodyTemplate}></Column>
            <Column
              field='group'
              header='Nhóm'
              body={groupBodyTemplate}></Column>
            <Column
              field='numberofmembers'
              header='Số lượng thành viên'
              body={numberofmembersBodyTemplate}></Column>
            <Column
              field='action'
              header='Hành động'
              body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
      {openModalAddDepNew && (
        <ModalAddDepNew setOpenModalAddDepNew={setOpenModalAddDepNew} />
      )}
      {/* {openModalAddIPNew && <ModalAddIPOld setOpenModalAddIPNew={setOpenModalAddIPNew} />} */}
      {/* {openModalAddIPNew && <ModalEditAddDeleteIP setOpenModalAddIPNew={setOpenModalAddIPNew} />} */}
    </>
  )
}
