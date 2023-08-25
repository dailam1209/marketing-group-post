import { Key, useState } from "react";
import styles from "../potential/potential.module.css";
import { notification } from "antd";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");
export default function CustomerGroupSelectDropdownData({
  data,
  value = " Chọn người dùng",
  setValueOption,
  setValueGroupCustomer,
  cus_id,
  type,
}: any) {
  console.log("first,data", value);
  const handleClcikOptions = async (item: any) => {
    // const
    setValueOption(item.gr_name);
    const url = `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("group_id", item.gr_id);
    formData.append("type", type);
    formData.append("cus_id", cus_id);

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
      if (data?.error) {
        notification.error({ message: data.error.message });
      }
    } catch (error) {
      console.error(error);
    }
    // setidGr("item.gr_id");
    // console.log("check2", idGr);
    // setValueOption(item?.gr_name);
    // setValueGroupCustomer((pre: any) => {
    //   return {
    //     ...pre,
    //     groupParents: item?.gr_id,
    //   };
    // });
  };

  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{ width: "100%", display: "block" }}
      >
        <span
          className={`${styles.select2_search} ${styles.select2_search__dropdown}`}
        >
          <input
            className={styles.select2_search__field}
            type="search"
            tabIndex={0}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            role="textbox"
            style={{ height: "34px" }}
          />
        </span>
        <span className={styles.select2_results}>
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
            style={{ textAlign: "left", overflow: "scroll" }}
          >
            <li
              style={{fontSize:15,paddingLeft:18,fontWeight:500}}
              onClick={() => handleClcikOptions({gr_name:"Chưa cập nhật",gr_id:0})}
            >
              {"Chưa cập nhật"}
            </li>

            {data?.map((item: any, i: Key | null | undefined) => {
              if (item?.group_parent == 0) {
                return (
                  <button
                    key={i}
                    className={`${styles.select2_results__option}}`}
                    disabled
                    style={{
                      fontWeight: 1000,
                      marginTop: "10px",
                      padding: "5px 0",
                      paddingLeft: "18px",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    {item?.gr_name}
                  </button>
                );
              }
              if (item?.group_parent > 0) {
                return (
                  <li
                    key={i}
                    className={`${styles.select2_results__option}}`}
                    style={{
                      marginTop: "10px",
                      padding: "5px 0",
                      paddingLeft: "18px",
                      fontSize: "15px",
                    }}
                    onClick={() => handleClcikOptions(item)}
                  >
                    {item?.gr_id == value ? (
                      <div
                        style={{
                          backgroundColor: "#e0dcdc",
                          height: 50,
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        {item?.gr_name}
                      </div>
                    ) : (
                      <div>{item?.gr_name}</div>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        </span>
      </span>
    </span>
  );
}
