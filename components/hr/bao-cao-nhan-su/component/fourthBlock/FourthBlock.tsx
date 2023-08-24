
  import React from "react";
  import styles from "./FourthBlock.module.css";
  
  const FourthBlock: React.FC<any> = ({ listCardFourth }) => {
    const ListData = listCardFourth?.data?.map((item, index) => {
      return (
          <tr key={index} className={`${styles.tr}`}>
            <td>NV{item.user_recommend}</td>
            <td>{item.hr_name_full}</td>
            <td>{item.soungvien}</td>
            
          </tr>
      );  
    });
    return <>{ListData}</>;
  };
  
  export default FourthBlock;
  