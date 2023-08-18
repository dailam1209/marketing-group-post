interface ItemBox {
  id: number;
  image: React.ReactNode;
  num: number;
  src?: string;
  color: string;
  title: string;
}
interface ListBoxs {
  listboxs?: ItemBox[];
}
import React from "react";
import styles from "./Box_top.module.css";
import Image from "next/image";
import Link from "next/link";

export const Box_top: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_img}>{item.image}</div>
        <div className={styles.item_info}>
          <p className={styles.num} style={{ color: item.color }}>
            {item.num}
          </p>
          <p className={styles.name}>{item.title}</p>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};
export const Box_top_data_del: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item2} key={index}>
        <div className={styles.container_item}>
          <div className={styles.item_img}>
          <Image src={`/icon/${item.src}`} width={50} height={50} alt="" />
          </div>
          <div className={styles.item_info}>
            <p className={styles.num} style={{ color: "#76B51B" }}>
              {item.num}
            </p>
            <p className={styles.name}>{item.title} </p>
          </div>
        </div>
        <Link 
          href={`/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/${item.id}`}
          className={styles.link_ct}
        >
          Xem chi tiết
        </Link>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};
