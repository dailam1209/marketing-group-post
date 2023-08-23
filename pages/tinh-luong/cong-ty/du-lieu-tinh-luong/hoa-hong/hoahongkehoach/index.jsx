import React from "react";
import { Tabs } from "antd";
import HeadNav from "../../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "../hoahongtien.module.css";
import Hoahongcanhan from "./Hoahongcanhan";
import Hoahongnhom from "./Hoahongnhom";
import { useRouter } from "next/router";
import Tonghoahong from "./Tonghoahong";
import Huongdan from "./Huongdan";
//tabs
const onChange = (key) => {
  console.log(key);
};
const itemTabs = [
  {
    key: "1",
    label: `Hoa hồng cá nhân`,
    children: <Hoahongcanhan />,
  },
  {
    key: "2",
    label: `Hoa hồng nhóm`,
    children: <Hoahongnhom />,
  },
  ,
  {
    key: "3",
    label: `Tổng Hoa hồng`,
    children: <Tonghoahong />,
  },
  {
    key: "4",
    label: `Hướng dẫn`,
    children: <Huongdan />,
  },
];
const App = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Hoa hồng/Hoa kế hoạch" />
        </div>
        <div className={styles.content}>
          <Tabs defaultActiveKey="1" items={itemTabs} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
export default App;
