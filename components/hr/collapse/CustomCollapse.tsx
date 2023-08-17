import React, { ReactNode, useState } from "react";
import { Collapse } from "antd";
import styles from "./CustomCollapse.module.css";
interface CustomCollapseProps {
  label: ReactNode;
  children: ReactNode;
}

const CustomCollapse: React.FC<CustomCollapseProps> = ({ label, children }) => { 

  return (
    <Collapse
      
      style={{ width: "100%", backgroundColor: "none", border: "none" }}
      expandIcon={() => <></>}
    >
      
        <Collapse.Panel key="panel" header={label}  
        >
          {children}
        </Collapse.Panel>
    
    </Collapse>
  );
};

export default CustomCollapse;
