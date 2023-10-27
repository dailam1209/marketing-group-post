import styles from "../chance.module.css";
import InforText from "./text_info";
export default function WriteBillRowInforText() {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Quốc gia:" value="Việt Nam" />
      <InforText field="Tỉnh/Thành phố:" value="Hà Nội" />
      <InforText field="Quận/Huyện:" value="Hoàng Mai" />
      <InforText field="Phường/Xã:" value="Định công" />
      <InforText field="Số nhà, đường phố:" value="1 Trần Nguyên Đán" />
      <InforText field="Mã vùng:" value="Chưa cập nhật" />
      <InforText field="Địa chỉ đơn hàng:"value="1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội"/>
    </div>
  );
}
