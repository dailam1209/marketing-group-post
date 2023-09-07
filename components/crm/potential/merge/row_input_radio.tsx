import { useEffect, useState } from "react";
import styles from "./merge.module.css";

export default function RowRadioInput({
  name,
  setSelectedData,
  selectedData,
  title,
  value = [],
}: any) {
  const [valueRadioBox, setValueRadioBox] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const handleChange = (item: any, index: number) => {
    let newValues = selectedData?.[name];
    let newData: any = newValues?.map((item) => {
      return {
        ...item,
        status: false,
      };
    });

    newData.splice(index, 1, {
      status: true,
      val: newData[index]?.val,
    });

    // console.log("----", newData);

    const test = { ...selectedData, [name]: newData };
    console.log("test", test?.[name]?.filter((item) => item?.status)[0]);
    setValueRadioBox(test?.[name]?.filter((item) => item?.status)[0]?.val);

    setSelectedData((prev) => {
      return {
        ...prev,
        [name]: newData,
      };
    });
    setSelectedData(test);

    // console.log(selectedData);
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
