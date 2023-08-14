/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { format, parseISO } from "date-fns";

export default function DataVTCV({ list_job_desc, dataCheckBox, localListCheck }) {
  const [listCheck, setListCheck] = useState<any>([]);
  const data = list_job_desc?.data;

  const handleAdd = (id) => {
    const newListCheck = listCheck.includes(id)
      ? listCheck.filter((item) => item !== id)
      : [...listCheck, id];

    setListCheck(newListCheck);
    const checkBox = newListCheck.join(', ');
    const dataObject = {
      list_job_desc: checkBox,
    };

    dataCheckBox(dataObject);
  };
  useEffect(() => {
    setListCheck(localListCheck.list_job_desc || []);
  }, [localListCheck]);
  return (
    <table className={` ${styles.l_tr_show}`}>
      <tbody style={{ width: "100%" }}>
        {data?.map((item) => {
          const dateObj = parseISO(item.deletedAt);
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
              <td className={`${styles.date}`}>{formattedTime}</td>
              <td className={`${styles.show_checkbox}`}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={`${styles.checkbox}`}
                  defaultValue={listCheck.includes(item.id) || localListCheck?.list_job_desc}
                  checked={listCheck.includes(item.id) || localListCheck?.list_job_desc}
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
