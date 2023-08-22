import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";

export default function SelectBoxInputNhomKh({
  title = "",
  infoCus
}: any) {
  console.log("checks",infoCus)

    const [value,setValue] = useState()
  const [listGr,setListGr] = useState([])
  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setListGr(data?.data?.showGr);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(()=>{handleGetGr()},[])
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={styles.lbl_title}>{title}</label>
      <select
        id="form_business_assistant_group_parent"
        className={`${styles.select2} ${styles.business_assistant_item_select} ${styles.select2_hidden_accessible}`}
        // tabIndex={-1}
        aria-hidden="true"
        defaultValue={infoCus.group_id}
        value={value}
        onChange={(value:any) => setValue(value)}

      >
        {listGr?.map((item: any, index: any) => (
          <option value={item?.gr_id} key={index}>
            {item?.gr_name}
          </option>
        ))}
      </select>
    </div>
  );
}
