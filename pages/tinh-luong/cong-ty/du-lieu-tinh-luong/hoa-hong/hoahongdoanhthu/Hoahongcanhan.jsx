import React, { useState, useMemo } from "react";
import styles from "../hoahongcanhan.module.css";
import { DatePicker, Table, Select, Modal, Button, Input, Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
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

const onFinish = (values) => {
   console.log("Received values of form:", values);
};
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
         title: "Loại hoa hồng",
         dataIndex: "editMoney",
         render: (editMoney) => (
            <div>
               <p className={styles.p_red}>{editMoney}</p>
            </div>
         ),
      },
      {
         title: "Doanh thu",
         dataIndex: "editNote",
         render: (editNote) => (
            <div>
               <p className={styles.p_time}>{editNote}</p>
            </div>
         ),
      },
      {
         title: "Hoa hồng(%)",
         dataIndex: "edit",
      },
      {
         title: "Ghi chú",
         dataIndex: "delete",
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
                  <h3 className={styles.h3}>Danh sách nhân viên hưởng hoa hồng doanh thu</h3>
                  <p className={styles.p_style}>Quản lý theo dõi nhân viên được gán hoa hồng</p>
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
            <Modal className={styles.modal_edit} title="Thêm mới hoa doanh thu" open={isModalOpen} onCancel={handleModalCancer} footer={null}>
               <div className={styles.modalRecipe_body}>
                  <div className={styles.format}>
                     <div className={styles.flex}>
                        <div className={styles.flex_input}>
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
                        </div>
                        <div className={styles.flex_input}>
                           <label className={styles.p_edit}>Chu kỳ(tháng) áp dụng</label>
                           <DatePicker formatr={monthFormat} className={styles.times_month} value={editTime} onChange={(date) => setEditTime(date)} picker="month" />
                        </div>
                     </div>

                     <div className={styles.flex}>
                        <div className={styles.flex_input}>
                           <label className={styles.p_edit}>Doanh thu theo thời điểm</label>
                           <input type="number" className={styles.input} placeholder="Doanh thu(dạng số)" value={editMoney} onChange={(e) => setEditMoney(e.target.value)} />
                        </div>
                        <div className={styles.flex_input}>
                           <DatePicker formatr={dateFormat} className={styles.times_month} />
                        </div>
                     </div>
                     <Form
                        className={styles.form}
                        onFinish={onFinish}
                        style={{
                           maxWidth: 600,
                        }}
                        autoComplete="off">
                        <Form.List name="users">
                           {(fields, { add, remove }) => (
                              <>
                                 {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                       key={key}
                                       style={{
                                          display: "flex",
                                          marginBottom: 8,
                                       }}
                                       align="baseline">
                                       <div className={styles.flex}>
                                          <div className={styles.flex_input}>
                                             <label className={styles.p_edit} style={{ fontSize: "16px" }}>
                                                Doanh thu theo thời điểm
                                             </label>
                                             <input type="number" className={styles.input_ant} placeholder="Doanh thu(dạng số)" value={editMoney} onChange={(e) => setEditMoney(e.target.value)} />
                                          </div>
                                          <div className={styles.flex_input_ant}>
                                             <DatePicker formatr={dateFormat} className={styles.times_month} />
                                          </div>
                                       </div>
                                       {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                                    </Space>
                                 ))}

                                 <button className={styles.add} onClick={() => add()}>
                                    Thêm doanh thu
                                 </button>
                              </>
                           )}
                        </Form.List>
                     </Form>
                     <div className={styles.flex_top}>
                        <div className={styles.flex_input}>
                           <label className={styles.p_edit}>Tổng doanh thu *</label>
                           <Input disabled />
                        </div>
                        <div className={styles.flex_input}>
                           <label className={styles.p_edit}>Mức doanh thu *</label>
                           <Select
                              className={styles.seclected}
                              placeholder=""
                              defaultValue="Chọn doanh thu"
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
                        </div>
                     </div>

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
