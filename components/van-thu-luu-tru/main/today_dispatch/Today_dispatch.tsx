import styles from "./today_dispatch.module.scss";
import React from "react";
import Box_element from "./box_element/Box_element";
import { listTemps_Admin } from "./box_element/Array_boxs";
import Box_element_right from "./box_element/Box_element_right";
interface ItemTemp {
  id: number;
  num: number;
  nametemp: string;
  temp: number;
}

interface ArrayTemps {
  vanbancanduyetStaff?: number;
  tempStaff?: number;
  dataArray?: ItemTemp[]; // Kiểu dữ liệu của mảng là string
}
const Today_dispatch: React.FC<ArrayTemps> = ({
  dataArray,
  vanbancanduyetStaff,
  tempStaff,
}) => {
  let storedData;
  if (typeof window !== "undefined") {
    storedData = sessionStorage.getItem("layout");
  }

  let ListItems = dataArray?.map((item, index) => {
    return (
      <Box_element
        element_number={item.num}
        name_box={item.nametemp}
        temp={item.temp}
        key={index}
      />
    );
  });

  return (
    <>
      <h3 className={`${styles.title}`}>Hôm nay</h3>
      <div className={`${styles.container_list}`}>
        {/* list left */}
        <div className={`${styles.list_box_right}`}>
          <div className={`${styles.div_block_list_box}`}>{ListItems}</div>
        </div>
        {/* right */}
        {storedData === "user" ? (
          <Box_element_right
            element_number={vanbancanduyetStaff}
            temp={tempStaff}
          />
        ) : (
          <Box_element_right element_number={6} temp={100} />
        )}
      </div>
    </>
  );
};
export default Today_dispatch;
