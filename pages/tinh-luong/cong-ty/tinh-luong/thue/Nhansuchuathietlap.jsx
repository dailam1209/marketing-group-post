import React, { useEffect, useState } from "react";
import styles from "./chuathietlap.module.css";
import { Button, Modal, Select, Table, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

import {
  MonthData,
  YearData,
} from "../../../../../components/tinh-luong/components/Data/SelectionData";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

const Nhansuchuathietlap = () => {
  const [form] = Form.useForm();
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const monthFormat = "MM";
  const yearFormat = "YYYY";

  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const fetchApiData = (month, year, idQlc, dep_id, ep_id) => {
    axios
      .post(`${domain}/api/tinhluong/congty/show_list_user_no_tax`, {
        token: token,
        cls_id_com: cp,
        start_date: `${year}/${month}/01`,
        end_date: `${month === 12 ? year + 1 : year}/${
          month === 12 ? 1 : month + 1
        }/01`,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, []);
  console.log("123", apiData);

  const handleMonthChange = (monthString) => {
    setSelectedMonth(dayjs(monthString, monthFormat));
  };

  const handleYearChange = (yearString) => {
    setSelectedYear(dayjs(yearString, yearFormat));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const columns = [
    {
      title: "",
      render: (record) => (
        <div className={styles.render}>
          <div>
            <Image
              alt="/"
              src={"/tinhluong/tien.png"}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <p className={styles.p_style}>{record?.userName}</p>
            <p className={styles.text}>ID: {record?.idQLC}</p>
            <p className={styles.text}>Phòng 13</p>
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "text",
      render: (text) => (
        <div>
          <button className={styles.setting} onClick={showModalTimeConfirm}>
            <Image
              alt="/"
              src={"/tinhluong/setting.png"}
              width={18}
              height={18}
            />
            {text}
          </button>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      text: "Thiết lập",
    },
    {
      key: "2",
      name: "Jim Green",
      text: "Thiết lập",
    },
    {
      key: "3",
      name: "Joe Black",
      text: "Thiết lập",
    },
  ];

  const [ModalTimeOpen, setModalTimeOpen] = useState(false);
  const showModalTimeConfirm = () => {
    setModalTimeOpen(true);
  };
  const hanleModalTimeCancer = () => {
    setModalTimeOpen(false);
  };
  const filterUnique = (input, name) => {
    const uniqueIds = [];
    return input?.filter((element) => {
      const isDuplicate = uniqueIds?.includes(element?.[name]);
      if (!isDuplicate) {
        uniqueIds?.push(element?.[name]);
        return true;
      }
      return false;
    });
  };
  const onFinish = async (val) => {
    form.setFieldValue("fromTo", [
      dayjs(`${val?.year}-${val?.month - 1}-01`),
      dayjs(`${val?.year}-${val?.month}-01`),
    ]);
    setSelectedYear(val?.year);
    setSelectedMonth(val?.month);
    await fetchApiData(
      selectedMonth,
      selectedYear,
      val?.name,
      val?.dep_id,
      val?.name
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Danh sách nhân viên chưa thiết lập thuế</h3>
        </div>
        <div className={styles.select_time}>
          <Form
            onFinish={onFinish}
            form={form}
            className={styles.form}
            initialValues={{ year: selectedYear, month: selectedMonth }}
          >
            <Form.Item name={"month"} className={styles.formItem}>
              <Select
                className={styles.selection}
                showSearch
                defaultValue={`Tháng ${month}`}
                optionFilterProp="children"
                options={MonthData}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
              />
            </Form.Item>
            <Form.Item name={"year"} className={styles.formItem}>
              <Select
                className={styles.selection}
                showSearch
                defaultValue={`${year}`}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                options={YearData}
              />
            </Form.Item>
            <Form.Item className={styles.formItem} name={"dep_id"}>
              <Select
                showSearch
                className={styles.select}
                placeholder=""
                defaultValue="Phòng ban( Tất cả )"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // options={filterUnique(
                //     firstData &&
                //     firstData?.map((item) => ({
                //         label: <div
                //             className={styles.selectOptionLabel}
                //         >
                //             {item?.department?.[0]?.dep_name}
                //         </div> ,
                //         value: item?.department?.[0]?.dep_id,
                //     })),
                //     "value"
                // )}
              />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"name"}
              initialValues={{ year: selectedYear, month: selectedMonth }}
            >
              <Select
                showSearch
                className={styles.select}
                placeholder=""
                defaultValue="Tất cả nhân viên"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // options={filterUnique(
                //     dataUser &&
                //     dataUser?.map((item) => ({
                //         label: <div
                //             className={styles.selectOptionLabel}>
                //             {item.userName}
                //         </div>,
                //         value: item?.ep_id,
                //     })),
                //     "value"
                // )}
              />
            </Form.Item>
            <Form.Item className={styles.formItem}>
              <button type="submit" className={styles.button}>
                Thống kê
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.table_style}>
          <Table
            columns={columns}
            dataSource={apiData?.listUserFinal}
            className={styles.table}
          />
        </div>
      </div>
      <div>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/6Sh-XesCmGo"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
          />
        </div>
      </div>
      <div className="modal_times">
        <Modal
          className={styles.modal_times}
          title="   "
          open={ModalTimeOpen}
          onCancel={hanleModalTimeCancer}
          footer={null}
        >
          <div className={styles.times_body}>
            <div>
              <p>Áp dụng từ tháng</p>
              <DatePicker picker="month" className={styles.times_month} />
            </div>
            <div>
              <p>Đến hết tháng(không bắt buộc)</p>
              <DatePicker picker="month" className={styles.times_month} />
            </div>
            <div>
              <p>Loại thuế</p>
              <Select
                className={styles.seclected}
                placeholder=""
                defaultValue="Chọn loại thuế"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Chọn loại thuế",
                    label: "Chọn loại thuế",
                  },
                  {
                    value: "Kỹ thuật",
                    label: "Kỹ thuật",
                  },
                  {
                    value: "Biên tập",
                    label: "Biên tập",
                  },
                  {
                    value: "Kinh doanh",
                    label: "Kinh doanh",
                  },
                ]}
              />
            </div>
          </div>
          <div className={styles.modal_times_body}>
            <Button type="primary" className={styles.btn_saves}>
              Lưu lại
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Nhansuchuathietlap;
