import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import { useApi } from "@/components/crm/hooks/useApi";
    
interface DataType {
  key: React.Key;
  user_created: string;
  created_at: string;
  update_at: string;
  path_dowload: string;
}

interface TableContractProps {}

const TableContract: React.FC<TableContractProps> = ({}: any) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [id_customer, setid_customer] = useState<any>("");
  const [id, setId] = useState();
  const [name, setName] = useState();
  const Cookies = require('js-cookie')
  
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/contractforcus/list",
    `${Cookies.get("token_base365")}`,
    "POST",
    { id_customer: `${id_customer}`, pageSize: 10000 }
  );
  useEffect(() => {
    fetchData();
  }, []);
  
const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên hợp đồng",
    width: 200,
    dataIndex: "path_dowload",
    key: "0",
    render: (data,record) => (
      <Link href={`detail/${record}`}>     
      <Tooltip title={data}>
      <span>{data}</span>
    </Tooltip></Link>
 
    ),
  },
  {
    title: "Người tạo",
    dataIndex: "user_created",
    key: "1",
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "2",
    width: 150,
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "update_at",
    key: "3",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "",
    key: "4",
    width: 200,
    // fixed:"right",
    render: () => (
      <>
        <Link href={"/contract/edit_contract"}>
          <button>
            <img
              className={styles.icon_edit}
              src="https://crm.timviec365.vn/assets/img/h_edit_cus.svg"
            />
            Sửa
          </button>
        </Link>
        <Link href={"#"}>
          <button>
            <img
              className={styles.icon_delete}
              src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
            />
            Xóa
          </button>
        </Link>
      </>
    ),
  },
];

const datatable = data?.data?.data?.map((item: any, index: number) => {
  return {
    key: index + 1,
    _id: item._id,
    name: item.name,
    pathFile: item.pathFile,
    com_id: item.com_id,
    ep_id: item.ep_id,
    id_file: item.id_file,
    created_at: item.created_at,
    user_created: item.user_created,
    id_customer: item.id_customer,
    update_at: item.update_at || "Chua cap nhat" ,
    status : item.status,
    is_delete: item.is_delete,
    new_field: item.new_field,
    old_field: item.old_field,      
    index_field: item.index_field,
    default_field: item.default_field,
    path_dowload: item.path_dowload,
    id_form_contract: item.id_form_contract
  };
  });
  console.log(data);

const [current, setcurrent] = useState(1);
const [pageSize, setpageSize] = useState(10);

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};
  

export default TableContract;
