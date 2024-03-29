"use client";
import React, {
  RefCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageButtonHeader from "./message";
import WarningBtnHeader from "./warning";
import SettingButtonHeader from "./setting_icon";
import style from "./header.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useHeader } from "../hooks/useHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import NotifyButtonHeader from "./notify_icon";

export default function Header({ toggleModal }: any) {
  const { isOpen } = useContext<any>(SidebarContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    headerTitle,
    // setHeaderTitle,
    showBackButton,
    // setShowBackButton,
    currentPath,
  }: // setCurrentPath,
  any = useHeader();

  useEffect(() => {
    if (isOpen) {
      headerRef.current?.classList.add("content_resize");
    } else {
      headerRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <div ref={headerRef} className={style.header}>
        <div className={style.main}>
          <div className="mMenu__header">
            <img
              onClick={toggleModal}
              className="icon_menu_nav"
              src="/crm/sel.png"
              alt="icon-menu-nav"
            />
          </div>
          {/* Desktop */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {showBackButton && (
              <Link
                href={currentPath}
                style={{ marginRight: "11px", height: "17px", width: "10px" }}
              >
                <img
                  className={style.dekstop_view_img}
                  src="/crm/angle_left.svg"
                  alt="back"
                />
              </Link>
            )}
            <h3 className="header_ttle" style={{ color: "#474747" }}>
              {headerTitle}
            </h3>
          </div>
          <div className={style.header_btn}>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <MessageButtonHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <WarningBtnHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <NotifyButtonHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <SettingButtonHeader />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
