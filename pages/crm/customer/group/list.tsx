import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PotentialInputGroups from "@/components/crm/potential/potential_input_group";
import TableDataGroupListCustomer from "@/components/crm/table/table-group-list";
import HeaderBtnsCustomerGroup from "@/components/crm/customer/group_customer/header_btns_group_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";

export default function GroupCustomer() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [selectedRows, setSelectedRow] = useState<any>([]);
  const [change, setChange] = useState(0);
  const [valFilter, setValFilter] = useState("");
  const [dataFilter, setDataFilter] = useState();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const accessToken = Cookies.get("token_base365");

  const { data, fetchData, updateData } = useApi(
    `${base_url}/api/crm/group/list_group_khach_hang`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { page: 1, perPage: 100 }
  );
  useEffect(() => {
    fetchData();
    setHeaderTitle("Danh sách nhóm khách hàng");
    setShowBackButton(false);
    // setCurrentPath("/crm/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  console.log(data)
  useEffect(() => {
    fetchData();
    setDataFilter(data?.data);
  }, [change]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const handleClickSearch = () => {
    const newDataFilter = data?.data?.showGr?.filter((item) => {
      if (valFilter) {
        const defaultVal = item?.gr_name?.toLowerCase();
        return defaultVal?.includes(valFilter.toLowerCase());
      }
      return item;
    });
    setDataFilter(newDataFilter);
  };

  return (
    <>
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div ref={mainRef} className={styleHome.main}>
          <HeaderBtnsCustomerGroup
            isSelectedRow={isSelectedRow}
            selectedRow={selectedRows}
            updateData={setChange}
            valFilter={valFilter}
            setValFilter={setValFilter}
            handleClickSearch={handleClickSearch}
          />
          <TableDataGroupListCustomer
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
            setSelectedRow={setSelectedRow}
            setChange={setChange}
            change={change}
            data={dataFilter || data?.data}
            updateData={updateData}
          />
        </div>
      )}
    </>
  );
}
