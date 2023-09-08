"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import style from "./sidebar.module.css";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
import { SidebarContext } from "../context/resizeContext";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";

export default function SideBar({ isOpened }: any) {
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const sidebarRef = useRef(null);
  const [dataHeader, setDataHeader] = useState();

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1024) {
        sidebarRef.current?.classList.remove("active_resize");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      sidebarRef.current?.classList.add("active_resize");
    } else {
      sidebarRef.current?.classList?.remove("active_resize");
    }
  }, [isOpen]);

  return (
    <>
      {checkHomeIfLoggedIn() ? null : (
        <div
          ref={sidebarRef}
          // style={{ width: isOpen ? "70px" : "302px" }}
          className={`${style.sidebar} ${
            !isOpened ? `${style.mSideBar}` : null
          }`}
        >
          <div id="box_alert"></div>

          <HeaderBar dataHeader={dataHeader} isOpen={isOpen} />
          <SiebarContent isOpen={isOpen} toggleModal={setIsOpen} />
        </div>
      )}
    </>
  );
}
