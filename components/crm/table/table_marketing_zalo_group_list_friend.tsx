"use client";
import React, { useEffect, useState } from "react";
import styles from "../marketing/zalo/group/group.module.css";
import GroupZaloUserTable from "../marketing/zalo/group/group_table_user_image";


export default function TableZaloGroupListFriend () {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [allItem, setAllItem] = useState<any>([]);

  useEffect(() => {}, [isCheckedAll]);

  const handleCheckSingle = (index: number) => {
    let currentNumber = allItem.indexOf(index);
    if (currentNumber !== -1) {
      setAllItem(allItem.filter((item: any) => item !== index));
      setIsCheckedAll(false);
    } else {
      if (allItem.length + 1 === 10) {
        setIsCheckedAll(true);
      }
      setAllItem([...allItem, index]);
    }
  };

  const handleCheckAll = () => {
    if (!isCheckedAll) {
      setIsCheckedAll(true);
      let arrayCheck = [];
      for (let i = 0; i < 105; i++) {
        arrayCheck.push(i);
      }
      setAllItem(arrayCheck);
    } else {
      setAllItem([]);
      setIsCheckedAll(false);
    }
  };
  return (
    <div id={styles.list__friend} className={styles.container }>
      <div className={styles.scroller}>
        <div className={styles.content}>
          <div className={styles.custom_table}>
            {/* header */}
            <div className={styles.header__table}>
              <span className={styles.header__table_one}>
                STT
              </span>
              <span className={styles.header__table_two}>
                Name
              </span>
              <div className={styles.header__table_three}>
                <input
                  className={styles.custom_input}
                  type="checkbox"
                  onChange={handleCheckAll}
                  checked={isCheckedAll}
                />
              </div>
            </div>
            {[...Array(105)].map((_, index) => (
              <div className={styles.item}>
                <div className={styles.item_index}>{index + 1 > 9 ? index + 1 : `0${index + 1}`}</div>
                <div className={styles.item_name}>
                  <GroupZaloUserTable linkUser="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg" nameUser="Nguyen Thi Kim Phuong"/>
                </div>
                <div className={styles.item_input}>
                  <input
                    className={styles.custom_input}
                    type="checkbox"
                    checked={allItem.includes(index)}
                    onChange={() => handleCheckSingle(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
