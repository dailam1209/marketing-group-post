/* eslint-disable react/jsx-no-duplicate-props */



import React from "react";
import styles from "./SecondBlock.module.css";

const SecondBlock: React.FC<any> = ({ listCardSecond }) => {
  
  const ListData = listCardSecond?.map((item, index) => {
    return (
        <tr key={item.id} className={`${styles.tr}`}>
          <td> TTD{item.id}</td>
          <td>{item.tongSoUngVien}</td>
          <td>{item.tongSoUngVienDenPhongVan}</td>
          <td>{item.tongSoUngVienNhanViec}</td>
          <td>{item.tongSoUngVienHuy}</td>
        </tr>
    );
  });
  return <>{ListData}</>;
};

export default SecondBlock;
