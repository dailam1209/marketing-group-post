import React, { useState } from "react";
import { Button, Modal, Table, DatePicker } from "antd";
import Image from "next/image";
import styles from "./index.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const Contribute = () => {
   const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
   const handleFromDateChange = (dateString) => {
      setSelectedFromDate(dayjs(dateString, dateFormat));
   };

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [policyName, setPolicyName] = useState("");
   const [policyDescription, setPolicyDescription] = useState("");
   const [policyTime, setPolicyTime] = useState(null);
   const [policyNote, setPolicyNote] = useState("");
   const [policySelect, setPolicySelect] = useState();
   const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
   const [tables, setTables] = useState([]);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      const newTable = {
         policyName: { policyName: policyName, policyNote: policyNote },
         policyDescription: policyDescription,
         incomeType: policySelect,
         policyTime: policyTime?.format("DD/MM/YYYY"),
         policyTimeEnd: policyTimeEnd?.format("DD/MM/YYYY"),
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
      setPolicySelect();
      setPolicyTimeEnd(null);
      setEditingData(null);
      setPolicyNote("");
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

   const onSearch = (value) => console.log(value);
   //table thêm mới
   const columns = [
      {
         title: "Khoản đóng góp",
         dataIndex: "room",
      },
      {
         title: "Số tiền",
         dataIndex: "time",
      },
      {
         title: "Tháng bắt đầu",
         dataIndex: "timeEnd",
      },
      {
         title: "Tháng kết thúc",
         dataIndex: "edit",
      },

      {
         title: "Sửa",
         dataIndex: "time",

         render: () => (
            <button onClick={showModalTimeConfirm} className={styles.button_style}>
               <Image alt="/" src={"/add-icon.png"} width={15} height={15} />
            </button>
         ),
      },
      {
         title: "Xóa",
         dataIndex: "timeEnd",

         render: () => (
            <div>
               <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
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
                     <div>
                        <h3 className={styles.header_h3}>Các khoản đóng góp</h3>
                     </div>
                     <Button type="primary" onClick={showModal} className={styles.btn}>
                        Thêm đóng góp
                     </Button>
                  </div>
                  <div className={styles.table_style}>
                     <Table columns={columns} dataSource={tables} pagination={false} className={styles.table} />
                  </div>
               </div>
            </div>
            <div className="modal_times">
               <Modal className={styles.modal_times} title="Thêm khoản đóng góp" visible={isModalOpen} onCancel={handleCancel} footer={null}>
                  <div className={styles.times_body}>
                     <label className={styles.p}>Tên khoản đóng góp: *</label>
                     <input type="text" placeholder="Tên khoản đóng góp" className={styles.input} value={policyName} onChange={(e) => setPolicyName(e.target.value)} />
                     <label className={styles.p}>Số tiền đóng góp *</label>
                     <input
                        id="policy-description"
                        type="number"
                        placeholder="Số tiền đóng góp (VNĐ)"
                        className={styles.input}
                        value={policyDescription}
                        onChange={(e) => setPolicyDescription(e.target.value)}
                     />

                     <p className={styles.p}>Tháng bắt đầu *</p>
                     <DatePicker format={dateFormat} className={styles.times_month} value={policyTime} onChange={(date) => setPolicyTime(date)} />

                     <p className={styles.p}>Tháng kết thúc (không bắt buộc)</p>
                     <DatePicker format={dateFormat} className={styles.times_month} value={policyTime} onChange={(date) => setPolicyTime(date)} />
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

export default Contribute;
