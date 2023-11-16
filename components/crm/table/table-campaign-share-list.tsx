import React from "react";
import { Select, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import OrderApplyModal from "../order/add_order_action_modal/order_apply";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_share_list_action";
import { renderRight } from "@/utils/listOption";
const optionSelect=[{value:1,label:"Toan quyen"},{value:2,label:"sua"},{value:3,label:"xem"}]
interface DataType {
  key: React.Key;
  type: string;
  name: string;
  room: string;
  right: string;
  dep_id: number,
  dep_name: string,
  emp_name: string,
}
interface TableDataCampaignShareListProps {
  formData?: any;
  setFormData?: any;
}

const TableDataCampaignShareList: React.FC<TableDataCampaignShareListProps> = ({
  formData = null,
  setFormData = null,
}: any) => {
  const router = useRouter();
  const [listPotential, setListPotential] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  useEffect(() => {
    setFormData({ ...formData, pageSize: pageSize, page: currentPage });
  }, [currentPage, pageSize]);

  useEffect(() => {
    axiosCRM
      .post("/campaign/listShareCampaign", {
        ...formData,
        campaign_id: Number(router.query.id),
        pageSize: pageSize,
        page: currentPage,
      })
      .then((res) => {
        handleDataTable(res.data.data.data);
        setTotal(res.data.data.total);
      })
      .catch((err) => console.log("error"));
  }, [, pageSize, currentPage, formData.recall]);
  const handleDataTable = (datas) => {
    setListPotential(
      datas?.map((data, index) => ({
        ...data,
        key: index+1,
        user_name: data.user_name!=""?data.user_name: "Chưa cập nhật",
        role: renderRight(data.role),
      }))
    );
  };

  const handleChangeRole = (value)=>{
    // axiosCRM
    //   .post("/campaign/deleteShareCampaign", {
    //     ...formData,
    //     campaign_id: Number(router.query.id),
    //     pageSize: pageSize,
    //     page: currentPage,
    //   })
    //   .then((res) => {
    //     handleDataTable(res.data.data.data);
    //     setTotal(res.data.data.total);
    //   })
    //   .catch((err) => console.log("error"));
    console.log("ccccccccccc", value)
  }
  console.log("CHekc mkk", listPotential);
  
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 20,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại đối tượng",
      width: 80,
      dataIndex: "type",
      key: "type",
      render:(_,record)=>(
        <div style={{ display: "flex", justifyContent: "center" }}>
          {record.dep_id==0?"Nhân viên":"Phòng ban"}
        </div>
      )
    },

    {
      title: "Tên đối tượng",
      width: 60,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Phòng ban",
      dataIndex: "room",
      key: "room",
      width: 60,
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      width: 100,
      render:(value, record, index) =>(<Select options={optionSelect} value={value} onChange={()=>{handleChangeRole(value)}}/>),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 30,
      render: () => <OrderActionTable />,
    },
  ];
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={listPotential}
        bordered
        scroll={{ x: 1000, y: 820 }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
          // content="Hello"
        />
      }
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select className="show_item">
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Ghi chú
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignShareList;
