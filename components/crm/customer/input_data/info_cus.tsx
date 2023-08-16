import React from "react";
import style from "@/components/crm/customer/customer.module.css";
import { Select } from "antd";

type Props = {};

const Info_cus = (props: Props) => {
  return (
    <div className={style.container_info_input_add}>
      <div className={style.legendIP}>
        <div className={style.title}>
          Số điện thoại <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập số điện thoại"
          />{" "}
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Email <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập Email"
          ></input>{" "}
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Tên khách hàng <b>*</b>
        </div>
        <div>
          <input
            className={style.form_control}
            placeholder="Nhập tên khách hàng"
          ></input>{" "}
        </div>
      </div>

      <div className={style.legendIP}>
        <div className={style.title}>
          Tên nguồn khách hàng <b>*</b>
        </div>
        <Select placeholder="Chọn nguồn khách hàng"></Select>
      </div>
    </div>
  );
};

export default Info_cus;
