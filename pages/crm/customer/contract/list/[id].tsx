import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import TableDataContractDetailList from "@/components/crm/table/table-contract-details";
import AddContractBtnDetails from "@/components/crm/customer/contract/add_contract";

export default function ContractDetailsList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Hợp đồng bán`);
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
  return (
    <>
      <CustomerHeaderTab activeName={"Hợp đồng bán"} />
      <div ref={mainRef} className={styleHome.main}>
        <AddContractBtnDetails id={id} />
        <TableDataContractDetailList />
      </div>
    </>
  );
}
