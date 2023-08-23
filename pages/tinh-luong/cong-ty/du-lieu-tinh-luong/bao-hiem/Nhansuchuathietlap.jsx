import React, { useState } from "react";
import styles from "./chuathietlap.module.css";
import { Button, Modal, Select, Table, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;

const Nhansuchuathietlap = () => {
   const [selectedMonth, setSelectedMonth] = useState(dayjs());
   const [selectedYear, setSelectedYear] = useState(dayjs());
   const monthFormat = "MM";
   const yearFormat = "YYYY";

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

   const columns = [
      {
         title: "",
         dataIndex: "name",
         render: (name) => (
            <div className={styles.render}>
               <div>
                  <Image alt="/" src={"/tien.png"} width={50} height={50} style={{ borderRadius: "50%" }} />
               </div>
               <div>
                  <p className={styles.p_style}>{name}</p>
                  <p className={styles.text}>3386962</p>
                  <p className={styles.text}>Phòng 13</p>
               </div>
            </div>
         ),
      },
      {
         title: "",
         dataIndex: "text",
         render: (text) => (
            <div>
               <button className={styles.setting} onClick={showModalTimeConfirm}>
                  <Image alt="/" src={"/setting.png"} width={18} height={18} />
                  {text}
               </button>
            </div>
         ),
      },
   ];
   const data = [
      {
         key: "1",
         name: "John Brown",
         text: "Thiết lập",
      },
      {
         key: "2",
         name: "Jim Green",
         text: "Thiết lập",
      },
      {
         key: "3",
         name: "Joe Black",
         text: "Thiết lập",
      },
   ];

   const [ModalTimeOpen, setModalTimeOpen] = useState(false);
   const showModalTimeConfirm = () => {
      setModalTimeOpen(true);
   };
   const hanleModalTimeCancer = () => {
      setModalTimeOpen(false);
   };
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.information}>
               <h3 className={styles.h3}>Danh sách nhân viên chưa thiết lập bảo hiểm</h3>
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
               <div>
                  <SearchOutlined className={styles["search-icon"]} />
                  <Select
                     showSearch
                     placeholder=""
                     defaultValue="Phòng ban( Tất cả )"
                     optionFilterProp="children"
                     onChange={onChange}
                     onSearch={onSearch}
                     filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                     options={[
                        {
                           value: "Phòng ban( Tất cả )",
                           label: "Phòng ban( Tất cả )",
                        },
                        {
                           value: "Kỹ thuật",
                           label: "Kỹ thuật",
                        },
                        {
                           value: "Biên tập",
                           label: "Biên tập",
                        },
                        {
                           value: "Kinh doanh",
                           label: "Kinh doanh",
                        },
                        {
                           value: "Phòng SEO",
                           label: "Phòng SEO",
                        },
                        {
                           value: "Phòng đào tạo",
                           label: "Phòng đào tạo",
                        },
                        {
                           value: "Phòng Sáng tạo",
                           label: "Phòng Sáng tạo",
                        },
                        {
                           value: "Phòng tài vụ",
                           label: "Phòng tài vụ",
                        },
                        {
                           value: "Phòng nhân sự",
                           label: "Phòng nhân sự",
                        },
                     ]}
                  />
               </div>
               <div>
                  <button className={styles.button}>Thống kê</button>
               </div>
            </div>
            <div className={styles.table_style}>
               <Table columns={columns} dataSource={data} className={styles.table} />
            </div>
         </div>
         <div>
            <div className={styles.video}>
               <iframe
                  className="video_hd"
                  style={{ borderRadius: 15 }}
                  width={680}
                  height={430}
                  src="https://www.youtube.com/embed/iocoeqinowU"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
               />
            </div>
         </div>
         <div className="modal_times">
            <Modal className={styles.modal_times} title="   " open={ModalTimeOpen} onCancel={hanleModalTimeCancer} footer={null}>
               <div className={styles.times_body}>
                  <div>
                     <p>Áp dụng từ tháng</p>
                     <DatePicker picker="month" className={styles.times_month} />
                  </div>
                  <div>
                     <p>Đến hết tháng(không bắt buộc)</p>
                     <DatePicker picker="month" className={styles.times_month} />
                  </div>
                  <div>
                     <p>Loại bảo hiểm</p>
                     <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn loại bảo hiểm"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={[
                           {
                              value: "Chọn loại bảo hiểm",
                              label: "Chọn loại bảo hiểm",
                           },
                           {
                              value: "Kỹ thuật",
                              label: "Kỹ thuật",
                           },
                           {
                              value: "Biên tập",
                              label: "Biên tập",
                           },
                           {
                              value: "Kinh doanh",
                              label: "Kinh doanh",
                           },
                        ]}
                     />
                  </div>
               </div>
               <div className={styles.modal_times_body}>
                  <Button type="primary" className={styles.btn_saves}>
                     Lưu lại
                  </Button>
               </div>
            </Modal>
         </div>
      </div>
   );
};

export default Nhansuchuathietlap;
