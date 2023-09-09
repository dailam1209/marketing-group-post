"use client";

import React, { useContext, useState } from "react";

import style from "./sidebar.module.css";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
import { SidebarContext } from "../context/resizeContext";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";

export default function SideBar() {
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const [dataHeader, setDataHeader] = useState();

  return (
    <>
      {checkHomeIfLoggedIn() ? null : (
        <div className={`${style.sidebar} ${style.mSideBar}`}>
          <div id="box_alert">
            <HeaderBar dataHeader={dataHeader} isOpen={isOpen} />
            <SiebarContent isOpen={isOpen} toggleModal={setIsOpen} />
          </div>
        </div>
      )}
    </>
  );
}
