import React, {useEffect, useState} from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useTrigger} from "../context/triggerContext";
import {fetchApi} from "../ultis/api";
import { timestampToCustomString } from "../ultis/convert_date";
import useLoading from "../hooks/useLoading";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  note: string;
  staff: string;
}

// export const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     number: `ĐH-000${i}`,
//     name: `Nguyễn Trần Kim Phượng`,
//     status: `Chờ duyệt`,
//     note: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
//     staff: `10000000`,
//   });
// }

interface TableDataCampaignCustomerProps {
  body?: any;
  setBody?: any;
  emp?: any;
}

const TableDataCampaignCustomer: React.FC<TableDataCampaignCustomerProps> = ({
  body,
  setBody,
  emp,
}: any) => {
  const url = "http://localhost:3007/api/crm/campaign/detail-campaign-cus";
  const token = Cookies.get("token_base365");
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);

  const statusList = {
    0: "Chưa cập nhật",
    1: "Chưa cập nhật",
    2: "Mở đầu",
    3: "Khách hàng quan tâm",
    4: "Demo/Gthieu",
    5: "Đàm phán/ thương lương",
  };

  const fetchAPIDelCampaignChance = async (id: number) => {
    const bodyAPI = {
      chance_id: id,
      campaign_id: 0,
    };
    const dataApi = await fetchApi(
      "http://localhost:3007/api/crm/chance/edit-chance",
      token,
      bodyAPI,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchAPICampaignCustomer = async () => {
    const bodyAPI = {
      ...body,
      cam_id: Number(router.query.id),
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setDataApi(dataApi?.data?.data);
    setCount(dataApi?.data?.count);
    stopLoading();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã KH",
      width: 80,
      dataIndex: "cus_id",
      key: "cus_id",
    },
    {
      title: "Tên khách hàng",
      width: 120,
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Link href={`/customer/detail/${record.key}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: 320,
      ellipsis: true,
    },
    {
      title: "Nhân viên thực hiện",
      dataIndex: "staff",
      key: "staff",
      width: 120,
    },
  ];

  const data =
    dataAPI?.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        key: index,
      };
    }) || [];

  useEffect(() => {
    if (trigger) {
      fetchAPICampaignCustomer();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  useEffect(() => {
    fetchAPICampaignCustomer();
  }, [body]);
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1200, y: 1200 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: body?.page,
          pageSize: body?.pageSize,
          total: count,
          onChange: (current, pageSize) => {
            if (current != body?.page) {
              setBody((prev) => {
                return {
                  ...prev,
                  page: current,
                };
              });
            }
          },
        }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(el) => {
              setBody({
                ...body,
                pageSize: Number(el.target.value),
              });
            }}
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Khách hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignCustomer;
