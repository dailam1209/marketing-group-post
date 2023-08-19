import styles from "../customer.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText({formData}: any) {
console.log("check ma",formData.nguoi_tao)
  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã khách hàng:" value={formData?.ma_khach_hang} />
      <InforText field="Tên khách hàng:" value={formData?.ten_khach_hang} />
      <InforText field="Tên viết tắt:" value={formData?.ten_viet_tat?formData?.ten_viet_tat:"Chưa cập nhật"} />
      <InforText field="Mã số thuế:" value={formData?.ma_so_thue?formData?.ma_so_thue:"Chưa cập nhật"} />
      <InforText field="Điện thoại:" value={formData?.dien_thoai?formData?.dien_thoai:"Chưa cập nhật"} />
      <InforText field="Email:" value={formData?.email?formData?.email:"Chưa cập nhật"} />
      <InforText field="Nguồn khách hàng:" value={formData?.resoure?formData?.resoure:"Chưa cập nhật"} />
      <InforText field="Phân loại khách hàng:" value={formData?.phan_loai_khach_hang?formData?.phan_loai_khach_hang:"Chưa cập nhật"} />
      <InforText field="Lĩnh vực:" value={formData?.linh_vuc?formData?.linh_vuc:"Chưa cập nhật"} />
      <InforText field="Loại hình:" value={formData?.loai_hinh?formData?.loai_hinh:"Chưa cập nhật"} />
      <InforText field="Ngành nghề:" value={formData?.nganh_nghe?formData?.nganh_nghe:"Chưa cập nhật"} />
      <InforText field="Nhóm khách hàng:" value={formData?.nhom_khach_hang?formData?.nhom_khach_hang:"Chưa cập nhật"} />
      <InforText field="Tình trạng khách hàng:" value={formData?.dien_thoai?formData?.dien_thoai:"Chưa cập nhật"} />
      <InforText field="Nhân viên phụ trách:" value={formData?.dien_thoai?formData?.dien_thoai:"Chưa cập nhật"} />
    </div>
  );
}
