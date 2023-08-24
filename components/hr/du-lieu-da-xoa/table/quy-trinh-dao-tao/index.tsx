/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { format, parseISO } from "date-fns";

export default function DataQTDT({ list_training_process , dataCheckBox, localListCheck, listItemCheck}) {
  const [listCheck, setListCheck] = useState<any>([]);
  const data = list_training_process?.data;

  const handleAdd = (id) => {
    const newListCheck = listCheck.includes(id)
      ? listCheck.filter((item) => item !== id)
      : [...listCheck, id];
  
    setListCheck(newListCheck);
    const checkBox = newListCheck.join(', ');
    const dataObject = {
      list_training_process: checkBox,
      };

    dataCheckBox(dataObject);
  };
  useEffect(() => {
    setListCheck(localListCheck.list_training_process || []);
  }, [localListCheck]);
  return (
    <thead className={` ${styles.l_tr_show}`}>
      <tbody style={{ width: "100%" }}>
        {data?.map((item) => {
          const dateObj = parseISO(item.deleted_at);
          const formattedTime: string = format(dateObj, "HH:mm:ss dd/MM/yyyy");
          return (
            <tr key={item.id} className={styles.show}>
              <th className={styles.show_id}>{`QTTD ${item.id}`}</th>
              <td className={styles.nameQTTD} style={{ display: "flex" }}>
                <picture>
                  <img src={"/icon_folder.svg"} alt=""></img>
                </picture>
                <p>{item.name}</p>
              </td>
              <td className={styles.date}>{item.time} {formattedTime}</td>
              <td className={styles.show_checkbox}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={styles.checkbox}
                  defaultValue={listCheck.includes(item.id) || localListCheck?.list_training_process}
                  checked={listCheck.includes(item.id) || localListCheck?.list_training_process}
                  onChange={() => handleAdd(item.id)}
                ></input>
              </td>
            </tr>
          );
        })}
      </tbody>
    </thead>
  );
}
