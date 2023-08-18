import React from "react";
import styles from "./box_right.module.css";
import Image from "next/image";
import Link from "next/link";

const Box_top_right = ({ children, href }: any) => {
  return (
    <div className={styles.box_top_right}>
      <Image src={"/icon/shell-green.png"} height={30} width={15} alt="" />
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default Box_top_right;
