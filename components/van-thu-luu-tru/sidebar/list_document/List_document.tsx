"use client";
import React, { useState } from "react";
import styles from "./List_document.module.css";
import Image from "next/image";
import { Menu2 } from "./sub_menu/Sub_menu";

interface MenuItem {
  id: number;
  title: string;
  image: string;
  href: string;
  content: string;
  subMenuItems?: MenuItem[];
  // sendDataToParent: (data: string) => void;
}

interface MenuProps {
  menuItems: MenuItem[];
  sendDataToParent: (data: boolean) => void;
  activeAcc: boolean;
}
export const List_document: React.FC<MenuProps> = ({
  menuItems,
  sendDataToParent,
  activeAcc,
}) => {
  const [toggleAccordion, setToggleAccordion] = useState(0);
  const data = true;
  const handleActive = () => {
    sendDataToParent(data);
  };

  const show_accordion = menuItems.map((menuItem, index) => {
    return (
      <li key={index} onClick={handleActive}>
        <div
          className={`${styles.block_document} position_r`}
          onClick={() => {
            if (toggleAccordion === menuItem.id) {
              setToggleAccordion(0);
            } else {
              setToggleAccordion(menuItem.id);
            }
          }}
        >
          <Image
            src={`/icon/${menuItem.image}.png`}
            width={50}
            height={50}
            alt="Avatar"
            className={`${styles.img}`}
          />
          <p>{menuItem.title}</p>
          <Image
            src={"/icon/soxuong.png"}
            width={50}
            height={50}
            alt="Avatar"
            className={`${styles.img_down} ${
              activeAcc && toggleAccordion === menuItem.id ? styles.img_top : ""
            } `}
          />
        </div>
        <div
          className={`${styles.sub_menu} ${
            activeAcc && toggleAccordion === menuItem.id
              ? styles.sub_menu_active
              : ""
          } `}
        >
          {menuItem.subMenuItems && menuItem.subMenuItems.length > 0 && (
            <Menu2 menuItems={menuItem.subMenuItems} activeAcc={activeAcc} />
          )}
        </div>
      </li>
    );
  });

  return <div>{show_accordion}</div>;
};
