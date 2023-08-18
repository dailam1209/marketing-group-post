import React from "react";
import styles from "./search_ducument.module.css";
import Section from "@/components/VanThu/components/Input/Section/Section";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import { Custom_label } from "@/components/VanThu/components/Input/Label/Label";
import { Custom_input_number } from "@/components/VanThu/components/Input/Input_number/Input_text";
import { Custom_input_text } from "@/components/VanThu/components/Input/Input_text/Input_text";
import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import Image from "next/image";

const text_number = [
  { value: '0', label: 'Ytetre - 2023' },
  { value: '1', label: 'sổ văn bản theo số - 2023' },
]
const Index = () => {
  const select_style = {
    control: (provided: any) => ({
      ...provided,
      height: '30px',
      borderRadius: '15px'
    }),
  }
  return <div className={styles.app}>
    <div className={styles.form}>
      <div className={styles.flex}>
        <Section
          style='col3'
          input={<Input_select
            options={text_number}
            placeholder='Số văn bản'
            className='filter_area'
            style={select_style}
          />}
        />
        <Section
          style="col3"
          label={<Custom_label isRequired={false} title="" label_class="font_500" />}
          input={<Custom_input_text inputclass="input_text_shedule1" placeholder="Nhập từ khóa, tên văn bản"
          />}
        />
        <Section
          style='col3'
          input={<Input_select
            options={text_number}
            placeholder='Chọn loại văn bản'
            className='filter_area'
            style={select_style}
          />}
        />
      </div>
      <div className={`${styles.flex} ${styles.content2}`}>

        <div className={styles.col_full}>
          <Section
            style={'full'}
            label={<Custom_label isRequired={false} label_class="font_500" title="" />}
            input={<Input_calender
              placeholder="Chọn ngày"
              datetype="date"
              calender_class="calender_class_schedule1"
              // calender_label_class="calender_label_class_schedule"
              input_name="start_date"
            />}
          />
        </div>
        <div className={styles.col_full}>
          <Section
            style={'full'}
            label={<Custom_label isRequired={false} label_class="font_500" title="" />}
            input={<Input_calender
              placeholder="Đến ngày"
              datetype="date"
              calender_class="calender_class_schedule1"
              // calender_label_class="calender_label_class_schedule"
              input_name="start_date"
            />}
          />
        </div>
        <div className={`${styles.btnfooter} ${styles.col_full}`}>
          <button>
            <div>
              <Image src={"/icon/img_search1.png"} width={15} height={15} alt="Avatar" />
            </div>
            <span>Tìm kiếm</span></button>
        </div>
      </div>

    </div>

    <div className={styles.image}>
    <Image src={"/icon/search_nhanh.png"} width={300} height={300} alt="Avatar" />  
    </div>
  </div>;
};

export default Index;
