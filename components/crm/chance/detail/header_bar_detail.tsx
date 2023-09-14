import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";

interface HeaderProps {
  keyTab: string;
}

const HeaderBarChanceDetails: React.FC<HeaderProps> = ({ keyTab }: any) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState(keyTab);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin chi tiết`,
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Liên hệ`,
      // children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Lịch hẹn`,
    },
    {
      key: "4",
      label: `Báo giá`,
    },
    {
      key: "5",
      label: `Đơn hàng`,
    },
    {
      key: "6",
      label: `Tài liệu đính kèm`,
    },
    {
      key: "7",
      label: `Lịch sử giai đoạn`,
    },
    {
      key: "8",
      label: `Danh sách chia sẻ`,
    },
  ];

  useEffect(() => {
    setActiveKey(keyTab);
  }, [keyTab]);

  const onChangeKey = (key: string) => {
    setActiveKey(key);
    if (key) {
      switch (key) {
        case "1":
          router.push(`/crm/chance/detail/main`);
          return;
        case "2":
          router.push(`/crm/chance/detail/contact`);
          return;
        case "3":
          router.push(`/crm/chance/detail/schedule`);
          return;
        case "4":
          router.push(`/crm/chance/detail/quote`);
          return;
        case "5":
          router.push(`/crm/chance/detail/order`);
          return;
        case "6":
          router.push(`/crm/chance/detail/attachment`);
          return;
        case "7":
          router.push(`/crm/chance/detail/history`);
          return;
        case "8":
          router.push(`/crm/chance/detail/share`);
          return;
        default:
          return;
      }
    }
  };

  return (
    <div
      style={{ marginLeft: "15px", marginTop: "20px", marginBottom: "10px" }}
    >
      <Tabs
        style={{ fontSize: "16px" }}
        activeKey={activeKey}
        items={items}
        onChange={onChangeKey}
      />
    </div>
  );
};

export default HeaderBarChanceDetails;
