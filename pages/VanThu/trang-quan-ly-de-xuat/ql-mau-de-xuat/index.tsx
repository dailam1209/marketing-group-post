import SwitchInput from "@/components/VanThu/components/Input/Input_switch/Input_switch";
import Table_header from "@/components/VanThu/components/tableheader/Table_header";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

import styles from "./ql_mau_de_xuat.module.css";
import Pagination from "@/components/VanThu/pagination/Pagination";
import { fetch_propose_type } from "@/utils/api/dexuat/api_fecth_cty";
import { show_hide_propose } from "@/utils/api/dexuat/api_post_cty";
import Overtime_propose from "@/components/VanThu/detail_propose/10_Overtime_propose/Overtime_propose";
import Pregnant_propose from "@/components/VanThu/detail_propose/11_Pregnant_propose/Pregnant_propose";
import Meeting_room_propose from "@/components/VanThu/detail_propose/12_Meeting_room_propose/Meeting_room_propose";
import Transportation_propose from "@/components/VanThu/detail_propose/13_Transportation_propose/Transportation_propose";
import Facility_fixing_propose from "@/components/VanThu/detail_propose/14_Facility_fixing_propose/Facility_fixing_propose";
import Payment_propose from "@/components/VanThu/detail_propose/15_Payment_propose/Payment_propose";
import Complaint_propose from "@/components/VanThu/detail_propose/16_Complaint_propose/Complaint_propose";
import Plus_effort_propose from "@/components/VanThu/detail_propose/17_Plus_effort_propose/Plus_effort_propose";
import Bonus_payoff_propose from "@/components/VanThu/detail_propose/18_Bonus_payoff_propose/Bonus_payoff_propose";
import Percentage_propose from "@/components/VanThu/detail_propose/19_Percentage_propose/Percentage_propose";
import Absent_propose from "@/components/VanThu/detail_propose/1_Absent_propose/Absent_propose";
import Switch_shift_propose from "@/components/VanThu/detail_propose/2_Switch_shift_propose/Switch_shift_propose";
import Advance_propose from "@/components/VanThu/detail_propose/3_Advance_propose/Advance_propose";
import Asset_allocation_propose from "@/components/VanThu/detail_propose/4_Asset_allocation_propose/Asset_allocation_propose";
import Quit_propose from "@/components/VanThu/detail_propose/5_Quit_propose/Quit_propose";
import Raise_propose from "@/components/VanThu/detail_propose/6_Raise_propose/Raise_propose";
import Assign_propose from "@/components/VanThu/detail_propose/7_Assign_propose/Assign_propose";
import Working_rotation_propose from "@/components/VanThu/detail_propose/8_Working_rotation_propose/Working_rotation_propose";
import Join_project_propose from "@/components/VanThu/detail_propose/9_Join_project_propose/Join_project_propose";

