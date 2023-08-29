import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavResCongTy from "../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";

dayjs.locale("vi");
import * as XLSX from "xlsx";
import DateBigker from "../../../../components/tinh-luong/components/dateBigker/dateBigker";
import { FormOutlined, InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import Image from "next/image";
import axios from "axios";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import {
  MonthData,
  YearData,
} from "../../../../components/tinh-luong/components/Data/SelectionData";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

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
const Nhapluongcoban = () => {
  const [form] = Form.useForm();
  const [formTable] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
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
      .post(`${domain}/api/tinhluong/congty/show_bangluong_coban`, {
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
  const cancel = () => {
    setEditingKey("");
  };
  const prependImagePath = (path) => {
    return `/${path}`;
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
      width: "24%",
      editable: true,
      render: (_, record) => (
        <div className={styles.render}>
          <div>
            <Image
              alt=""
              src={prependImagePath(record?.avatarUser)}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              preview={true}
            />
          </div>
          <div>
            <a
              className={styles.cate_ed_fn}
              href={`/tinh-luong/cong-ty/ho-so-nhan-vien/${record.idQLC}`}
            >
              <img
                style={{ objectFit: "cover" }}
                src="https://tinhluong.timviec365.vn/img/edit2.png"
                alt={"anh o"}
              />
            </a>
            <p className={styles.p_style}>{record?.userName}</p>
            <p className={styles.text1}>ID : {record?.idQLC}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Lương cơ bản",
      width: "16%",
      editable: true,
      render: (record) => (
        <p style={{ color: "#FF5959" }}>
          {record?.luong_co_ban
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VNĐ
        </p>
      ),
    },
    {
      title: "Hợp đồng áp dụng",
      width: "19%",
      editable: true,
      render: (record) => (
        <p className={styles.text1}>
          {" "}
          {record?.phan_tram_hop_dong} % Lương cơ bản
        </p>
      ),
    },
    {
      title: "Phòng ban",
      width: "10%",
      editable: true,
      render: (record) => (
        <p className={styles.text1}>{record?.infordepartment?.dep_name}</p>
      ),
    },
    {
      title: "Chức vụ",
      width: "10%",
      editable: true,
      render: (record) => (
        <p className={styles.text1}>{record?.infoposition}</p>
      ),
    },
    {
      title: "Liên hệ",
      width: "21%",
      editable: true,
      render: (record) => (
        <div>
          <p className={styles.text1}>{record?.phone}</p>
          <p className={styles.text1}>{record?.email}</p>
          <p className={styles.text1}>{record?.address}</p>
        </div>
      ),
    },
  ];

  //xuat execl
  const handleExportExcel = () => {
    const data = [
      [
        "Họ và tên",
        "Lương cơ bản",
        "Hợp đồng áp dụng",
        "Phòng ban",
        "Chức vụ",
        "Liên hệ số điện thoại",
        "Email",
        "Địa chỉ",
      ],
    ];
    apiData?.forEach((item) => {
      const rowData = [
        item.userName, // Họ và tên
        item.luong_co_ban.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        item.phan_tram_hop_dong,
        item.infordepartment?.dep_name,
        item.infoposition,
        item.phone,
        item.email,
        item.address,
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

  //modal
  const handleClickopenModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
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
        gap: "30px",
      }}
    >
      <HeadNav title="Danh sách nhân viên" />
      <HeadNavResCongTy></HeadNavResCongTy>
      <div className={styles.div_page}>
        <div className={styles.ds_pay_ct_div}>
          <div className={styles.cate_ct_one}>
            <h3>Danh sách nhân viên</h3>
            <p>Quản lý nhân viên</p>
          </div>
          <div className={styles.file_ct_one}>
            <Form
              onFinish={onFinish}
              form={formTable}
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
                  options={filterUnique(
                    firstData &&
                      firstData?.map((item) => ({
                        label: (
                          <p className={styles.selectOptionLabel}>
                            {item?.department?.[0]?.dep_name}
                          </p>
                        ),
                        value: item?.department?.[0]?.dep_id,
                      })),
                    "value"
                  )}
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
              <Form.Item className={styles.formItem}>
                <button type="submit" className={styles.button}>
                  Thống kê
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={styles.ds_pay_ct}>
          <a
            className={styles.xuat_excel}
            href="https://phanmemnhansu.timviec365.vn/bien-dong-nhan-su.html"
            target="_blank"
            rel="nofollow"
          >
            <p>Biến động nhân sự</p>
          </a>
          <a
            className={styles.xuat_excel}
            id="file_btn"
            onClick={handleClickopenModal}
          >
            <p>Nhập lương cơ bản</p>
          </a>
          <a className={styles.xuat_excel} onClick={handleExportExcel}>
            <p>Xuất lương cơ bản</p>
          </a>

          {isOpenModal && (
            <Modal
              title=""
              className={styles.modal}
              open={isOpenModal}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{ style: { width: "100%", margin: "auto" } }}
              okText={"Tải lên"}
            >
              <div>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Add file lương cơ bản</p>
                  <p className="ant-upload-hint">Thả hoặc kéo vào đây</p>
                </Dragger>
                <p className={styles.modal_p}>
                  Bạn cần tải file lương cơ bản theo mẫu bên dưới về máy, nhập
                  lương cơ bản của các nhân viên vào file, sau đó add file lương
                  cơ bản theo mẫu lên phần mềm
                </p>
                <p className={styles.modal_pp}>
                  <a href="../ajax/file_mau_s.xlsx" download>
                    Tải file mẫu{" "}
                  </a>
                  <span id="set_file"></span>
                </p>
              </div>
            </Modal>
          )}
        </div>
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
              dataSource={apiData}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
      </div>
      <div className={styles.video}>
        <iframe
          className="video_hd"
          style={{ borderRadius: 15 }}
          width={680}
          height={430}
          src="https://www.youtube.com/embed/MjHeeyOB2dM"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
        />
      </div>
    </div>
  );
};
export default Nhapluongcoban;
