import { Key, useEffect, useState } from "react";
import styles from "../potential/potential.module.css";
import { notification } from "antd";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");
export default function CustomerGroupSelectDropdownData({
  data,
  value,
  setValueOption,
  setValueGroupCustomer,
  cus_id,
  type,
  setValueFilter,
  valueFilter,
}: any) {
  const [focus, setFocus] = useState(false);
  const [filterData, setFilterData] = useState(data);

  const handleChange = (e) => {
    setValueFilter(e.target.value);
  };

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
  };
  let arr = [];
  const listC = data?.map((item) => {
    if (item?.lists_child) {
      item?.lists_child.map((itemc) => {
        arr.push(itemc);
      });
    }
  });
  function removeVietnameseDiacritics(str) {
    str = str.toLowerCase();
    // Dùng bảng mã Unicode để thay thế các ký tự có dấu
    str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a");
    str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e");
    str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i");
    str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o");
    str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
    str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
    str = str.replace(/đ/g, "d");
    // Loại bỏ các ký tự khác
    str = str.replace(/[^a-z0-9\s]/g, "");
    // Loại bỏ dấu cách thừa
    str = str.replace(/\s+/g, " ").trim();
    return str;
  }
  useEffect(() => {
    const newData = data?.filter((item) => {
      return removeVietnameseDiacritics(item.gr_name)?.includes(
        removeVietnameseDiacritics(valueFilter)
      );
    });
    const newData2 = arr?.filter((item) => {
      return removeVietnameseDiacritics(item.gr_name)?.includes(
        removeVietnameseDiacritics(valueFilter)
      );
    });
    if (newData[0]?.lists_child) {
      setFilterData(newData);
    } else {
      setFilterData(newData2);  
    }
  }, [valueFilter]);

  ///sua file nay
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
            value={valueFilter}
            onChange={handleChange}
            tabIndex={0}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            role="textbox"
            style={{ height: "34px" }}
          />
        </span>
        <span
          style={{ overflow: "scroll", height: 200 }}
          className={styles.select2_results}
        >
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
            style={{ textAlign: "left", overflow: "scroll" }}
          >
            <li
              className="select2-results__option"
              onClick={() =>
                handleClcikOptions({ gr_name: "Chưa cập nhật", gr_id: 0 })
              }
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#4c5bd4";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "black";
              }}
            >
              {"Chưa cập nhật"}
            </li>

            {valueFilter === ""
              ? data?.map((item: any, i: Key | null | undefined) => {
                  return (
                    <span className="select2-results">
                      <ul className="select2-results__options">
                        <li className="select2-results__option" role="group">
                          <strong className="select2-results__group">
                            <li>{item?.gr_name}</li>
                          </strong>
                          <ul className="select2-results__options select2-results__options--nested">
                            {item?.gr_id == value ? (
                              <li
                                onMouseOver={(e) => {
                                  e.currentTarget.style.background = "#4c5bd4";
                                  e.currentTarget.style.color = "#fff";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.background = "none";
                                  e.currentTarget.style.color = "black";
                                }}
                                className="select2-results__option"
                                onClick={() => handleClcikOptions(item)}
                              >
                                {item?.gr_name}
                              </li>
                            ) : (
                              <li
                                onMouseOver={(e) => {
                                  e.currentTarget.style.background = "#4c5bd4";
                                  e.currentTarget.style.color = "#fff";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.background = "none";
                                  e.currentTarget.style.color = "black";
                                }}
                                style={{ marginBottom: -5 }}
                                className="select2-results__option"
                                onClick={() => handleClcikOptions(item)}
                              >
                                {item?.gr_name}
                              </li>
                            )}

                            <li className="select2-results__option">
                              {item?.lists_child &&
                                item?.lists_child.map(
                                  (itemc: any, index: number) => {
                                    return (
                                      <li
                                        style={{ paddingTop: 5 }}
                                        key={index}
                                        onClick={() =>
                                          handleClcikOptions(itemc)
                                        }
                                        className={`${styles.select2_results__option} `}
                                      >
                                        {itemc?.gr_id == value ? (
                                          <li
                                            onClick={() =>
                                              handleClcikOptions(itemc)
                                            }
                                            style={{
                                              background: "#ddd",
                                              height: "auto",
                                            }}
                                          >
                                            {itemc?.gr_name}
                                          </li>
                                        ) : (
                                          <li
                                            onMouseOver={(e) => {
                                              e.currentTarget.style.background =
                                                "#4c5bd4";
                                              e.currentTarget.style.color =
                                                "#fff";
                                            }}
                                            onMouseOut={(e) => {
                                              e.currentTarget.style.background =
                                                "none";
                                              e.currentTarget.style.color =
                                                "black";
                                            }}
                                            onClick={() =>
                                              handleClcikOptions(itemc)
                                            }
                                          >
                                            {itemc?.gr_name}
                                          </li>
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </span>
                  );
                })
              : filterData?.map((item: any, i: Key | null | undefined) => {
                  return (
                    <span className="select2-results">
                      <ul className="select2-results__options">
                        <li className="select2-results__option" role="group">
                          <ul className="select2-results__options select2-results__options--nested">
                            {
                              <li
                                // onMouseOver={(e) => {
                                //   e.currentTarget.style.background = "#4c5bd4";
                                //   e.currentTarget.style.color = "#fff";
                                // }}
                                // onMouseOut={(e) => {
                                //   e.currentTarget.style.background = "none";
                                //   e.currentTarget.style.color = "black";
                                // }}
                                style={{ marginBottom: -5 }}
                                className="select2-results__option"
                                onClick={() => handleClcikOptions(item)}
                              >
                             <strong> {data?.filter(itemcha=>itemcha.gr_id===item?.group_parent)[0]?.gr_name} </strong> 
                                <li
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.background = "#4c5bd4";
                                    e.currentTarget.style.color = "#fff";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.background = "none";
                                    e.currentTarget.style.color = "black";
                                  }}
                                  style={{ marginBottom: -5 }}
                                  className="select2-results__option"
                                  onClick={() => handleClcikOptions(item)}
                                >
                                  {item?.gr_name}
                                </li>
                              </li>
                            }
                          </ul>
                        </li>
                      </ul>
                    </span>
                  );
                })}

            {/* <span className="select2-results">
                  <ul
                    className="select2-results__options"
                  >
                    <li
                      className="select2-results__option"
                      role="group"
                      aria-label="Nhập liệu"
                    >
                      <strong className="select2-results__group">
                        Nhập liệu
                      </strong>
                      <ul className="select2-results__options select2-results__options--nested">
                        <li
                          className="select2-results__option"
                          id="select2-dso4-result-z0kc-190"
                          role="treeitem"
                          aria-selected="false"
                          data-select2-id="select2-dso4-result-z0kc-190"
                        >
                          Nhập liệu
                        </li>
                        <li
                          className="select2-results__option"
                          id="select2-dso4-result-cds9-200"
                          role="treeitem"
                          aria-selected="false"
                          data-select2-id="select2-dso4-result-cds9-200"
                        >
                          1. Ứng viên chưa sàng lọc cần gọi trong ngày
                        </li>
                        <li
                          className="select2-results__option select2-results__option--highlighted"
                          id="select2-dso4-result-nz0y-201"
                          role="treeitem"
                          aria-selected="true"
                          data-select2-id="select2-dso4-result-nz0y-201"
                        >
                          2. Ứng viên sẽ gọi lại
                        </li>
                        <li
                          className="select2-results__option"
                          id="select2-dso4-result-s5cq-202"
                          role="treeitem"
                          aria-selected="false"
                          data-select2-id="select2-dso4-result-s5cq-202"
                        >
                          4. Ứng viên không có nhu cầu tìm việc nữa
                        </li>
                        <li
                          className="select2-results__option"
                          id="select2-dso4-result-oyxu-203"
                          role="treeitem"
                          aria-selected="false"
                          data-select2-id="select2-dso4-result-oyxu-203"
                        >
                          3. Ứng viên đã hỗ trợ xong và được nhập vào admin
                        </li>
                      </ul>
                    </li>
                  </ul>
                </span> */}
          </ul>
        </span>
      </span>
    </span>
  );
}
