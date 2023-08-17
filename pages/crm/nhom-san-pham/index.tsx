import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";

import { TableRowSelection } from "antd/es/table/interface";
import HomeList from "@/components/crm/delete_data/delete_data.list";
import HomeFollow from "@/components/crm/theo-doi-thu-chi/theo-doi-thu-chi";
import HomePhieuThu from "@/components/crm/theo-doi-thu-chi/phieu-thu";
import HomePhieuChi from "@/components/crm/theo-doi-thu-chi/phieu-chi";
import Table_Nhom_San_Pham from "@/components/crm/table/table-nhom-san-pham";


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
    setHeaderTitle("Danh sách nhóm sản phẩm");
    setShowBackButton(false);
    setCurrentPath("/crmphieu-chi");

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
      <Table_Nhom_San_Pham/>
    </div>
  );
}
