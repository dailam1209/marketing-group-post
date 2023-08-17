import styles from "./information.module.css";
import InforText from "./text_info";
export default function PotentialRowInforText() {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Chức danh:" value="937843" />
      <InforText field="Điện thoại cơ quan:" value="123123123" />
      <InforText field="Email cơ quan:" value="qưa@gmail.com" />
    </div>
  );
}
