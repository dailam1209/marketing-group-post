import React, { useState, useEffect } from "react";
import styles from "../hoahongcanhan.module.css";
import { DatePicker, Table, Select, Modal, Button, Form } from "antd";
import dayjs from "dayjs";
import {
  MonthData,
  YearData,
} from "../../../../../../components/tinh-luong/components/Data/SelectionData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { domain } from "../../../../../../components/tinh-luong/components/api/BaseApi";
dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const Hoahongcanhan = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTc0OTYsImlkVGltVmllYzM2NSI6MjQwMDgwLCJpZFFMQyI6MTI0ODMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoidHVhbmFuaGh1c3QwNUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjgxNTMxNzA5LCJ0eXBlIjoyLCJjb21faWQiOjMzMTIsInVzZXJOYW1lIjoiTmd1eeG7hW4gVHXhuqVuIEFuaCJ9LCJpYXQiOjE2OTIzNDUwNDgsImV4cCI6MTY5MjQzMTQ0OH0.MgfQvd4SnMp9qAVeiaJVGU8p4_rdYgX2QAGMVOY1CIs";
  const cp = 1664;
  const [form] = Form.useForm();
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  const fetchApiData = (month, year) => {
    axios
      .post(`${domain}/api/tinhluong/congty/lay_tien_ca_nhan`, {
        token: token,
        ro_id_com: cp,
        month: month,
        year: year,
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
  const router = useRouter();
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  //modalthêm mới
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState();
  const [editTime, setEditTime] = useState(null);
  const [editMoney, setEditMoney] = useState("");
  const [editNote, setEditNote] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModalCancer = () => {
    setIsModalOpen(false);
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const handleAddData = (data) => {
    const newData = { ...data, key: Date.now() };
    setTables((prevTables) => [...prevTables, newData]);
  };

  const handleEditData = (key, newData) => {
    setTables((prevTables) =>
      prevTables.map((item) =>
        item.key === key ? { ...item, ...newData } : item
      )
    );
  };
  //chỉnh sửa
  const showModalEditConfirm = (key) => {
    console.log("Edit key:", key);
    setIsModalOpen(true);
    setEditingIndex(key);
    setEditName(tables[key]?.incomeType);
    setEditTime(tables[key]?.editTime);
    setEditMoney(tables[key]?.editMoney);
    setEditNote(tables[key]?.editNode);
  };

  const handleOk = () => {
    const newTable = {
      incomeType: editName,
      editTime: editTime?.format("DD-MM-YYYY"),
      editMoney: editMoney,
      editNote: editNote,
    };

    if (editingIndex !== null) {
      console.log("Updating data with key:", editingIndex);
      handleEditData(editingIndex, newTable);
    } else {
      console.log("Adding new data:", newTable);
      handleAddData(newTable);
    }

    setIsModalOpen(false);
    setEditingIndex(null);
    setEditName();
    setEditTime(null);
    setEditMoney("");
    setEditNote("");
  };

  // xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalDeleteConfirm = (key) => {
    setSelectedTableIndex(key);
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTableIndex !== null) {
      setTables((prevTables) =>
        prevTables.filter((_, key) => key !== selectedTableIndex)
      );
      setSelectedTableIndex(null);
      setIsModalDeleteOpen(false);
    }
  };

  const columns = [
    {
      title: "Họ và tên",

      render: (record) => (
        <div>
          <p className={styles.p_name}>{record?.detail?.[0]?.userName}</p>
          <p className={styles.p_id}>ID: {record?.detail?.[0]?._id}</p>
        </div>
      ),
    },
    {
      title: "Thời gian",

      render: (record) => (
        <div>
          <p className={styles.p_time}>
            {new Date(`${record?.ro_time}`).toLocaleDateString("en-GB")}
          </p>
        </div>
      ),
    },
    {
      title: "Số tiền",

      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.ro_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: "Ghi chú",

      render: (record) => (
        <div>
          <p className={styles.p_time}>{record?.ro_note}</p>
        </div>
      ),
    },
    {
      title: "",

      render: () => (
        <button className={styles.button_edit} onClick={showModalEditConfirm}>
          <Image alt="/" src={"/add-icon.png"} width={15} height={15} />
        </button>
      ),
    },
    {
      title: "",
      render: () => (
        <button className={styles.button_edit} onClick={showModalDeleteConfirm}>
          <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.information}>
          <div>
            <h3 className={styles.h3}>Danh sách nhân viên & hoa hồng</h3>
            <p className={styles.p_style}>
              Quản lý theo dõi nhân viên được gán hoa hồng
            </p>
          </div>
          <div>
            <div className={styles.modal_body}>
              <button
                type="primary"
                className={styles.btn_back}
                onClick={() =>
                  router.push("/cong-ty/du-lieu-tinh-luong/hoa-hong")
                }
              >
                Quay lại
              </button>
              <button
                type="primary"
                className={styles.btn_add}
                onClick={showModal}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
        <div className={styles.select_time}>
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
              defaultValue={{ label: `${selectedYear}`, value: selectedYear }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={YearData}
            />
          </Form.Item>
          <div>
            <Select
              showSearch
              style={{ marginTop: "8px" }}
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
        </div>
        <div className={styles.table_content}>
          <Table
            columns={columns}
            dataSource={apiData?.rose_user}
            className={styles.table_add}
            pagination={false}
          />
        </div>
      </div>
      <div className={styles.content_bot}>
        <div className={styles.video}>
          <iframe
            className="video_hd"
            style={{ borderRadius: 15 }}
            width={680}
            height={430}
            src="https://www.youtube.com/embed/WQaU3n2wYdM"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
          />
        </div>
      </div>
      <div className="modal_delete">
        <Modal
          className={styles.modal_delete}
          title="Bạn chắc chắn muốn xóa ?"
          open={isModalDeteleOpen}
          onCancel={handleDeleteCancel}
          footer={null}
        >
          <div className={styles.modal_delete_body}>
            <Button
              type="primary"
              onClick={handleDeleteCancel}
              className={styles.btn_cancer}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmDelete}
              className={styles.btn_delete}
            >
              Xóa
            </Button>
          </div>
        </Modal>
      </div>
      <div className="modalRecipe">
        <Modal
          className={styles.modal_edit}
          title="Thêm mới hoa hồng tiền"
          open={isModalOpen}
          onCancel={handleModalCancer}
          footer={null}
        >
          <div className={styles.modalRecipe_body}>
            <div className={styles.format}>
              <label className={styles.p_edit}>Họ và tên</label>
              <Select
                className={styles.seclected}
                placeholder=""
                defaultValue="Chọn nhân viên"
                optionFilterProp="children"
                value={editName}
                onChange={(value) => setEditName(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Trường GPT",
                    label: "Trường GPT",
                  },
                  {
                    value: "Tiến ngơ",
                    label: "Tiến ngơ",
                  },
                ]}
              />

              <label className={styles.p_edit}>Thời gian áp dụng</label>
              <DatePicker
                formatr={dateFormat}
                className={styles.times_month}
                value={editTime}
                onChange={(date) => setEditTime(date)}
              />

              <label className={styles.p_edit}>Nhập số tiền</label>
              <input
                type="number"
                className={styles.input}
                placeholder="Nhập số tiền"
                value={editMoney}
                onChange={(e) => setEditMoney(e.target.value)}
              />

              <label className={styles.p_edit}>Ghi chú</label>
              <textarea
                type="text"
                rows={3}
                className={styles.textarea}
                placeholder="Thêm ghi chú"
                value={editNote}
                onChange={(e) => {
                  setEditNote(e.target.value);
                }}
              />

              <Button
                className={styles.btn_recipe}
                type="primary"
                onClick={handleOk}
              >
                Thêm hoa hồng
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Hoahongcanhan;
