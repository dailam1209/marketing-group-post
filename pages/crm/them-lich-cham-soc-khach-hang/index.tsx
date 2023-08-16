import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import ChiTietKhaoSat from "@/components/crm/cskh/chitietkhaosat/chitietkhaosat";
import ChiTietLichCSKH from "@/components/crm/cskh/chitiet-lich-cskh/chitiet-lich-cskh";
import ThemLichCSKH from "@/components/crm/cskh/them-lich-cskh/them-lich-cskh";


export default function ChinhSuaPhieuThu() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  useEffect(() => {
    setHeaderTitle("Lịch chăm sóc khách hàng / Thêm lịch chăm sóc khách hàng");
    setShowBackButton(true);
    setCurrentPath("/crm/lich-cham-soc-khach-hang");

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
      <ThemLichCSKH />
    </div>
  );
}
