import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Form_qoute from "@/components/crm/quote/form_quote/form_qoute";
import Form_quote_detail from "@/components/crm/quote/form_quote/form_quote-detail";
import { useRouter } from "next/router";

export default function Form_quote_HOME() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const router = useRouter();
  const path = router.query.id;
  useEffect(() => {
    setHeaderTitle(`Báo giá / Mẫu báo giá / Mẫu ${path}`);
    setShowBackButton(true);
    setCurrentPath("/crm/quote/list");
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
      <Form_quote_detail />
    </div>
  );
}
