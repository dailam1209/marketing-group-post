import styles from "../customer.module.css";
import InforText from "./text_info";
export default function CCCDInforRow({formData}:any) {

  return (
    <div className={styles.row_input_text}>
      <InforText field="Số CMND/CCCD::" value={formData?.cmnd_ccnd_number?formData?.cmnd_ccnd_number:"Chưa cập nhật"}/>
      <InforText field="Nơi cấp:" value={formData?.cmnd_ccnd_address?formData?.cmnd_ccnd_address:"Chưa cập nhật"}/>
      <InforText field="Ngày cấp:" value={formData?.cmnd_ccnd_time?formData?.cmnd_ccnd_time:"Chưa cập nhật"}/>
    </div>
  );
}
