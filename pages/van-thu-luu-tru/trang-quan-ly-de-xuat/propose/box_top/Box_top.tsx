import React from "react";
import styles from "./Box_top.module.css";
import Link from "next/link";

interface ItemBoxTop {
  id: number;
  title: string;
  num: number;
  href: string;
  color?: string;
  progress?: number;
}
interface ListBoxs {
  listboxs?: ItemBoxTop[];
}
const Box_top_propose: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        {item.progress || item.progress === 0 ? (
          <>
            {" "}
            <h2 className={styles.num}>{item.num}</h2>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.success}>
              <p className={styles.temp}>Hoàn thành : {item.progress}%</p>
              <div
                className={styles.progress}
                style={{ background: "#C9CEF2" }}
              >
                <div
                  className={styles.progress_bar}
                  style={{ background: "#4C5BD4", width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href={item.href}>
              <h2 className={styles.num} style={{ color: `${item.color}` }}>
                {item.num}
              </h2>
              <p className={styles.title}>{item.title}</p>
            </Link>
          </>
        )}
      </div>
    );
  });
  return <>{ListBoxs}</>;
};

export default Box_top_propose;
