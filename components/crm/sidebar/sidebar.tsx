"use client";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";
import style from "./sidebar.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../context/accessContext";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import {
  EmployeeInfo,
  getDataCompany,
} from "@/pages/api/api-hr/cai-dat/generalSettings";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";

export default function SideBar({ isOpened }: any) {
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const sidebarRef = useRef<HTMLElement>(null);
  const [dataHeader, setDataHeader] = useState<any>();
  const COOKIE_KEY = "token_base365";
  const [tokenType, setTokenType] = useState<any>(null);
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

  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken(COOKIE_KEY);
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setTokenType(decodedToken?.data?.type);
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (tokenType) {
          if (tokenType === 1 || tokenType === "1") {
            const response = await getDataCompany();
            setDataHeader(response?.data);
            console.log(response?.data)
          } else {
            const response = await EmployeeInfo();
            setDataHeader(response?.data);
          }
        } else {
          const interval = setInterval(async () => {
            const updatedToken = tokenType;
            if (updatedToken === 1 || updatedToken === "1") {
              clearInterval(interval);
              fetchInfo();
            }
          }, 1000);
        }
      } catch (error) {
        // Xử lý lỗi ở đây
      }
    };
    fetchInfo();
  }, [tokenType]);

  return (
    <>
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div
          ref={sidebarRef as any}
          // style={{ width: isOpen ? "70px" : "302px" }}
          className={`${style.sidebar} ${
            !isOpened ? `${style.mSideBar}` : null
          }`}
        >
          <HeaderBar dataHeader={dataHeader} isOpen={isOpen} />
          <SiebarContent isOpen={isOpen} toggleModal={setIsOpen} />
        </div>
      )}
    </>
  );
}
