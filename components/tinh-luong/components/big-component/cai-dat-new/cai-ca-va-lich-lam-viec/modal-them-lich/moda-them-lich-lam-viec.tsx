import { Modal, Input, Select, Button, Form, Checkbox } from "antd";
import styles from "./modal-them-lich.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GET } from "@/components/tinh-luong/components/api/BaseApi";
import { ModalThemCa } from "../modal/modal-them-ca";
import { domain, domainQLC } from "../../../../api/BaseApi";

export function ModalTiepTuc(
  open: boolean,
  setOpen: Function,
  setBack: Function,
  setNext: Function,
  form: any,
  setInitialAllCheck: Function
) {
  function getDaysInMonth(year: number, month: number): Date[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    const daysArray: Date[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }
  const getDaysAfterDate = (
    year: number,
    month: number,
    day: number
  ): Date[] => {
    const startDate = new Date(year, month - 1, day); // Create a date after the provided day
    const endDate = new Date(year, month, 0); // Get the last day of the month

    const daysArray: Date[] = [];

    while (startDate <= endDate) {
      daysArray.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return daysArray;
  };
  const formatDate = (date: Date = new Date()): string => {
    const year = date?.toLocaleString("default", { year: "numeric" });
    const month = date?.toLocaleString("default", { month: "2-digit" });
    const day = date?.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  const [applyMonth, setApplyMonth] = useState(
    form?.getFieldValue("apply_month")
  );

  const [allCheck, setAllCheck]: any = useState({});
  const [AllDaysInMonths, setAllDaysInMonths] = useState(
    getDaysInMonth(
      Number(applyMonth?.substring(0, 4)),
      Number(applyMonth?.substring(5, 7)) - 1
    )
  );
  const [listShift, setListShift] = useState([]);
  const [listCheck, setListCheck]: any = useState([]);

  const checkCa = () => {
    const onChange = async (key: string) => {
      listCheck.includes(key)
        ? setListCheck(listCheck.filter((d: any) => d !== key))
        : setListCheck([...listCheck, key]);
    };
    const checked = (key: any): boolean => listCheck.includes(key);
    const checkComponent = (key: string, content: string) => (
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

        <div>
          <ul className={styles.listli}>
            {listShift?.map((d: any) => checkComponent(d.key, d.content))}
          </ul>
        </div>
      </div>
    );
  };

  AllDaysInMonths.map((item, index) => {
    // console.log("Test Format Date: ", formatDate(item));
  });

  useEffect(
    () => setApplyMonth(form?.getFieldValue("apply_month")),
    [form?.getFieldValue("apply_month")]
  );
  useEffect(
    () =>
      setAllDaysInMonths(
        getDaysAfterDate(
          Number(applyMonth?.substring(0, 4)),
          Number(applyMonth?.substring(5, 7)),
          Number(applyMonth?.substring(8))
        )
      ),
    [applyMonth]
  );
  useEffect(() => {
    AllDaysInMonths.map((item, index) => {
      setAllCheck((allCheck) => {
        return { ...allCheck, [formatDate(item)]: listCheck };
      });
    });
  }, [AllDaysInMonths, listCheck]);
  useEffect(() => {
    setInitialAllCheck(allCheck);
  }, [allCheck]);

  useEffect(() => {
    GET(`${domainQLC}/api/qlc/shift/list`).then((res) => {
      if (res?.result === true) {
        console.log("listShiftTest:", res?.items);
        setListShift(
          res?.items.map((item) => {
            return {
              key: `${item?.shift_id}`,
              content: item?.shift_name,
            };
          })
        );
      }
    });
  }, []);
  // console.log(
  //   "getDaysAfterDate:",
  //   getDaysAfterDate(
  //     Number(applyMonth?.substring(0, 4)),
  //     Number(applyMonth?.substring(5, 7)),
  //     Number(applyMonth?.substring(8))
  //   )
  // );
  // console.log("applyMonth ở Modal Tiếp tục:", applyMonth);
  // console.log("AllDaysInMonth: ", AllDaysInMonths);
  // console.log("AllCheck ở Modal Tiếp tục", allCheck);
  // console.log("listShift ở Modal Tiếp tục", listShift);
  // console.log("listCheck ở Modal Tiếp tục", listCheck);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới lịch làm việc</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div style={{ padding: "20px 20px 0px 20px", fontSize: "16px" }}>
        {/* <div className={styles.bodyItem}>
          Chọn ca làm việc <br />
          Bạn cần thiết lập ca làm việc{" "}
          <Link href={"/quan-ly-cong-ty/quan-ly-ca"} style={{ color: "red" }}>
            tại đây{" "}
          </Link>
          trước
        </div> */}

        <Form.Item name={"cy_detail"}>
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "16px" }}> {checkCa()}</div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
          </div>
        </Form.Item>
        <div className={`${styles.bodyItem} ${styles.bodyItemNext}`}>
          <button
            className={styles.ButtonWhite}
            onClick={() => {
              setOpen(false);
              setBack(true);
            }}
          >
            <img src="/quay_lai.png" alt="/" />
            <p className={styles.text}>Quay lại</p>
          </button>
          <button
            className={styles.Button}
            onClick={() => {
              setNext(true);
              setOpen(false);
            }}
          >
            <p className={styles.txt}>Tiếp tục</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ModalThemLichLamViec(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  data: any,
  setData: Function,
  setCySelected: Function,
  formData: any
) {
  const [form, setForm]: any = useState(formData);

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString("default", { year: "numeric" });
    const month = date?.toLocaleString("default", { month: "2-digit" });
    const day = date?.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  const getDaysInMonth = (month, year) => {
    var date: Date = new Date(year, month, 1);
    var days = Array<any>();
    while (date.getMonth() === month) {
      days.push({ date: formatDate(date), shift_id: "" });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleNext = () => {
    form.validateFields().then((value) => {
      setOpen(false);
      setNext(true);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thêm mới lịch làm việc</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form}>
          <Form.Item
            name={"cy_name"}
            label="Tên lịch làm việc"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]}
          >
            <Input
              placeholder="Nhập tên"
              className={styles.input}
              // onChange={(value)=>setData({...data,name:value.target.value})}
            ></Input>
          </Form.Item>
          <Form.Item
            initialValue={"T2T7"}
            name={"type"}
            label="Chọn lịch làm việc"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]}
          >
            <Select
              className={styles.input}
              style={{ width: "100%" }}
              suffixIcon={<img src="/down-icon.png"></img>}
              options={[
                {
                  label: "Thứ 2 - Thứ 6",
                  value: "T2T6",
                },
                {
                  label: "Thứ 2 - Thứ 7",
                  value: "T2T7",
                },
                {
                  label: "Thứ 2 - CN",
                  value: "T2CN",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            name={"month_add"}
            label="Tháng áp dụng"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]}
          >
            <Input
              placeholder="Chọn tháng"
              type="month"
              className={styles.input}
              // onChange={(value)=>setData({...data,month:value.target.value})}
            ></Input>
          </Form.Item>
          <Form.Item
            name={"apply_month"}
            label="Ngày bắt đầu làm việc"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]}
          >
            <Input
              placeholder="dd/mm/yyyy"
              type="date"
              className={styles.input}
              onChange={(e) =>
                form.setFieldValue("month_add", e.target.value.substring(0, 7))
              }
              // onChange={(value)=>setData({...data,date:value.target.value})}
            ></Input>
          </Form.Item>
          <div className={styles.hasButton}>
            <button className={styles.Button} onClick={handleNext}>
              Tiếp tục
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
