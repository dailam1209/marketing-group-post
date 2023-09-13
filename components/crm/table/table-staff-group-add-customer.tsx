import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import Image from "next/image";
import PotentialSelectBox from "../potential/potential_selectt";
import CancelModal from "../potential/potential_steps/cancel_modal";
import { TableRowSelection } from "antd/es/table/interface";
import ModalDelEmpGroup from "../modals/modal_del_group";
import { number } from "yup";

interface DataType {
  key: React.Key;
  ep_name: string;
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
      return valueSelected?.includes(item.ep_id);
    } else {
      return [valueSelected]?.includes(item.ep_id);
    }
  });

  const data: any = newArray?.map((item) => {
    return {
      key: item.ep_id,
      nameDeparment: item?.nameDeparment,
      ep_name: item?.ep_name,
      item: item,
    };
  });
  let data2 = [];
  data?.map((item) => {
    data2.push(item.item);
  });
  console.log(data2);
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
      dataIndex: "ep_name",
      key: "1",
      width: 200,
    },
    {
      title: "Phòng ban",
      dataIndex: "dep_name",
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
          <Image alt="img" width={26} height={26} src={"/crm/del_red.svg"} />
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
          dataSource={data2}
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
