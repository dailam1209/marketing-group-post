"use client";
import React, { useState, createContext } from "react";

import styles from "./Sub_menu.module.css";
import Link from "next/link";
interface MenuItem {
  id: number;
  title: string;
  image: string;
  href: string;
  content: string;
  subMenuItems?: MenuItem[];
}

interface MenuProps {
  menuItems: MenuItem[];
  activeAcc: boolean;
}

export const Menu2: React.FC<MenuProps> = ({ menuItems, activeAcc }) => {
  const [check, setCheck] = useState(false);
  const [active, setActive] = useState(0);
  // console.log(activeAcc);
  return (
    <>
      <ul className={`${styles.ul_item_sidebar}`}>
        {menuItems.map((menuItem) => {
          return (
            <Link
              href={menuItem.href}
              key={menuItem.id}
              className={`${styles.a_item_sidebar}`}
              replace
            >
              <li
                onClick={() => {
                  if (active === menuItem.id) {
                    setCheck(true);
                    // setActive(0);
                  } else {
                    setCheck(false);
                    setActive(menuItem.id);
                  }
                }}
                className={`${styles.li_item_sidebar} ${
                  activeAcc && active === menuItem.id ? styles.active : ""
                }`}
              >
                <p>{menuItem.content}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
