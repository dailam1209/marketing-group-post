import React, { useState } from "react";
import styles from "./day_top_dexuat.module.css";
import Image from "next/image";
import Select from "react-select";
const Day_top_dexuat = ({receive}:{receive:boolean}) => {
  const [since, setSince] = useState(false);
  const [to_day, setTo_day] = useState(false);
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none', // Remove the border
      boxShadow: 'none', // Remove the box shadow
      "min-height": '20px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    })
  };
  
  return (
    <div className={`${styles.day_top}`}>
      <form className={`${styles.day_top}`} action="" method="POST">
        {receive && (
          <>
            <div className={`${styles.incoming_text_top}`}>
              <div className={`${styles.incoming_text_top_selectList}`} >
                <Select 
                  options={undefined}
                  placeholder="Chọn người gửi đề xuất"
                  styles={customStyles}
                />
              </div>
            </div>

            <div className={`${styles.incoming_text_top}`}>
              <input
                className={`${styles.incoming_text_top_input}`}
                type="text"
                placeholder="Tiêu đề đề xuất"
                name="tieu_de_dexuat"
              />
            </div>

            <div className={`${styles.incoming_text_top}`}>
              <div className={`${styles.incoming_text_top_selectList}`} >
                <Select 
                  options={undefined}
                  placeholder="Chọn loại đề xuất"
                  styles={customStyles}
                />
              </div>
            </div>
          </>
        )}
        {!receive && (
          <div className={`${styles.incoming_text_top}`}>
            <div className={`${styles.incoming_text_top_selectList}`} >
              <Select 
                options={undefined}
                placeholder="Chọn người nhận đề xuất"
                styles={customStyles}
              />
            </div>
          </div>
        )}
        <div
          className={`${styles.incoming_text_top}`}
          onClick={() => {
            setSince(true);
          }}
        >
          <input
            className={`${styles.incoming_text_top_input}`}
            type={since ? "date" : "text"}
            placeholder="Từ ngày"
            name="time_start"
          />
        </div>

        <div
          className={`${styles.incoming_text_top}`}
          onClick={() => {
            setTo_day(true);
          }}
        >
          <input
            className={`${styles.incoming_text_top_input}`}
            type={to_day ? "date" : "text"}
            placeholder="Đến ngày"
            name="time_end"
          />
        </div>

        <div className={`${styles.incoming_text_top_btn}`}>
          <button type="submit" className={`${styles.btn_search}`}>
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
      </form>
    </div>
  );
};

export default Day_top_dexuat;
