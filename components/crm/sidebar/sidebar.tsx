"use client";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";
import style from "./sidebar.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef } from "react";
import { AccessContext } from "../context/accessContext";
export default function SideBar({ isOpened }: any) {
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const sidebarRef = useRef<HTMLElement>(null);
  const { accessAcountRole, setAccessAcountRole }: any =
    useContext(AccessContext);

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
    <div
      ref={sidebarRef as any}
      // style={{ width: isOpen ? "70px" : "302px" }}
      className={`${style.sidebar} ${!isOpened ? `${style.mSideBar}` : null}`}
    >
      <HeaderBar isOpen={isOpen} />
      <SiebarContent isOpen={isOpen} toggleModal={setIsOpen} />
    </div>
  );
}
