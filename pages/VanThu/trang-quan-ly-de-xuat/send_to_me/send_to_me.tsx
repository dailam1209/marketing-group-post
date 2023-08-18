import Day_top_dexuat from "@/components/VanThu/components/day_top/Day_top_dexuat";
import Table_dexuat from "@/components/VanThu/components/incoming_doc_table/Table_dexuat";
import styles from "./my_send.module.scss";
import React, { useEffect, useState } from "react";
import { Sended_status, Received_status, Accepted_status, NotAccepted_status, Force_to_work_status, Wait_other_accept, Wait_com_accept } from "../danh-sach-de-xuat";
import { formatDate_number_raw } from "../[id]";
import { fetch_propose_list } from "@/utils/api/dexuat/api_fecth_cty";
import Image from "next/image";
import Select from "react-select";
import Section from "@/components/VanThu/components/Input/Section/Section";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import { fetch_dxtype, fetch_employee, fetch_guidentoi } from "@/utils/api/dexuat/api_fetch";
import Pagination from "@/components/VanThu/pagination/Pagination";
import { Custom_input_text } from "@/components/VanThu/components/Input/Input_text/Input_text";

const filter_elemnents = [
  { key: 1, title: "Tất cả", text_class: "table_btn_text" },
  { key: 2, title: "Đang chờ duyệt", text_class: "table_btn_text" },
  { key: 3, title: "Quá hạn duyệt", text_class: "table_btn_text" },
  { key: 4, title: "Đã phê duyệt", text_class: "table_btn_text" },
  { key: 5, title: "Đã từ chối", text_class: "table_btn_text" },
];
const FilterElement = ({
  key,
  title,
  text_class,
  handle_function,
}: {
  key: number;
  title: string;
  text_class: string;
  handle_function: any;
}) => {
  return (
    <li
      key={key}
      onClick={() => handle_function(key)}
      className={`${styles.table_btn_filter}`}
    >
      <p className={styles[text_class]}>{title}</p>
    </li>
  );
};
export const Table_record = ({href,index,name,department,propose,date,status}:any) => {
  return (
    <a href={'/VanThu/trang-quan-ly-de-xuat/'+href} className={styles.link_record}>
      <div className={styles.tab_infor}>
        <p>{index}</p>
        <p className={styles.infor_name}>
          {name}&nbsp;
          <span>
            ({department ? department : 'Chưa cập nhật'}){propose}
          </span>
        </p>
        <div className={styles.infor_btn}>
          {status === "0" && (
            <div style={{
              justifyContent: 'center'
            }}>
              <a>
                <div style={{
                  background: '#fff',
                  border: '1px solid #4C5BD4',
                  borderRadius: '5px',
                  height: '40px',
                  alignItems: 'center',
                  display: 'flex',
                  width: '135px',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    color: '#4C5BD4',
                    padding: '3px 20px',
                    fontWeight: 'bold',
                  }}>
                    Tiếp nhận
                  </span>
                </div>
              </a>
            </div>
          )}
          {status === "7" && <Received_status />}
          {status === "5" && <Accepted_status />}
          {status === "3" && <NotAccepted_status />}
          {status === "6" && <Force_to_work_status />}
          {status === "10" && <Wait_other_accept />}
          {status === "11" && <Wait_com_accept />}
        </div>
        <div className={styles.infor_date}>
          <span>{formatDate_number_raw(date)}</span>
        </div>
      </div>
    </a>
  )
}
const My_send = () => {
  let [active_filter, setactive_filter] = React.useState(filter_elemnents);
  active_filter = filter_elemnents.filter((elem) => elem.key !== 3);
  const handleFilter = async (id: number) => {
    setactive_filter((prevState) => {
      const updatedFilters = [...prevState];
      updatedFilters[id - 1].text_class = "table_btn_text_active";
      for (var i = 0; i < updatedFilters.length; i++) {
        if (i === id - 1) {
          continue;
        }
        updatedFilters[i].text_class = "table_btn_text";
      }
      return updatedFilters;
    });
    const response = await fetch_guidentoi({type : id, page: 1})
    setTableRecords(response?.data.data)
    setTotalpage(response?.data.totalPages)
    setFilter_data((prevFormData:any) => ({
      ...prevFormData,
      type: id,
    }));
  };
  const select_style = {
    control: (provided:any) => ({
      ...provided,
      height: '48px',
      borderRadius: '5px 0px 0px 5px',
      border: '1px solid #fff'
    }),
  }
  const [table_records,setTableRecords] = useState<any>();
  const [employee,setEmployee] = useState<any[]>();
  const [dxtype,setDxtype] = useState<any[]>();
  const [totalpage, setTotalpage] = useState();
  const [filter_data,setFilter_data] = useState<any>({});
  useEffect(()=>{
    const fetchdata = async () => {
      const token = sessionStorage.getItem("token");
      const res_propose_list = await fetch_guidentoi()
      const res_employee = await fetch_employee(token)
      const res_dxtype = await fetch_dxtype()
      setTableRecords(res_propose_list?.data.data)
      setEmployee(res_employee?.data.data)
      setTotalpage(res_propose_list?.data.totalPages)
      setDxtype(res_dxtype?.data.showcatedx)
    }
  fetchdata();
},[])
  const employee_options = employee?.map((opts:any) => {
    return { value:opts.idQLC, label:`(${opts.idQLC}) ${opts.userName}`, name: 'id_user'}
  })
  employee_options?.unshift({value: '', label: 'Chọn người nhận đề xuất (Tất cả)', name:'id_user'})
  const propose_types_options = dxtype?.map((type:any)=>{
    return {value: type._id, label: type.name_cate_dx,name: 'type_dx'}
  }) 
  propose_types_options?.unshift({value: '', label: 'Chọn loaị đề xuất', name:'type_dx'})
  const handlePageChange = async (e:any) => {
    const response = await fetch_guidentoi(
      {
        page : e.selected + 1,
        id_user_duyet: filter_data?.id_user_duyet,
        time_s: filter_data?.time_s,
        time_e: filter_data?.time_e,
        type: filter_data?.type
      })
    setTableRecords(response?.data.data)
  }
  const handleSubmitFilter = async (e:any) => {
    e.preventDefault();
    const form_data = new FormData();
    for (var key in filter_data){
      form_data.append(key, filter_data[key]);
    }
    const response = await fetch_guidentoi(form_data)
    setTableRecords(response?.data.data)
    setTotalpage(response?.data.totalPages)
  }
  const handleSelectChange = (e:any) => {
    const {type,name, value} = e;
    setFilter_data((prevFormData:any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleInputChange = (e:any) => {
    const {name, value} = e.target;
    setFilter_data((prevFormData:any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  return (
    <div className={styles.body_general_management}>
      <div className={`${styles.day_top}`}>
        <Section 
          style='filter_area_23_5'
          input={<Input_select 
              options={employee_options}
              placeholder='Chọn người gửi đề xuất'
              className='filter_area'
              style={select_style}
              onChange={handleSelectChange}
          />} 
        />
        <Section 
          style="filter_area_23_5" 
          input={<Custom_input_text 
            inputclass="filter_area" 
            placeholder="Nhập tên đề xuất"
            input_name="name_dx"
            handleChange={handleInputChange} 
          />}
        />
        <Section 
          style='filter_area_23_5'
          input={<Input_select 
              options={propose_types_options}
              placeholder='Chọn loại đề xuất'
              className='filter_area'
              style={select_style}
              onChange={handleSelectChange}
          />} 
        />
        <Section 
          style="filter_area_23_5" 
          input={<Input_calender 
            placeholder="Từ ngày"
            datetype="date"
            calender_class="filter_area_toiguidi"
            calender_label_class="filter_area_label_toiguidi"
            handle_input={handleInputChange}
            input_name='time_s'
          />} 
        />
        <Section 
          style="filter_area_23_5" 
          input={<Input_calender 
            placeholder="Đến ngày"
            datetype="date"
            calender_class="filter_area_toiguidi"
            calender_label_class="filter_area_label_toiguidi"
            handle_input={handleInputChange}
            input_name='time_e'
          />} 
        />
        <div onClick={handleSubmitFilter} className={`${styles.incoming_text_top_btn}`}>
          <button className={`${styles.btn_search}`}>
            <Image
              width={50}
              height={50}
              className={`${styles.btn_img}`}
              src={"/icon/i_search.png"}
              alt=""
            />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>
      <div className={`${styles.incoming_doc_table}`}>
        <div className={`${styles.table}`}>
          <ul className={styles.table_filter_box}>
            {active_filter.map((p) => (
              <FilterElement
                key={p.key}
                title={p.title}
                text_class={p.text_class}
                handle_function={() => handleFilter(p.key)}
              />
            ))}
          </ul>
          <div className={styles.box_list}>
              <div className={styles.list_tab}>
                <div className={styles.tab_content}>
                  <div className={styles.tab_items}>
                    {table_records?.map((record:any, index:any) => {
                      return(
                        <Table_record 
                          key={index} 
                          index={index+1} 
                          name={record.name_user}  
                          department={record.department}
                          propose={record.name_dx}
                          date={record.time_create}
                          status={record.type_duyet.toString()}
                          href={record._id}
                        />
                      )
                    })}
                  </div>
                  <Pagination
                    totalPages={totalpage}
                    handlePageChange={handlePageChange}
                    containerClass='toiguidi'
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default My_send;
