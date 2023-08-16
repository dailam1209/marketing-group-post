import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";

import { TableRowSelection } from "antd/es/table/interface";
import HomeFollow from "@/components/crm/theo-doi-thu-chi/theo-doi-thu-chi";
import HomePhieuThu from "@/components/crm/theo-doi-thu-chi/phieu-thu";
import SuaPhieuKK from "@/components/crm/theo-doi-thu-chi/sua-phieu-kk";
import SuaPhieuChi from "@/components/crm/theo-doi-thu-chi/sua-phieu-chi";


export default function ChinhSuaPhieuThu() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const handleDeselectAll = () => {
    setSelectedRowKeys([]);
    setNumberSelected(0);
  };
  useEffect(() => {
    setHeaderTitle("Phiếu chi / Sửa phiếu chi");
    setShowBackButton(true);
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
      <SuaPhieuChi />
    </div>
  );
}
