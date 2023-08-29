import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";

export default function SelectBoxInputNguon({
  dataOption = {},
  title = "",
  placeholder = "",
  infoCus,
}: any) {
  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 3 },
    { name: "Zalo", id: 2},
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
  ];
  
  const name2 = ArrNguonKK.filter(item => item.id == infoCus?.resoure?.info)
  useEffect(() => {
  
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
        <option value="">{name2[0]?.name?name2[0]?.name:"Chưa cập nhật"}</option>
        {ArrNguonKK?.map((item: any, index: any) => (
          <option value={item?.id} key={index}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
}
