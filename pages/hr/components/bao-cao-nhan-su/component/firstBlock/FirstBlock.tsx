interface ItemCard {
  id: number;
  color: string;
  num: any;
  title: string;
}

interface ListCard {
  listcard?: ItemCard[];
}
import React from "react";
import styles from "./FirstBlock.module.css";

const FirstBlock: React.FC<ListCard> = ({ listcard }) => {
    const ListCard = listcard?.map((item, index) => {
        return (
          <div key= {item.id} className={`${styles.t_tk_1} ${styles.item}`}
                style={{borderLeftColor: item.color}}
            >
            <p>{item.title}</p>
            <p>{item.num}</p>
          </div>
        );
      });
      return <>{ListCard}</>;
}

export default FirstBlock;