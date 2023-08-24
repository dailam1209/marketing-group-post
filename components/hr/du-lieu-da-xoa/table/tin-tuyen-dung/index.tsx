/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import { format, parseISO } from "date-fns";

export default function DataTTD({ list_recuitment_new, dataCheckBox,localListCheck }) {
  const [listCheck, setListCheck] = useState<Array<any>>([]);
    const data = list_recuitment_new?.data;

  const handleAdd = (id) => {
    if (!Array.isArray(listCheck)) {
      setListCheck([]);
      return;
    }
    const newListCheck = listCheck?.includes(id)
      ? listCheck.filter((item) => item !== id)
      : [...listCheck, id];

    setListCheck(newListCheck)
    const checkBox = newListCheck.join(', ');

    const dataObject = {
      list_recuitment_new: checkBox,
    };

    dataCheckBox(dataObject);
  };
  useEffect(() => {
    setListCheck(localListCheck.list_recuitment || []);
  }, [localListCheck]);
  return (
    <table className={` ${styles.l_tr_show}`}>
      <tbody style={{ width: "100%" }}>
        {data?.map((item) => {
          const dateObj = parseISO(item.deleted_at);
          const formattedTime: string = format(dateObj, " dd/MM/yyyy");
          return (
            <div key={item.id} className={`${styles.show}`}>
              <th className={`${styles.show_id}`}>{`QTTD ${item.id}`}</th>
              <td className={`${styles.nameQTTD}`} style={{ display: "flex" }}>
                <picture>
                  <img src={`${"/icon_folder.svg"}`} alt=""></img>
                </picture>
                <p>{item.title}</p>
              </td>
              <td className={`${styles.date}`}>{item.time} {formattedTime}</td>
              <td className={`${styles.show_checkbox}`}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={`${styles.checkbox}`}
                  checked={listCheck.includes(item.id) || localListCheck?.list_recuitment_new}
                  defaultValue={listCheck.includes(item.id) || localListCheck?.list_recuitment_new}
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
