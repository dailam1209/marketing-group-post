import React from "react";
import { Tabs } from "antd";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import styles from "./index.module.css";
import Cackhoantienkhac from "./Cackhoantienkhac";
import Nhansudathietlap from "./Nhansudathietlap";

//tabs
const onChange = (key) => {
  console.log(key);
};
const itemTabs = [
  {
    key: "1",
    label: `Các khoản tiền khác`,
    children: <Cackhoantienkhac />,
  },
  {
    key: "2",
    label: `D/s nhân viên áp dụng`,
    children: <Nhansudathietlap />,
  },
];
const App = () => {
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Các khoản tiền khác" />
        </div>
        <div className={styles.content}>
          <Tabs defaultActiveKey="1" items={itemTabs} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
export default App;
