import styleHome from "@/components/crm/home/home.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDataCustomerMerge from "@/components/crm/table/table-customer-merge";

export default function MergeCustomer() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("myData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData.data);
    } else {
      console.log("Không có dữ liệu trong session storage");
    }
  }, []);
  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng / Gộp trùng khách hàng");
    setShowBackButton(true);
    setCurrentPath("/crm/customer/list");
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
      <TableDataCustomerMerge data={data} />
    </div>
  );
}
