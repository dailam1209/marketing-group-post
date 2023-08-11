import Image from "next/image"
import React from "react"
import styles from "./article.module.css"
import { Button } from "antd"

export default function Article({ className }: { className: string }) {
  return (
    <>
      <div className={className}>
        <Image
          alt="/"
          src={"/ai.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <p className={styles.tieuDe}>Cách tính Bảo hiểm Xã hội một lần</p>
        <p className={styles.noiDung}>
          Dựa trên Khoản 4, Điều 19, Thông tư 59/2015/TT-BLĐTBXH quy định trợ cấp BHXH một lần được chi trả dựa trên 
          thời gian người lao động tham gia BHXH và mức bình quân tiền lương (MBQTL) tháng đóng BHXH.Dựa trên Khoản 4, 
          Điều 19, Thông tư 59/2015/TT-BLĐTBXH quy định trợ cấp BHXH một lần được chi trả dựa trên thời gian người lao 
          động tham gia BHXH và mức bình quân tiền lương (MBQTL) tháng đóng BHXH.Dựa trên Khoản 4, Điều 19, Thông tư 
          59/2015/TT-BLĐTBXH quy định trợ cấp BHXH một lần được chi trả dựa trên thời gian người lao động tham gia BHXH 
          và mức bình quân tiền lương (MBQTL) tháng đóng BHXH.Dựa trên Khoản 4, Điều 19, Thông tư 59/2015/TT-BLĐTBXH 
          quy định trợ cấp BHXH một lần được chi trả dựa trên thời gian người lao động
        </p>
      </div>
    </>
  )
}
