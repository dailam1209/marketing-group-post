import React, { useEffect, useState } from "react";
import style from "@/components/crm/customer/customer.module.css";
import { Checkbox, Input, Select } from "antd";
import Cookies from "js-cookie";

type Props = {};

const Bot_textEditor = ({dataAdd,setDataAdd}: any) => {
  const [listNV, setlistNV] = useState([]);
  const handleGetNV = async () => {
    const res = await fetch(
      "http://210.245.108.202:3000/api/qlc/managerUser/list",
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
  };
  useEffect(() => {
    handleGetNV();
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
          >
            <option value="">Khách hàng cha 1</option>
            <option value="">Khách hàng cha 2</option>
            <option value="">Khách hàng cha 3</option>
          </Select>
        </div>
        <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div>
        <div className={style.right}>
          <div className={style.titlebot}>Nhân viên nhập liệu</div>
          <Select
            style={{ fontWeight: 1000, width: "100%" }}
            placeholder="Chọn nhân viên nhập liệu"
            value={dataAdd?.user_create_id}
            onChange={(value) => setDataAdd({...dataAdd,user_create_id:value})}
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
            <option value="">Khách hàng con 1</option>
            <option value="">Khách hàng con 2</option>
            <option value="">Khách hàng con 3</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Bot_textEditor;
