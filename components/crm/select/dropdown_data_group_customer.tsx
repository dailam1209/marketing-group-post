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
  const [focus,setFocus] = useState(false)
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
              style={{ fontSize: 15, paddingLeft: 18, fontWeight: 500 }}
              onClick={() =>
                handleClcikOptions({ gr_name: "Chưa cập nhật", gr_id: 0 })
              }
            >
              {"Chưa cập nhật"}
            </li>

            {data?.map((item: any, i: Key | null | undefined) => {
              return (
                <button
                  key={i}
                  className={`${styles.select2_results__option}}`}
                  style={{
                    marginTop: "10px",
                    padding: "5px 0",
                    paddingLeft: "18px",
                    color: "black",
                    fontSize: "15px",
                  }}
                >
                  <div style={{ display: "block" }}>
                    <div
                      style={{
                        width: "100%",
                        fontSize: 15,
                        paddingLeft: 18,
                        fontWeight: 800,
                        display: "flex",
                        float: "left",
                        paddingBottom: 20,
                        marginLeft: -20,
                      }}
                    >
                      {item?.gr_name}
                    </div>

                    {item?.gr_id == value ? (
                      <div
                        onClick={() => handleClcikOptions(item)}
                        style={{
                          backgroundColor: "#e0dcdc",
                          display: "flex",
                          float: "left",
                        }}
                      >
                        {item?.gr_name}
                      </div>
                    ) : (
                      <div
                        onClick={() => handleClcikOptions(item)}
                        style={{
                          display: "flex",
                          float: "left",
                          fontSize: "15px",
                        }}
                      >
                        {item?.gr_name}
                      </div>
                    )}
                  </div>

                  {item?.lists_child &&
                    item?.lists_child.map((itemc: any, index: number) => {
                      return (
                        <li

                          key={index}
                          onClick={() => handleClcikOptions(itemc)}
                          className={`${styles.select2_results__option} `}
                          style={{
                            display: "flex",
                            float: "left",
                            marginTop: "18px",
                            padding: "5px 0",
                            fontSize: "15px",
                          }}
                        >
                          {itemc?.gr_id == value ? (
                            <div
                              onClick={() => handleClcikOptions(itemc)}
                              style={{
                                backgroundColor: "#e0dcdc",
                                height: 40,
                                display: "flex",
                                float: "left",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              {itemc?.gr_name}
                            </div>
                          ) : (
                            <div
                              onClick={() => handleClcikOptions(itemc)}
                              style={{
                                display: "flex",
                                float: "left",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              {itemc?.gr_name}
                            </div>
                          )}
                        </li>
                      );
                    })}
                </button>
              );
            })}
          </ul>
        </span>
      </span>
    </span>
  );
}
