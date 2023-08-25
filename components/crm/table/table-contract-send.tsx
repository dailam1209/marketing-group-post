import React, { useState, useEffect } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";

interface DataType {
  key: React.Key;
  name: string;
  ep_id: string;
  position: string;
  department: string;
}

interface TableDataContracDrops {
  selectedDepartment;
  selectedEmployee;
  selectedPosition;
  data;
}

const TableDataContractSend: React.FC<TableDataContracDrops> = ({
  selectedDepartment,
  selectedEmployee,
  selectedPosition,
  data,
}: any) => {
  const router = useRouter();
  const { id } = router.query;

  const [isSelectionReady, setIsSelectionReady] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    if (selectedDepartment && selectedEmployee) {
      setIsSelectionReady(true);
    } else {
      setIsSelectionReady(false);
    }
  }, [selectedDepartment, selectedEmployee]);

  useEffect(() => {
    if (data && isSelectionReady) {
      const filteredData = data.filter((item: any) => {
        return (
          item.department === selectedDepartment &&
          item.employees.includes(selectedEmployee)
        );
      });

      const newTableData = filteredData.map((item: any, index: number) => {
        return {
          key: index + 1,
          ep_id: 123456,
          position: item.positions,
        };
      });

      setTableData((prevTableData) => [
        ...prevTableData,
        {
          key: prevTableData.length + 1,
          department: selectedDepartment,
          employee: selectedEmployee,
          ...newTableData[0],
        },
      ]);
    }
  }, [data, selectedDepartment, selectedEmployee, isSelectionReady]);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "ID nhân viên",
      width: 200,
      dataIndex: "ep_id",
      key: "0",
    },
    {
      title: "Họ và tên",
      dataIndex: "employee",
      key: "1",
      width: 150,
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "2",
      width: 130,
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "3",
      width: 100,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "4",
      width: 120,
      render: () => (
        <>
          <button>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
            Xóa
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="custom_table">
      {isSelectionReady && (
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          scroll={{ x: 1000, y: 1100 }}
        />
      )}
    </div>
  );
};

export default TableDataContractSend;
