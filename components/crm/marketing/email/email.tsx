import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import EmailList from "./email_list";
import ReceiverList from "./receiver_list";
import EmailForm from "./email_form";
import { SizeType } from "antd/es/config-provider/SizeContext";

const EmailTable: React.FC = () => {
  const [size] = useState<SizeType>("small");
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing/ Email");
    setShowBackButton(true);
    setCurrentPath("/marketing/email");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Danh sách email`,
      key: "1",
      children: <EmailList key={1} />,
    },
    {
      label: `Danh sách người nhận`,
      key: "2",
      children: <ReceiverList key={2} />,
    },
    {
      label: `Mẫu email`,
      key: "3",
      children: <EmailForm key={3} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs type="card" size={size} items={tabsItems} />
    </div>
  );
};

export default EmailTable;
