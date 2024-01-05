import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MarketingZALOHistoryActionTable } from '../marketing/zalo/group/group_history_action_table'
import { useMediaQuery } from 'react-responsive';
import styles from '../marketing/zalo/group/group.module.css'

interface DataType {
  key: React.Key;
  id: number;
  tenmautinnhan: string,
  loaitinnhan: string,
  khachhang: string,
  ghichu: string, 
  ngaytao: string
}

export const data: DataType[] = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    id: i + 1,
    tenmautinnhan: 'Mẫu tin nhắn tự động số 1',
    loaitinnhan: 'Tin nhắn tự động',
    khachhang: 'Tất cả',
    ghichu: 'Thêm ghi chú', 
    ngaytao: '22/03/2022'
  });
  };

  export interface GetNumberProps {
    changeNumberPage(e: number) : any
  }

const TableDataFacebook: React.FC<GetNumberProps> = ({ changeNumberPage }) => {
  const [selectionType, setSelectionType] = useState('checkbox');

   
    const isMobileCheck: boolean = useMediaQuery({
        query: '(max-width: 414px)',
    });
    const isTabnetCheck: boolean = useMediaQuery({
        query: '(max-width: 768px)',
    });

    

    const columns: ColumnsType<DataType> = [
        {
          title: "STT",
          width: isMobileCheck ? 70 : isTabnetCheck ? 3 : 40,
          dataIndex: "id",
          key: "1",
          
        },
        {
          title: "Tên mẫu tin nhắn",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  250,
          dataIndex: "tenmautinnhan",
          key: "2",
        },
        {
          title: "Loại tin nhắn",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  100,
          dataIndex: "loaitinnhan",
          key: "3",
        },
        {
          title: "Khách hàng",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  90,
          dataIndex: "khachhang",
          key: "4",
        },
        {
          title: "Ghi chú",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  140,
          dataIndex: "ghichu",
          key: "5",
        },
        {
          title: "Ngày tạo",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  50,
          dataIndex: "ngaytao",
          key: "6",
        },
        
        {
          title: "Tuỳ chọn",
          dataIndex: "operation",
          key: "5",
          width: isMobileCheck ?  30 : isTabnetCheck ? 2 : 50,
          fixed: "right" ,
          render: () => 
            <MarketingZALOHistoryActionTable isPined={true} />
        },
      ];

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
    
  return (
    <div style={{marginTop: "20px", position: 'relative'}}>
      <Table
       rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 700 , y: 400 }}
      />
      <div className="main__footer fix-main flex_between" id={styles.fix_main}>
        <div className={`show_number_item ${styles.hidden_mobile}`}>
          <b className={`${styles.hidden_mobile}`}>Hiển thị:</b>
          <select className={`${styles.hidden_mobile}  show_item`}>
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> SMS
        </div>
      </div>
    </div>
  );
};

export default TableDataFacebook;
