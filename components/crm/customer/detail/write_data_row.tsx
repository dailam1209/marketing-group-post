import styles from "../customer.module.css";
import InforText from "./text_info";
export default function WriteBillRowInforText({formData}:any) {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Quốc gia:" value="Việt Nam" />
      <InforText field="Tỉnh/Thành phố:" value={formData?.bill_city?.detail?formData?.bill_city?.detail:"Chưa cập nhật"}/>
      <InforText field="Quận/Huyện:" value={formData?.bill_district?.detail?formData?.bill_district?.detail:"Chưa cập nhật"}/>
      <InforText field="Phường/Xã:" value={formData?.bill_ward?.detail?formData?.bill_ward?.detail:"Chưa cập nhật"}/>
      <InforText field="Số nhà, đường phố:" value={formData?.so_nha_duong_pho_hd?formData?.so_nha_duong_pho_hd:"Chưa cập nhật"}/>
      <InforText field="Mã vùng:" value={formData?.bill_area_code?.info?formData?.bill_area_code?.info:"Chưa cập nhật"}/>
      <InforText field="Địa chỉ đơn hàng:" value={formData?.bill_address?.info?formData?.bill_address.info:"Chưa cập nhật"}/>

      <InforText field="Địa chỉ email nhận hóa đơn (email):" value={formData?.bill_invoice_address_email?formData?.bill_invoice_address_email:"Chưa cập nhật"}/>
    </div>
  );
}
