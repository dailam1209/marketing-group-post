import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import stylePotential from "../potential/potential.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import PotentialSelectBox from "../potential/potential_selectt";
import CancelModal from "../potential/potential_steps/cancel_modal";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const data: DataType[] = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableSharedFactorProps {}

const TableSharedFactor: React.FC<TableSharedFactorProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
        // title: "Tên nhân viên",
      dataIndex: "personname",
      key: "1",
      width: 200,
    },
    {
        // title: "Phòng ban",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
  ];
  return (
    <>
      <div className="custom_table product_return">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          // scroll={{ x: 992, y: 1100 }}
        />
      </div>
    </>
  );
};

export default TableSharedFactor;
