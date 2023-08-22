import { List, Modal } from "antd";
import styles from "./modal.module.css";
import { useEffect, useState } from "react";
import { fetch_shift } from "@/utils/api/dexuat/api_fetch";

export const ModalDetailsLLV = ({ open, setOpen, data, shiftType }:any) => {
  const [shift,setShift] = useState<any>();
  const month = data?.apply_month ? dates(new Date(data?.apply_month)) : null;
  function dates(current: any) {
    if(current?.toString() !== 'Invalid Date'){
      let month = new Array();
      let m = current.getMonth();
      current.setDate(current.getDate() - current.getDay());

      do {
        const date = new Date(current);
        date.setHours(7);
        month.push(date);
        current.setDate(current.getDate() + 1);
      } while (current.getMonth() <= m || current.getDay() != 0);

      return month;
    }
  }

  useEffect(()=>{
    const fetchdata = async () => {
          const token = sessionStorage.getItem("token");
          const response = await fetch_shift(token)
          setShift(response?.data.items)
    }
    fetchdata();
  },[])
  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString("default", { year: "numeric" });
    const month = date?.toLocaleString("default", { month: "2-digit" });
    const day = date?.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  const children = (
    <div>
      <List
        className={styles.list}
        header={
          <div className={styles.header}>
            <div className={styles.big}>
              <div className={styles.dayName}>Chủ nhật</div>
              <div className={styles.dayName}>Thứ hai</div>
              <div className={styles.dayName}>Thứ ba</div>
              <div className={styles.dayName}>Thứ tư</div>
              <div className={styles.dayName}>Thứ năm</div>
              <div className={styles.dayName}>Thứ sáu</div>
              <div className={styles.dayName}>Thứ bảy</div>
            </div>
            <div className={styles.small}>
              <div className={styles.dayName}>CN</div>
              <div className={styles.dayName}>T2</div>
              <div className={styles.dayName}>T3</div>
              <div className={styles.dayName}>T4</div>
              <div className={styles.dayName}>T5</div>
              <div className={styles.dayName}>T6</div>
              <div className={styles.dayName}>T7</div>
            </div>
          </div>
        }
        grid={{
          column: 7,
        }}
        dataSource={month?.map((d: any) => d)}
        renderItem={(item: any, index: number) => {
          // console.log(listCheck)
          // console.log(allCheck)
          return (
            <List.Item key={index} style={{marginBlockEnd : '0'}}>
              <div className={styles.tableDetailsLLVItem}>
                {item?.getMonth() ===
                  new Date(data?.apply_month)?.getMonth() && (
                  <div className={styles.itemWrapper}>
                    <p className={styles.dateNumber}>{item?.getDate()}</p>
                    {data?.cy_detail?.find(
                      (detail:any) => detail?.date === formatDate(item)
                    ) &&
                      data?.cy_detail
                        ?.find((detail:any) => detail?.date === formatDate(item))
                        ?.shift_id?.split(",")
                        ?.map((shiftItem:any, index:any) => (
                          <div key={index} className={styles.shiftItem}>
                            <p className={styles.shiftTxt}>
                              {shift?.filter((shiftData:any)=>shiftData.shift_id.toString() === shiftItem)[0].shift_name}
                            </p>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
      footer={null}
      className={`modalTableDetailsLLV ${styles.modalDetailsLLV}`}
    >
      <div className={`tableDetailsLLVScrollCus ${styles.tableDetailsLLV}`}>
        {children}
      </div>
    </Modal>
  );
};
