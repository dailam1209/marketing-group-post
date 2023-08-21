"use client";
import DetailInformation from "@/components/crm/customer/detail/detail";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { base_url } from "@/components/crm/service/function";
const Cookies = require("js-cookie");
export default function DetailCustomer() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setname] = useState<any>();
  const { id } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const getNameDetail = async () => {
    const res = await fetch(
      `${base_url}/api/crm/customerdetails/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: id }),
      }
    );
    const data = await res.json();
      setname(data?.data?.data1 || data?.data?.data2);
  };
  useEffect(() => {
    getNameDetail();
    setShowBackButton(true);
    setHeaderTitle(`${name?.ten_khach_hang} / Thông tin khách hàng`);

    setCurrentPath("/crm/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id,name?.ten_khach_hang]);
  return (
    <div>
      <CustomerHeaderTab activeName={"Thông tin khách hàng"} />
      <DetailInformation cccd={true} />
    </div>
  );
}
