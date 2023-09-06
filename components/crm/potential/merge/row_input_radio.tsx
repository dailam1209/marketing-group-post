import { useEffect, useState } from "react";
import styles from "./merge.module.css";

export default function RowRadioInput({
  name,
  setSelectedData,
  selectedData,
  title,
  value = [],
}: any) {
  const [valueRadioBox, setValueRadioBox] = useState();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const handleChange = (item: any, index: number) => {
    setValueRadioBox(
      selectedData?.[name]?.filter((item) => item?.status)[0]?.val
    );

    console.log(selectedData?.[name]?.filter((item) => item?.status)[0]?.val);

    let newValues = selectedData?.[name];
    const newData = newValues?.map((item) => {});
    newValues?.splice(index, 1, {
      status: true,
      val: item.name,
    });

    setSelectedData((prev) => {
      return {
        ...prev,
        [name]: newValues,
      };
    });
  };
  return (
    <tr>
      <td>
        <p className={styles.column_title}>{title}</p>
      </td>
      <td>
        {selectedData?.[name]?.filter((item) => item?.status)[0]?.val ||
          valueRadioBox ||
          "Chua cap nhat"}
      </td>
      {value?.map((item, index) => {
        return (
          <td>
            <div className={styles.td_ct}>
              <input
                onChange={() => handleChange(item, index)}
                checked={selectedData?.[name]?.[index]?.status}
                name={name}
                type="radio"
                value={value[index]}
                className={styles.radio}
              />
              <p>{value[index]}</p>
            </div>
          </td>
        );
      })}
    </tr>
  );
}
