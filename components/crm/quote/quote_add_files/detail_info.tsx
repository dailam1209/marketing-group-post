import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddDetailInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chi tiết</p>

      <div className={styles.row_input}>
        <InputText label="Ngày báo giá*" placeholder="" type="date"/>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
        <InputText label="Hạn thanh toán*" placeholder="Nhập" type="date"/> 
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Khách hàng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Mã số thuế" placeholder="Nhập mã số thuế"/>
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Địa chỉ" placeholder="Nhập địa chỉ"/>
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Số điện thoại" placeholder="Nhập số điện thoại"/>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Cơ hội</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        
      </div>


      <div className={styles.row_input}>
      <label className={`${styles["form-label"]}`}>Lời giới thiệu</label>
      <textarea placeholder="Nhập lời giới thiệu" style={{width:"100%",fontSize:15, padding:10,height:80}}></textarea>
      </div>
    </div>
  );
}
