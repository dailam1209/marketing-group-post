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

interface TableStaffCustomerGroupAddProps {}

const TableStaffCustomerGroupAdd: React.FC<
  TableStaffCustomerGroupAddProps
> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys: any, selectedRows: string | any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ");
      if (selectedRows?.length > 0) {
        // setSelected(true);
      } else {
        // setSelected(false);
      }
    },
    onSelect: (record: any, selected: any, selectedRows: string | any[]) => {
      console.log(selectedRows);
      //   setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {},
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhân viên",
      dataIndex: "personname",
      key: "1",
      width: 200,
    },
    {
      title: "Phòng ban",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 120,
      fixed: "right",
      render: () => (
        <button
          style={{
            color: "#FF3333",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          onClick={() => setIsOpenModalDel(true)}
        >
          <Image
            alt="img"
            width={26}
            height={26}
            src={"https://crm.timviec365.vn/assets/img/crm/customer/del_red.svg"}
          />
          Gỡ bỏ
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="custom_table product_return">
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
          bordered
          pagination={false}
          scroll={{ x: 992, y: 1100 }}
        />
      </div>
      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
      />
    </>
  );
};

export default TableStaffCustomerGroupAdd;
