"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import DetailInformationChance from "@/components/crm/customer/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/customer/chance/detail/header_bar_detail";
import OrderDetails from "@/components/crm/customer/order/order_details";

export default function SheduleDetailCustomer() {
  const router = useRouter();
  const { id1, id2 } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const cccd = false;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id1} / Cơ hội / ${id2}`);
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
        <DetailInformationChance id1={id1} id2={id2} />
        <HeaderBarChanceDetails keyTab={"5"} id1={id1} id2={id2} />
      </div>
      <OrderDetails />
    </>
  );
}
