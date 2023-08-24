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
  Form,
} from "antd";
import { MenuOutlined, AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import HeadNav from "../../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../../components/tinh-luong/components/big-component/head-nav-res";
import checkCookie from "../../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Allowance from "./allowance";
import AllowanceSkip from "./allowanceSkip";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const App = () => {
  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  //in data ra bảng
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    fetchApiData();
  }, []);
  const fetchApiData = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_phuc_loi `, {
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
  const [isInsert, setIsInsert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyTime, setPolicyTime] = useState(null);
  const [policyNote, setPolicyNote] = useState("");
  const [policySelect, setPolicySelect] = useState();
  const [policyTimeEnd, setPolicyTimeEnd] = useState(null);
  const [tables, setTables] = useState([]);
  // thêm mới
  const apiInsert = `${domain}/api/tinhluong/congty/insert_phuc_loi`;

  const showModal = () => {
    setIsModalOpen(true);
    setIsInsert(true);
  };

  const handleOk = () => {
    if (isEdit) {
      showModalEditConfirm(seletectedId);
    } else {
      axios.post(apiInsert, {
        cl_com: cp,
        cl_name: policyName,
        cl_note: policyNote,
        cl_salary: policyDescription,
        cl_type_tax: policySelect,
        cl_day: policyTime?.format("YYYY-MM"),
        cl_day_end: policyTimeEnd?.format("YYYY-MM"),
        token: token,
        cl_active: 1,
        cl_type: 3,
      });
    }

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

  //chỉnh sửa
  const editApi = `${domain}/api/tinhluong/congty/sua_phuc_loi`;
  const [isEdit, setIsEdit] = useState(false);
  const [seletectedId, setSelectedID] = useState(0);
  const showModalEditConfirm = (id) => {
    axios
      .post(editApi, {
        cl_name: policyName,
        cl_salary: policyDescription,
        cl_day: policyTime?.format("YYYY-MM"),
        cl_note: policyNote,
        cl_day_end: policyTimeEnd?.format("YYYY-MM"),
        cl_type: 3,
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
    setIsEdit(false);
  };

  const handleOkGeneral = () => {
    if (isEdit) {
      showModalEditConfirm(seletectedId);
    } else handleOk();
  };
  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.cl_id === id) {
        console.log("index: ", i);
        return i;
      }
    }
    return -1;
  }

  const handleDropdownClick = (key, id) => {
    if (key === "1") {
      showModalAddConfirm(id);
    }
    if (key === "2") {
      let index = findIndexById(apiData?.data?.list_welf, id);
      showModalEmployeeConfirm(index);
    }
    if (key === "3") {
      let index = findIndexById(apiData?.data?.list_welf, id);
      setPolicyName(apiData?.data?.list_welf[index]?.cl_name);
      setPolicyDescription(apiData?.data?.list_welf[index]?.cl_salary);
      setPolicyNote(apiData?.data?.list_welf[index]?.cl_note);
      setPolicySelect(apiData?.data?.list_welf[index]?.cl_type_tax);
      setPolicyTime(() => {
        const date = apiData?.data?.list_welf[index]?.cl_day;
        return date ? dayjs(date) : null;
      });
      setPolicyTimeEnd(() => {
        const date = apiData?.data?.list_welf[index]?.cl_day_end;
        return date ? dayjs(date) : null;
      });
      setSelectedID(id);
      setIsEdit(true);
      showModal();
      console.log(apiData?.data?.list_welf[index]?.cl_name);
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
  // thêm nhân viên
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAddConfirm = () => {
    setIsModalAddOpen(true);
  };
  const hanleModalAddCancer = () => {
    setIsModalAddOpen(false);
  };
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
  const title = () => {
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
      title: "Tên phúc lợi",
      // dataIndex: "policyName",
      render: (record) => (
        <div className={styles.add_flex}>
          <p className={styles.p_style}>{record?.cl_name}</p>
          <p>{record?.cl_note}</p>
        </div>
      ),
    },
    {
      title: "Tiền phúc lợi",
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
      // dataIndex: "incomeType",
      render: (record) => {
        return (
          <div>
            <p>
              {record?.cl_type_tax === 0
                ? "Thu nhập miễn thuế"
                : "Thu nhập chịu thuế"}
            </p>
          </div>
        );
      },
    },
    {
      title: "Áp dụng từ tháng",
      // dataIndex: "policyTime",
      render: (record) => (
        <div>
          <p>
            {record?.cl_day
              ? new Date(record?.cl_day).toLocaleDateString("en-GB")
              : ""}
          </p>
        </div>
      ),
    },
    {
      title: "Đến tháng",
      // dataIndex: "policyTimeEnd",
      render: (record) => (
        <div>
          <div>
            <p>
              {record?.cl_day_end
                ? new Date(record?.cl_day_end).toLocaleDateString("en-GB")
                : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "",

      render: (item) => (
        <div>
          <button className={styles.button_style}>
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) => handleDropdownClick(key, item?.cl_id)}
                >
                  {items.map((item) => (
                    <Menu.Item key={item.key}>{item.name}</Menu.Item>
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
      ),
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
  const [apiDataEmployee, setApiDataEmployee] = useState([]);
  useEffect(() => {
    fetchApiDataEmployee();
  }, []);
  const fetchApiDataEmployee = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_list_nv_nhom`, {
        token: token,
        cls_id_cl: 2,
      })
      .then((response) => {
        const datas = response.data.listUserFinal.filter(
          (res) => res.type === 2
        );
        const day = response?.data?.detail?.cl_day;
        const day_end = response?.data?.detail?.cl_day_end;
        const newArr = datas.map((data) => {
          return { ...data, day: day, day_end: day_end };
        });
        console.log(newArr);
        setApiDataEmployee(newArr);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const columnsEmployee = [
    {
      title: "Họ và tên",

      width: "250px",
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
            <p>{record.userName}</p>
            <p>{record?._id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      render: (record) => (
        <div>
          <p>{record?.department?.[0]?.dep_name}</p>
        </div>
      ),
      width: "200px",
    },
    {
      title: "Từ tháng",
      // dataIndex: "day",
      render: (record) => (
        <div>
          <p>
            {record?.day
              ? new Date(record?.day).toLocaleDateString("en-GB")
              : ""}
          </p>
        </div>
      ),
      width: "100px",
    },
    {
      title: "Đến tháng",
      // dataIndex: "day_end",
      render: (record) => (
        <div>
          <p>
            {record?.day_end
              ? new Date(record?.day_end).toLocaleDateString("en-GB")
              : ""}
          </p>
        </div>
      ),
      width: "100px",
    },
    {
      title: "",

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

  useEffect(fetchApiData, [isInsert, isEdit, isDelete]);
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Phúc lợi" />
        </div>
        <div className={styles.content_top}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.text}>
                <h3 className={styles.header_h3}>Danh sách phúc lợi</h3>
                <p className={styles.header_p}>Phúc lợi được tính theo tháng</p>
              </div>
              <Button type="primary" onClick={showModal} className={styles.btn}>
                Thêm mới
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                columns={columns}
                dataSource={apiData?.data?.list_welf}
                className={styles.table}
              />
            </div>
          </div>
        </div>
        <div className={styles.content_center}>
          <AllowanceSkip />
        </div>
        <div className={styles.content_footer}>
          <Allowance />
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
            title="Chỉnh sửa phúc lợi"
            open={isModalTimeOpen}
            onCancel={hanleModalTimeCancer}
            footer={null}
          >
            <div className={styles.edit_time_body}>
              <div className={styles.select_p}>
                <p>Áp dụng từ tháng</p>
                <DatePicker picker="month" className={styles.edit_time_month} />
              </div>
              <div className={styles.select_p}>
                <p>Đến tháng</p>
                <DatePicker picker="month" className={styles.edit_time_month} />
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
            title={title()}
            className={styles.modal_employee}
            open={isModalEmployeeOpen}
            onCancel={hanleModalEmployeeCancer}
            footer={null}
          >
            <div className={styles.table_employee_body}>
              <Table
                className={styles.table_employee}
                columns={columnsEmployee}
                dataSource={apiDataEmployee}
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
                  <p className={styles.p}>Áp dụng từ tháng</p>
                  <DatePicker
                    picker="month"
                    className={styles.times_month}
                    value={policyTime}
                    onChange={(date) => setPolicyTime(date)}
                  />
                </div>
                <div>
                  <p className={styles.p}>Đến hết tháng(không bắt buộc)</p>
                  <DatePicker
                    picker="month"
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
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form>
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
                    <p className={styles.p}>Áp dụng từ tháng</p>
                    <DatePicker
                      picker="month"
                      className={styles.times_month}
                      format={"MM-YYYY"}
                      value={policyTime}
                      onChange={(date) => setPolicyTime(date)}
                    />
                  </div>
                  <div>
                    <p className={styles.p}>Đến hết tháng(không bắt buộc)</p>
                    <DatePicker
                      picker="month"
                      className={styles.times_month}
                      format={"MM-YYYY"}
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
                    defaultValue="Chọn loại thu nhập "
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
                  {isEdit ? "Cập nhật" : " Thêm"}
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default App;
