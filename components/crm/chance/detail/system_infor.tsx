import styles from "../chance.module.css";
import TextAndIconInfo from "./text_and_icon_infor";
import InforText from "./text_info";
export default function BonusInfoRow() {
  return (
    <div className={styles.row_input_text}>
      <TextAndIconInfo
        field="Người tạo:"
        src="/crm/user_kh.png"
      />
      <InforText field="Ngày tạo:" value="12/12/2024" />
      <TextAndIconInfo
        field="Người sửa:"
        src="/crm/user_kh.png"
      />
      <InforText field="Ngày sửa:" value="26/07/2023" />
      <TextAndIconInfo
        field="Dùng chung:"
        src="/crm/dungchung_kh.svg"
      />
    </div>
  );
}
