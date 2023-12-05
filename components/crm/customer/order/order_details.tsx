import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "../../home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDataOrder from "@/components/crm/table/table-order";
import CampaignInputGroups from "@/components/crm/campaign/campaign_input_group";
import OrderDetailsInputGroups from "./input_order_group";
import TableDataChanceOrder from "../../table/table-chance-detail-order";
import Cookies from "js-cookie";
import { fetchApi } from "../../ultis/api";

export default function OrderDetails() {
  const mainRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("token_base365");
  const { isOpen } = useContext<any>(SidebarContext);
  const [emp, setEmp] = useState([]);
  const [body, setBody] = useState();
  const [isNumberSelected, setNumberSelected] = useState(0);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "http://210.245.108.202:3000/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  useEffect(() => {
    setHeaderTitle("Quản lý đơn hàng");
    setShowBackButton(false);
    setCurrentPath("/order/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    fetchAPIEmployee();
  }, []);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <OrderDetailsInputGroups setBody={setBody} />
      <TableDataChanceOrder emp={emp} body={body} setBody={setBody} />
    </div>
  );
}
