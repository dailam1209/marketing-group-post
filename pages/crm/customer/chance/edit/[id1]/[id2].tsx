"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import DetailInformationContact from "@/components/crm/customer/contact/detail_contact";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import EditChanceInfor from "@/components/crm/customer/chance/edit_chance";

export default function EditChance() {
  const router = useRouter();
  const { id1, id2 } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id1} / Cơ hội / Chỉnh sửa`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/chance/list/${id1}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id1, id2]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div ref={mainRef} className={styleHome.main}>
      <EditChanceInfor />
    </div>
  );
}
