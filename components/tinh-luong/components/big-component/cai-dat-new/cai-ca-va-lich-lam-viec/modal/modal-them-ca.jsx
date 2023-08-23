import { Checkbox, Modal, List, Button, Form } from "antd";
import styles from "./modal-them-ca.module.css";
import { useState, useEffect } from "react";
import _, { divide } from "lodash";
import { GET, POST } from "@/components/tinh-luong/components/api/BaseApi";
import { useRouter } from "next/router";

const TYPE_NOTFULL = "T2T6";
const TYPE_MALFULL = "T2T7";
const TYPE_FULL = "T2CN";

//! Cai nay la gi ?
function dates(current) {
  let month = new Array();
  let m = current.getMonth();
  current.setDate(current.getDate() - current.getDay());
  do {
    month.push(new Date(current));
    current.setDate(current.getDate() + 1);
    //console.log(current)
  } while (current.getMonth() <= m || current.getDay() != 0);
  return month;
}

//! Cai nay de lam gi ? Lọc ngày chăng ?
function filterDate(item, type) {
  switch (type) {
    case TYPE_FULL:
      return true;
    case TYPE_MALFULL:
      return item.getDay() === 0 ? false : true;
    case TYPE_NOTFULL:
      return item.getDay() === 0 || item.getDay() === 6 ? false : true;
  }
}

