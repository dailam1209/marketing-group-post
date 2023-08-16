// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddQuoteInfo() {
  return (
    <div>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Số báo giá:</b>
            </div>
            <div className={styles.row1quote_right}>ĐH-0000</div>
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Ngày báo giá:</b>
            </div>

            <div className={styles.row1quote_right}>10/10/2020</div>
          </div>
        </div>
        <div style={{display:"flex",marginTop:-10}}>
        <div className={styles.full_width_div}>
          <span></span>
        </div>     <div className={styles.full_width_div}>
          <span></span>
        </div>
        </div>
   

        
        <div className={styles.row}>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Hiệu lực đến ngày:</b>
            </div>
            <div className={styles.row1quote_right}>Chưa cập nhật</div>
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Tình trạng</b>
            </div>
            <div
              className={styles.row1quote_right}
              style={{ color: "#FFA800" }}
            >
              Bản thảo
            </div>
          </div>
        </div>
        <div style={{display:"flex",marginTop:-10}}>
        <div className={styles.full_width_div}>
          <span></span>
        </div>     <div className={styles.full_width_div}>
          <span></span>
        </div>
        </div>
      </div>
    </div>
  );
}
