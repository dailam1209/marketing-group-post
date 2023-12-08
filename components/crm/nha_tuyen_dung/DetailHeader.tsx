import React, { useContext, useState } from "react";
import styles from "@/components/crm/nha_tuyen_dung/detailNTD.module.css";
import Image from "next/image";
import { useDataContainer } from "../context/dataContainer";
export default function DetailHeader() {
  const { dataContainer } = useContext(useDataContainer);
  const [avatarNTD, setAvatarNTD] = useState(dataContainer.avatar);
  return (
    <div className={styles.header_detail_NTD}>
      <div className={styles.header_detail_container}>
        <div className={styles.header_detail_infor_container}>
          <Image
            src={avatarNTD}
            height={110}
            width={110}
            onError={() => setAvatarNTD("/crm/User_circle.png")}
            alt="/"
            style={{ borderRadius: "50%" }}
          />

          <div className={styles.header_detail_infor}>
            <p className={styles.company_name}>Tên Công ty</p>
            <div>
              {/* Máy trường này lấy từ dataContainer ra nhé */}
              <p className={styles.header_infor}>
                Truờng nào đó: <span>Chi tiết trường nào đó</span>
              </p>

              <p className={styles.header_infor}>
                Truờng nào đó: <span>Chi tiết trường nào đó</span>
              </p>
              <p className={styles.header_infor}>
                Truờng nào đó: <span>Chi tiết trường nào đó</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <Image src={"/crm/phone.svg"} height={50} width={50} alt="phone" />
        </div>
      </div>
    </div>
  );
}
