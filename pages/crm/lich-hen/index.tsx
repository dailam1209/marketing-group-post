import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import HomePhieuChi from "@/components/crm/theo-doi-thu-chi/phieu-chi";
import LichHen from "@/components/crm/cskh/lichhen/lichhen";


export default function TheoDoiThuChi() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Lịch hẹn");
    setShowBackButton(false);
    setCurrentPath("/crm/phieu-chi");

  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  
  return (
    <div ref={mainRef} className={styleHome.main}>
      <LichHen />
    </div>
  );
}
