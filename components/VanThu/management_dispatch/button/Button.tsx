import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Button.module.css";
import ExcelDataExport from "@/utils/ExportExccel";

export function Btn_Add({ title }: any) {
  return (
    <div className={styles.box_add}>
      <div className={styles.box_btn}>
        <Image
          src={"/icon/management_dispatch/add.png"}
          width={22}
          height={22}
          alt=""
        />
        <p className={styles.box_title}>{title}</p>
      </div>
    </div>
  );
}
function convertEpochStringToDateString(epochTimestampString: string): string {
  const epochTimestamp = parseInt(epochTimestampString, 10);
  if (isNaN(epochTimestamp)) {
    return ""; // Trả về giá trị rỗng nếu chuỗi không hợp lệ
  }
  const date = new Date(epochTimestamp * 1000);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}
function htmlToPlainText(htmlString: any) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText || "";
}
export function Btn_Bot({ title, data, name_list }: any) {
  const arrayOfObjects: any[] = data;
  const [check, setCheck] = useState(true);
  useEffect(() => {
    if (name_list.includes("hop_dong")) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [check, name_list]);

  const arrayOfArrays: (string | number)[][] = [
    [
      "ID",
      check ? "Số hợp đồng" : "Số văn bản",
      check ? "Tên hợp đồng" : "Tên văn bản",
      "Sổ văn bản",
      "Trích yếu",
      "Ngày",
      "Nơi gửi",
      check ? "Tổng tiền" : "",
    ],
    ...arrayOfObjects?.map((item) => {
      const row = [
        item._id,
        item.cv_so,
        item.cv_name,
        item.cv_id_book,
        htmlToPlainText(item.cv_trich_yeu),
        convertEpochStringToDateString(item.cv_date),
        item.cv_phong_soan,
      ];
      if (item.cv_money !== undefined) {
        row.push(item.cv_money);
      }
      return row;
    }),
  ];
  // console.log(arrayOfArrays);
  return (
    <>
      {arrayOfArrays ? (
        <button
          onClick={() => ExcelDataExport(arrayOfArrays, name_list)}
          className={styles.btn_container}
        >
          <p className={styles.title}>{title}</p>
        </button>
      ) : (
        ""
      )}
    </>
  );
}
