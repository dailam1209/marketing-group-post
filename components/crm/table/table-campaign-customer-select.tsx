import React, { useEffect, useState } from "react";
import { Pagination, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_table_step";
import stylesCampaignSelect from "@/components/crm/campaign/campaign.module.css";
import styles from "../order/order.module.css";
import Link from "next/link";
import {fetchApi} from "../ultis/api";
import Cookies from "js-cookie";
import {useTrigger} from "../context/triggerContext";
import useLoading from "../hooks/useLoading";

interface DataType {
  key: React.Key;
  cus_id: string;
  name: string;
  phone_number: string;
  email: string;
  status: string;
  description: string;
  cus_from: string;
  group: string;
  staff: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã KH",
    width: 120,
    dataIndex: "cus_id",
    key: "cus_id",
    // render:(text:any,record:any)=><Link href={`/order/detail/${record.key}`} ><b>{text}</b></Link>
  },
  {
    title: "Tên khách hàng",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any, record: any) => (
      <Link href={`/customer/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Tình trạng khách hàng",
    dataIndex: "status",
    key: "status",
    width: 180,
    render: () => (
      <div
        style={{ padding: "5px", paddingLeft: "11px" }}
        className={stylesCampaignSelect.wrap_select}
      >
        <CampaignSelectBoxStep value="Hẹn gặp" placeholder="Hẹn gặp" />
      </div>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Nguồn khách hàng",
    dataIndex: "cus_from",
    key: "cus_from",
    width: 180,
    render: () => (
      <div
        style={{ padding: "5px", paddingLeft: "11px" }}
        className={stylesCampaignSelect.wrap_select}
      >
        <CampaignSelectBoxStep value="Facebook" placeholder="Facebook" />
      </div>
    ),
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "group_id",
    key: "group",
    width: 250,
  },
  {
    title: "Nhân viên phụ trách",
    dataIndex: "userName",
    key: "staff",
    width: 200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "date",
    width: 120,
  },
];

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setArrCustomerId: any
}

const TableDataOrder: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
  setArrCustomerId
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const url = "http://localhost:3007/api/crm/customer/list";
  const token = Cookies.get("token_base365");
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchAPICustomer = async () => {
    const bodyAPI = {
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    console.log("aaaaa", dataApi);
    setDataApi(dataApi?.data);
    setCount(dataApi?.total);
    stopLoading();
  };
  const data =
    dataAPI?.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        key: index,
      };
    }) || [];
  useEffect(() => {
    if (trigger) {
      fetchAPICustomer();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);
  useEffect(() => {
    //
    fetchAPICustomer();
  }, [currentPage]);
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        let arr_cus = selectedRows.map((e, i)=>{
          return e.cus_id;
        })
        setArrCustomerId(arr_cus);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 400 }}
      />
      <div className={`${styles.main__footer} ${styles.flex_between}`}>
        <div className="total">
          Tổng số: <b>{count}</b> Chiến dịch
        </div>
        <Pagination
          current={currentPage}
          total={count}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableDataOrder;
