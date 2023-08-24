/* eslint-disable react/jsx-no-duplicate-props */



import React from "react";
import styles from "./SecondBlock.module.css";

const SecondBlock: React.FC<any> = ({ listCardSecond }) => {
  
  const ListData = listCardSecond?.data.map((item, index) => {
    return (
        <tr key={item.id} className={`${styles.tr}`}>
          <td> TTD{item.id}</td>
          <td>{item.sohoso}</td>
          <td>{item.henphongvan}</td>
          <td>{item.quaphongvan}</td>
          <td>{item.huyphongvan}</td>
        </tr>
    );
  });
  return <>{ListData}</>;
};

export default SecondBlock;
