import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import stylePotential from "../potential/potential.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import PotentialSelectBox from "../potential/potential_selectt";
import CancelModal from "../potential/potential_steps/cancel_modal";
import { TableRowSelection } from "antd/es/table/interface";
import ModalDelEmpGroup from "../modals/modal_del_group";
import { number } from "yup";

interface DataType {
  key: React.Key;
  userName: string;
  nameDeparment: string;
}

interface TableStaffCustomerGroupAddProps {
  dataEmp: any;
  setData: any;
  valueSelected: any;
  setSelectedRow: any;
  setDataRowSelect: any;
}

const TableStaffCustomerGroupAdd: React.FC<TableStaffCustomerGroupAddProps> = ({
  dataEmp,
  setData,
  valueSelected,
  setSelectedRow,
  setDataRowSelect,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [idDel, setIdDel] = useState();

  const newArray = dataEmp?.filter((item) => {
    if (typeof valueSelected === "object") {
      return valueSelected?.includes(item._id);
    } else {
      return [valueSelected]?.includes(item._id);
    }
  });

  const data: DataType[] = newArray?.map((item) => {
    return {
      key: item._id,
      nameDeparment: item?.nameDeparment,
      userName: item?.userName,
      item: item,
    };
  });

  function handleDelRow(item: any): void {
    setIsOpenModalDel(true);
    setIdDel(item?._id);
  }

  const handleDelGroup = (id) => {
    const index = valueSelected?.findIndex((item) => item === id);
    const arrVal = valueSelected.slice();
    const newData = arrVal.splice(index, 1);
    setData(arrVal);
  };


  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys: any, selectedRows: string | any[]) => {
      setSelectedRow(selectedRows?.length);
      setDataRowSelect(selectedRowKeys);
    },
    onSelect: (record: any, selected: any, selectedRows: string | any[]) => {
      //   setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {},
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "1",
      width: 200,
    },
    {
      title: "Phòng ban",
      dataIndex: "nameDeparment",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "item",
      key: "4",
      width: 120,
      fixed: "right",
      render: (item) => (
        <button
          style={{
            color: "#FF3333",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          onClick={() => {
            handleDelRow(item);
          }}
        >
          <Image
            alt="img"
            width={26}
            height={26}
            src={"https://crm.timviec365.vn/assets/img/customer/del_red.svg"}
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
      <ModalDelEmpGroup
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
        handleOk={() => {
          handleDelGroup(idDel);
        }}
      />
    </>
  );
};

export default TableStaffCustomerGroupAdd;
