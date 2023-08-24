/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { format, parseISO } from "date-fns";

export default function DataCSNV({ list_employe_policy , dataCheckBox, localListCheck}) {
  const [listCheck, setListCheck] = useState<Array<any>>([]);
    const data = list_employe_policy?.data;

    const handleAdd = (id) => {
      if (!Array.isArray(listCheck)) {
        setListCheck([]);
        return;
      }
        const newListCheck = listCheck.includes(id)
          ? listCheck.filter((item) => item !== id)
          : [...listCheck, id];
      
        setListCheck(newListCheck);
        const checkBox = newListCheck.join(', ');
        const dataObject = {
            list_employe_policy: checkBox,
          };
    
        dataCheckBox(dataObject);
      };
      useEffect(() => {
        setListCheck(localListCheck.list_employe_policy || []);
      }, [localListCheck]);
  return (
    <table className={` ${styles.l_tr_show}`}>
      <tbody style={{ width: "100%" }}>
        {data?.map((item) => {
          const dateObj = parseISO(item.deleted_at);
          const formattedTime: string = format(dateObj, "HH:mm:ss dd/MM/yyyy");
          return (
            <div key={item.id} className={`${styles.show}`}>
              <th className={`${styles.show_id}`}>{`QTTD ${item.id}`}</th>
              <td className={`${styles.nameQTTD}`} style={{ display: "flex" }}>
                <picture>
                  <img src={`${"/icon_folder.svg"}`} alt=""></img>
                </picture>
                <p>{item.name}</p>
              </td>
              <td className={`${styles.date}`}>{item.time} {formattedTime}</td>
              <td className={`${styles.show_checkbox}`}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={`${styles.checkbox}`}
                  defaultValue={listCheck.includes(item.id) || localListCheck?.list_employe_policy}
                  checked={listCheck.includes(item.id) || localListCheck?.list_employe_policy}
                  onChange={() => handleAdd(item.id)}
                ></input>
              </td>
            </div>
          );
        })}
      </tbody>
    </table>
  );
}
