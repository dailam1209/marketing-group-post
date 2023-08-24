import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableListCustomer from "@/components/crm/table/table-list-customer";
import CustomerListInputGroup from "@/components/crm/customer/customer_input_group";
import { TableRowSelection } from "antd/es/table/interface";
import { useApi } from "@/components/crm/hooks/useApi";
const Cookies = require("js-cookie");
import { format } from "date-fns";
import { te } from "date-fns/locale";
import { base_url } from "@/components/crm/service/function";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
export interface DataType {
  key: React.Key;
  cus_id: number;
  email: string;
  name: string;
  phone_number: number;
  resoure: number;
  description: string;
  group_id: number;
  status: number;
  updated_at: string;
  emp_name: string;
  user_handing_over_work: string;
  userName: string;
  userNameCreate: string;
  NameHandingOverWork: string;
  type: any;
}
export default function CustomerList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [name, setName] = useState();
  const [selectedCus, setSelectedCus] = useState<any>();
  const [des, setDes] = useState();
  const [lisCus, setListCus] = useState([]);
  const [status, setStatus] = useState();
  const [resoure, setResoure] = useState();
  const [nvPhuTrach, setnvPhuTrach] = useState();
  const [nhomCha, setnhomCha] = useState();
  const [nhomCon, setnhomCon] = useState();

  const [userNameCreate, setuserNameCreate] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [dataStatus, setdataStatus] = useState<any>();

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const fetchData = async () => {
    const res = await fetch(`${base_url}/api/crm/customer/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({
        perPage: pageSize,
        page: page,
        keyword: name === null ? null : name,
        status: status,
        resoure: resoure,
        userName: nvPhuTrach,
        userNameCreate: userNameCreate,
      }),
    });
    const data = await res.json();
    setData(data);
    setTotalRecords(data?.total);
  };

  const handleGetInfoSTT = async () => {
    const res = await fetch(`${base_url}/api/crm/customerStatus/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ pageSize: 100 }),
    });
    const data = await res.json();
    if (data && data?.data) setdataStatus(data?.data);
  };
  useEffect(() => {
    handleGetInfoSTT();
  }, []);

  const onSelectChange = (
    selectedRowKeys: any,
    selectedRows: string | any[]
  ) => {
    setSelectedCus(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    setNumberSelected(selectedRows?.length);
    if (selectedRows?.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 2 },
    { name: "Zalo", id: 3 },
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
  ];

  const datatable = data?.data?.map((item, index: number) => {
    let nguonKH = "";
    let time;
    if (item.updated_at.length) {
    }

    const inputTimeString = item?.updated_at;

    // Chuyển đổi thành đối tượng thời gian
    const inputTime = new Date(inputTimeString);
    // Lấy thông tin ngày, tháng, năm, giờ, phút, giây
    const day = inputTime.getUTCDate();
    const month = inputTime.getUTCMonth() + 1;
    const year = inputTime.getUTCFullYear();
    const hours = inputTime.getUTCHours();
    const minutes = inputTime.getUTCMinutes();
    const seconds = inputTime.getUTCSeconds();
    const outputTimeString = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year} ${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    time = outputTimeString;

    for (let key of ArrNguonKK) {
      if (key.id == item.resoure) {
        nguonKH = key.name;
      }
    }

    return {
      key: index + 1,
      cus_id: item.cus_id,
      email: item.email,
      name: item.name,
      phone_number: item.phone_number,
      resoure: nguonKH,
      description: item.description,
      group_id: item.group_id,
      status: item.status,
      updated_at: time,
      emp_name: item.emp_name,
      userNameCreate: item.userNameCreate,
      user_handing_over_work: item.user_handing_over_work,
      NameHandingOverWork: item.NameHandingOverWork,
      userName: item.userName,
      type: item.type,
    };
  });
  const dataStatusCustomer = dataStatus;
  const [listGr, setListGr] = useState([]);
  const [list_gr_child, setlistGr_Child] = useState([]);
  const handleGetGr = async () => {
    const res = await fetch(`${base_url}/api/crm/group/list_group_khach_hang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ com_id: Cookies.get("com_id") }),
    });
    const data = await res.json();
    setListGr(data?.data);
    let arr = [];
    data?.data?.showGr?.map((item) => {
      item?.list_gr_child.map((item) => {
        arr.push(item);
      });
      setlistGr_Child(arr);
    });
  };
  const [idSelect, setIdSelect] = useState<any>();
  const handleSelectAll = () => {
    const allRowKeys = datatable.map((item: { key: any }) => item.key);
    setSelectedRowKeys(allRowKeys);

    setNumberSelected(datatable.length);
  };
  const handleDeselectAll = () => {
    setSelectedRowKeys([]);
    setNumberSelected(0);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelect: (record, selected, selectedRows) => {
    //   console.log(selectedRows);
    //   setNumberSelected(selectedRows?.length);
    // },
    onSelectAll: handleSelectAll,
  };
  useEffect(() => {
    handleGetGr();
    fetchData();
  }, [name, selectedRowKeys, des, selectedCus, page, pageSize]);

  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng");
    setShowBackButton(false);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div ref={mainRef} className={styleHome.main}>
          <CustomerListInputGroup
            setName={setName}
            fetchData={fetchData}
            isSelectedRow={selected}
            numberSelected={numberSelected}
            clearOption={handleDeselectAll}
            chooseAllOption={handleSelectAll}
            selectedCus={selectedCus}
            dataStatusCustomer={dataStatusCustomer}
            setStatus={setStatus}
            setResoure={setResoure}
            datatable={datatable}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
            nhomCha={nhomCha}
            setnhomCha={setnhomCha}
            nhomCon={nhomCon}
            setnhomCon={setnhomCon}
          />
          <TableListCustomer
            fetchData={fetchData}
            rowSelection={rowSelection}
            datatable={datatable}
            dataStatusCustomer={dataStatusCustomer}
            dataGroup={listGr}
            des={des}
            setDes={setDes}
            setPage={setPage}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalRecords={totalRecords}
          />
        </div>
      )}
    </>
  );
}
