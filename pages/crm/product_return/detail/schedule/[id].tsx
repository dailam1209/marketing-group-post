"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import ProductReturnDetailBtns from "@/components/crm/product_return/detail/header_btns_group";
import ProductHeaderInfo from "@/components/crm/product_return/detail/product_return_detail_info";
import HeaderBarProductReturn from "@/components/crm/product_return/detail/header_bar_product_return";
import InforDetailProductReturnText from "@/components/crm/product_return/detail/infor_detail_product_details";
import ScheduleDetailInputGroup from "@/components/crm/customer/schedule/schedule_input_group";
import TableScheduleDetailCustomer from "@/components/crm/table/table-schedule-detail";

export default function ProductReturnDetailsSchedule() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`Trả lại hàng bán / Chi tiết`);
    setShowBackButton(true);
    setCurrentPath(`/product_return/list`);
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
      <div
        style={{ marginBottom: "-40px" }}
        ref={mainRef}
        className={styleHome.main}
      >
        <ProductReturnDetailBtns />
        <ProductHeaderInfo />
        <HeaderBarProductReturn keyTab={"2"} id={id} />
        <ScheduleDetailInputGroup />
        <TableScheduleDetailCustomer />
      </div>
    </>
  );
}
