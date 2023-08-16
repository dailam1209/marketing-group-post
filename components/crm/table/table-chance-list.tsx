import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import ProductActionDropDown from "../product_return/product_action_dropdown";
import ChanceActionDropDown from "../chance/chance_action_dropdown";
import { useRouter } from "next/router";
import { TableRowSelection } from "antd/es/table/interface";


interface DataType {
  key: React.Key;
  filename: string,
  name: string,
  money: string,
  title: string,
  date_finish: string,
  person: string,
  date_start: string,
  operation: "",
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i + 1,
    filename: `Cơ hội bán gói sản phầm VIP`,
    name: 'Nguyễn Trần Kim Phượng',
    money: "10.000.000.000",
    title: 'Mở đầu',
    date_finish: '10/10/2020',
    person: 'Nguyễn Văn Nam',
    date_start: '10/10/2020',
    operation: "",
  
  });
}

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên cơ hội",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        <Link href={`/chance/detail/main`}>
          <span>{data}</span>
        </Link>
      ),
    },
    {
      title: "Khách hàng",
      width: 200,
      dataIndex: "name",
      key: "1",
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "money",
      key: "2",
      width: 150,
    },
    {
      title: "Giai đoạn",
      dataIndex: "title",
      key: "3",
      width: 120,
    },
    {
      title: "Ngày kỳ vọng/kết thúc	",
      dataIndex: "date_finish",
      key: "4",
      width: 180,
    },
    {
      title: "Người thực hiện",
      dataIndex: "person",
      key: "5",
      width: 250,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_start",
      key: "6",
      width: 120,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "7",
      width: 120,
      fixed: "right",
      render: () => <ChanceActionDropDown />,
    },
  ];

  interface TableDataChanceProps {
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
  }
  const TableDataChance: React.FC<TableDataChanceProps> = ({
    setSelected,
    setNumberSelected,
  }: any) => {
    const rowSelection: TableRowSelection<DataType> = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ");
        if (selectedRows?.length > 0) {
          setSelected(true);
        } else {
          setSelected(false);
        }
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(selectedRows);
        setNumberSelected(selectedRows?.length);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {},
    };

  return (
    <div className="custom_table product_return">
      <Table
         columns={columns}
         dataSource={data}
         rowSelection={{ ...rowSelection }}
         bordered
        scroll={{ x: 1500, y: 1100 }}
      />
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
          Tổng số: <b>{data.length}</b> Liên hệ
        </div>
      </div>
    </div>
  );
};

export default TableDataChance;
