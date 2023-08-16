import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css"
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import ThemPhieuKK from "@/components/crm/theo-doi-thu-chi/them-phieu-kk";
import ThemPhieuChiKK from "@/components/crm/theo-doi-thu-chi/them-phieu-chi-kk";
import Table_So_Quy from "@/components/crm/table/table-so-quy";

const SoQuy: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Sổ quỹ");
    setShowBackButton(false);
    setCurrentPath("/crm/so-quy");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const handleClickImg = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Table_So_Quy />
    </div>
  );
};

export default SoQuy;
