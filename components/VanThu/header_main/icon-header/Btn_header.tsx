"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Btn_header.module.css";
interface ChildComponentProps {
  image: string;
  content: string;
  num_noti?: number;
  id: number;
  isActive: boolean;
  onClick: (id: number) => void;
}
const Btn_header: React.FC<ChildComponentProps> = (props) => {
  const handleClick = () => {
    props.onClick(props.id);
  };
  return (
    <button
      className={`${styles.icon} ${props.id === 1 ? styles.l_m_10 : ""}`}
      onClick={handleClick}
    >
      <Image
        src={props.image}
        className={`${styles.img_icon}`}
        width={50}
        height={50}
        alt="icon"
      />
      {props?.num_noti && (
        <div className={`${styles.num_message}`}>{props.num_noti}</div>
      )}

      {props.isActive && (
        <div
          className={`${styles.block_icon} ${
            props.id === 1 ? styles.block_icon_message : ""
          }`}
        >
          <div className={`${styles.div_title_icon}`}>
            <p className={`${styles.text_title}`}>{props.content}</p>
          </div>
          {props.id === 1 ? (
            <div className={styles.block_message}>
              <Image
                src={"/icon/icon_search.png"}
                width={50}
                height={50}
                alt="Avatar"
              />
              <input
                className={styles.input_search}
                type="text"
                placeholder="Tìm kiếm"
              />
            </div>
          ) : (
            <ul className={`${styles.block_content_icon}`}></ul>
          )}
        </div>
      )}
    </button>
  );
};

export default Btn_header;
