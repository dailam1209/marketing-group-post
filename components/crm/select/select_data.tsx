import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
const Cookies = require('js-cookie')

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
    "http://210.245.108.202:3007/api/crm/customerdetails/detail",
    `${Cookies.get("token_base365")}`,
    "POST",
    { cus_id: cusId }
  );
  console.log('cjecl da',data)
  useEffect(() => {
    fetchDataDetail();
  }, []);
  console.log('dataDetailCustomer',dataDetailCustomer)
  const dataStatus = dataDetailCustomer?.data?.data1
    ? dataDetailCustomer?.data?.data1
    : dataDetailCustomer?.data?.data2;
  //   console.log(dataStatus?.status);

  const handleChangeApi = async (e: any, data: any) => {
    const url =
      "http://210.245.108.202:3007/api/crm/customerdetails/editCustomer";

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
      console.log('check',data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {dataStatus && (
        <select
          onChange={(e: any) => {
            handleChangeApi(e, data);
          }}
          defaultValue={dataStatus?.status}
          //   value={value}
          style={{ border: 0 }}
        >
          <option value={""}>Chưa cập nhật</option>
          {data?.map((item: any, index: number) => (
            <option
              style={{ display: item.status !== 0 ? "block" : "none" }}
              key={index}
              value={item.stt_id}
            >
              {item.stt_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectDataInputBox;
