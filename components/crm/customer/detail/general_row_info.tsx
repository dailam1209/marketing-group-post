import styles from "../customer.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText(formData: any) {
  const listCustomer = formData.formData;

  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã khách hàng:" value={listCustomer?.cus_id} />
      <InforText field="Tên khách hàng:" value={listCustomer?.name} />
      <InforText field="Tên viết tắt:" value={listCustomer?.stand_name} />
      <InforText field="Mã số thuế:" value={listCustomer?.tax_code} />
      <InforText field="Điện thoại:" value={listCustomer?.phone} />
      <InforText field="Email:" value={listCustomer?.phone} />
      <InforText field="Nguồn khách hàng:" value={listCustomer?.phone} />
      <InforText field="Phân loại khách hàng:" value={listCustomer?.phone} />
      <InforText field="Lĩnh vực:" value={listCustomer?.phone} />
      <InforText field="Loại hình:" value={listCustomer?.phone} />
      <InforText field="Ngành nghề:" value={listCustomer?.description} />
      <InforText field="Nhóm khách hàng:" value={listCustomer?.group_id} />
      <InforText field="Tình trạng khách hàng:" value={listCustomer?.phone} />
      <InforText field="Nhân viên phụ trách:" value={listCustomer?.phone} />
    </div>
  );
}
