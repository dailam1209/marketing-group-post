import Link from "next/link";
import styles from "./Sidebar_btn.module.css";
import React, { useContext, useState } from "react";
import Image from "next/image";
interface Sidebar_btnProps {
  href: string;
  image: string;
  title: string;
  active?: boolean;
  sendDataToParent: (data: boolean) => void;
}

const Sidebar_btn = (props: Sidebar_btnProps) => {
  // console.log(props.active);
  const handleActive = () => {
    const data = false;
    props.sendDataToParent(data);
  };
  return (
    <Link
      className={`${styles.link_sidebar} ${props.active ? "" : styles.active}`}
      href={props.href}
      onClick={handleActive}
    >
      <Image src={`/icon/${props.image}`} width={50} height={50} alt="Avatar" />
      <p className={`${styles.title}`}>{props.title}</p>
    </Link>
  );
};

export default Sidebar_btn;
