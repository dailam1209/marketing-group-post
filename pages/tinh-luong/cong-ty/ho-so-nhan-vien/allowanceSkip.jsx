import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  Table,
  DatePicker,
  Upload,
  Tooltip,
  Popconfirm,
  message,
} from "antd";

import {
  DeleteOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import styles from "./index.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import axios from "axios";
import Label, {
  Custom_label,
} from "../../../../components/van-thu-luu-tru/components/Input/Label/Label";
import Section from "../../../../components/van-thu-luu-tru/components/Input/Section/Section";
import { Input_file_3 } from "../../../../components/van-thu-luu-tru/components/Input/Input_file/Input_file";
import { error } from "next/dist/build/output/log";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";

const AllowanceSkip = (id) => {
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const handleFromDateChange = (dateString) => {
    setSelectedFromDate(dayjs(dateString, dateFormat));
  };
  const [editingData, setEditingData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyTime, setPolicyTime] = useState(null);
  const [policyNote, setPolicyNote] = useState("");
  const [policySelect, setPolicySelect] = useState();
  const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
  const [tables, setTables] = useState([]);
  const [apiContract, setApiContract] = useState();
  const [reload, setReload] = useState(false);
  const [binary, setBinary] = useState({});
  console.log("binary", binary);
  const [formData, setFormData] = useState({});
  console.log("formDat from allownaceSkip", formData);
  checkCookie();

  console.log("ApiContract", apiContract);
  const fetchApiContact = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_salary_em`, {
        token: token,
        ep_id: +id.id,
      })
      .then((response) => {
        setApiContract(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };
  useEffect(() => {
    fetchApiContact();
  }, [reload]);

  const handleDelete = async (con_id) => {
    console.log("con_id nhan duoc tu handle delete", con_id);
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/delete_contract`,
        {
          token: token,
          con_id: con_id,
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

  const showModal = () => {
    setEditingIndex(null);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicySelect("");
    setPolicyTimeEnd(null);
    setEditingData(null);
    setPolicyNote("");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    var form_data = new FormData();
    form_data.append("con_id_user", +id.id);
    form_data.append("con_name", policyName);
    form_data.append("con_salary_persent", +policyDescription);
    form_data.append("con_time_up", policyTime?.format("YYYY-MM-DD HH:mm:ss"));
    form_data.append(
      "con_time_end",
      policyTimeEnd?.format("YYYY-MM-DD HH:mm:ss")
    );
    form_data.append("token", token);

    if (formData.con_file) {
      if (formData.con_file.length > 0) {
        for (var i = 0; i < formData.con_file.length; i++) {
          form_data.append(`con_file`, formData.con_file[i]);
        }
      }
    }
    const newTable = {
      con_id_user: +id.id,
      con_name: policyName,
      con_salary_persent: +policyDescription,

      con_time_up: policyTime?.format("YYYY-MM-DD HH:mm:ss"),
      con_time_end: policyTimeEnd?.format("YYYY-MM-DD HH:mm:ss"),
      token: token,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/insert_contract`,
        form_data
      );
      console.log("Thêm mới thành công:", response);
      setIsModalOpen(false);
      setEditingIndex(null);
      setPolicyName("");
      setPolicyDescription("");
      setPolicyTime(null);
      setPolicySelect("");
      setPolicyTimeEnd(null);
      setEditingData(null);
      setPolicyNote("");
      setReload(!reload);
      setBinary({});
      setFormData({});
    } catch (err) {
      console.error("Lỗi khi thêm mới:", error);
    }
    if (editingIndex !== null) {
      setTables((prevTables) => {
        const updatedTables = [...prevTables];
        updatedTables[editingIndex] = newTable;
        return updatedTables;
      });
    } else {
      setTables((prevTables) => [...prevTables, newTable]);
    }
  };

  const handleEdit = async () => {
    const editedTable = {
      con_id: editingData.con_id, // ID của hợp đồng đang chỉnh sửa
      con_id_user: +id.id,
      con_name: policyName,
      con_salary_persent: +policyDescription,
      con_file: "",
      con_time_up: policyTime?.format("YYYY-MM-DD HH:mm:ss"),
      con_time_end: policyTimeEnd?.format("YYYY-MM-DD HH:mm:ss"),
      token: token,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/edit_contract`,
        editedTable
      ); // Thay đổi URL API cho cập nhật
      console.log("Cập nhật thành công:", response);
      setModalOpen(false);
      setEditingData(null);
      setPolicyName("");
      setPolicyDescription("");
      setPolicyTime(null);
      setPolicyTimeEnd(null);
      setPolicyNote("");
      setReload(!reload);
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };
  const handleCancelModal = () => {
    setModalOpen(false);
  };
  const showModalEdit = (record) => {
    setEditingData(record); // Lưu dữ liệu hợp đồng đang chỉnh sửa
    setPolicyName(record.con_name);
    setPolicyDescription(record.con_salary_persent.toString()); // Đảm bảo set giá trị là string
    setPolicyTime(dayjs(record.con_time_up));
    setPolicyTimeEnd(dayjs(record.con_time_end));
    setModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicyTimeEnd(null);
  };
  const onSearch = (value) => console.log(value);
  //table thêm mới
  const columns = [
    {
      title: "Hợp đồng nhân viên",
      render: (record) => <p className={styles.p}>{record?.con_name}</p>,
    },
    {
      title: "Ngày hiệu lực",
      render: (record) => (
        <p className={styles.p}>
          {new Date(record?.con_time_up).toLocaleDateString("en-GB")}
        </p>
      ),
    },
    {
      title: "Ngày hết hạn",
      render: (record) => (
        <p className={styles.p}>
          {record?.con_time_end === "1970-01-01T00:00:00.000Z"
            ? "--"
            : new Date(record?.con_time_end).toLocaleDateString("en-GB")}
        </p>
      ),
    },
    {
      title: "%lương",
      render: (record) => (
        <p className={styles.p}> {record?.con_salary_persent} %</p>
      ),
    },
    {
      title: "	Tệp đính kèm",
      render: (record) => <p>{record?.con_file}</p>,
    },
    {
      title: "Sửa",
      render: (record) => (
        <button
          className={styles.button_style}
          onClick={() => {
            showModalEdit(record);
          }}
        >
          <Image alt="/" src={"/add-icon.png"} width={15} height={15} />
        </button>
      ),
    },
    {
      title: "Xóa",
      render: (record) => (
        <Tooltip className="ToolTipCustom">
          <Popconfirm
            className={`PopConfirmCustom`}
            placement="right"
            title={"Xác nhận xoá?"}
            okText="Có"
            cancelText="Không"
            onConfirm={() => {
              handleDelete(record?.con_id);
            }}
          >
            <div>
              <Image
                alt="/"
                src={"/tinhluong/delete-icon.png"}
                width={15}
                height={15}
              />
            </div>
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  // const props = {
  //   action: "//jsonplaceholder.typicode.com/posts/",
  //   listType: "picture",
  //   previewFile(file) {
  //     console.log("Your upload file:", file);

  //     return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
  //       method: "POST",
  //       body: file,
  //     })
  //       .then((res) => {
  //         console.log("res.json():", res.json());
  //         return res.json();
  //       })
  //       .then(({ thumbnail }) => thumbnail)
  //       .catch((error) => {
  //         console.error("Fetch error in allowanceSkip:", error);
  //         throw error;
  //       });
  //   },
  // };
  const props = {
    name: "file",
    action: "https://file.io",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("info.file", info.file, "info.fileList", info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        const fileBinary = info.file.originFileObj;

        // Now you can send the file binary to the API
        // You would need to write the logic to send the file binary to your API
        sendFileToApi(fileBinary);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const sendFileToApi = (fileBinary) => {
    setBinary(fileBinary);
  };

  const handleFileChange = useCallback((e) => {
    const { name, value } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBinary(value);
  }, []);
  return (
    <>
      <div>
        <div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.h3_container}>
                <h3 className={styles.header_h3}>Hợp đồng làm việc</h3>
              </div>
              <Button
                type="primary"
                onClick={showModal}
                className={`${styles.btn} customButton`}
              >
                Thêm hợp đồng
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                columns={columns}
                dataSource={apiContract?.data_contract}
                pagination={false}
                className={`${styles.table} tablePage`}
              />
            </div>
          </div>
        </div>
        {/*Thêm*/}
        <div className="modal_times">
          <Modal
            destroyOnClose={true}
            className={`${styles.modal_times} modal_add_tien`}
            title="Thêm hợp đồng nhân viên"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.times_body}>
              <label className={styles.p}>Hợp đồng nhân viên *</label>
              <input
                type="text"
                placeholder="Tên hợp đồng"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
              <label className={styles.p}>% Lương *</label>
              <input
                id="policy-description"
                placeholder="Nhập % lương "
                type={"number"}
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />

              <p className={styles.p}>Ngày hiệu lực *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTime}
                onChange={(date) => setPolicyTime(date)}
              />
              <p className={styles.p}>Ngày hết hạn *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTimeEnd}
                onChange={(date) => setPolicyTimeEnd(date)}
              />
              {/* <label className={styles.p}>Tệp đính kèm</label> */}

              {/* <Upload {...props} className={styles.times_month}>
                <Button className={styles.times_month}>
                  Chọn tệp đính kèm(tối đa 10MB)
                </Button>
              </Upload> */}
              <Section
                style="col_2"
                label={
                  <Custom_label
                    isRequired={true}
                    label_class="font_500"
                    title="Tài liệu đính kèm"
                  />
                }
                input={
                  <Input_file_3
                    placeholder="Thêm tài liệu đính kèm"
                    name="con_file"
                    handleChange={handleFileChange}
                  />
                }
              />
              <Button
                type="primary"
                className={`${styles.btn_saves} customButton_HandleOk`}
                onClick={handleOk}
              >
                Lưu
              </Button>
            </div>
          </Modal>
        </div>
        {/*sửa*/}
        <div className="modal_times">
          <Modal
            destroyOnClose={true}
            className={`${styles.modal_times} modal_add_tien`}
            title="Sửa hợp đồng nhân viên"
            visible={modalOpen}
            onCancel={handleCancelModal}
            footer={null}
          >
            <div className={styles.times_body}>
              <label className={styles.p}>Hợp đồng nhân viên *</label>
              <input
                type="text"
                placeholder="Tên hợp đồng"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
              <label className={styles.p}>% Lương *</label>
              <input
                id="policy-description"
                placeholder="Nhập % lương "
                type={"number"}
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />

              <p className={styles.p}>Ngày hiệu lực *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTime}
                onChange={(date) => setPolicyTime(date)}
              />
              <p className={styles.p}>Ngày hết hạn *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTimeEnd}
                onChange={(date) => setPolicyTimeEnd(date)}
              />
              {/* <label className={styles.p}>Tệp đính kèm</label> */}
              {/* <Upload {...props} className={styles.times_month}>
                <Button className={styles.times_month}>
                  Chọn tệp đính kèm(tối đa 10MB)
                </Button>
              </Upload> */}
              <Section
                style="col_2"
                label={
                  <Custom_label
                    isRequired={true}
                    label_class="font_500"
                    title="Tài liệu đính kèm"
                  />
                }
                input={
                  <Input_file_3
                    placeholder="Thêm tài liệu đính kèm"
                    name="con_file"
                    handleChange={handleFileChange}
                  />
                }
              />
              <Button
                type="primary"
                className={`${styles.btn_saves} customButton_HandleOk`}
                onClick={handleEdit}
              >
                Lưu
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AllowanceSkip;
