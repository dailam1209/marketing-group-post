import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDataGroupListCustomer from "@/components/crm/table/table-group-list";
import HeaderBtnsCustomerGroup from "@/components/crm/customer/group_customer/header_btns_group_customer";
import HeaderBtnsCustomerStatus from "@/components/crm/customer/status/header_btns_status_customer";
import TableStatusCustomer from "@/components/crm/table/table-status-customer";

export default function GroupCustomer() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách tình trạng khách hàng");
    setShowBackButton(false);
    // setCurrentPath("/crm/customer/roup/list");
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
      {/* <HeaderBtnsCustomerStatus /> */}
      <TableStatusCustomer />
    </div>
  );
}
