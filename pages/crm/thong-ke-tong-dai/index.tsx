import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import ThongKePage from "@/components/crm/cskh/tongdai/thong_ke";

const ThongKeTongDai: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Thống kê tổng đài");
    setShowBackButton(true);
    setCurrentPath("/crm/tong-dai");
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
      <ThongKePage />
    </div>
  );
};

export default ThongKeTongDai;
