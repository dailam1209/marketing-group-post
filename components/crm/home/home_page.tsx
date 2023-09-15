"use client";
import style from "./home.module.css";
import HomeItemBox from "./home_item_box";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import HomeOverView from "./overview";
import {
  boxDesPrimaryCustomer,
  boxDesPrimaryMarketing,
  boxDesPrimaryOrder,
  boxDesSucessOrder,
  boxDesWarningCustomer,
  boxDesWarningMarketing,
  boxDesWarningOrder,
} from "../ultis/consntant";
import { useContext, useEffect, useRef } from "react";
import { SidebarContext } from "../context/resizeContext";
import ChatBusiness from "../chat/chat";
import { useHeader } from "../hooks/useHeader";

export default function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Trang chủ");
    setShowBackButton(false);
    setCurrentPath("/crm/");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      homeRef.current?.classList.add("content_resize");
    } else {
      homeRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div>
      <div ref={homeRef} className={style.main}>
        <div className={style.group_box}>
          <HomeItemBox
            boxTitle={"Khách hàng"}
            boxDesPrimary={boxDesPrimaryCustomer}
            boxDesWarning={boxDesWarningCustomer}
            boxDesSucess={undefined}
          />
          <HomeItemBox
            boxTitle={"Đơn hàng"}
            boxDesPrimary={boxDesPrimaryOrder}
            boxDesSucess={boxDesSucessOrder}
            boxDesWarning={boxDesWarningOrder}
          />
          <HomeItemBox
            boxTitle={"Marketing"}
            boxDesPrimary={boxDesPrimaryMarketing}
            boxDesWarning={boxDesWarningMarketing}
            boxDesSucess={undefined}
          />
        </div>

        <HomeOverView />
      </div>
      {/* <ChatBusiness /> */}
    </div>
  );
}
