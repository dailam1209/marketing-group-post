import React, { useState } from "react";
import styles from "./table_history_update.module.css";
import Filter_area from "../document_go/filter_area";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import { Custom_label } from "@/components/van-thu-luu-tru/components/Input/Label/Label";
import { Custom_input_text } from "@/components/van-thu-luu-tru/components/Input/Input_text/Input_text";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";

import Image from "next/image";
import Link from "next/link";

const History_table = (props: any) => {
  const select_style = {
    control: (provided: any) => ({
      ...provided,
      height: '30px',
      borderRadius: '10px'
    }),
  }
  const propose_status_options = [
    { value: '0', label: 'Tất cả văn bản' },
    { value: '7', label: 'Văn bản đến' },
    { value: '5', label: 'Văn bản đi' },
    { value: '5', label: 'Văn bản đi' },
    { value: '5', label: 'Văn bản đi' },
    { value: '5', label: 'Văn bản đi' },
  ]
  var name_table = props.name_table;

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.filter_area_box}>
          <form className={styles.form}>
            <div className={styles.filter_area_list}>
              <Section
                style="filter_area_25"
                label={<Custom_label isRequired={false} label_class="font_500" title="" />}
                input={<Custom_input_text
                  isDisabled={false}
                  inputclass="input_text_shedule_2"
                  placeholder="Nhập từ khóa tên văn bản"
                />}
              />
              <Section
                style='filter_area_25'
                input={<Input_select
                  options={propose_status_options}
                  placeholder='Tất cả văn bản'
                  className='filter_area'
                  style={select_style}
                />}
              />

              <Section
                style="filter_area_25"
                input={<Input_calender
                  placeholder="Từ ngày"
                  datetype="date"
                  calender_class="filter_area"
                  calender_label_class="filter_area_label"
                />}
              />
              <Section
                style="filter_area_25"
                input={<Input_calender
                  placeholder="Đến ngày"
                  datetype="date"
                  calender_class="filter_area"
                  calender_label_class="filter_area_label"
                />}
              />
              <div className={styles.filter_area_25}>
                <button className={styles.top_btn}>
                  <div className={styles.flex}>
                    <Image className={styles.search_icon} alt='' src='/icon/icon_search_white.png' width={17} height={17} />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.title}>
        <Link href={'/trang-chu-quan-ly-cong-van/lich-su-cap-nhat'}><Image
          src={"/icon/img5.png"}
          width={10}
          height={18}
          alt=""
          className={styles.close_detl}
        /></Link>
        <p>{props.title}</p>
      </div>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {name_table.map((column: any, index: any) => (
                <th key={index}>{column}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {props.data.map((row:any, index:any) => (
              <tr key={index}>
                {row.map((value:any, valueIndex:any) => (
                  <td key={valueIndex}>{value}</td>
                ))}
                  <td>
                    <Link href={'https://vanthu.timviec365.vn/lich-su-cap-nhat-quan-ly-cong-van.html'}>Xem chi tiết</Link>
                  </td>              
                <td>
                  <button>
                    <img alt='' src='/icon/img_xoa.png' width={10} height={10} />
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History_table;
