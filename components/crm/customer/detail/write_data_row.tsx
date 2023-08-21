import styles from "../customer.module.css";
import InforText from "./text_info";
export default function WriteBillRowInforText({formData}:any) {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Quốc gia:" value="Việt Nam" />
      <InforText field="Tỉnh/Thành phố:" value={formData?.hoa_don_tp?.name?formData?.hoa_don_tp?.name:"Chưa cập nhật"}/>
      <InforText field="Quận/Huyện:" value={formData?.hoa_don_huyen?.name?formData?.hoa_don_huyen?.name:"Chưa cập nhật"}/>
      <InforText field="Phường/Xã:" value={formData?.hoa_don_xa?.name?formData?.hoa_don_xa?.name:"Chưa cập nhật"}/>
      <InforText field="Số nhà, đường phố:" value={formData?.so_nha_duong_pho?formData?.so_nha_duong_pho:"Chưa cập nhật"}/>
      <InforText field="Mã vùng:" value={formData?.ma_vung_hoa_don?formData?.ma_vung_hoa_don:"Chưa cập nhật"}/>
      <InforText field="Địa chỉ đơn hàng:" value={formData?.ship_invoice_address?formData?.ship_invoice_address:"Chưa cập nhật"}/>

      <InforText field="Địa chỉ email nhận hóa đơn (email):" value={formData?.bill_invoice_address_email?formData?.bill_invoice_address_email:"Chưa cập nhật"}/>
    </div>
  );
}
