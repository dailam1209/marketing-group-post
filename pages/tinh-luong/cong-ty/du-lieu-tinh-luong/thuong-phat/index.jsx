import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Popover,
  Radio,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import {
  MonthData,
  YearData,
} from "../../../../../components/tinh-luong/components/Data/SelectionData";
import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import axios from "axios";
import Image from "next/image";
import { FormatDetectionMeta } from "next/dist/lib/metadata/generate/basic";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

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
const dateFormat = "DD/MM/YYYY";

const Thuongphat = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [reload, setReload] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [status, setStatus] = useState(false);
  const [firstData, setFirstData] = useState();
  const [dataUser, setDataUser] = useState();
  const [filterData, setFilterData] = useState([]);
  const [valueDepartment, setValueDepartment] = useState();

  const refMoneyInput = useRef(null);
  const [formData, setFormData] = useState({
    rew_money: "",
    rew_type: "",
    rew_date: null,
    rew_reason: "",
  });
  const [rewards, setRewards] = useState([]);
  const [rowData, setRowData] = useState();

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const modelOpen = () => {
    setModalOpen(true);
  };
  const modalCancel = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    // Xử lý logic khi người dùng ấn nút "Hủy" trong modal
    setModalVisible(false);
  };
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, [reload]);

  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const fetchApiData = (month, year, idQLC, dep_id) => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_thuong_phat`, {
        token: token,
        id_com: cp,
        month: month,
        year: year,
      })
      .then(async (response) => {
        let mapData = [];
        const data = response.data.data.data_final.map(
          (item) => item.inforUser
        );
        mapData = [...data];
        setFirstData([
          { Deparment: { dep_id: "all", dep_name: "Tất cả phòng ban" } },
          ...mapData,
        ]);
        setDataUser([
          { idQLC: "all", userName: "Tất cả nhân viên" },
          ...mapData,
        ]);

        // filter
        await setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const prependImagePath = (path) => {
    return `/${path}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filterDataByDepartment = (depId) => {
    setValueDepartment(depId);
    if (!depId || depId === "all") {
      setFilterData(apiData.data.data_final);
    } else {
      const filteredData = apiData.data.data_final.filter(
        (item) => item?.inforUser?.Deparment?.dep_id === depId
      );
      setFilterData(filteredData);
    }
  };

  const filterDataByUser = (id) => {
    if (!id || id === "all") {
      setFilterData(apiData.data.data_final);
    } else {
      const filteredData = apiData.data.data_final.filter(
        (item) => item?.inforUser?.idQLC === id
      );
      setFilterData(filteredData);
    }
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    filterDataByDepartment(value);
  };
  const onChangeUser = (value) => {
    console.log(`selected ${value}`);
    filterDataByUser(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSubmit = async (val) => {
    const { rew_money, rew_type, rew_date, rew_reason } = formData;
    const payStatus = status ? 1 : 2;
    const payload = {
      pay_id_user: selectedData?.inforUser?.idQLC,
      pay_id_com: 3312,
      pay_price: val?.rew_money,
      pay_status: payStatus,
      pay_case: rew_reason,
      pay_day: val?.rew_date ? val?.rew_date : null,
      pay_month: new Date(val?.rew_date).getMonth() + 1,
      pay_year: new Date(val?.rew_date).getFullYear(),
      token: TokenForTinhLuong,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/insert_thuong_phat`,
        payload
      );
      console.log("Thêm mới thành công:", response.data);
      // Cập nhật danh sách thưởng phạt và làm mới biểu mẫu
      setRewards((prevRewards) => [...prevRewards, response.data]);
      setFormData({
        rew_money: "",
        rew_type: "",
        rew_date: null,
        rew_reason: "",
      });
      refMoneyInput.current.value = "";
      setReload(!reload);
    } catch (error) {
      console.error("Lỗi khi thêm mới:", error);
    }
  };
  const handleDelete = async (pay_id) => {
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/delete_thuong_phat`,
        {
          pay_id: pay_id,
          token: TokenForTinhLuong,
        }
      );
      if (response) {
        message.success("Xóa thành công");
        setReload(!reload);
      } else {
        message.error("Xóa thất bại");
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const onFinish = async (val) => {
    setSelectedYear(val?.year);
    setSelectedMonth(val?.month);
    console.log(val?.month);
    console.log(val?.year);
    await fetchApiData(selectedMonth, selectedYear);
    // console.log(valueDepartment)
    setFilterData(
      apiData.data.data_final.filter(
        (item) => item?.inforUser?.idQLC === valueDepartment
      )
    );
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
    const data = [["Họ và tên", "Tiền thưởng", "Tiền phạt"]];
    apiData?.data?.data_final.forEach((item) => {
      const rowData = [
        item.inforUser.userName, // Họ và tên
        item.tt_thuong?.tong_thuong
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        item.tt_phat?.tong_phat
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      ];
      data.push(rowData);
    });

    // Tạo workbook mới từ dữ liệu
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách thưởng phạt");

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
    link.download = "danh-sach-thuong-phat-cua-nhan-vien.xlsx";
    link.click();
  };

  const columns = [
    {
      title: "Họ và tên",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={styles.render}>
          <div>
            <Image
              alt=""
              src={prependImagePath(record?.inforUser.avatarUser)}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              preview={true}
            />
          </div>
          <div>
            <p className={styles.p_style}> {record?.inforUser.userName}</p>
            <p className={styles.text1}>ID : {record?.inforUser.idQLC}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Tiền thưởng",
      width: "25%",
      editable: true,
      render: (_, record) => (
        <>
          <div className={styles.border}>
            <Popover
              placement="top"
              title={""}
              content={
                <div>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th>Tiền thưởng</th>
                        <th style={{ textAlign: "center" }}>Áp dụng ngày</th>
                        <th>Lý do</th>
                        <th style={{ paddingRight: "0px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {record?.tt_thuong?.ds_thuong?.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {item?.pay_price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              VNĐ
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {new Date(`${item.pay_day}`).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>{item?.pay_case}</td>
                            <td style={{ paddingRight: "0px" }}>
                              <Tooltip title="Chỉnh sửa">
                                <EditOutlined
                                  onClick={(event) => {
                                    modelOpen(event, record);
                                    setSelectedData(record);
                                  }}
                                  className="icon-button"
                                />
                              </Tooltip>
                            </td>
                            <td>
                              <Tooltip title="Xóa">
                                <Popconfirm
                                  placement="right"
                                  title={"Xác nhận xoá?"}
                                  okText="Có"
                                  cancelText="Không"
                                  onConfirm={() => {
                                    handleDelete(item?.pay_id);
                                  }}
                                >
                                  <DeleteOutlined />
                                </Popconfirm>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              }
              trigger="click"
            >
              <EyeOutlined />
              <span style={{ marginLeft: "5px" }}>
                {record?.tt_thuong?.tong_thuong
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                VNĐ
              </span>
            </Popover>
          </div>
        </>
      ),
    },
    {
      title: "Tiền phạt",
      dataIndex: "email",
      width: "25%",
      editable: true,
      render: (_, record) => (
        <>
          <div className={styles.yellow}>
            <Popover
              placement="top"
              title={""}
              content={
                <div>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th>Tiền phạt</th>
                        <th style={{ textAlign: "center" }}>Áp dụng ngày</th>
                        <th>Lý do</th>
                        <th style={{ paddingRight: "0px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {record?.tt_phat?.ds_phat?.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {item?.pay_price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              VNĐ
                            </td>
                            <td>
                              {new Date(`${item.pay_day}`).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>{item?.pay_case}</td>
                            <td style={{ paddingRight: "0px" }}>
                              <Tooltip title="Chỉnh sửa">
                                <EditOutlined
                                  className="icon-button"
                                  onClick={(event) => {
                                    modelOpen(event, record);
                                    setSelectedData(record);
                                  }}
                                />
                              </Tooltip>
                            </td>
                            <td>
                              <Tooltip title="Xóa">
                                <Popconfirm
                                  placement="right"
                                  title={"Xác nhận xoá?"}
                                  okText="Có"
                                  cancelText="Không"
                                  onConfirm={() => {
                                    handleDelete(item?.pay_id);
                                  }}
                                >
                                  <DeleteOutlined />
                                </Popconfirm>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              }
              trigger="click"
            >
              <EyeOutlined />
              <span style={{ marginLeft: "5px" }}>
                {record?.tt_phat?.tong_phat
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                VNĐ
              </span>
            </Popover>
          </div>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => (
        <>
          <div className={styles.custom_container}>
            <PlusCircleOutlined
              placeholder={"Thưởng phạt"}
              onClick={(event) => {
                showModal(event, record);
                setSelectedData(record);
              }}
              className={styles.custom_icon}
              style={{ color: "white", backgroundColor: "#4C5BD4" }}
            />
            <span>Thưởng phạt</span>
          </div>
        </>
      ),
    },
  ];
  const currentDate = moment();
  const cancel = () => {
    setEditingKey("");
  };
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
        gap: "10px",
      }}
    >
      <HeadNav />
      <div className={styles.part_hps}>
        <div className={styles.rew_punish_ct}>
          <div className={styles.rew_ct}>
            <div className={styles.rew_ct_one}>
              <h3>Danh sách thưởng phạt nhân viên tháng 07/2023</h3>
              <p>Quản lý theo dõi thưởng, phạt nhân viên</p>
            </div>
            <div className={styles.rew_ct_tow}>
              <Form
                onFinish={onFinish}
                className={styles.formContainer}
                initialValues={{ year: selectedYear, month: selectedMonth }}
              >
                <Form.Item name={"month"} className={styles.formItem}>
                  <Select
                    className={styles.selection}
                    showSearch
                    defaultValue={{
                      label: `Tháng ${selectedMonth}`,
                      value: selectedMonth,
                    }}
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
                    defaultValue={{
                      label: `${selectedYear}`,
                      value: selectedYear,
                    }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={YearData}
                  />
                </Form.Item>
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
                            label: item?.Deparment?.dep_name,
                            value: item?.Deparment?.dep_id,
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
                      onChange={onChangeUser}
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
                            value: item?.idQLC,
                          })),
                        "value"
                      )}
                    />
                  </Form.Item>
                </div>
                <button type="submit" className={styles.button}>
                  Thống kê
                </button>
              </Form>
            </div>
          </div>
          <div className={styles.punish_ct}>
            <div>
              <Form form={form} component={false}>
                <Table
                  className={"tablePage"}
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={
                    filterData.length > 0
                      ? filterData
                      : apiData?.data?.data_final
                  }
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                />
              </Form>
              {/*thêm*/}
              <Modal
                title=""
                open={modalVisible}
                footer={<Button onClick={handleCancel}>Đóng</Button>}
                onCancel={handleCancel}
                className={styles.modal}
              >
                <div className={styles.modal_header}>
                  <span className={styles.span}>Thưởng phạt</span>
                </div>
                <div style={{ display: "flex" }}>
                  <div className={styles.modal_hd_pus}>
                    <div className={styles.modal_body}>
                      <Form
                        onFinish={handleSubmit}
                        method={"post"}
                        className={styles.form_reward}
                      >
                        <Form.Item name={"rew_money"}>
                          <div className={styles.form_group}>
                            <label>Tiền thưởng, phạt</label>
                            <input
                              ref={refMoneyInput}
                              type={"number"}
                              name="rew_money"
                              placeholder={"Nhập số tiền (VNĐ)"}
                            />
                          </div>
                        </Form.Item>
                        <div>
                          <Form.Item name={"rew_type"}>
                            <Radio.Group
                              onChange={(value) => {
                                setStatus(value.target.value);
                              }}
                            >
                              <Radio value={true} className={styles.radio_span}>
                                {" "}
                                Tiền thưởng{" "}
                              </Radio>
                              <Radio
                                value={false}
                                className={styles.radio_span}
                              >
                                {" "}
                                Tiền phạt{" "}
                              </Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <div className={styles.form_group}>
                          <label>Ngày áp dụng</label>
                          <Form.Item name={"rew_date"}>
                            <DatePicker />
                          </Form.Item>
                        </div>
                        <div className={styles.form_group}>
                          <Input
                            type="text"
                            name="rew_reason"
                            value={formData.rew_reason}
                            onChange={handleChange}
                            placeholder="Nhập lý do"
                          />
                        </div>
                        <button
                          className={styles.button_all}
                          type="submit"
                          onClick={() => {
                            handleCancel();
                          }}
                        >
                          Thêm thưởng phạt
                        </button>
                      </Form>
                    </div>
                  </div>
                  <div className={styles.box_info_rew}>
                    <div className={styles.punish_ct_tb}>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th>Tiền thưởng</th>
                            <th style={{ textAlign: "center" }}>
                              Áp dụng ngày
                            </th>
                            <th>Lý do</th>
                            <th style={{ paddingRight: "0px" }}></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedData?.tt_thuong?.ds_thuong?.map(
                            (item, index) => {
                              return (
                                <tr>
                                  <td
                                    style={{ textAlign: "center" }}
                                    className={styles.p_color}
                                  >
                                    {item?.pay_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}{" "}
                                    VNĐ
                                  </td>
                                  <td
                                    style={{ textAlign: "center" }}
                                    className={styles.p_color}
                                  >
                                    {new Date(
                                      `${item.pay_day}`
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td
                                    style={{ textAlign: "center" }}
                                    className={styles.p_color}
                                  >
                                    {" "}
                                    {item?.pay_case}
                                  </td>
                                  <td style={{ paddingRight: "0px" }}>
                                    <Tooltip title="Chỉnh sửa">
                                      <EditOutlined
                                        onClick={() => {
                                          setRowData(item);
                                          handleCancel();
                                          modelOpen();
                                        }}
                                        className="icon-button"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    <Tooltip
                                      className={styles.tool}
                                      title="Xóa"
                                    >
                                      <Popconfirm
                                        className={styles.tool}
                                        placement="right"
                                        title={"Xác nhận xoá?"}
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => {
                                          handleDelete(item?.pay_id);
                                          handleCancel();
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </Popconfirm>
                                    </Tooltip>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th>Tiền phạt</th>
                            <th style={{ textAlign: "center" }}>
                              Áp dụng ngày
                            </th>
                            <th>Lý do</th>
                            <th style={{ paddingRight: "0px" }}></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedData?.tt_phat?.ds_phat?.map(
                            (item, index) => {
                              return (
                                <tr>
                                  <td>
                                    {item?.pay_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}{" "}
                                    VNĐ
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {new Date(
                                      `${item.pay_day}`
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td>{item?.pay_case}</td>
                                  <td style={{ paddingRight: "0px" }}>
                                    <Tooltip title="Chỉnh sửa">
                                      <EditOutlined
                                        onClick={() => {
                                          handleCancel();
                                          modelOpen();
                                        }}
                                        className="icon-button"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    <Tooltip title="Xóa">
                                      <Popconfirm
                                        placement="right"
                                        title={"Xác nhận xoá?"}
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => {
                                          handleDelete(item?.pay_id);
                                          handleCancel();
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </Popconfirm>
                                    </Tooltip>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Modal>
              {/*Sửa*/}
              <Modal
                title=""
                open={modalOpen}
                footer={<Button onClick={modalCancel}>Đóng</Button>}
                onCancel={modalCancel}
                className={styles.modal}
              >
                <div className={styles.modal_header}>
                  <span className={styles.span}>Thưởng phạt</span>
                </div>
                <div style={{ display: "flex" }}>
                  <div className={styles.modal_hd_pus}>
                    <div className={styles.modal_body}>
                      <Form
                        initialValues={{
                          rew_money: rowData?.pay_price,
                        }}
                        onFinish={handleSubmit}
                        method={"post"}
                        className={styles.form_reward}
                      >
                        <Form.Item name={"rew_money"}>
                          <div className={styles.form_group}>
                            <label>Tiền thưởng, phạt</label>
                            <input
                              ref={refMoneyInput}
                              type={"number"}
                              name="rew_money"
                              placeholder={"Nhập số tiền (VNĐ)"}
                            />
                          </div>
                        </Form.Item>
                        <div>
                          <Form.Item name={"rew_type"}>
                            <Radio.Group
                              onChange={(value) => {
                                setStatus(value.target.value);
                              }}
                            >
                              <Radio value={true} className={styles.radio_span}>
                                {" "}
                                Tiền thưởng{" "}
                              </Radio>
                              <Radio
                                value={false}
                                className={styles.radio_span}
                              >
                                {" "}
                                Tiền phạt{" "}
                              </Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <div className={styles.form_group}>
                          <label>Ngày áp dụng</label>
                          <Form.Item name={"rew_date"}>
                            <DatePicker />
                          </Form.Item>
                        </div>
                        <div className={styles.form_group}>
                          <Input
                            type="text"
                            name="rew_reason"
                            value={formData.rew_reason}
                            onChange={handleChange}
                            placeholder="Nhập lý do"
                          />
                        </div>
                        <button
                          className={styles.button_all}
                          type="submit"
                          onClick={() => {
                            modalCancel();
                          }}
                        >
                          Sửa thưởng phạt
                        </button>
                      </Form>
                    </div>
                  </div>
                  <div className={styles.box_info_rew}>
                    <div className={styles.punish_ct_tb}>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th>Tiền thưởng</th>
                            <th style={{ textAlign: "center" }}>
                              Áp dụng ngày
                            </th>
                            <th>Lý do</th>
                            <th style={{ paddingRight: "0px" }}></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedData?.tt_thuong?.ds_thuong?.map(
                            (item, index) => {
                              return (
                                <tr>
                                  <td>
                                    {item?.pay_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}{" "}
                                    VNĐ
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {new Date(
                                      `${item.pay_day}`
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td>{item?.pay_case}</td>
                                  <td style={{ paddingRight: "0px" }}>
                                    <Tooltip title="Chỉnh sửa">
                                      <EditOutlined
                                        onClick={() => setRowData(item)}
                                        className="icon-button"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    <Tooltip
                                      className={styles.tool}
                                      title="Xóa"
                                    >
                                      <Popconfirm
                                        className={styles.tool}
                                        placement="right"
                                        title={"Xác nhận xoá?"}
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => {
                                          handleDelete(item?.pay_id);
                                          modalCancel();
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </Popconfirm>
                                    </Tooltip>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th>Tiền phạt</th>
                            <th style={{ textAlign: "center" }}>
                              Áp dụng ngày
                            </th>
                            <th>Lý do</th>
                            <th style={{ paddingRight: "0px" }}></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedData?.tt_phat?.ds_phat?.map(
                            (item, index) => {
                              return (
                                <tr>
                                  <td>
                                    {item?.pay_price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}{" "}
                                    VNĐ
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {new Date(
                                      `${item.pay_day}`
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td>{item?.pay_case}</td>
                                  <td style={{ paddingRight: "0px" }}>
                                    <Tooltip title="Chỉnh sửa">
                                      <EditOutlined className="icon-button" />
                                    </Tooltip>
                                  </td>
                                  <td>
                                    <Tooltip title="Xóa">
                                      <Popconfirm
                                        placement="right"
                                        title={"Xác nhận xoá?"}
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => {
                                          handleDelete(item?.pay_id);
                                          handleCancel();
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </Popconfirm>
                                    </Tooltip>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a className={styles.xuat_excel} onClick={handleExportExcel}>
          <p>Xuất file thống kê</p>
        </a>
      </div>
      <div className={styles.video}>
        <iframe
          className="video_hd"
          style={{ borderRadius: 15 }}
          width={680}
          height={430}
          src="https://www.youtube.com/embed/NYE0ZuDqC5Y"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
        />
      </div>
    </div>
  );
};

export default Thuongphat;
