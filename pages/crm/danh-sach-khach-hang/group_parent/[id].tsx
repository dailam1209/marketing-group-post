import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableListCustomer from "@/components/crm/table/table-list-customer";
import CustomerListInputGroup from "@/components/crm/customer/customer_input_group";
import { TableRowSelection } from "antd/es/table/interface";
import { useApi } from "@/components/crm/hooks/useApi";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

export default function CustomerList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [name, setName] = useState();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const { data, loading, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/customer/list",
    `${Cookies.get("token_base365")}`,
    "POST",
    { perPage: 10000,  group_id: Number(id)}
  );

  const {
    data: dataStatus,
    loading: loadingStatus,
    fetchData: fetchDataStatus,
    // ... other properties returned by the useApi hook
  } = useApi(
    "http://210.245.108.202:3007/api/crm/customerStatus/list",
    `${Cookies.get("token_base365")}`,
    "POST",
  );

  const {
    data: dataCustomerGroup,
    loading: loadingCustomerGroup,
    fetchData: fetchDataCustomerGroup,
    // ... other properties returned by the useApi hook
  } = useApi(
    "http://210.245.108.202:3007/api/crm/group/list_group_khach_hang",
    `${Cookies.get("token_base365")}`,
    "POST",
  );

  console.log(data);
  console.log("group: ", dataCustomerGroup);

  interface DataType {
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
    userCrete: string;
    user_handing_over_work: string;
    userName: string;
    userNameCreate: string;
  }

  const onSelectChange = (
    selectedRowKeys: any,
    selectedRows: string | any[]
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    setNumberSelected(selectedRows?.length);
    if (selectedRows?.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  useEffect(() => {
    // fetchData(
    //   "http://210.245.108.202:3007/api/crm/customer/list",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNzE5MzksImV4cCI6MTY5MjE1ODMzOX0.N6YvQv8Y_Ma6IVLSbh-JwBc7qdL8T-8XQk3SSQFmrJw",
    //   "POST"
    // );
    fetchData();
    fetchDataStatus();
    fetchDataCustomerGroup();
  }, []);
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
  console.log("check data", data);
  const datatable = data?.data?.showCty.map((item: DataType, index: number) => {
    let nguonKH = "";
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
      updated_at: item.updated_at,
      emp_name: item.emp_name,
      userNameCreate: item.userNameCreate,
      user_handing_over_work: item.user_handing_over_work,
      userName: item.userName,
    };
  });

  const dataStatusCustomer = dataStatus?.data?.listStatus;

  const dataGroup = dataCustomerGroup?.data?.showGr;

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
        isSelectedRow={selected}
        numberSelected={numberSelected}
        clearOption={handleDeselectAll}
        chooseAllOption={handleSelectAll}
      />
      <TableListCustomer
        rowSelection={rowSelection}
        datatable={datatable}
        dataStatusCustomer={dataStatusCustomer}
        dataGroup={dataGroup}
      />
    </div>
  );
}
