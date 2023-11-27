import React, { useContext, useEffect, useState } from "react";
import { Spin, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import Link from "next/link";
import QuoteActionTable from "../quote/quote_action_table";
import { QuoteFilterContext } from "../quote/quoteFilterContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { axiosCRM } from "@/utils/api/api_crm";
import dayjs from "dayjs";
import useLoading from "../hooks/useLoading";
import { PaginationConfig } from "antd/es/pagination";
import { set } from "lodash";

interface DataType {
  key: React.Key;
  quote_code: string;
  status: string;
  customer: string;
  description: string;
  value: number;
  quote_date: string;
  quote_date_end: string;
}

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataQuote: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const [key, setKey] = useState();
  const [allKey, setAllKey] = useState<any>();

  const { dateQuote, dateQuoteEnd, status, quoteCode, shouldFetchData, setShouldFetchData, setRecordId, setListRecordId, listRecordId, setRecordName, setListRecordName } = useContext(QuoteFilterContext);
  const [quoteData, setQuoteData] = useState<any>([]) // Data từ API
  const [data, setData] = useState<DataType[]>([]); // Data đổ bảng
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const statusToString = (num: Number) => {
    switch (Number(num)) {
      case 1: return "Bản thảo"
      case 2: return "Đàm phán"
      case 3: return "Đã gửi"
      case 4: return "Chờ xác nhận"
      case 5: return "Đồng ý"
      case 6: return "Từ chối"
      default: return ""
    }
  }

  const statusToColor = (status: String) => {
    switch (status) {
      case "Bản thảo":
      case "Chờ xác nhận": return '#FFA800'
      case "Đàm phán":
      case "Đã gửi": return '#4C5BD4'
      case "Đồng ý": return '#34B632'
      case "Từ chối": return '#FF3333'
      default: return 'inherit'
    }
  }

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value) || 10)
    setCurrentPage(1)
    setShouldFetchData(true)
  }

  const handleTablePageChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current)
    setShouldFetchData(true)
  }

  const convertToDataType = (data?) => {
    const newData = data?.map((item) => ({
      key: item.id,
      quote_code: item.quote_code_str,
      status: statusToString(item.status),
      customer: item.customer_name,
      description: item.description,
      value: item.total_money,
      quote_date: dayjs(item.date_quote).format('DD/MM/YYYY'),
      quote_date_end: dayjs(item.date_quote_end).format('DD/MM/YYYY'),
    }))
    setData(newData)
  }

  const getData = () => {
    axiosCRMCall
      .post('/quote/list', {
        date_quote: dateQuote,
        date_quote_end: dateQuoteEnd,
        status: status === 0 ? null : Math.max(Math.min(status, 6), 1),
        quote_code_str: quoteCode,
        page: currentPage,
        perPage: perPage
      })
      .then((res) => {
        // console.log(res?.data?.data);
        res?.data?.data?.data?.length > 0 ?
          setQuoteData(res.data.data.data) :
          setQuoteData([])
        res?.data?.data?.total ?
          setTotal(res?.data?.data?.total) :
          setTotal(res?.data?.data?.data?.length) // Tạm thời khi API chưa sửa
      })
      .catch((err) => console.log(err))
  }

  // Run first
  useEffect(() => {
    startLoading();
    getData();
    stopLoading();
  }, [])

  // Run when triggered
  useEffect(() => {
    if (shouldFetchData) {
      startLoading();
      getData();
    }
    setRecordId(0)
    setListRecordId([])
    setShouldFetchData(false)
  }, [shouldFetchData])
  useEffect(() => {
    convertToDataType(quoteData);
    stopLoading();
  }, [quoteData])

  const columns: ColumnsType<DataType> = [
    {
      title: "Số báo giá",
      width: 120,
      dataIndex: "quote_code",
      key: "quote_code",
      render: (text: any, record: any) => (
        <Link href={`/quote/detail/${record.key}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      width: 120,
      dataIndex: "status",
      key: "status",
      render: (text) => <div style={{ color: statusToColor(text) }}>{text}</div>,
    },
    {
      title: "Ngày báo giá",
      dataIndex: "quote_date",
      key: "quote_date",
      width: 250,
    },
    {
      title: "Hiệu lực đến ngày",
      dataIndex: "quote_date_end",
      key: "quote_date_end",
      width: 250,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: 300,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "value",
      key: "value",
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (text: any, record: any) => (
        <div onClick={() => {setKey(record.key); setRecordId(record.key); setRecordName(record.quote_code)}}>
          <QuoteActionTable record={key} allKey={[]} />
        </div>
      ),
    },
  ];

// const data: DataType[] = [];
  // for (let i = 0; i < 15; i++) {
  //   data.push({
  //     key: i,
  //     order_number: `ĐH-000${i}`,
  //     status: `Chờ duyệt`,
  //     customer: `Nguyễn Trần Kim Phượng`,
  //     explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
  //     value: 10000000,
  //     name: `Nguyễn Văn Nam`,
  //     order_date: "01/08/2023",
  //     order_status: `Đã thanh toán một phần`,
  //     delivery_status: `Chưa giao hàng`,
  //   });
  // }
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setAllKey(selectedRows);
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
      setListRecordId(selectedRowKeys) // Lưu id bản ghi 
      setListRecordName(selectedRows.map((row) => row.quote_code))
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => { },
  };
  return (
    <div className="custom_table">
      {isLoading ? (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
          bordered
          scroll={{ x: 1500, y: 1200 }}
          pagination={{
            current: currentPage,
            pageSize: perPage,
            total: total
          }}
          onChange={handleTablePageChange}
        />
      )}
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={perPage}
            onChange={handlePerPage}
            defaultValue={perPage}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataQuote;
