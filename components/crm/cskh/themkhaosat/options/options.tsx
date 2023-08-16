import React from "react";
import styles from "../../csks.module.css";
type Props = {};

const Options = (props: any) => {
  const { handleThemmoi,handleThemmoiOP1,handleThemImage,handleThemPhan,handleThemvideo} = props;
  return (
    <div className={styles.form_options}>
      <div className={styles.icon_options} onClick={handleThemmoiOP1}>
        <img
          src="https://crm.timviec365.vn/assets/icons/add_td.svg"
          title="Thêm mới"
        />
      </div>
      <div className={styles.icon_options} onClick={handleThemmoi}>
        <img
          src="https://crm.timviec365.vn/assets/icons/text.svg"
          title="Thêm tiêu đề và mô tả"
        />
      </div>
      <div className={styles.icon_options} onClick={handleThemImage}>
        <img
          src="https://crm.timviec365.vn/assets/icons/img.svg"
          title="Thêm ảnh"
        />
      </div>
      <div className={styles.icon_options} onClick={handleThemvideo}>
        <img
          src="https://crm.timviec365.vn/assets/icons/youtube.svg"
          title="Thêm video"
        />
      </div>
      <div className={styles.icon_options} onClick={handleThemPhan} >
        <img
          src="https://crm.timviec365.vn/assets/icons/rectangle.svg"
          title="Thêm phần"
        />
      </div>
    </div>
  );
};
export default Options;
