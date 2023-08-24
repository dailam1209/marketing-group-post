import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");

interface MyProps {
  data: any;
  value: any;
  handleChange: any;
  cusId: any;
}

const SelectDataInputBox: React.FC<MyProps> = ({
  data,
  value,
  handleChange,
  cusId,
}) => {
  const {
    data: dataDetailCustomer,
    loading,
    fetchData: fetchDataDetail,
    updateData: updateDataDetail,
    // ... other properties returned by the useApi hook
  } = useApi(
    `${base_url}/api/crm/customerdetails/detail`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { cus_id: cusId }
  );
  const router = useRouter()
  const dataStatus = dataDetailCustomer?.data
  const handleChangeApi = async (e: any, data: any) => {
    const url =
    `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("status", e.target.value);
    formData.append("type", dataDetailCustomer?.data?.data1 ? "1" : "2");
    formData.append("cus_id", cusId);

    const headers = {
      Authorization: `Bearer ${Cookies.get("token_base365")}`,
    };

    const config = {
      method: "POST",
      headers: headers,
      body: formData,
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataDetail();
  }, [cusId]);
  //dataStatus la thay doi duoc
  return (
    <>
      {dataStatus && (
        <select
          onChange={(e: any) => {
            handleChangeApi(e, data);
          }}
          defaultValue={dataStatus?.status?.info}
            // value={dataStatus?.status?.info}
          style={{ border: 0 }}
        >
          {data?.map((item: any, index: number) => {
            return <option
              style={{ display: item.status !== 0 ? "block" : "none" }}
              key={index}
              value={item.stt_id}
            >
              {item.stt_name}
            </option>
          })}
        </select>
      )}
    </>
  );
};

export default SelectDataInputBox;
