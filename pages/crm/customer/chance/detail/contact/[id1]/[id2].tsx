"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import DetailInformationContact from "@/components/crm/customer/contact/detail_contact";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import ChanceAddInfo from "@/components/crm/customer/chance/add_chance";
import DetailInformationChance from "@/components/crm/customer/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/customer/chance/detail/header_bar_detail";
import DetailInformation from "@/components/crm/customer/detail/detail";
import CustomerInforEngineInput from "@/components/crm/customer/detail/customer_info_input_group";
import TableContactDetailCustomer from "@/components/crm/table/table-conatct-info";

export default function ContactDetailCustomer() {
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
        <HeaderBarChanceDetails keyTab={"2"} id1={id1} id2={id2} />
        <CustomerInforEngineInput id={id1} />
        <TableContactDetailCustomer />
      </div>
    </>
  );
}
