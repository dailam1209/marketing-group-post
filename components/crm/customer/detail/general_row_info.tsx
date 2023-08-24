import styles from "../customer.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText({formData}: any) {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã khách hàng:" value={formData?.cus_id} />
      <InforText field="Tên khách hàng:" value={formData?.name} />
      <InforText field="Tên viết tắt:" value={formData?.stand_name?.detail?formData?.stand_name?.detail:"Chưa cập nhật"} />
      <InforText field="Mã số thuế:" value={formData?.tax_code?formData?.tax_code:"Chưa cập nhật"} />
      <InforText field="Điện thoại:" value={formData?.phone_number?.info?formData?.phone_number?.info:"Chưa cập nhật"} />
      <InforText field="Email:" value={formData?.email?.info?formData?.email?.info:"Chưa cập nhật"} />
      <InforText field="Nguồn khách hàng:" value={formData?.resoure?.info?formData?.resoure?.info:"Chưa cập nhật"} />
      <InforText field="Phân loại khách hàng:" value={formData?.classify?.info?formData?.classify?.info:"Chưa cập nhật"} />
   <InforText field="Lĩnh vực:" value={formData?.business_type?.info?formData?.business_type?.info:"Chưa cập nhật"} /> 
      <InforText field="Loại hình:" value={formData?.loai_hinh_khach_hang?formData?.loai_hinh_khach_hang:"Chưa cập nhật"} />
      <InforText field="Ngành nghề:" value={formData?.business_type?.info?formData?.business_type?.info:"Chưa cập nhật"} />
      <InforText field="Nhóm khách hàng:" value={formData?.group_id?.detail?.gr_name?formData?.group_id?.detail?.gr_name:"Chưa cập nhật"} />
      <InforText field="Tình trạng khách hàng:" value={formData?.status?.detail?.stt_name?formData?.status?.detail?.stt_name:"Chưa cập nhật"} />
      <InforText field="Nhân viên phụ trách:" value={formData?.emp_id?.detail.userName?formData?.emp_id?.detail.userName:"Chưa cập nhật"} />
    </div>
  );
}
