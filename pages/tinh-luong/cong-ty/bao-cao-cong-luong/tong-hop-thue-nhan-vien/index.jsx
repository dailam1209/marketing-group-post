import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import React, { useEffect, useState } from "react";
import styles from "../component.index.module.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
} from "antd";
import {
  MonthData,
  YearData,
} from "../../../../../components/tinh-luong/components/Data/SelectionData";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import * as XLSX from "xlsx";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";
dayjs.extend(customParseFormat);
dayjs.locale("vi");

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TongHopThueNhanVien = () => {
  const [form] = Form.useForm();
  const [placement, SetPlacement] = useState("topLeft");
  const [editingKey, setEditingKey] = useState("");
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [firstData, setFirstData] = useState();
  const [dataUser, setDataUser] = useState();

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, []);

  const fetchApiData = async (month, year, idQlc, dep_id, ep_id) => {
    const skip = 0;
    axios
      .post(`${domain}/api/tinhluong/congty/takedata_salary_report`, {
        token: token,
        com_id: cp,
        month: month,
        year: year,
        start_date: `${year}/${month}/01`,
        end_date: `${month === 12 ? year + 1 : year}/${
          month === 12 ? 1 : month + 1
        }/01`,
        skip: skip,
      })
      .then((response) => {
        let mapData = [];
        response?.data?.listResult?.forEach((item) => {
          const user = response?.data?.listUser?.find(
            (u) => u?.idQLC === item?.ep_id
          );
          mapData.push({ ...item, ...user });
        });
        console.log(ep_id, dep_id);
        setFirstData([
          { department: [{ dep_id: "all", dep_name: "Tất cả phòng ban" }] },
          ...mapData,
        ]);
        setDataUser([
          { ep_id: "all", userName: "Tất cả nhân viên" },
          ...mapData,
        ]);
        // // filter
        if (ep_id === "all" && !dep_id) {
          mapData = dataUser?.filter((item) => item?.ep_id !== "all");
        }
        if (ep_id && ep_id !== "all") {
          mapData = mapData?.filter((item) => item.ep_id === ep_id);
        }
        if (dep_id === "all" && !ep_id) {
          mapData =
            firstData && dataUser?.filter((item) => item?.ep_id !== "all");
        }

        if (dep_id && dep_id !== "all") {
          mapData = mapData?.filter(
            (item) => item?.department?.[0]?.dep_id === dep_id
          );
        }
        setApiData(mapData);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };
  const isEditing = (record) => record.key === editingKey;
  const cancel = () => {
    setEditingKey("");
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
  const handleExportExcel = () => {
    const data = [
      [
        "Họ và tên",
        "Tổng lương",
        "Thu nhập tính thuế",
        "Thuế",
        "Tổng lương thực nhận",
      ],
    ];
    apiData?.forEach((item) => {
      const rowData = [
        apiData?.find((user) => user?.idQLC === item?.ep_id)?.userName, // Họ và tên
        item.luong_thuc, // Tổng lương
        item.tien_khac, // Lương đóng bảo hiểm
        item.thue, // Bảo hiểm
        item.tien_thuc_nhan, // Tổng lương thực nhận
      ];
      data.push(rowData);
    });

    // Tạo workbook mới từ dữ liệu
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lương cơ bản");

    // Xuất Excel thành file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "luong_co_ban.xlsx";
    link.click();
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

  console.log(apiData);
  const columns = [
    {
      title: "Họ và tên",
      width: "20%",
      editable: true,
      render: (record) => <p>{record?.userName}</p>,
    },
    {
      title: "Tổng lương",
      render: (record) => <p>{record?.luong_thuc}</p>,
      width: "10%",
      editable: true,
    },
    {
      title: "Thu nhập tính thuế",
      render: (record) => <p>{record?.tien_khac}</p>,
      width: "15%",
      editable: true,
    },
    {
      title: "Thuế",
      render: (record) => <p>{record?.thue}</p>,
      width: "10%",
      editable: true,
    },
    {
      title: "Tổng lương thực nhận",
      render: (record) => <p>{record?.tien_thuc_nhan}</p>,
      width: "15%",
      editable: true,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        flex: "1",
        background: " #F7F8FC",
        paddingBottom: "70px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <HeadNav />
      <div className={styles.part_hps}>
        <div className={styles.cate_taff}>
          <div className={styles.cate_staff_one}>
            <div className={styles.prl_part_one_cate_part_payr}>
              <h3>Tổng hợp thông tin thuế của nhân viên</h3>
            </div>
            <div>
              <Form
                onFinish={onFinish}
                form={form}
                initialValues={{ year: selectedYear, month: selectedMonth }}
              >
                <div className={styles.cate_ct_tow_cate_pay_tow}>
                  <Form.Item className={styles.formItem} name={"fromTo"}>
                    <RangePicker
                      placement={placement}
                      format={dateFormat}
                      locale={{
                        lang: {
                          locale: "vi",
                          rangePlaceholder: ["Từ ngày", "Đến ngày"],
                        },
                      }}
                    />
                  </Form.Item>
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
                </div>
                <div
                  className={styles.cate_ct_tow_cate_pay_tow}
                  style={{ clear: "both", marginTop: "10px" }}
                >
                  <div className={styles.select_p}>
                    <p>Sắp xếp theo:</p>
                    <Form.Item className={styles.formItem}>
                      <Select
                        className={styles.select}
                        showSearch
                        placeholder=""
                        defaultValue="Mới nhất"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "Mới nhất",
                            label: "Mới nhất",
                          },
                          {
                            value: "Cũ nhất",
                            label: "Cũ nhất",
                          },
                          {
                            value: "Phòng ban",
                            label: "Phòng ban",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div>
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
                        options={filterUnique(
                          firstData &&
                            firstData?.map((item) => ({
                              label: item?.department?.[0]?.dep_name,
                              value: item?.department?.[0]?.dep_id,
                            })),
                          "value"
                        )}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item className={styles.formItem} name={"name"}>
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
                        options={filterUnique(
                          dataUser &&
                            dataUser?.map((item) => ({
                              label: item.userName,
                              value: item?.ep_id,
                            })),
                          "value"
                        )}
                      />
                    </Form.Item>
                  </div>
                  <button type="submit" className={styles.button}>
                    Thống kê
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div>
            <Table
              className={"tablePage"}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={apiData}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </div>
        </div>
        <div className={styles.cate_pay_ct}>
          <a className={styles.xuat_excel} onClick={handleExportExcel}>
            <p>Xuất file tổng hợp thuế</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TongHopThueNhanVien;
