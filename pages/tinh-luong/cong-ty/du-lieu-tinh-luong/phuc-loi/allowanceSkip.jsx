import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Select,
  Table,
  DatePicker,
  Dropdown,
  Menu,
  Radio,
  Input,
} from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./index.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import axios from "axios";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const AllowanceSkip = () => {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  // render dữ liệu
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    fetchApiData();
  }, []);
  const fetchApiData = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_phuc_loi`, {
        token: token,
        companyId: cp,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const handleFromDateChange = (dateString) => {
    setSelectedFromDate(dayjs(dateString, dateFormat));
  };
  //thêm mơia
  const apiInsert = `${domain}/api/tinhluong/congty/insert_phuc_loi`;
  const [isInsert, setIsInsert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyTime, setPolicyTime] = useState(null);
  const [policyNote, setPolicyNote] = useState("");
  const [policySelect, setPolicySelect] = useState();
  const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
  const [tables, setTables] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
    setIsInsert(true);
  };

  const handleOk = async () => {
    await axios.post(apiInsert, {
      cl_com: cp,
      cl_name: policyName,
      cl_note: policyNote,
      cl_salary: policyDescription,
      cl_type_tax: policySelect,
      cl_day: policyTime?.format("YYYY-MM-DD"),
      cl_day_end: policyTimeEnd?.format("YYYY-MM-DD"),
      token: token,
      cl_active: 1,
      cl_type: 4,
    });

    setIsModalOpen(false);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicySelect();
    setPolicyTimeEnd(null);
    setPolicyNote("");
    setIsInsert(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyTime(null);
    setPolicyTimeEnd(null);
    setIsInsert(false);
  };
  // thêm nhân viên
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAddConfirm = () => {
    setIsModalAddOpen(true);
  };
  const hanleModalAddCancer = () => {
    setIsModalAddOpen(false);
  };
  //chỉnh sửa
  const editApi = `${domain}/api/tinhluong/congty/sua_phuc_loi`;
  const [isEditWa, setIsEditWa] = useState(false);
  const [seletectedId, setSelectedID] = useState(0);
  const showModalEditConfirm = async (id) => {
    await axios
      .post(editApi, {
        cl_name: policyName,
        cl_salary: policyDescription,
        cl_day: policyTime?.format("YYYY-MM-DD"),
        cl_note: policyNote,
        cl_day_end: policyTimeEnd?.format("YYYY-MM-DD"),
        cl_type: 4,
        cl_type_tax: policySelect,
        token: token,
        cl_active: 1,
        cl_id: id,
      })
      .then((response) => {
        console.log("EditedData: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    setIsModalOpen(false);
    setIsEditWa(false);
  };

  const handleOkGeneral = () => {
    if (isEditWa) {
      showModalEditConfirm(seletectedId);
    } else handleOk();
  };
  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.cl_id === id) {
        return i; // Return the index if id is found
      }
    }
    return -1; // Return -1 if id is not found
  }

  const handleDropdownClick = (key, id) => {
    if (key === "1") {
      showModalAddConfirm();
    }
    if (key === "2") {
      showModalEmployeeConfirm();
    }
    if (key === "3") {
      let index = findIndexById(apiData?.data?.list_welfa, id);
      setPolicyName(apiData?.data?.list_welfa[index]?.cl_name);
      setPolicyDescription(apiData?.data?.list_welfa[index]?.cl_salary);
      setPolicyNote(apiData?.data?.list_welfa[index]?.cl_note);
      setPolicySelect(apiData?.data?.list_welfa[index]?.cl_type_tax);
      setPolicyTime(() => {
        const date = apiData?.data?.list_welfa[index]?.cl_day;
        return date ? dayjs(date) : null;
      });
      setPolicyTimeEnd(() => {
        const date = apiData?.data?.list_welfa[index]?.cl_day_end;
        return date ? dayjs(date) : null;
      });
      setSelectedID(id);
      setIsEditWa(true);
      showModal();
    }
    if (key === "4") {
      showModalDeleteConfirm(id);
    }
  };
  const items = [
    {
      key: "1",
      name: "Thêm nhân viên",
    },
    {
      key: "2",
      name: "Danh sách nhân viên",
    },
    {
      key: "3",
      name: "Chỉnh sửa",
    },
    {
      key: "4",
      name: "xóa",
    },
  ];
  //thời gian áp dụng
  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const showModalTimeConfirm = () => {
    setIsModalTimeOpen(true);
    setIsModalEmployeeOpen(false);
  };
  const hanleModalTimeCancer = () => {
    setIsModalTimeOpen(false);
    setIsModalEmployeeOpen(true);
  };

  // xóa
  // xóa
  const [isDelete, setIsDelete] = useState(false);
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const apiDelete = `${domain}/api/tinhluong/congty/delete_phuc_loi`;
  const handleConfirmDelete = (id) => {
    axios
      .post(apiDelete, {
        cl_id: id,
        token: token,
      })
      .then((response) => {
        console.log("Data: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    setIsModalDeleteOpen(false);
    setIsDelete(!isDelete);
  };
  const showModalDeleteConfirm = (id) => {
    setSelectedTableIndex(id);
    setIsModalDeleteOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  //danh sách nhân viên
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);
  const showModalEmployeeConfirm = () => {
    setIsModalEmployeeOpen(true);
  };
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false);
  };
  const [selectionType, setSelectionType] = useState("checkbox");

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_text}>
          <h3 className={styles.employee_h3}>Phúc lợi mới </h3>
          <p className={styles.employee_p}>Danh sách nhân viên</p>
        </div>
      </>
    );
  };
  //radio
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  //search
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  const onSearch = (value) => console.log(value);
  //table thêm mới
  const columns = [
    {
      title: "Tên phụ cấp",
      // dataIndex: "policyName",
      render: (record) => (
        <div className={styles.add_flex}>
          <p className={styles.p_style}>{record?.cl_name}</p>
          <p>{record?.cl_note}</p>
        </div>
      ),
    },
    {
      title: "Tiền phụ cấp",
      // dataIndex: "policyDescription",
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.cl_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    ,
    {
      title: "Loại thu nhập",
      // dataIndex: "incomeType", // dataIndex should match the key used in the tables array
      render: (record) => (
        <div>
          <p>
            {record?.cl_type_tax === 0
              ? "Thu nhập miễn thuế"
              : "Thu nhập chịu thuế"}
          </p>
        </div>
      ),
    },
    {
      title: "Áp dụng từ ngày",
      // dataIndex: "policyTime",
      render: (record) => (
        <div>
          <p>{new Date(`${record?.cl_day}`).toLocaleDateString("en-GB")}</p>
        </div>
      ),
    },
    {
      title: "Đến ngày",
      // dataIndex: "policyTimeEnd",
      render: (record) => (
        <div>
          <div>
            <p>
              {new Date(`${record?.cl_day_end}`).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "",
      render: (item) => {
        return (
          <div>
            <button className={styles.button_style}>
              <Dropdown
                overlay={
                  <Menu
                    onClick={({ key }) => handleDropdownClick(key, item?.cl_id)}
                  >
                    {items.map((item1) => (
                      <Menu.Item key={item1.key}>{item1.name}</Menu.Item>
                    ))}
                  </Menu>
                }
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Image
                    alt="/"
                    src={"/tinhluong/setting.png"}
                    width={18}
                    height={18}
                  />
                </a>
              </Dropdown>
            </button>
          </div>
        );
      },
    },
  ];

  //table thêm nhân viên
  const columnsAdd = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      render: (name) => (
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
            <p>{name}</p>
            <p>3386962</p>
            <p>Phòng 13</p>
          </div>
        </div>
      ),
    },
  ];
  const dataAdd = [
    {
      key: "1",
      name: "John Brown",
    },
    {
      key: "2",
      name: "Jim Green",
    },
    {
      key: "3",
      name: "Joe Black",
    },
  ];

  // table employee
  const columnsEmployee = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: "150px",
      render: (name) => (
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
            <p>{name}</p>
            <p>3386962</p>
            <p>Phòng 13</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "room",
      width: "100px",
    },
    {
      title: "Từ ngày",
      dataIndex: "time",
      width: "100px",
    },
    {
      title: "Đến ngày",
      dataIndex: "timeEnd",
      width: "100px",
    },
    {
      title: "",
      dataIndex: "edit",
      width: "50px",
      render: () => (
        <button onClick={showModalTimeConfirm} className={styles.button_style}>
          <Image
            alt="/"
            src={"/tinhluong/add-icon.png"}
            width={15}
            height={15}
          />
        </button>
      ),
    },
    {
      title: "",
      dataIndex: "delete",
      width: "50px",
      render: () => (
        <div>
          <Image
            alt="/"
            src={"/tinhluong/delete-icon.png"}
            width={15}
            height={15}
          />
        </div>
      ),
    },
  ];
  const dataEmployee = [
    {
      key: "1",
      name: "John Brown",
      room: "Phòng 13",
      time: "10/2022",
      timeEnd: "10/2023",
    },
    {
      key: "2",
      name: "Jim Green",
      room: "Phòng 13",
      time: "10/2022",
      timeEnd: "10/2023",
    },
    {
      key: "3",
      name: "Joe Black",
      room: "Phòng 13",
      time: "10/2022",
      timeEnd: "10/2023",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  useEffect(fetchApiData, [isInsert, isEditWa, isDelete]);
  return (
    <>
      <div>
        <div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.text}>
                <h3 className={styles.header_h3}>Danh sách phụ cấp</h3>
                <p className={styles.header_p}>
                  Mức phụ cấp tương ứng với tổng ngày công trong tháng. Tổng
                  tiền phụ cấp hưởng được tính theo số ngày công thực tế đi làm
                  trong tháng
                </p>
              </div>
              <Button type="primary" onClick={showModal} className={styles.btn}>
                Thêm mới
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                columns={columns}
                dataSource={apiData?.data?.list_welfa}
                className={styles.table}
              />
            </div>
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
                onClick={() => handleConfirmDelete(selectedTableIndex)}
                className={styles.btn_delete}
              >
                Xóa
              </Button>
            </div>
          </Modal>
        </div>
        <div className="modal_edit_time">
          <Modal
            className={styles.modal_edit_time}
            title="Chỉnh sửa"
            open={isModalTimeOpen}
            onCancel={hanleModalTimeCancer}
            footer={null}
          >
            <div className={styles.edit_time_body}>
              <div className={styles.select_p}>
                <p>Áp dụng từ ngày</p>
                <DatePicker
                  format={dateFormat}
                  onChange={handleFromDateChange}
                  className={styles.edit_time_month}
                />
              </div>
              <div className={styles.select_p}>
                <p>Đến ngày</p>
                <DatePicker
                  format={dateFormat}
                  onChange={handleFromDateChange}
                  className={styles.edit_time_month}
                />
              </div>
            </div>
            <div className={styles.modal_edit_time_body}>
              <Button
                type="primary"
                onClick={hanleModalTimeCancer}
                className={styles.btn_edit_time_cancer}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" className={styles.btn_edit_save}>
                Lưu lại
              </Button>
            </div>
          </Modal>
        </div>
        <div className="modal_employee">
          <Modal
            title={<Title />}
            className={styles.modal_employee}
            open={isModalEmployeeOpen}
            onCancel={hanleModalEmployeeCancer}
            footer={null}
          >
            <div className={styles.table_employee_body}>
              <Table
                pagination={false}
                className={styles.table_employee}
                columns={columnsEmployee}
                dataSource={dataEmployee}
                scroll={{
                  y: 240,
                }}
              />
            </div>
          </Modal>
        </div>
        <div className="modal_add">
          <Modal
            title="Thêm nhân viên"
            className={styles.modal_add}
            open={isModalAddOpen}
            onCancel={hanleModalAddCancer}
            footer={null}
          >
            <div className={styles.modal_add_body}>
              <div className={styles.modal_add_content}>
                <Search
                  placeholder="Nhập tên nhân viên cần tìm kiếm"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
              <div>
                <Radio.Group
                  onChange={({ target: { value } }) => {
                    setSelectionType(value);
                  }}
                  defaultValue="checkbox"
                />
                <Table
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  className={styles.table_add}
                  columns={columnsAdd}
                  dataSource={dataAdd}
                  pagination={false}
                  scroll={{
                    y: 200,
                  }}
                />
              </div>
              <div>
                <div className={styles.time_element}>
                  <p className={styles.p}>Áp dụng từ ngày</p>
                  <DatePicker
                    defaultValue={dateFormat}
                    className={styles.times_month}
                    value={policyTime}
                    onChange={(date) => setPolicyTime(date)}
                  />
                </div>
                <div>
                  <p className={styles.p}>Đến hết ngày(không bắt buộc)</p>
                  <DatePicker
                    defaultValue={dateFormat}
                    className={styles.times_month}
                    value={policyTimeEnd}
                    onChange={(date) => setPolicyTimeEnd(date)}
                  />
                </div>
              </div>
              <div className={styles.modal_add_content}>
                <Button
                  type="primary"
                  className={styles.btn_add_cancer}
                  onClick={hanleModalAddCancer}
                >
                  Hủy bỏ
                </Button>
                <Button type="primary" className={styles.btn_add}>
                  Thêm
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="modal_times">
          <Modal
            className={styles.modal_times}
            title="Thêm mới phúc lợi"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.times_body}>
              <label className={styles.p}>Tên phúc lợi:</label>
              <input
                type="text"
                id="policy-name"
                placeholder="Nhập tên phúc lợi"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
              <label className={styles.p}>Tiền phúc lợi:</label>
              <input
                id="policy-description"
                placeholder="Nhập tiền phúc lợi"
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
              <div className={styles.time}>
                <div className={styles.time_element}>
                  <p className={styles.p}>Áp dụng từ ngày</p>
                  <DatePicker
                    defaultValue={dateFormat}
                    className={styles.times_month}
                    value={policyTime}
                    onChange={(date) => setPolicyTime(date)}
                  />
                </div>
                <div>
                  <p className={styles.p}>Đến hết ngày(không bắt buộc)</p>
                  <DatePicker
                    defaultValue={dateFormat}
                    className={styles.times_month}
                    value={policyTimeEnd}
                    onChange={(date) => setPolicyTimeEnd(date)}
                  />
                </div>
              </div>
              <div>
                <p className={styles.p}>Chọn loại</p>
                <Select
                  className={styles.seclected}
                  placeholder=""
                  defaultValue="Chọn loại thu nhập"
                  optionFilterProp="children"
                  value={policySelect}
                  onChange={(value) => setPolicySelect(value)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "0",
                      label: "Thu nhập miễn thuế",
                    },
                    {
                      value: "1",
                      label: "Thu nhập chịu thuế",
                    },
                  ]}
                />
              </div>
              <label className={styles.p}>Ghi chú:</label>
              <textarea
                id="policy-note"
                rows="3"
                placeholder="Nhập ghi chú(nếu có)"
                className={styles.input}
                value={policyNote}
                onChange={(e) => setPolicyNote(e.target.value)}
              />
            </div>
            <div className={styles.modal_times_body}>
              <Button
                type="primary"
                className={styles.btn_cancer}
                onClick={handleCancel}
              >
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                className={styles.btn_saves}
                onClick={handleOkGeneral}
              >
                {isEditWa ? "Cập nhật" : " Thêm"}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AllowanceSkip;
