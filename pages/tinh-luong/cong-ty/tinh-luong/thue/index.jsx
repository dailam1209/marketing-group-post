import React from "react";
import { Tabs } from "antd";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import styles from "./index.module.css";
import Chinhsachthue from "./Chinhsachthue";
import Nhansuchuathietlap from "./Nhansuchuathietlap";
import Nhansudathietlap from "./Nhansudathietlap";

//tabs
const onChange = (key) => {
  console.log(key);
};
const itemTabs = [
  {
    key: "1",
    label: `Chính sách thuế`,
    children: <Chinhsachthue />,
  },
  {
    key: "2",
    label: `D/s nhân sự chưa thiết lập`,
    children: <Nhansuchuathietlap />,
  },
  {
    key: "3",
    label: `D/s nhân sự đã thiết lập`,
    children: <Nhansudathietlap />,
  },
  {
    key: "4",
    label: `Hướng dẫn`,
  },
];
const App = () => {
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Thuế" />
        </div>
        <div className={styles.content}>
          <Tabs defaultActiveKey="1" items={itemTabs} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
export default App;
