import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import TableDataContractDetailList from "@/components/crm/table/table-contract-details";
import AddContractBtnDetails from "@/components/crm/customer/contract/add_contract";
const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";

export default function ContractDetailsList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [name, setname] = useState<any>();

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id }),
    });
    const data = await res.json();
    setname(data?.data?.name);
  };

  useEffect(() => {
    getNameDetail();
    setHeaderTitle(`${name} / Hợp đồng bán`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/detail/${id}`);
  }, [name, setHeaderTitle, setShowBackButton, setCurrentPath, id]);

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
