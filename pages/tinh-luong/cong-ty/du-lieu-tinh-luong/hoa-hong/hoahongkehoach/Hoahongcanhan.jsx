import React, { useState, useMemo } from "react";
import styles from "../hoahongcanhan.module.css";
import { DatePicker, Table, Select, Modal, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const Hoahongcanhan = () => {
   const [selectedMonth, setSelectedMonth] = useState(dayjs());
   const [selectedYear, setSelectedYear] = useState(dayjs());
   const monthFormat = "MM";
   const yearFormat = "YYYY";
   const dateFormat = "DD/MM/YYYY";
   const handleMonthChange = (monthString) => {
      setSelectedMonth(dayjs(monthString, monthFormat));
   };

   const handleYearChange = (yearString) => {
      setSelectedYear(dayjs(yearString, yearFormat));
   };

   const onChange = (value) => {
      console.log(`selected ${value}`);
   };
   const onSearch = (value) => {
      console.log("search:", value);
   };
   const router = useRouter();

   //modalthêm mới
   const [tables, setTables] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editName, setEditName] = useState();
   const [editTime, setEditTime] = useState(null);
   const [editMoney, setEditMoney] = useState("");
   const [editNote, setEditNote] = useState("");
   const showModal = () => {
      setIsModalOpen(true);
   };
   const handleModalCancer = () => {
      setIsModalOpen(false);
   };
   const [editingIndex, setEditingIndex] = useState(null);
   const handleAddData = (data) => {
      const newData = { ...data, key: Date.now() };
      setTables((prevTables) => [...prevTables, newData]);
   };

   const handleEditData = (key, newData) => {
      setTables((prevTables) => prevTables.map((item) => (item.key === key ? { ...item, ...newData } : item)));
   };
   //chỉnh sửa
   const showModalEditConfirm = (key) => {
      console.log("Edit key:", key);
      setIsModalOpen(true);
      setEditingIndex(key);
      setEditName(tables[key]?.incomeType);
      setEditTime(tables[key]?.editTime);
      setEditMoney(tables[key]?.editMoney);
      setEditNote(tables[key]?.editNode);
   };

   const handleOk = () => {
      const newTable = {
         incomeType: editName,
         editTime: editTime?.format("DD-MM-YYYY"),
         editMoney: editMoney,
         editNote: editNote,
      };

      if (editingIndex !== null) {
         console.log("Updating data with key:", editingIndex);
         handleEditData(editingIndex, newTable);
      } else {
         console.log("Adding new data:", newTable);
         handleAddData(newTable);
      }

      setIsModalOpen(false);
      setEditingIndex(null);
      setEditName();
      setEditTime(null);
      setEditMoney("");
      setEditNote("");
   };

   // xóa
   const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
   const [selectedTableIndex, setSelectedTableIndex] = useState(null);
   const handleDeleteCancel = () => {
      setIsModalDeleteOpen(false);
   };

   const showModalDeleteConfirm = (key) => {
      setSelectedTableIndex(key);
      setIsModalDeleteOpen(true);
   };

   const handleConfirmDelete = () => {
      if (selectedTableIndex !== null) {
         setTables((prevTables) => prevTables.filter((_, key) => key !== selectedTableIndex));
         setSelectedTableIndex(null);
         setIsModalDeleteOpen(false);
      }
   };

   const columns = [
      {
         title: "Họ và tên",
         dataIndex: "incomeType",
         render: (editName) => (
            <div>
               <p className={styles.p_name}>{editName}</p>
            </div>
         ),
      },
      {
         title: "Chu kỳ",
         dataIndex: "editTime",
         render: (editTime) => (
            <div>
               <p className={styles.p_time}>{editTime}</p>
            </div>
         ),
      },
      {
         title: "Tên kế hoạch",
         dataIndex: "editMoney",
         render: (editMoney) => (
            <div>
               <p className={styles.p_red}>{editMoney}</p>
            </div>
         ),
      },
      {
         title: "Hoa hồng (VNĐ)",
         dataIndex: "editNote",
         render: (editNote) => (
            <div>
               <p className={styles.p_time}>{editNote}</p>
            </div>
         ),
      },
      {
         title: "Đánh giá",
         dataIndex: "",
      },
      {
         title: "",
         dataIndex: "edit",
         render: () => (
            <button className={styles.button_edit} onClick={showModalEditConfirm}>
               <Image alt="/" src={"/add-icon.png"} width={15} height={15} />
            </button>
         ),
      },
      {
         title: "",
         dataIndex: "delete",

         render: () => (
            <button className={styles.button_edit} onClick={showModalDeleteConfirm}>
               <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
            </button>
         ),
      },
   ];

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.information}>
               <div>
                  <h3 className={styles.h3}>Danh sách nhân viên hưởng hoa hồng kế hoạch</h3>
                  <p className={styles.p_style}>Quản lý theo dõi nhân viên hưởng hoa kế hoạch</p>
               </div>
               <div>
                  <div className={styles.modal_body}>
                     <button type="primary" className={styles.btn_back} onClick={() => router.push("/cong-ty/du-lieu-tinh-luong/hoa-hong")}>
                        Quay lại
                     </button>
                     <button type="primary" className={styles.btn_add} onClick={showModal}>
                        Thêm mới
                     </button>
                  </div>
               </div>
            </div>
            <div className={styles.select_time}>
               <div>
                  <DatePicker
                     defaultValue={selectedMonth}
                     format={monthFormat}
                     onChange={handleMonthChange}
                     picker="month"
                     locale={{
                        lang: {
                           locale: "vi",
                        },
                     }}
                  />
               </div>
               <div>
                  <DatePicker defaultValue={selectedYear} format={yearFormat} onChange={handleYearChange} picker="year" />
               </div>
               <div>
                  <SearchOutlined className={styles["search-icon"]} />
                  <Select
                     showSearch
                     placeholder=""
                     defaultValue="Tất cả nhân viên"
                     optionFilterProp="children"
                     onChange={onChange}
                     onSearch={onSearch}
                     filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                     options={[
                        {
                           value: "Mới nhất",
                           label: "Mới nhất",
                        },
                        {
                           value: "Cũ nhất",
                           label: "Cũ nhất",
                        },
                        {
                           value: "Phòng ban",
                           label: "Phòng ban",
                        },
                     ]}
                  />
               </div>
            </div>
            <div className={styles.table_content}>
               <Table columns={columns} dataSource={tables} className={styles.table_add} pagination={false} />
            </div>
         </div>
         <div className={styles.content_bot}>
            <div className={styles.video}>
               <iframe
                  className="video_hd"
                  style={{ borderRadius: 15 }}
                  width={680}
                  height={430}
                  src="https://www.youtube.com/embed/WQaU3n2wYdM"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
               />
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
         <div className="modalRecipe">
            <Modal className={styles.modal_edit} title="Thêm mới hoa kế hoạch" open={isModalOpen} onCancel={handleModalCancer} footer={null}>
               <div className={styles.modalRecipe_body}>
                  <div className={styles.format}>
                     <label className={styles.p_edit}>Họ và tên</label>
                     <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn nhân viên"
                        optionFilterProp="children"
                        value={editName}
                        onChange={(value) => setEditName(value)}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={[
                           {
                              value: "Trường GPT",
                              label: "Trường GPT",
                           },
                           {
                              value: "Tiến ngơ",
                              label: "Tiến ngơ",
                           },
                        ]}
                     />
                     <label className={styles.p_edit}>Đánh giá *</label>
                     <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn đánh giá "
                        optionFilterProp="children"
                        value={editName}
                        onChange={(value) => setEditName(value)}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={[
                           {
                              value: "Trường GPT",
                              label: "Trường GPT",
                           },
                           {
                              value: "Tiến ngơ",
                              label: "Tiến ngơ",
                           },
                        ]}
                     />
                     <label className={styles.p_edit}>Tên kế hoạch *</label>
                     <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn tên kế hoạch"
                        optionFilterProp="children"
                        value={editName}
                        onChange={(value) => setEditName(value)}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={[
                           {
                              value: "Trường GPT",
                              label: "Trường GPT",
                           },
                           {
                              value: "Tiến ngơ",
                              label: "Tiến ngơ",
                           },
                        ]}
                     />
                     <label className={styles.p_edit}>Thời gian áp dụng</label>
                     <DatePicker formatr={dateFormat} className={styles.times_month} value={editTime} onChange={(date) => setEditTime(date)} />
                     <label className={styles.p_edit}>Ghi chú</label>
                     <textarea
                        type="text"
                        rows={3}
                        className={styles.textarea}
                        placeholder="Thêm ghi chú"
                        value={editNote}
                        onChange={(e) => {
                           setEditNote(e.target.value);
                        }}
                     />

                     <Button className={styles.btn_recipe} type="primary" onClick={handleOk}>
                        Thêm hoa hồng
                     </Button>
                  </div>
               </div>
            </Modal>
         </div>
      </div>
   );
};

export default Hoahongcanhan;
