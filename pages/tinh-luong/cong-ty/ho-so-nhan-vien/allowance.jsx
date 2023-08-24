import React, { useState } from "react";
import { Button, Modal, Select, Table, DatePicker, Dropdown, Menu, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./index.module.css";

const dateFormat = "DD/MM/YYYY";
const Allowance = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [policyName, setPolicyName] = useState("");
   const [policyDescription, setPolicyDescription] = useState("");
   const [policyTime, setPolicyTime] = useState(null);
   const [policySelect, setPolicySelect] = useState();
   const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
   const [tables, setTables] = useState([]);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      const newTable = {
         policyName: policyName,
         policyDescription: policyDescription,
         incomeType: policySelect,
         policyTime: policyTime?.format("YYYY-MM"),
         policyTimeEnd: policyTimeEnd?.format("YYYY-MM"),
      };

      if (editingIndex !== null) {
         setTables((prevTables) => {
            const updatedTables = [...prevTables];
            updatedTables[editingIndex] = newTable;
            return updatedTables;
         });
      } else {
         setTables((prevTables) => [...prevTables, newTable]);
      }

      setIsModalOpen(false);
      setEditingIndex(null);
      setPolicyName("");
      setPolicyDescription("");
      setPolicyTime(null);
      setPolicyTimeEnd(null);
      setPolicySelect();
      setEditingData(null);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
      setPolicyName("");
      setPolicyDescription("");
      setPolicyTime(null);
      setPolicyTimeEnd(null);
   };

   const [editingData, setEditingData] = useState(null);
   const [editingIndex, setEditingIndex] = useState(null);

   // xóa
   const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
   const [selectedTableIndex, setSelectedTableIndex] = useState(null);
   const handleDeleteCancel = () => {
      setIsModalDeleteOpen(false);
   };

   const showModalDeleteConfirm = (index) => {
      setSelectedTableIndex(index);
      setIsModalDeleteOpen(true);
   };

   const handleConfirmDelete = () => {
      if (selectedTableIndex !== null) {
         setTables((prevTables) => prevTables.filter((_, index) => index !== selectedTableIndex));
         setSelectedTableIndex(null);
         setIsModalDeleteOpen(false);
      }
   };

   //table thêm mới
   const columns = [
      {
         title: "Trạng thái",
         dataIndex: "incomeType",
         render: (policySelect) => (
            <div>
               <p className={styles.p_style}>{policySelect}</p>
            </div>
         ),
      },
      {
         title: "Họ và tên",
         dataIndex: "policyDescription",
         render: (policyDescription) => (
            <div>
               <p className={styles.p_red}>{policyDescription}</p>
            </div>
         ),
      },
      {
         title: "Ngày sinh",
         dataIndex: "policyTime",
         render: (policyTime) => (
            <div>
               <p>{policyTime}</p>
            </div>
         ),
      },
      {
         title: "SĐT",
         dataIndex: "policyTimeEnd",
         render: (policyTimeEnd) => (
            <div>
               <div>
                  <p>{policyTimeEnd}</p>
               </div>
            </div>
         ),
      },
      {
         title: "Quan hệ",
         dataIndex: "policyTimeEnd",
         render: () => (
            <div>
               <div>
                  <button className={styles.button_style}>
                     <Image alt="/" src={"/add-icon.png"} width={15} height={15} onClick={showModalEditConfirm} />
                  </button>
               </div>
            </div>
         ),
      },
      {
         title: "Nghề nghiệp",
         dataIndex: "setting",
         render: () => (
            <div>
               <button className={styles.button_style} onClick={showModalDeleteConfirm}>
                  <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
               </button>
            </div>
         ),
      },
      {
         title: "Địa chỉ",
         dataIndex: "policyDescription",
         render: (policyDescription) => (
            <div>
               <p className={styles.p_red}>{policyDescription}</p>
            </div>
         ),
      },
      {
         title: "Sửa",
         dataIndex: "policyTime",
         render: (policyTime) => (
            <div>
               <p>{policyTime}</p>
            </div>
         ),
      },
      {
         title: "Xóa",
         dataIndex: "policyTimeEnd",
         render: (policyTimeEnd) => (
            <div>
               <div>
                  <p>{policyTimeEnd}</p>
               </div>
            </div>
         ),
      },
   ];

   return (
      <>
         <div>
            <div>
               <div className={styles.content}>
                  <div className={styles.header}>
                     <div className={styles.text}>
                        <h3 className={styles.header_h3}>Thành phần gia đình</h3>
                     </div>
                     <Button type="primary" onClick={showModal} className={styles.btn}>
                        Thêm phụ thuộc
                     </Button>
                  </div>
                  <div className={styles.table_style}>
                     <Table columns={columns} dataSource={tables} pagination={false} className={styles.table} />
                  </div>
               </div>
            </div>
            <div className="modal_delete">
               <Modal className={styles.modal_delete} title="Bạn chắc chắn muốn xóa ?" open={isModalDeteleOpen} onCancel={handleDeleteCancel} footer={null}>
                  <div className={styles.modal_delete_body}>
                     <Button type="primary" onClick={handleDeleteCancel} className={styles.btn_cancer}>
                        Hủy
                     </Button>
                     <Button type="primary" onClick={handleConfirmDelete} className={styles.btn_delete}>
                        Xóa
                     </Button>
                  </div>
               </Modal>
            </div>

            <div className="modal_times">
               <Modal className={styles.modal_times} title="Thêm thành phần gia đình" visible={isModalOpen} onCancel={handleCancel} footer={null}>
                  <div className={styles.times_body}>
                     <label className={styles.p}>Họ và tên *</label>
                     <input type="text" placeholder="Họ và tên " className={styles.input} value={policyName} onChange={(e) => setPolicyName(e.target.value)} />
                     <p className={styles.p}>Ngày sinh*</p>
                     <DatePicker format={dateFormat} className={styles.times_month} value={policyTime} onChange={(date) => setPolicyTime(date)} />
                     <label className={styles.p}>Số điện thoại *</label>
                     <input
                        id="policy-description"
                        placeholder="Số điện thoại"
                        type="number"
                        className={styles.input}
                        value={policyDescription}
                        onChange={(e) => setPolicyDescription(e.target.value)}
                     />
                     <label className={styles.p}>Quan hệ *</label>
                     <input id="policy-description" type="text" placeholder="Mối quan hệ" className={styles.input} value={policyDescription} onChange={(e) => setPolicyDescription(e.target.value)} />
                     <label className={styles.p}>Nghề nghiệp *</label>
                     <input id="policy-description" type="text" placeholder="Nghề nghiệp" className={styles.input} value={policyDescription} onChange={(e) => setPolicyDescription(e.target.value)} />
                     <label className={styles.p}>Địa chỉ *</label>
                     <input id="policy-description" type="text" placeholder="Địa chỉ" className={styles.input} value={policyDescription} onChange={(e) => setPolicyDescription(e.target.value)} />
                     <Button type="primary" className={styles.btn_saves} onClick={handleOk}>
                        Lưu
                     </Button>
                  </div>
               </Modal>
            </div>
         </div>
      </>
   );
};

export default Allowance;
