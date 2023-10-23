import React from "react";
import { useState } from "react";
import styles from "../order/order.module.css";
import { Button, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import Link from "next/link";
import OrderApplyModal from "../quote/add_quote_action_modal/quote_apply";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: string;
  dongia: string;
  chietkhau: string;
  tienchietkhau: string;
  tien: string;
  thue: string;
  tienthue: string;
  total: string;
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i + 1,
    idproduct: "VT-0000",
    nameproduct: "Bánh",
    donvi: "Hộp",
    soluong: "100",
    dongia: "100.000",
    tien: "100.000",
    chietkhau: "100.000",
    tienchietkhau: "100.000",
    thue: "10",
    tienthue: "1.000.000",
    total: "101.000.000",
  });
}

interface TableDataOrderAddFilesDrops {
  setSelected: (value: boolean) => void;
}

const TableDataQuoteAddFiles: React.FC<
  TableDataOrderAddFilesDrops
> = ({}: any) => {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [pageSize, setPageSize] = useState<number>(4);
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 30,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã hàng hóa",
      width: 80,
      dataIndex: "idproduct",
      key: "0",
      // render: (text) => <div style={{ background: "#EEEEEE", color: "black", textAlign: "center", }}>{text}</div>,
    },
    {
      title: "Tên hàng hóa",
      dataIndex: "nameproduct",
      key: "1",
      width: 120,
      render: () => (
        <div
          style={{ padding: "5px", paddingLeft: "11px" }}
          className={stylesOrderSelect.wrap_select}
        >
          <OrderSelectBoxStep value="Tất cả" placeholder="Tất cả" />
        </div>
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "donvi",
      key: "2",
      width: 120,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "3",
      width: 100,
      render: () => (
        <>
          <input type="text" className={styles.inputform} placeholder="Nhập" />
        </>
      ),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "4",
      width: 100,
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "tien",
      key: "5",
      width: 100,
    },
    {
      title: "Tỷ lệ chiết khấu (%)",
      dataIndex: "chietkhau",
      key: "6",
      width: 130,
      // render: () => (
      //   <>
      //     <input type="text" className={styles.inputform} placeholder="Nhập" />
      //   </>
      // ),
    },
    {
      title: "Tiền chiết khấu (VNĐ)",
      dataIndex: "tienchietkhau",
      key: "7",
      width: 120,
      // render: () => (
      //   <>
      //     <input type="text" className={styles.inputform} placeholder="Nhập" />
      //   </>
      // ),
    },
    {
      title: "Thuế suất(%)",
      dataIndex: "thue",
      key: "8",
      width: 120,
      // render: () => (
      //   <>
      //     <input type="text" className={styles.inputform} placeholder="Nhập" />
      //   </>
      // ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tienthue",
      key: "9",
      width: 90,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "10",
      width: 90,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 120,
      fixed: "right",
      render: () => (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <div style={{ width: 15 }} onClick={() => setPageSize(pageSize + 1)}>
            <img style={{ cursor: "pointer" }} src="/crm/add_row.svg"></img>{" "}
          </div>
          <div style={{ width: 15 }} onClick={() => setPageSize(pageSize - 1)}>
            <img style={{ cursor: "pointer" }} src="	/crm/remove_row.svg"></img>{" "}
          </div>
          <div style={{ width: 15 }}>
            <img style={{ cursor: "pointer" }} src="	/crm/menu_row.svg"></img>{" "}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1100, y: 800 }}
        pagination={{
          pageSize: pageSize,
          style: { display: "none" },
        }}
        summary={() => {
          // let totalBorrow = 0;
          // let totalRepayment = 0;

          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });

          return <></>;
        }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
          // content="Hello"
        />
      }

      <div style={{ paddingTop: 20, paddingLeft: 30 }} id="">
        <div>
          <div style={{ textAlign: "left" }}>
            <button
              type="button"
              onClick={() => {
                setIsModalCancel(true);
              }}
            >
              <div style={{ background: "white", color: "#4C5BD4" }}>
                &nbsp;
                <i className="bi bi-plus-circle-fill"></i>
                &nbsp;
                <b style={{ fontSize: 18 }}>Thêm chương trình khuyến mại</b>
              </div>
            </button>
          </div>
        </div>
        <div className="total"></div>
      </div>
    </div>
  );
};

export default TableDataQuoteAddFiles;
