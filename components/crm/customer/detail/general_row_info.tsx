import styles from "../customer.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText() {
  // const listField = [
  //   {
  //     field: "Mã khách hàng:",
  //     value: "937843",
  //   },
  // ];

  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã khách hàng:" value="937843" />
      <InforText field="Tên khách hàng:" value="123123" />
      <InforText field="Tên viết tắt:" value="qưa" />
      <InforText field="Mã số thuế:" value="937843" />
      <InforText field="Điện thoại:" value="937843" />
      <InforText field="Email:" value="937843" />
      <InforText field="Nguồn khách hàng:" value="Facebook" />
      <InforText field="Phân loại khách hàng:" value="937843" />
      <InforText field="Lĩnh vực:" value="937843" />
      <InforText field="Loại hình:" value="937843" />
      <InforText
        field="Ngành nghề:"
        value="Chế biến gỗ và sản xuất các sản phẩm từ gỗ, tre, nứa,…"
      />
      <InforText field="Nhóm khách hàng:" value="937843" />
      <InforText field="Tình trạng khách hàng:" value="937843" />
      <InforText field="Nhân viên phụ trách:" value="Hà Quang Tuấn" />
    </div>
  );
}
