/** @format */

import React, {useEffect, useState} from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import styles from './congty.module.scss';
import {Col, Row, Tabs} from 'antd';
import {Select, Space} from 'antd';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import ModalAddIPNew from '../../modal/ModalAddIPNew';
import ModalAddIPOld from '../../modal/ModalAddIPOld';
import ModalEditAddDeleteIP from '../../modal/ModalEditAddDeleteIP';

export default function Congty() {
   const ctyData = ['Chọn', 'Hưng Hà', 'Hưng H'];
   const [data, setData] = useState(ctyData[0]);
   const [customers1, setCustomers1] = useState([]);
   const [openModalAddIPNew, setOpenModalAddIPNew] = useState(false);
   const handleOnChange = (value) => {
      setData(ctyData[value]);
   };
   useEffect(() => {
      fetch('data/customers-small.json')
         .then((res) => res.json())
         .then((d) => setCustomers1(d.data));
   }, []);

   //custom action
   const actionBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.action_wrap}>
               <img src='../img/qlc_add.png' alt='' />
               <img src='../img/qlc_edit.png' alt='' />
               <img src='../img/qlc_delete.png' alt='' />
            </div>
         </React.Fragment>
      );
   };
   //custom ip Company
   const ipCopBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.idCop_wrap}>
               {rowData.ipCop.map((item, index) => (
                  <span key={index}>{`${item} ${'   '}`}</span>
               ))}
            </div>
         </React.Fragment>
      );
   };
   // custom dep
   const depBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.dep_wrap}>
               <div>{rowData.dep}</div>
               <span>(Xem chi tiết)</span>
            </div>
         </React.Fragment>
      );
   };
   // custom group
   const groupBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.dep_wrap}>
               <div>{rowData.group}</div>
               <span>(Xem chi tiết)</span>
            </div>
         </React.Fragment>
      );
   };
   // custom numberofmembers
   const numberofmembersBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.dep_wrap}>
               <div>{rowData.numberofmembers}</div>
               <span>(Xem chi tiết)</span>
            </div>
         </React.Fragment>
      );
   };
   // custom name Company
   const nameCopBodyTemplate = (rowData) => {
      return (
         <React.Fragment>
            <div className={styles.name_wrap}>
               <span>{rowData.nameCop}</span>
            </div>
         </React.Fragment>
      );
   };

   return (
      <>
         <div className={styles.table_form}>
            <div
               className={styles.btn}
               onClick={() => {
                  setOpenModalAddIPNew(true);
               }}
            >
               <span>+</span>
               <span>Thêm IP mới</span>
            </div>
            <div className={styles.form_select_search}>
               <Row gutter={[24, 36]}>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.select_wrap}>
                        <span className={styles.title}>Công ty con</span>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.select_wrap}>
                        <span className={styles.title}>Phòng ban</span>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.select_wrap}>
                        <span className={styles.title}>Nhóm</span>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.select_wrap}>
                        <span className={styles.title}>Vị trí</span>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.search}>
                        <input type='text' placeholder='Từ khóa....' />
                     </div>
                  </Col>
                  <Col xxl={4} sm={8} md={8} xl={4} xs={12} lg={4}>
                     <div className={styles.btn}>
                        <span className={styles.icon_search}>
                           <img src='../img/Group.png' alt='' />
                        </span>
                        <span>Tìm kiếm</span>
                     </div>
                  </Col>
               </Row>
            </div>
            <div className={styles.card}>
               <DataTable value={customers1} paginator rows={10} className={styles.table}>
                  <Column field='id' header='STT'></Column>
                  <Column field='nameCop' header='Tên công ty' body={nameCopBodyTemplate}></Column>
                  <Column field='idCop' header='ID công ty'></Column>
                  <Column field='dep' header='Phòng/ban' body={depBodyTemplate}></Column>
                  <Column field='group' header='Nhóm' body={groupBodyTemplate}></Column>
                  <Column field='numberofmembers' header='Số lượng thành viên' body={numberofmembersBodyTemplate}></Column>
                  <Column field='ipCop' header='IP công ty' body={ipCopBodyTemplate} style={{width: '360px'}}></Column>
                  <Column field='action' header='Hành động' body={actionBodyTemplate}></Column>
               </DataTable>
            </div>
         </div>
         {openModalAddIPNew && <ModalAddIPNew setOpenModalAddIPNew={setOpenModalAddIPNew} />}
         {/* {openModalAddIPNew && <ModalAddIPOld setOpenModalAddIPNew={setOpenModalAddIPNew} />} */}
         {/* {openModalAddIPNew && <ModalEditAddDeleteIP setOpenModalAddIPNew={setOpenModalAddIPNew} />} */}
      </>
   );
}
