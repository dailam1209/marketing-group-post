import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";
import { GetStaticPaths } from "next"; 
export async function getStaticPaths() {
  // ... your code here ...
}
export default function SelectBoxInput({
  title = "",
  placeholder = "",
  infoCus,
}: any) {
  const [listStatus, setLisStatus] = useState([]);
  const getStatus = async () => {
    const res = await fetch(`${base_url}/api/crm/customerStatus/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ phone: `${+infoCus?.dien_thoai}` }),
    });
    const data = await res.json();
    setLisStatus(data?.data);
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={styles.lbl_title}>{title}</label>
      <select
        id="form_business_assistant_group_parent"
        className={`${styles.select2} ${styles.business_assistant_item_select} ${styles.select2_hidden_accessible}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{infoCus?.status?.detail?.stt_name}</option>
        {listStatus?.map((item: any, index: any) => (
          <option value={item?.stt_id} key={index}>
            {item?.stt_name}
          </option>
        ))}
      </select>
    </div>
  );
}
