import React from "react";
import styles from "./Box_bot.module.css";
import Image from "next/image";

interface ItemBox {
  id: number;
  title: string;
  num_dispatch: string;
  time: string;
  day: string;
}
interface ListBoxs {
  listboxs?: ItemBox[];
}
export const Box_bot: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_img}>
          <Image src={"/icon/img_l4.png"} width={50} height={50} alt="Avatar" />
        </div>
        <div className={styles.text_file_del}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.num_dispatch}>
            Số văn bản:&nbsp;
            <span className={styles.num}>{item.num_dispatch}</span>
          </p>
          <p className={styles.time}>
            {item.time}, {item.day}
          </p>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};

export const Box_bot_data_del: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_img}>
          <Image src={"/icon/img_l4.png"} width={50} height={50} alt="Avatar" />
        </div>
        <div className={styles.text_file_del}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.num_dispatch}>
            Nguời xóa:&nbsp;
            <span className={styles.num} style={{ color: "#FFA800" }}>
              {item.num_dispatch}
            </span>
          </p>
          <p className={styles.time}>
            {item.time}, {item.day}
          </p>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};
