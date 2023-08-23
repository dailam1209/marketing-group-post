import React, { useState, useEffect } from "react";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import {
  MonthData,
  YearData,
} from "../../../../../components/tinh-luong/components/Data/SelectionData";
import styles from "./index.module.css";
import { DatePicker, Table, Select, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import Image from "next/image";
import * as XLSX from "xlsx";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
dayjs.extend(customParseFormat);
dayjs.locale("vi");
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

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
const App = () => {
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
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, []);
  const fetchApiData = (month, year, idQlc, dep_id, ep_id) => {
    const skip = 0;

    axios
      .post(`${domain}/api/tinhluong/congty/show_bangluong_nv`, {
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
  const columns = [
    {
      title: "Họ và tên",
      key: "1",
      render: (record) => (
        <div>
          <div>{/* <p>{apiData?.listUser[index]?.avatarUser}</p> */}</div>
          <div className={styles.user}>
            <p className={styles.p}>{record?.userName}</p>
            <p className={styles.p}>{record?.idQLC}</p>
          </div>
        </div>
      ),
      editable: true,
    },
    {
      title: "Phòng ban",
      render: (record) => (
        <p className={styles.p}>{record.department?.[0]?.dep_name}</p>
      ),
      editable: true,
      width: "500px",
      key: "2",
    },
    {
      title: "Lương cơ bản",
      render: (record) => (
        <p className={styles.p}>
          {record?.luong_co_ban
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "3",
    },
    {
      title: "Hợp đồng",
      render: (record) => (
        <p className={styles.p}>{record?.phan_tram_hop_dong}</p>
      ),
      editable: true,
      key: "4",
    },
    {
      title: "Công chuẩn",
      render: (record) => <p className={styles.p}>{record?.cong_chuan}</p>,
      editable: true,
      key: "5",
    },
    {
      title: "Công thực",
      render: (record) => <p className={styles.p}>{record?.cong_thuc}</p>,
      editable: true,
      key: "6",
    },
    {
      title: "Công sau phạt",
      render: (record) => <p className={styles.p}>{record?.cong_sau_phat}</p>,
      editable: true,
      key: "7",
    },
    {
      title: "Công theo tiền (ca tính tiền)",
      render: (record) => <p className={styles.p}>{record?.cong_theo_tien}</p>,
      editable: true,
      key: "8",
    },
    {
      title: "Công được ghi nhận",
      render: (record) => <p className={styles.p}>{record?.cong_ghi_nhan}</p>,
      editable: true,
      key: "9",
    },
    {
      title: "Công nghỉ phép",
      render: (record) => <p className={styles.p}>{record?.cong_nghi_phep}</p>,
      editable: true,
      key: "10",
    },
    {
      title: "Tổng công nhận",
      render: (record) => (
        <p className={styles.p}>
          {record?.tong_cong_nhan
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "11",
    },
    {
      title: "Lương thực",
      render: (record) => <p className={styles.p}>{record?.luong_thuc}</p>,
      editable: true,
      key: "12",
    },
    {
      title: "Lương sau phạt",
      render: (record) => <p className={styles.p}>{record?.luong_sau_phat}</p>,
      editable: true,
      key: "13",
    },
    {
      title: "Lương đóng bảo hiểm",
      render: (record) => (
        <p className={styles.p}>
          {record?.luong_bao_hiem
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "14",
    },
    {
      title: "Phạt đi muộn/về sớm theo công",
      render: (record) => (
        <p className={styles.p}>
          {record?.tien_phat_muon
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "15",
    },
    {
      title: "Phạt đi muộn/về sớm theo tiền",
      render: (record) => (
        <p className={styles.p}>
          {record?.cong_phat_di_muon_ve_som
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "16",
    },
    {
      title: "Hoa hồng",
      render: (record) => (
        <p className={styles.p}>
          {record?.tong_hoa_hong
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "17",
    },
    {
      title: "Tạm ứng",
      render: (record) => (
        <p className={styles.p}>
          {record?.tien_tam_ung
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "18",
    },
    {
      title: "Thưởng",
      render: (record) => (
        <p className={styles.p}>
          {record?.thuong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
        </p>
      ),
      editable: true,
      key: "19",
    },
    {
      title: "Thưởng nghỉ lễ",
      render: (record) => (
        <p className={styles.p}>
          {record?.luong_nghi_le
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "20",
    },
    {
      title: "Phạt",
      render: (record) => (
        <p className={styles.p}>
          {record?.phat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
        </p>
      ),
      editable: true,
      key: "21",
    },
    {
      title: "Nghỉ vào ngày không được phép nghỉ",
      render: (record) => (
        <p className={styles.p}>{record?.tien_phat_nghi_khong_phep}</p>
      ),
      editable: true,
      key: "22",
    },
    {
      title: "Nghỉ sai quy định",
      render: (record) => (
        <p className={styles.p}>
          {record?.phat_nghi_sai_quy_dinh
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "23",
    },
    {
      title: "Phúc lợi",
      render: (record) => (
        <p className={styles.p}>
          {record?.tien_phuc_loi
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "24",
    },
    {
      title: "Phụ cấp",
      render: (record) => (
        <p className={styles.p}>
          {record?.tien_phu_cap
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "25",
    },
    {
      title: "Phụ cấp theo ca",
      render: (record) => (
        <p className={styles.p}>
          {record?.phu_cap_theo_ca
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "26",
    },
    {
      title: "Bảo hiểm",
      render: (record) => (
        <p className={styles.p}>
          {record?.tong_bao_hiem
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "27",
    },
    {
      title: "Khoản tiền khác",
      render: (record) => (
        <p className={styles.p}>
          {record?.tien_khac.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "28",
    },
    {
      title: "Tổng lương",
      render: (record) => <p className={styles.p}>{record?.tien_thuc_nhan}</p>,
      editable: true,
      key: "29",
    },
    {
      title: "Thuế",
      render: (record) => (
        <p className={styles.p}>
          {record?.thue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
        </p>
      ),
      editable: true,
      key: "30",
    },
    {
      title: "Tổng lương thực nhận",
      render: (record) => <p className={styles.p}>{record?.tien_thuc_nhan}</p>,
      editable: true,
      key: "31",
    },
    {
      title: "Tổng lương đã trả",
      render: (record) => (
        <p className={styles.p}>
          {record?.luong_da_tra
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
      editable: true,
      key: "32",
    },
  ];
  const handleExportExcel = () => {
    const data = [
      [
        "Họ và tên",
        "Phòng ban",
        "Lương cơ bản",
        "Hợp đồng",
        "Công chuẩn",
        "Công thực",
        "Công sau phạt",
        "Công theo tiền (ca tính tiền)",
        "Công được ghi nhận",
        "Công nghỉ phép",
        "Tổng công nhận",
        "Lương thực",
        "Lương sau phạt",
        "Lương đóng bảo hiểm",
        "Phạt đi muộn/về sớm theo công",
        "Phạt đi muộn/về sớm theo tiền",
        "Hoa hồng",
        "Tạm ứng",
        "Thưởng",
        "Thưởng nghỉ lễ",
        "Phạt",
        "Nghỉ vào ngày không được phép nghỉ",
        "Nghỉ sai quy định",
        "Phúc lợi",
        "Phụ cấp",
        "Phụ cấp theo ca",
        "Bảo hiểm",
        "Khoản tiền khác",
        "Tổng lương",
        "Thuế",
        "Tổng lương thực nhận",
        "Tổng lương đã trả",
      ],
    ];
    apiData?.forEach((item, index) => {
      const rowData = [
        apiData?.find((user) => user?.idQLC === item?.ep_id)?.userName,
        apiData?.department?.[0]?.dep_name,
        item.luong_co_ban,
        item.phan_tram_hop_dong,
        item.cong_chuan,
        item.cong_thuc,
        item.cong_sau_phat,
        item.cong_theo_tien,
        item.cong_ghi_nhan,
        item.cong_nghi_phep,
        item.tong_cong_nhan,
        item.luong_thuc,
        item.luong_sau_phat,
        item.luong_bao_hiem,
        item.tien_phat_muon,
        item.cong_phat_di_muon_ve_som,
        item.tong_hoa_hong,
        item.tien_tam_ung,
        item.thuong,
        item.luong_nghi_le,
        item.phat,
        item.tien_phat_nghi_khong_phep,
        item.phat_nghi_sai_quy_dinh,
        item.tien_phuc_loi,
        item.tien_phu_cap,
        item.phu_cap_theo_ca,
        item.tong_bao_hiem,
        item.tien_khac,
        item.tien_thuc_nhan,
        item.thue,
        item.tien_thuc_nhan,
        item.tien_thuc_nhan,
        item.luong_da_tra,
      ];
      data.push(rowData);
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng lương");

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

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className={styles.container}>
      <HeadNavRes></HeadNavRes>
      <HeadNav title="Bảng lương nhân viên" />
      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.h3}>Bảng lương chu kỳ</h3>
        </div>
        <div className={styles.select_time}>
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
        {/* <div className={styles.select_time}>
               <div className={styles.select_p}>
                  <p>Sắp xếp theo:</p>
                  <Select
                     showSearch
                     placeholder=""
                     defaultValue="Mới nhất"
                     optionFilterProp="children"
                     onChange={onChange}
                     onSearch={onSearch}
                     filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                     options={apiData?.listUser?.map((item) => ({
                        value: item?.department?.[0]?.dep_id,
                        label: item?.department?.[0]?.dep_name,
                     }))}
                  />
               </div>
               <div>
                  <Select
                     showSearch
                     placeholder=""
                     defaultValue="Phòng ban( Tất cả )"
                     optionFilterProp="children"
                     onChange={onChange}
                     onSearch={onSearch}
                     filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                     options={[
                        {
                           value: "Phòng ban( Tất cả )",
                           label: "Phòng ban( Tất cả )",
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
                        {
                           value: "Phòng SEO",
                           label: "Phòng SEO",
                        },
                        {
                           value: "Phòng đào tạo",
                           label: "Phòng đào tạo",
                        },
                        {
                           value: "Phòng Sáng tạo",
                           label: "Phòng Sáng tạo",
                        },
                        {
                           value: "Phòng tài vụ",
                           label: "Phòng tài vụ",
                        },
                        {
                           value: "Phòng nhân sự",
                           label: "Phòng nhân sự",
                        },
                     ]}
                  />
               </div>
               <div>
                  <Select
                     showSearch
                     placeholder=""
                     defaultValue="Mới nhất"
                     optionFilterProp="children"
                     onChange={onChange}
                     onSearch={onSearch}
                     filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
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
               </div>
               <div>
                  <button className={styles.button}>Thống kê</button>
               </div>
            </div> */}
        <div className={styles.table_container}>
          <Table
            className={`customTable1 ${styles.table}`}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            columns={columns}
            dataSource={apiData}
            pagination={{
              onChange: cancel,
            }}
            scroll={{
              x: 6000,
            }}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.excel}>
          <button className={styles.export} onClick={handleExportExcel}>
            Xuất tổng lương
          </button>
        </div>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/WPddSsmE2DU"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
          />
        </div>
      </div>
    </div>
  );
};

export default App;
