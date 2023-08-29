// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./campaign_detail.module.css";
import { useState } from "react";
import { Switch } from "antd";
import Link from "next/link";

import DelActionModal from "@/components/crm/order/order_action_modal/delete_action_mdal";

// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import { useRouter } from "next/router";

export default function AddButtonControl() {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <div className={`${styles.flex_1}`}>
              <Switch defaultChecked onChange={onChange} />
              &nbsp;Ẩn dữ liệu trống
            </div>
            <div className={styles.group_button}>
              <Link href={`/crm/campaign/edit/${id}`}>
                <button
                  type="button"
                  className={`${styles.btn_edit} flex_align_center`}
                >
                  <i className="bi bi-pencil-square"></i>
                  Chỉnh sửa
                </button>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDelOpen(true);
                  }}
                  className={`${styles.btn_delete} flex_align_center`}
                >
                  &nbsp;&nbsp;&nbsp;
                  <i className="bi bi-trash3"></i>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
    </div>
  );
}
