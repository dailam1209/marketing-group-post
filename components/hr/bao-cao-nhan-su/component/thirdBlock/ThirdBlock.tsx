
  
  
  import React from "react";
  import styles from "./ThirdBlock.module.css";
  
  const ThirdBlock: React.FC<any> = ({ listCardThird, total }) => {
    const ListData = listCardThird?.data?.map((item, index) => {
      return (
       
          <tr key={item._id} className={`${styles.tr}`}>
            <td>{(total - 1)* 10  + index + 1}</td>
            <td>{item.hr_name}</td>
            <td>{item.sotintheodoi}</td>
            <td>{item.sotintheodoi}</td>
          </tr>
       
      );
    });
    return <>{ListData}</>;
  };
  
  export default ThirdBlock;
  