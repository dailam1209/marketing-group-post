import CampaignSelectBoxStep from "../campaign_steps/select_box_step";
import styles from "./edit_file_campaign.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddGeneralInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText label="Tên chiến dịch*" placeholder="Nhập tên chiến dịch" />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.width1} ${styles["col-lg-6"]}`}>
          <InputText label="Ngày bắt đầu" placeholder="" type="date" />
        </div>
        <div className={`${styles.width4} ${styles["col-lg-6"]}`}>
          <InputText label="Ngày kết thúc" placeholder="" type="date" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Ngân sách</label>
          <Input placeholder="Nhập"  suffix="VNĐ"/>
        </div>
        <div className={`${styles.width3} ${styles["col-lg-6"]}`}>
        <label className={`${styles["form-label"]}`}>Doanh số kỳ vọng</label>
          <Input placeholder="Nhập"  suffix="VNĐ"/>
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Kênh truyền thông</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Số đã chi" placeholder="Nhập" />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nhân viên phụ trách</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>
    </div>
  );
}
