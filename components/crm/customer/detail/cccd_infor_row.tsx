import styles from "../customer.module.css";
import InforText from "./text_info";
export default function CCCDInforRow({formData}:any) {

  return (
    <div className={styles.row_input_text}>
      <InforText field="Số CMND/CCCD::" value={formData?.so_cmtnd_cccd?formData?.so_cmtnd_cccd:"Chưa cập nhật"}/>
      <InforText field="Nơi cấp:" value={formData?.noi_cap_cmnd_cccd?formData?.noi_cap_cmnd_cccd:"Chưa cập nhật"}/>
      <InforText field="Ngày cấp:" value={formData?.ngay_cap_cmnd_cccd?formData?.ngay_cap_cmnd_cccd:"Chưa cập nhật"}/>
    </div>
  );
}
