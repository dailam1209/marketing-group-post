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
  const [nhomCon,setnhomCon]= useState()

  const [userNameCreate, setuserNameCreate] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
    const fetchData = async () => {
      const res = await fetch(`${base_url}/api/crm/customer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify(  {
          perPage: 1000000000000,
          keyword: name === null ? null : name,
          status: status,
          resoure: resoure,
          userName: nvPhuTrach,
          userNameCreate: userNameCreate,
        }),
      });
      const data = await res.json();
      console.log(data)
      setData(data)
    }


  // const { data, loading, fetchData, updateData, deleteData } = useApi(
  //   `${base_url}/api/crm/customer/list`,
  //   `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDaGFtY29uZzM2NS1UaW12aWVjMzY1IiwiaWF0IjoxNjkyNjcxNDU5LCJleHAiOjE2OTI3NTc4NTksImRhdGEiOnsiaWQiOiI1NjM1IiwibmFtZSI6Ik5ndXlcdTFlYzVuIFRoXHUxZWNiIFBoXHUwMWIwXHUwMWExbmcgVGhcdTFlYTNvICIsInR5cGUiOjEsImVtYWlsIjoiYmVleGw0MTVAZ21haWwuY29tIiwicGhvbmVfdGsiOm51bGwsInJvbGUiOiIzIiwib3MiOjIsImZyb20iOiJxbGMzNjUiLCJkZXZpY2VfaWQiOiIyNTAxMDA2NDY0NTM3MzYxMTYwMDA1MzczNjU4NjQxNTM2MjQiLCJjb21faWQiOiIzMzEyIiwiY29tX25hbWUiOiJDXHUwMGQ0TkcgVFkgQ1x1MWVkNCBQSFx1MWVhNk4gVEhBTkggVE9cdTAwYzFOIEhcdTAxYWZORyBIXHUwMGMwICJ9fQ.z_pMjl2X6gIvqhuqWtQ1mEV9qFZv-jjW0uQ3AoxaxXU`,
  //   "POST",
  //   {
  //     perPage: 1000000000000,
  //     keyword: name === null ? null : name,
  //     status: status,
  //     resoure: resoure,
  //     userName: nvPhuTrach,
  //     userNameCreate: userNameCreate,
  //   }
  // );
  const {
    data: dataStatus,
    loading: loadingStatus,
    fetchData: fetchDataStatus,
    // ... other properties returned by the useApi hook
  } = useApi(
    `${base_url}/api/crm/customerStatus/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { pageSize: 1000000 }
  );
  const {
    data: dataCustomerGroup,
    loading: loadingCustomerGroup,
    fetchData: fetchDataCustomerGroup,
    // ... other properties returned by the useApi hook
  } = useApi(
    `${base_url}/api/crm/group/list_group_khach_hang`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { pageSize: 1000000 }
  );

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

  const datatable = data?.data?.showCty?.map(
    (item, index: number) => {
      let nguonKH = "";
      let time;
      if (item.updated_at.length) {
      }
      if (+item?.updated_at >= 1000) {
        const date = new Date(+item?.updated_at * 1000); // Chuyển số giây thành mili giây

        const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss");
        time = formattedDate;
      }

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
        status: item,
        updated_at: time ? time : item.updated_at,
        emp_name: item.emp_name,
        userNameCreate: item.userNameCreate,
        user_handing_over_work: item.user_handing_over_work,
        NameHandingOverWork: item.NameHandingOverWork,
        userName: item.userName,
      };
    }
  );
  const dataStatusCustomer = dataStatus?.data?.listStatus;
    const [listGr,setListGr] = useState([])
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
    setListGr(data?.data?.showGr);
    let arr = [];
    data?.data?.showGr?.map((item) => {
      item?.list_gr_child.map((item) => {
        arr.push(item);
      });
      setlistGr_Child(arr);
    });
  };


  const dataGroup = dataCustomerGroup?.data?.showGr;
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
    handleGetGr()
    fetchData();
    fetchDataStatus();
  }, [name, selectedRowKeys, des, selectedCus]);
  useEffect(() => {
    fetchDataCustomerGroup();
  }, [data]);

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
        setnhomCha ={setnhomCha}
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
      />
    </div>
  );
}
