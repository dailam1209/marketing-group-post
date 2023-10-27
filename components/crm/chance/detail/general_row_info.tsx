import styles from "../chance.module.css";
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
      <InforText field="Khách hàng:" value="Nguyễn Trần Kim Phượng" />
      <InforText field="Liên hệ:" value="Nguyễn Văn Nam" />
      <InforText field="Tên cơ hội:" value="Cơ hội bán hàng - Nguyễn Trần Kim Phượng" />
      <InforText field="Loại cơ hội:" value="Khách hàng mới" />
      <InforText field="Nhóm hàng hóa:" value="Chưa cập nhật" />
      <InforText field="Số tiền:" value="Chưa cập nhật" />
      <InforText field="Giai đoạn:" value="Chưa cập nhật" />
      <InforText field="Tỉ lệ thành công:" value="10%" />
      <InforText field="Doanh số kỳ vọng:" value="Chưa cập nhật" />
      <InforText field="Ngày kỳ vọng/kết thúc:" value="10/10/2022" />
      <InforText field="Chiến dịch:"value="Chưa cập nhật"/>
      <InforText field="Nguồn gốc:" value="Chưa cập nhật" />
      <InforText field="Nhân viên phụ trách:" value="Nguyễn Văn Nam" />
    </div>
  );
}
