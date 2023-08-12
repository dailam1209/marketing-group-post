
  
  
  import React from "react";
  import styles from "./ThirdBlock.module.css";
  
  const ThirdBlock: React.FC<any> = ({ listCardThird }) => {
    const ListData = listCardThird?.map((item, index) => {
      return (
       
          <tr key={item._id} className={`${styles.tr}`}>
            <td>{index + 1}</td>
            <td>{item.nameHr}</td>
            <td>{item.total}</td>
            <td>{item.total}</td>
          </tr>
       
      );
    });
    return <>{ListData}</>;
  };
  
  export default ThirdBlock;
  