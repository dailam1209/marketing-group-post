import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PotentialInputGroups from "@/components/crm/potential/potential_input_group";
import TableDataGroupListCustomer from "@/components/crm/table/table-group-list";
import HeaderBtnsCustomerGroup from "@/components/crm/customer/group_customer/header_btns_group_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import Cookies from "js-cookie";
import { filter } from "lodash";

export default function GroupCustomer() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [selectedRows, setSelectedRow] = useState<any>([]);
  const [change, setChange] = useState(0);
  const [valFilter, setValFilter] = useState("");
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const accessToken = Cookies.get("token_base365");

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    accessToken,
    "POST",
    { page: 1, perPage: 1000 }
  );

  console.log(change);
  useEffect(() => {
    setHeaderTitle("Danh sách nhóm khách hàng");
    setShowBackButton(false);
    // setCurrentPath("/crm/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    fetchData();
    console.log(data);
  }, [change]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const dataFilter = data?.data?.showGr?.filter((item) => {
    if (valFilter) {
      const defaultVal = item?.gr_name?.toLowerCase();
      console.log(defaultVal)
      return defaultVal?.includes(valFilter.toLowerCase());
    }
    return item;
  });

  console.log(data);

  return (
    <div ref={mainRef} className={styleHome.main}>
      <HeaderBtnsCustomerGroup
        isSelectedRow={isSelectedRow}
        selectedRow={selectedRows}
        updateData={setChange}
        valFilter={valFilter}
        setValFilter={setValFilter}
      />
      <TableDataGroupListCustomer
        setSelected={setIsSelectedRow}
        setNumberSelected={setNumberSelected}
        setSelectedRow={setSelectedRow}
        setChange={setChange}
        change={change}
        data={dataFilter}
        updateData={updateData}
      />
    </div>
  );
}
