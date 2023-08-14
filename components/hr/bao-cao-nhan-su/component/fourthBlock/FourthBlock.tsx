
  import React from "react";
  import styles from "./FourthBlock.module.css";
  
  const FourthBlock: React.FC<any> = ({ listCardFourth }) => {
    const ListData = listCardFourth?.map((item, index) => {
      return (
          <tr key={item._id} className={`${styles.tr}`}>
            <td>NV{item._id}</td>
            <td>{item.nameHr}</td>
            <td>{item.total}</td>
            
          </tr>
      );  
    });
    return <>{ListData}</>;
  };
  
  export default FourthBlock;
  