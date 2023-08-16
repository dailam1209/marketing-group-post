import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableListCustomer, {
  data,
} from "@/components/crm/table/table-list-customer";
import CustomerListInputGroup from "@/components/crm/customer/customer_input_group";
import { TableRowSelection } from "antd/es/table/interface";
import { useApi } from "@/components/crm/hooks/useApi";

export default function CustomerList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  // Ví dụ (  Về sau nhớ thay giá trị vào :)))  )
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "URL_TO_API_ENDPOINT",
    "YOUR_ACCESS_TOKEN"
    //method
    //body
  );

  // Hàm get Data (state là data đươc khai báo ở useApi)
  useEffect(() => {
    fetchData(); // Chỉ việc sử dụng lại data là được
  }, []);

  // Hàm update data lên API (data đã được tự động fetch về khi gọi hàm này)
  const handleUpdate = async (updatedData: any) => {
    await updateData(
      "URL_TO_UPDATE_API_ENDPOINT",
      "YOUR_ACCESS_TOKEN",
      "PUT",
      updatedData
    );
  };

  // Hàm Delete data (Tương tự ở trên)
  const handleDelete = async (id: string) => {
    await deleteData(`URL_TO_DELETE_API_ENDPOINT/${id}`, "YOUR_ACCESS_TOKEN");
  };

  interface DataType {
    key: React.Key;
    personname: string;
    date1: string;
    date2: string;
    filename: string;
    operation: string;
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

  const handleSelectAll = () => {
    const allRowKeys = data.map((item: { key: any }) => item.key);
    setSelectedRowKeys(allRowKeys);
    setNumberSelected(data.length);
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
      <TableListCustomer rowSelection={rowSelection} />
    </div>
  );
}
