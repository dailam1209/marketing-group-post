import styles from "../customer.module.css";
import InforText from "./text_info";
export default function BonusInfoRow({formData}:any) {

  var seconds = formData?.la_khach_hang_tu / 1000;  // Chia cho 1000 để chuyển từ milliseconds thành seconds

// Tạo đối tượng Date từ số giây
var date = new Date(seconds * 1000);  // Nhân cho 1000 để chuyển từ seconds thành milliseconds

// Lấy ngày, tháng và năm
var day = date.getDate();
var month = date.getMonth() + 1;  // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0
var year = date.getFullYear();

// Định dạng ngày theo yêu cầu (thêm '0' ở trước nếu cần)
var formatted_date = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

var seconds2 = formData?.so_ngay_duoc_no / 1000; 
var date2 = new Date(seconds2 * 1000);  // Nhân cho 1000 để chuyển từ seconds thành milliseconds
var day = date2.getDate();
var month = date2.getMonth() + 1;  // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0
var year = date2.getFullYear();
var so_ngay_duoc_no = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

  return (
    <div className={styles.row_input_text}>
      <InforText field="Tài khoản ngân hàng:"  value={formData?.bank_account?formData?.bank_account:"Chưa cập nhật"}/>
      <InforText field="Mở tại ngân hàng:" value={formData?.bank_id?formData?.bank_id:"Chưa cập nhật"}/>
      <InforText field="Ngày sinh:" value={formData?.ngay_sinh?formData?.ngay_sinh:"Chưa cập nhật"}/>
      <InforText field="Là khách hàng từ:" value={formatted_date?formatted_date:"Chưa cập nhật"}/>
      <InforText field="Doanh thu/Ngân sách:" value="937843" />
      <InforText field="Website:" value={formData?.website?formData?.website:"Chưa cập nhật"}/>
      <InforText field="Xếp hạng khách hàng:" value={formData?.xep_hang_kh?formData?.xep_hang_kh:"Chưa cập nhật"}/>
      <InforText field="Hạn mức nợ:" value={formData.han_muc_no?formData.han_muc_no:"Chưa cập nhật"}/>
      <InforText field="Số ngày được nợ:" value={so_ngay_duoc_no?so_ngay_duoc_no:"Chưa cập nhật"}/>
      <InforText field="Giới tính:"  value={formData?.gender?formData?.gender:"Chưa cập nhật"}/>
    </div>
  );
}
