"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import DetailInformationChance from "@/components/crm/customer/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/customer/chance/detail/header_bar_detail";
import TableScheduleDetailCustomer from "@/components/crm/table/table-schedule-detail";
import ScheduleDetailInputGroup from "@/components/crm/customer/schedule/schedule_input_group";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";

export default function SheduleDetailCustomerList() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Lịch hẹn `);
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
      <CustomerHeaderTab activeName={"Lịch hẹn"} />
      <div ref={mainRef} className={styleHome.main}>
        <ScheduleDetailInputGroup />
        <TableScheduleDetailCustomer />
      </div>
    </>
  );
}
