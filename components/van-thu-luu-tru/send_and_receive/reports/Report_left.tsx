import React from "react";
import styles from "./Report.module.css";
import Image from "next/image";
import Link from "next/link";

const Report_left = ({ children, href_back, title }: any) => {
  return (
    <div className={styles.wrapper_left}>
      <div className={styles.header_title_left}>
        <Link href={href_back} className={styles.a_title}>
          <Image src={"/icon/arr-l-white.png"} height={30} width={15} alt="" />
        </Link>
        <h1 className={styles.title_left}> {title}</h1>
      </div>
      <div className={styles.box_left_detail}>{children}</div>
    </div>
  );
};

export default Report_left;
