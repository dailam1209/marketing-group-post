import Image from "next/image"
import React from "react"
import styles from "./article.module.css"

export default function Article() {
  return (
    <div>
      <Image
        alt="/"
        src={"/ai.png"}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Image
        alt="/"
        src={"/article.png"}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className={styles.moreBtn}>
        <span className={styles.text}>Xem thêm</span>
      </div>
    </div>
  )
}