const titles = [
  { label: "Mẫu đề xuất" },
  { label: "Popup" },
  { label: "Hiệu lực" },
  { label: "Trạng thái" },
];
const Table_record = ({
  title_text,
  title_content,
  created_time,
  form_index,
  handleFunction,
  hided
}: any) => {
  const [isChecked, setIsChecked] = useState(hided);

  const handleToggle = async () => {
    const token = sessionStorage.getItem("token");
    setIsChecked(!isChecked);
    let show = 1;
    if(isChecked){
      show = 0;
    }else{
      show = 1;
    }
    const response = await show_hide_propose(token,show,form_index);
    alert(response?.data.message);
  };
  return (
    <div className={styles.quanlymau_tab_group}>
      <div className={styles.quanlymau_tab_form}>
        <div className={styles.quanlymau_form_title}>
          <div className={styles.quanlymau_title_text}>{title_text}</div>
          <div className={styles.quanlymau_title_content}>{title_content}</div>
        </div>
        <div
          onClick={() => handleFunction(form_index-1)}
          className={styles.quanlymau_form_popup}
        >
          <div className={styles.quanlymau_popupbtn}>
            <p>
              <img
                src="/icon/dexuat_mat.png"
                alt=""
                className={styles.img_xem_truoc}
              />
            </p>
            <span>Xem trước</span>
          </div>
        </div>
        <div className={styles.quanlymau_form_time}>
          <div className={styles.time_icon_area}>
            <Image src="/icon/dexuat_time.png" alt="" width={17} height={17} />
          </div>
          <span>{created_time + ' ngày'}</span>
        </div>
        <div className={styles.quanlymau_form_status}>
          <div className={styles.on_off_switch}>
            <div className={styles.switchContainer}>
              <div className={styles.switchWrapper}>
                <label className={styles.switch}>
                  <input
                    className={styles.switch_input}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <span className={styles.slider}>
                    <span
                      className={isChecked ? styles.onText : styles.offText}
                    >
                      {isChecked ? "ON" : "OFF"}
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Index = () => {
  const [example_forms, setExample_forms] = useState([
    { display: "none", form: <Absent_propose/> },
    { display: "none", form: <Switch_shift_propose /> },
    { display: "none", form: <Advance_propose /> },
    { display: "none", form: <Asset_allocation_propose /> },
    { display: "none", form: <Quit_propose /> },
    { display: "none", form: <Raise_propose /> },
    { display: "none", form: <Assign_propose /> },
    { display: "none", form: <Working_rotation_propose /> },
    { display: "none", form: <Join_project_propose /> },
    { display: "none", form: <Overtime_propose /> },
    { display: "none", form: <Pregnant_propose /> },
    { display: "none", form: <Meeting_room_propose /> },
    { display: "none", form: <Transportation_propose /> },
    { display: "none", form: <Facility_fixing_propose /> },
    { display: "none", form: <Payment_propose /> },
    { display: "none", form: <Complaint_propose /> },
    { display: "none", form: <Plus_effort_propose /> },
    { display: "none", form: <Bonus_payoff_propose /> },
    { display: "none", form: <Percentage_propose /> },
  ]);
  const [propose_types,setPropose_type] = useState<any[]>();
  const [hided_propose,setHided_propose] = useState<any[]>();
  const [filter,setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState<any>();
  useEffect(()=>{
    const fetchdata = async () => {
        const res_propose_type = await fetch_propose_type(currentPage,filter)
        setPropose_type(res_propose_type?.data.result)
        setHided_propose(res_propose_type?.data.idHideCateDX)
        setTotalPages(res_propose_type?.data.totalPages)
        console.log(res_propose_type?.data.idHideCateDX) 
    }
  fetchdata();
},[currentPage, filter])
  const handleShowForm = (index: number) => {
    setExample_forms((prevForms) => {
      return prevForms.map((form, idx) => {
        if (idx === index) {
          return { ...form, display: "block" };
        }
        return form;
      });
    });
  };
  const handleCloseForm = (index: number) => {
    setExample_forms((prevForms) => {
      return prevForms.map((form, idx) => {
        if (idx === index) {
          return { ...form, display: "none" };
        }
        return form;
      });
    });
  };
  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilter(value);
  }
  const Example_form = ({ display, index, form, handleClick }: any) => {
    return (
      <div className={styles.popup_l} style={{ display: `${display}` }}>
        <div className={styles.themmaudon_table}>
          <div className={styles.themmaudon_title}>
            <p className={styles.themmaudon_title_text}>
              {propose_types ? propose_types[index]?.name_cate_dx : 'Đề xuất'}
            </p>
            <div
              onClick={() => handleClick(index)}
              className={styles.close_popup}
            >
              <Image src="/icon/X-trang.png" width={16} height={16} alt="" />
            </div>
          </div>
          <div className={styles.themmaudon_body}>{form}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div id="dexuat_quanlymau">
        <div className={styles.container}>
          <div className={styles.quanly_mau_box}>
            <div className={styles.quanlymau_box_title}>
              <div className={styles.quanly_title_text}>
                <h3>Các biểu mẫu đề xuất</h3>
              </div>
            </div>

            <div className={styles.search_dx}>
              <form className={styles.search_dx_top}>
                <input
                  className={styles.text_search_dx}
                  type="text"
                  placeholder="Tìm kiếm mẫu đơn đề xuất"
                  onChange={handleSearchChange}
                />
                <span className={styles.btn_search_dx}>
                  <Image
                    alt={""}
                    width={18.7}
                    height={18.7}
                    src="/icon/icon_search_dx.png"
                  />
                </span>
              </form>
            </div>

            <div className={styles.quanlymau_box_list}>
              <div className={styles.quanlymau_list_tab}>
                <Table_header titles={titles} className="quanlymau_list_item" />
                <div className={styles.quanlymau_tab_content}>
                  <div className={styles.quanlymau_tab_items}>
                    {propose_types?.map((record:any, index:any) => {
                      return (
                        <Table_record
                          form_index={record.cate_dx}
                          key={index}
                          title_text={record.name_cate_dx}
                          title_content={record.mieuta_maudon}
                          created_time={record.hieu_luc_cate}
                          handleFunction={handleShowForm}
                          hided={!hided_propose?.includes(record.cate_dx)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {example_forms.map((forms, index) => {
        return (
          <Example_form
            key={index}
            display={forms.display}
            index={index}
            form={forms.form}
            handleClick={handleCloseForm}
          />
        );
      })}
      <Pagination
          totalPages={totalPages}
          handlePageChange={(e:any)=>setCurrentPage(e.selected + 1)}
      />
    </>
  );
};

export default Index;
