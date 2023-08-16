import styles from "../customer.module.css";
import InforText from "./text_info";
export default function WriteBillRowInforText() {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Quốc gia:" value="Việt Nam" />
      <InforText field="Tỉnh/Thành phố:" value="Hà Nội" />
      <InforText field="Quận/Huyện:" value="Quận Cầu Giấy" />
      <InforText field="Phường/Xã:" value="Định công" />
      <InforText field="Số nhà, đường phố:" value="12" />
      <InforText field="Mã vùng:" value="100000" />
      <InforText
        field="Địa chỉ đơn hàng:"
        value="12, Phường Nghĩa Tân, Quận Cầu Giấy, Hà Nội, Việt Nam"
      />
      <InforText field="Địa chỉ email nhận hóa đơn (email):" value="" />
    </div>
  );
}
