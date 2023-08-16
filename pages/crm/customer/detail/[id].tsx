"use client";
import DetailInformation from "@/components/crm/customer/detail/detail";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DetailCustomer() {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Thông tin khách hàng`);
    setShowBackButton(true);
    setCurrentPath("/crm/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);
  return (
    <div>
      <CustomerHeaderTab activeName={"Thông tin khách hàng"} />
      <DetailInformation cccd={true} />
    </div>
  );
}
