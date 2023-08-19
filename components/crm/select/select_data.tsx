import { useEffect } from "react";
import { useApi } from "../hooks/useApi";

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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
    "POST",
    { cus_id: cusId }
  );

  //   const {
  //     data: dataStatusDetailCustomer,
  //     loading: loadingStatus,
  //     updateData,
  //     // ... other properties returned by the useApi hook
  //   } = useApi(
  //     "http://210.245.108.202:3007/api/crm/customerdetails/editCustomer",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
  //     "POST",
  //     { cus_id: cusId, type: 1 }
  //   );

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const dataStatus = dataDetailCustomer?.data?.data1
    ? dataDetailCustomer?.data?.data1
    : dataDetailCustomer?.data?.data2;
  //   console.log(dataStatus?.status);

  const handleChangeApi = async (e: any, data: any) => {
    await fetch(
      "http://210.245.108.202:3007/api/crm/customerdetails/editCustomer",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8`, // Sử dụng Bearer token
          "Content-Type": "application/json", // Thêm header Content-Type
        },
        body: JSON.stringify({
          status: e.target.value,
          type: dataDetailCustomer?.data?.data1 ? 1 : 2,
          cus_id: cusId,
        }),
      }
    );
    console.log("heheheheh: ", {
      status: e.target.value,
      type: dataDetailCustomer?.data?.data1 ? 1 : 2,
      cus_id: cusId,
    });
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
