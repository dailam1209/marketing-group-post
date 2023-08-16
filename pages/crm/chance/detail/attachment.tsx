"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import DetailInformationChance from "@/components/crm/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/chance/detail/header_bar_detail";
import TableChanceDetailDocuments from "@/components/crm/table/table-document-details";
import HeaderBtnsDocumentEngine from "@/components/crm/customer/documents/header_buttons_group";

export default function AttachmentDetails() {
  const router = useRouter();
  const { id1, id2 } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const cccd = false;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`Cơ hội / Chi tiết`);
    setShowBackButton(true);
    setCurrentPath(`/crm/chance/list`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id1, id2]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <div ref={mainRef} className={styleHome.main}>
        <DetailInformationChance />
        <HeaderBarChanceDetails keyTab={"6"} />
        <HeaderBtnsDocumentEngine id={id1} />
        <TableChanceDetailDocuments />
      </div>
    </>
  );
}
