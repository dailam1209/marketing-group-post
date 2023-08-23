import React, { useState } from "react";
import styles from "./Box_app.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSelectedElement } from "@/actions/actions";
interface ItemPropose {
  id: number;
  title?: string;
  desc?: string;
}

interface ListBoxs {
  listboxs?: ItemPropose[];
}
const Box_app: React.FC<ListBoxs> = ({ listboxs }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [detail, setDetail] = useState(0);

  const handleItemHover = (item: any) => {
    setActiveItem(item);
  };
  const dispatch = useDispatch();

  const handleElementClick = (elementId: number) => {
    dispatch(setSelectedElement(elementId));
  };
  const ListBoxs = listboxs?.map((item, index) => {
    
    return (
      <div
        className={`${styles.item} `}
        key={index}
        onMouseEnter={() => handleItemHover(item.id)}
        onMouseLeave={() => setActiveItem(null)}
      >
        <div className={styles.content_item}>
          <div className={styles.div_img}>
            <Image
              src={"/icon/create_propose/vanthu.png"}
              width={50}
              height={50}
              alt="Create đề xuất"
            />
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.desc}>{item.desc}</p>
          </div>
          <div className={styles.box_right}>
            <div
              className={`${styles.div_img_right} ${
                activeItem === item.id ? styles.active : ""
              }`}
            >
              <Image
                src={"/icon/create_propose/star.png"}
                width={50}
                height={50}
                alt="Create đề xuất"
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.content_last} `}
          style={{ display: `${activeItem === item.id ? "flex" : "none"}` }}
        >
          <button
            className={styles.btn_last}
            onClick={() => {
              setDetail(item.id);
              handleElementClick(item.id);
            }}
          >
            <Image
              src={"/icon/create_propose/add.png"}
              width={50}
              height={50}
              alt="Create đề xuất"
            />
            <span className={styles.create_new}>Tạo đề xuất</span>
          </button>
        </div>
      </div>
    );
  });
  return <>{ListBoxs}</>;
};

export default Box_app;
