import styles from "../customer.module.css";
import InforText from "./text_info";
export default function BonusInfoRow() {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Tài khoản ngân hàng:" value="937843" />
      <InforText field="Mở tại ngân hàng:" value="123123" />
      <InforText field="Ngày sinh:" value="qưa" />
      <InforText field="Là khách hàng từ:" value="937843" />
      <InforText field="Doanh thu/Ngân sách:" value="937843" />
      <InforText field="Website:" value="937843" />
      <InforText field="Xếp hạng khách hàng:" value="Facebook" />
      <InforText field="Hạn mức nợ:" value="937843" />
      <InforText field="Số ngày được nợ:" value="937843" />
      <InforText field="Giới tính:" value="937843" />
    </div>
  );
}