// Ca cuc nay chi dung de tao cai minh dang muon ? ??
export function ModalThemCa(
  open,
  setOpen,
  setBack,
  form,
  handleSubmitAddCy,
  type,
  initialAllCheck
) {
  //! allCheck là 1 mảng ghi dữ liệu các ngày đã check
  //! list Check là state thể hiện cái ngày mk đang chọn có những ca check nào
  //! listShift là tổng số ca làm việc mà chúng ta có thể có
  //!Current ??

  console.log("Initial All Check at Modal Them Ca", initialAllCheck);
  const [listShift, setListShift] = useState([]);
  const [applyMonth, setApplyMonth] = useState(
    form?.getFieldValue("apply_month")
  );
  const [current, setCurrent] = useState(new Date());
  const [firstDate, setFirstDate] = useState(new Date());
  const [listCheck, setListCheck] = useState([]);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck] = useState(initialAllCheck);
  // const [allCheck, setAllCheck] = useState({
  //   ["2023-08-23"]: ["2236", "2607"],
  // });
  const [month, setMonth] = useState(dates(new Date()));
  console.log("month: ", month);

  useEffect(() => {
    setAllCheck(initialAllCheck);
  }, [initialAllCheck]);
  console.log("allCheck ở Modal Thêm ca:", allCheck);
  console.log("listCheck: ", listCheck);
  console.log("Current: ", current);
  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString("default", { year: "numeric" });
    const month = date?.toLocaleString("default", { month: "2-digit" });
    const day = date?.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };
  console.log("Format Date Current: ", formatDate(current));

  useEffect(() => {
    // console.log("Apply Month: ", applyMonth);
    if (applyMonth?.length > 0) {
      setCurrent(
        new Date(
          Number(applyMonth?.substring(0, 4)),
          Number(applyMonth?.substring(5, 7)) - 1,
          1
        )
      );
      setFirstDate(
        new Date(
          Number(applyMonth?.substring(0, 4)),
          Number(applyMonth?.substring(5, 7)) - 1,
          Number(applyMonth?.substring(8))
        )
      );
      setMonth(
        dates(
          new Date(
            Number(applyMonth?.substring(0, 4)),
            Number(applyMonth?.substring(5, 7)) - 1,
            1
          )
        )
      );
      setOpenCheck(true);
    }
  }, [applyMonth]);

  useEffect(() => {
    setApplyMonth(form.getFieldValue("apply_month"));
  }, [form.getFieldValue("apply_month")]);

  useEffect(() => {
    GET("http://210.245.108.202:3000/api/qlc/shift/list").then((res) => {
      if (res?.result === true) {
        setListShift(
          res?.list.map((item) => {
            return {
              key: `${item?.shift_id}`,
              content: item?.shift_name,
            };
          })
        );
      }
    });
  }, []);

  // an nut thi lam gi ?
  const handleSubmit = () => {
    // handleSubmitAddCy()
    // change typical allCheck data from {"2023-06-02": [12,13]} to [{date: "2023-06-02", shift_id: "12,13"}]
    const details = Object.entries(allCheck)
      .filter((item) => new Date(item[0]) >= firstDate)
      .map((item) => {
        return {
          date: item[0],
          shift_id: item[1].join(","),
        };
      });

    form.setFieldValue("cy_detail", details);
    handleSubmitAddCy();
    setOpen(false);
  };

  //! listCheck là ca
  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);
  useEffect(() => {
    setListCheck(
      !(formatDate(current) in allCheck) ? [] : allCheck[formatDate(current)]
    );
    if (formatDate(current) in allCheck) {
      console.log(
        `allCheck at ${formatDate(current)}: `,
        allCheck[formatDate(current)]
      );
    }
  }, [current]);

  // Calendar ??
  const Calender = (dates) => (
    <div className={styles.day}>
      <div>
        {/* Hinh nhu day la cai lich ?  */}
        <List
          className={styles.list}
          header={
            <div className={styles.header}>
              <div className={styles.dayname}> CN</div>
              <div className={styles.dayname}>Thứ 2</div>
              <div className={styles.dayname}>Thứ 3</div>
              <div className={styles.dayname}>Thứ 4</div>
              <div className={styles.dayname}>Thứ 5</div>
              <div className={styles.dayname}>Thứ 6</div>
              <div className={styles.dayname}>Thứ 7</div>
            </div>
          }
          grid={{
            column: 7,
          }}
          dataSource={dates.map((d) => d)}
          renderItem={(item, index) => {
            const onClick = () => {
              setCurrent(item);
              setOpenCheck(true);
            };
            // console.log(listCheck)
            // console.log(allCheck)
            return (
              <List.Item key={index} style={{ padding: "10px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => onClick()}
                    className={`${styles.cover} ${
                      styles[
                        _.isEqual(
                          `${item?.getDate()} ${item?.getMonth()}`,
                          `${current?.getDate()} ${current?.getMonth()}`
                        )
                          ? "active"
                          : item >= firstDate &&
                            item.getMonth() ===
                              Number(applyMonth?.substring(5, 7) - 1) &&
                            filterDate(item, type)
                          ? "choose"
                          : item.getMonth() ===
                            Number(applyMonth?.substring(5, 7) - 1)
                          ? "normal"
                          : "disable"
                      ]
                    } `}
                  >
                    {item.getDate()}
                  </span>
                  <span
                    className={`
                                        ${
                                          styles[
                                            allCheck[formatDate(item)] &&
                                            allCheck[formatDate(item)].length >
                                              0
                                              ? "count_base"
                                              : "count_none"
                                          ]
                                        } 
                                        ${
                                          styles[
                                            _.isEqual(
                                              `${item?.getDate()} ${item?.getMonth()}`,
                                              `${current?.getDate()} ${current?.getMonth()}`
                                            )
                                              ? "count_red"
                                              : "count_blue"
                                          ]
                                        }
                                    `}
                  >
                    {allCheck[formatDate(item)] &&
                      allCheck[formatDate(item)].length}
                  </span>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );

  // Checkbox ??
  const checkCa = () => {
    const onChange = async (key) => {
      listCheck.includes(key)
        ? setListCheck(listCheck.filter((d) => d !== key))
        : setListCheck([...listCheck, key]);
    };
    const checked = (key) => listCheck.includes(key);
    const checkComponent = (key, content) => (
      <li>
        <Checkbox
          key={key}
          className={styles.checkbox}
          onChange={() => onChange(key)}
          checked={checked(key)}
        ></Checkbox>
        {content}
      </li>
    );
    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "5px", color: "red" }}>
          Chọn vào ngày bên trên sau đó tích vào ca làm việc bên dưới để chọn ca
          làm việc tương ứng với ngày hôm đó.
        </div>
        <div style={{ marginBottom: "5px" }}>
          Ca làm việc trong ngày {current?.getDate()}-{current?.getMonth() + 1}-
          {current?.getFullYear()}
        </div>
        <div>
          <ul className={styles.listli}>
            {listShift?.map((d) => checkComponent(d.key, d.content))}
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        setAllCheck({});
      }}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form.Item name={"cy_detail"}>
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>
            Tháng {applyMonth?.substring(5, 7)}/{applyMonth?.substring(0, 4)}
          </div>
          <div>{Calender(month)}</div>
          <div style={{ fontSize: "16px" }}>{openCheck && checkCa()}</div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className={styles.button_white}
              onClick={() => {
                setOpen(false), setBack(true);
              }}
            >
              <img src="/quay_lai.png" alt="" />
              <p
                style={{
                  color: "#4C5BD4",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                Quay lại
              </p>
            </button>
            <button className={styles.button} onClick={handleSubmit}>
              <p style={{ color: "white", fontSize: "18px" }}>Tạo chu kì</p>
            </button>
          </div>
        </div>
      </Form.Item>
    </Modal>
  );
}
export function ModalChinhSua_Them({ data, form, setOpen }) {
  const [current, setCurrent] = useState(new Date(2023, 6, 1));
  const [listCheck, setListCheck] = useState([]);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck] = useState({});
  const [listShift, setListShift] = useState([]);
  // const [date, setDate]:any = useState(new Date(2023,6,1))
  //console.log(new Date(data?.apply_month))

  const router = useRouter();

  useEffect(() => {
    GET("http://210.245.108.202:3000/api/qlc/shift/list").then((res) => {
      if (res?.result === true) {
        setListShift(
          res?.list.map((item) => {
            return {
              key: `${item?.shift_id}`,
              content: item?.shift_name,
            };
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCurrent(
        new Date(
          Number(data?.apply_month?.substring(0, 4)),
          Number(data?.apply_month?.substring(5, 7)) - 1
        ),
        1
      );

      let obj = {};
      data?.cy_detail?.map((item) => {
        obj = {
          ...obj,
          [item["date"]]:
            item["shift_id"] === "" ? [] : item["shift_id"].split(","),
        };
      });
      console.log(obj);

      setAllCheck(obj);
    }
  }, [data]);

  const formatDate = (date = new Date()) => {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  let date = new Date(2023, 6, 1);
  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
    setOpenCheck(true);
  }, []);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);

  useEffect(() => {
    setListCheck(
      !(formatDate(current) in allCheck) ? [] : allCheck[formatDate(current)]
    );
    if (formatDate(current) in allCheck) {
      console.log(allCheck[formatDate(current)]);
    }
  }, [current]);

  if (data?.apply_month) {
    date = new Date(data?.apply_month);
  }

  const Calender = (dates) => (
    <div className={styles.day}>
      <div>
        <List
          className={styles.list}
          header={
            <div className={styles.header}>
              <div className={styles.dayname}> CN</div>
              <div className={styles.dayname}>Thứ 2</div>
              <div className={styles.dayname}>Thứ 3</div>
              <div className={styles.dayname}>Thứ 4</div>
              <div className={styles.dayname}>Thứ 5</div>
              <div className={styles.dayname}>Thứ 6</div>
              <div className={styles.dayname}>Thứ 7</div>
            </div>
          }
          grid={{
            column: 7,
          }}
          dataSource={dates.map((d) => d)}
          renderItem={(item, index) => {
            const onClick = () => {
              setCurrent(item);
              setOpenCheck(true);
            };
            // console.log(listCheck)
            // console.log(allCheck)
            return (
              <List.Item key={index} style={{ padding: "10px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => onClick()}
                    className={`${styles.cover} ${
                      styles[
                        _.isEqual(item, current)
                          ? "active"
                          : item.getMonth() ===
                            Number(data?.apply_month.substring(5, 7)) - 1
                          ? "choose"
                          : "normal"
                      ]
                    } `}
                  >
                    {item.getDate()}
                  </span>
                  <span
                    className={`${
                      styles[
                        allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0
                          ? "count_base"
                          : "count_none"
                      ]
                    }`}
                  >
                    {allCheck[formatDate(item)] &&
                      allCheck[formatDate(item)].length}
                  </span>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
  const checkCa = () => {
    const onChange = async (key) => {
      listCheck.includes(key)
        ? setListCheck(listCheck.filter((d) => d !== key))
        : setListCheck([...listCheck, key]);
    };
    const checked = (key) => listCheck.includes(key);
    const checkComponent = (key, content) => (
      <li>
        <Checkbox
          key={key}
          className={styles.checkbox}
          onChange={() => onChange(key)}
          checked={checked(key)}
        ></Checkbox>
        {content}
      </li>
    );
    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "5px", color: "red" }}>
          Chọn vào ngày bên trên sau đó tích vào ca làm việc bên dưới để chọn ca
          làm việc tương ứng với ngày hôm đó.
        </div>
        <div style={{ marginBottom: "5px" }}>
          Ca làm việc trong ngày {current?.getDate()}-{current?.getMonth() + 1}-
          {current?.getFullYear()}
        </div>
        <div>
          <ul className={styles.listli}>
            {listShift?.map((d) => checkComponent(d.key, d.content))}
          </ul>
        </div>
      </div>
    );
  };

  let month = dates(date);

  const handleSubmit = () => {
    // change typical allCheck data from {"2023-06-02": [12,13]} to [{date: "2023-06-02", shift_id: "12,13"}]
    const details = Object.entries(allCheck)
      .filter(
        (item) =>
          new Date(item[0]).getMonth() + 1 ===
          Number(data?.apply_month?.substring(5, 7))
      )
      .map((item) => {
        return {
          date: item[0],
          shift_id: item[1].join(","),
        };
      });

    form.validateFields().then((value) => {
      POST("http://210.245.108.202:3000/api/qlc/cycle/editapi/qlc/cycle/edit", {
        cy_id: data?.cy_id,
        cy_name: form.getFieldValue("cy_name"),
        apply_month: data?.apply_month,
        cy_detail: JSON.stringify(details),
      }).then((res) => {
        if (res?.result === true) {
          alert(res?.message);
          setOpen(false);
          router.replace(router.asPath);
        }
      });
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form.Item name={"cy_name"}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>
          Tháng {data?.apply_month?.substring(5, 7)}/
          {data?.apply_month?.substring(0, 4)}
        </div>
      </Form.Item>
      <div>{Calender(month)}</div>
      <div style={{ fontSize: "16px" }}>{openCheck && checkCa()}</div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Button
          style={{ backgroundColor: "#4C5BD4", width: "100%", height: "auto" }}
          onClick={handleSubmit}
        >
          <p className={styles.buttonTxt}>Lưu lại</p>
        </Button>
      </div>
    </div>
  );
}
