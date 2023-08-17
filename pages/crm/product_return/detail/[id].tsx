"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import DetailInformationChance from "@/components/crm/customer/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/customer/chance/detail/header_bar_detail";
import DetailInformation from "@/components/crm/customer/detail/detail";
import ProductReturnDetailBtns from "@/components/crm/product_return/detail/header_btns_group";
import ProductHeaderInfo from "@/components/crm/product_return/detail/product_return_detail_info";
import HeaderBarProductReturn from "@/components/crm/product_return/detail/header_bar_product_return";
import InforDetailProductReturnText from "@/components/crm/product_return/detail/infor_detail_product_details";

export default function ProductReturnDetails() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const cccd = false;
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
        <HeaderBarProductReturn keyTab={"1"} id={id} />
        <InforDetailProductReturnText />
      </div>
    </>
  );
}
