import React, { useState } from "react";
import styles from "./Box_bot.module.css";
import Image from "next/image";

interface ListBoxs {
  listboxs?: any[];
  className?: string;
  activeAll?: boolean | number;
  activeItem?: number;
  onItemClick?: (itemId: number) => void;
}
//  Xử lý format ngày
const timeFormat = "hh, Ngày dd/MM/yyyy";
const dateFormat = "dd/MM/yyyy";
function convertUnixTimestamp(
  timestamp: number,
  timeFormat: string,
  dateFormat: string
): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const result = timeFormat
    .replace("hh", formattedTime)
    .replace("dd/MM/yyyy", formattedDate);

  return result;
}

export const Box_bot: React.FC<ListBoxs> = ({ listboxs }) => {
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_img}>
          <Image src={"/icon/img_l4.png"} width={50} height={50} alt="Avatar" />
        </div>
        <div className={styles.text_file_del}>
          <p className={styles.title}>{item.cv_name}</p>
          <p className={styles.num_dispatch}>
            Số văn bản:&nbsp;
            <span className={styles.num}>{item.cv_so}</span>
          </p>
          <p className={styles.time}>
            {" "}
            {convertUnixTimestamp(item?.cv_time_xoa, timeFormat, dateFormat)}
          </p>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};

export const Box_bot_data_del: React.FC<ListBoxs> = ({
  listboxs,
  className,
  activeAll,
  onItemClick,
  activeItem,
}) => {
  const [items, setItems] = useState<number[]>([]);
  const handleItemClick = (item: number) => {
    if (onItemClick) {
      onItemClick(item);
    }
    const itemIndex = items.indexOf(item);
    if (itemIndex === -1) {
      // Nếu phần tử chưa tồn tại trong mảng, thêm nó vào
      setItems([...items, item]);
    } else {
      // Nếu phần tử đã tồn tại trong mảng, xóa nó khỏi mảng
      const updatedItems = [...items];
      updatedItems.splice(itemIndex, 1);
      setItems(updatedItems);
    }
  };
  const ListBoxs = listboxs?.map((item, index) => {
    return (
      <div
        className={`${className ? styles.item : styles.item_class}  ${
          !activeAll || items.includes(item._id)
            ? styles.addBackGroundXam
            : styles.addBackGroundTrang
        }`}
        key={index}
        onClick={() => handleItemClick(item._id)}
      >
        <div className={styles.item_img}>
          <Image src={"/icon/img_l4.png"} width={50} height={50} alt="Avatar" />
        </div>
        <div className={styles.text_file_del}>
          <p
            className={className ? styles.title : styles.title_class}
            key={index}
          >
            {item.cv_name}
          </p>
          <p className={styles.num_dispatch}>
            Nguời xóa:&nbsp;
            <span className={styles.num} style={{ color: "#FFA800" }}>
              {item.cv_so}
            </span>
          </p>
          <p className={styles.time}>{/* {item.time}, {item.day} */}</p>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};
