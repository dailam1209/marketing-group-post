import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import styles from "./set_up_role.module.css";
import stylePotential from "../potential/potential.module.css"

export default function StaffData() {
  return (
    <div className={styles.content_info}>
      <div className={styles.infor_item}>
        <div className={styles.text}>Nhân viên</div>
        <div className={stylePotential.select_role_staff}>
          <PotentialSelectBoxStep
            value="(147314) Phùng Việt Kha"
            placeholder="(147314) Phùng Việt Kha"
          />
        </div>
      </div>
    </div>
  );
}
