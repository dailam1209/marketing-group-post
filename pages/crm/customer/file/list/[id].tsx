"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import TableChanceDetailDocuments from "@/components/crm/table/table-document-details";
import HeaderBtnsDocumentEngine from "@/components/crm/customer/documents/header_buttons_group";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";

export default function AttachmentList() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const cccd = false;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Tài liệu đính kèm`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/detail/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

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
      <CustomerHeaderTab activeName={"Tài liệu đính kèm"} />
      <div ref={mainRef} className={styleHome.main}>
        <HeaderBtnsDocumentEngine id={id} />
        <TableChanceDetailDocuments />
      </div>
    </>
  );
}
