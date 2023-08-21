import React, { useEffect, useState } from "react";
import style from "@/components/crm/customer/customer.module.css";
import { Checkbox, Input, Select } from "antd";
import Cookies from "js-cookie";
import { base_url } from "../../service/function";

type Props = {};

const Bot_textEditor = ({ dataAdd, setDataAdd }: any) => {
  const [listNV, setlistNV] = useState([]);
  const [listGr, setListGr] = useState([]);
  const [listGr_Child,setlistGr_Child] = useState([])
  const handleGetNV = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setlistNV(data?.data?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleGetGr = async () => {
    try {
      const res = await fetch(
       `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setListGr(data?.data?.showGr);
    } catch (error) {
      console.log("error:", error);
    }
  };
const handleSelecGrParent = (value) =>{
console.log(value)
}
  useEffect(() => {
    handleGetNV();
    handleGetGr();
  }, []);

  return (
    <div className={style.container_bot}>
      <div className={style.top_bot}>
        <div className={style.left}>
          <div
            style={{
              padding: "10  px 5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className={style.titlebot}>Nhóm khách hàng cha</div>
            <div>
              <Checkbox />
              <b>&nbsp;</b>
              Ghim nhóm
            </div>
          </div>
          <Select
            style={{ fontWeight: 1000, width: "100%" }}
            placeholder="Chọn nhóm khách hàng cha"
            onChange={handleSelecGrParent}
          >
            {" "}
            {listGr?.map((item, index) => {
              return (
                <option key={index} value={item?.gr_id}>
                  {item?.gr_name}
                </option>
              );
            })}
          </Select>
        </div>
        <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div>
        <div className={style.right}>
          <div className={style.titlebot}>Nhân viên nhập liệu</div>
          <Select
            style={{ fontWeight: 1000, width: "100%" }}
            placeholder="Chọn nhân viên nhập liệu"
            value={dataAdd?.user_create_id}
            onChange={(value) =>
              setDataAdd({ ...dataAdd, user_create_id: value })
            }
          >
            {listNV?.map((item, index) => {
              return (
                <option key={index} value={item?.idQLC}>
                  ({item?.idQLC}) {item?.userName}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
      <div>
        <div className={style.bot_bot}>
          <div
            style={{
              padding: "10px 5px",
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <div className={style.titlebot}>Nhóm khách hàng con</div>
            <div>
              <Checkbox />
              <b>&nbsp;</b>
              Ghim nhóm
            </div>
          </div>
          <Select
            style={{ fontWeight: 1000, width: "50%" }}
            placeholder="Chọn nhóm khách hàng con"
          >
                {listGr?.map((item, index) => {
              return (
                <option key={index} value={item?.gr_id}>
                  {item?.gr_name}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Bot_textEditor;
