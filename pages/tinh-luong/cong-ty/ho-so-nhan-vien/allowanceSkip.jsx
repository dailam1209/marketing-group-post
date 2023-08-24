import React, { useEffect, useState } from "react";
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

import { error } from "next/dist/build/output/log";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";

const AllowanceSkip = (id) => {
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
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
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
    const newTable = {
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
        `${domain}/api/tinhluong/congty/insert_contract`,
        newTable
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
        <Tooltip>
          <Popconfirm
            placement="right"
            title={"Xác nhận xoá?"}
            okText="Có"
            cancelText="Không"
            onConfirm={() => {
              handleDelete(record?.con_id);
            }}
          >
            <div>
              <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
            </div>
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };
  return (
    <>
      <div>
        <div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div>
                <h3 className={styles.header_h3}>Hợp đồng làm việc</h3>
              </div>
              <Button type="primary" onClick={showModal} className={styles.btn}>
                Thêm hợp đồng
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                columns={columns}
                dataSource={apiContract?.data_contract}
                pagination={false}
                className={styles.table}
              />
            </div>
          </div>
        </div>
        {/*Thêm*/}
        <div className="modal_times">
          <Modal
            destroyOnClose={true}
            className={styles.modal_times}
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
              <label className={styles.p}>Tệp đính kèm</label>
              <Upload {...props} className={styles.times_month}>
                <Button className={styles.times_month}>
                  Chọn tệp đính kèm(tối đa 10MB)
                </Button>
              </Upload>
              <Button
                type="primary"
                className={styles.btn_saves}
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
            className={styles.modal_times}
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
              <label className={styles.p}>Tệp đính kèm</label>
              <Upload {...props} className={styles.times_month}>
                <Button className={styles.times_month}>
                  Chọn tệp đính kèm(tối đa 10MB)
                </Button>
              </Upload>
              <Button
                type="primary"
                className={styles.btn_saves}
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
