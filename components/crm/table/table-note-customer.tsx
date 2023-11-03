import React, { useState, useEffect } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import NoteActionDropDown from "../customer/note/note_dropdown_action";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 80,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Nội dung ghi chú",
    width: 160,
    dataIndex: "filename",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Người ghi chú",
    dataIndex: "personname",
    key: "2",
    width: 130,
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "date1",
    key: "1",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 120,
    // fixed:"right",
    render: () => (
      <div>
        <NoteActionDropDown />
      </div>
    ),
  },
];

interface TableDataContracDrops {}

const TableDataNoteDetailList: React.FC<TableDataContracDrops> = ({}: any) => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [loading, setloading] = useState(true);
  const router = useRouter();
  // const { id } = router.query;

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3007/api/crm/potential/listNotePotential`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ 
          cus_id: 1,
          pageSize: pageSize,
          page: page,
        }),
      });
      let data = await res.json();
      data = data?.data?.data;
      setData(data);
      if (data?.length <= 0) {
        setloading(false);
      }
      setTotalRecords(data?.total);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  const datatable = data?.map((item, index: number) => {
    return {
      key: index + 1,
      filename: item.content,
      personname: item.emp_name,
      date1: item.updated_at
    };
  });
  console.log("checkdara",totalRecords, data)

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 2000, y: 1100 }}
        pagination={
          {
            // style: {
            //   paddingBottom: 20,
            //   display: "flex",
            //   position: "absolute",
            //   left: "30%",
            // },
            current: page,
            pageSize: pageSize,
            total: totalRecords,
            onChange: (current, pageSize) => {
              if (current != page) {
                // setDatatable([]);
                setPage(current);
              }
            },
          }
        }
      />
        <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <Select
            style={{ width: 200 }}
            placeholder={
              <div style={{ color: "black" }}>10 bản ghi trên trang</div>
            }
            onChange={(value) => setPageSize(value)}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </Select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Ghi chú
        </div>
      </div>
    </div>
  );
};

export default TableDataNoteDetailList;
