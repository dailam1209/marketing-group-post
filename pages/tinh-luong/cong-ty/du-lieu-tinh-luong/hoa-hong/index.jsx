import React from "react";
import { Tabs } from "antd";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "./index.module.css";
import Caidathoahong from "./Caidathoahong";
import Hoahongnhanduoc from "./Hoahongnhanduoc";
import Huongdan from "./huongdan";

//tabs
const onChange = (key) => {
  console.log(key);
};
const itemTabs = [
  {
    key: "1",
    label: `Cài đặt hoa hồng`,
    children: <Caidathoahong />,
  },
  {
    key: "2",
    label: `Hoa hồng nhận được`,
    children: <Hoahongnhanduoc />,
  },
  {
    key: "3",
    label: `Hướng dẫn`,
    children: <Huongdan />,
  },
];
const App = () => {
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Hoa Hồng" />
        </div>
        <div className={styles.content}>
          <Tabs defaultActiveKey="1" items={itemTabs} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
export default App;
