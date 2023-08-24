import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Dropdown,
  Menu,
  Space,
  Radio,
  Input,
  Table,
  DatePicker,
} from "antd";
import styles from "./index.module.css";
import { DownOutlined, MenuOutlined, AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";
import { domain } from "../../../../../components/tinh-luong/components/api/BaseApi";

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
//dropdown
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
const itemsFix = [
  {
    key: "1",
    name: "Thêm nhân viên",
  },
  {
    key: "2",
    name: "Danh sách nhân viên",
  },
];

//table
const columns = [
  {
    title: "Nhân viên 12",
    dataIndex: "name",
    render: (name) => (
      <div className={styles.render}>
        <div>
          <Image
            alt="/"
            src={"/tien.png"}
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
const data = [
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
//table employee
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
            src={"/tien.png"}
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
    title: "Từ tháng",
    dataIndex: "time",
    width: "100px",
  },
  {
    title: "Đến tháng",
    dataIndex: "timeEnd",
    width: "100px",
  },
  {
    title: "",
    dataIndex: "delete",
    width: "50px",
    render: () => (
      <div>
        <Image alt="/" src={"/delete-icon.png"} width={15} height={15} />
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

const Chinhsachbaohiem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [cards, setCards] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTc0OTYsImlkVGltVmllYzM2NSI6MjQwMDgwLCJpZFFMQyI6MTI0ODMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoidHVhbmFuaGh1c3QwNUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjgxNTMxNzA5LCJ0eXBlIjoyLCJjb21faWQiOjMzMTIsInVzZXJOYW1lIjoiQWRmdWx0cmUifSwiaWF0IjoxNjkyMjM4NDU2LCJleHAiOjE2OTIzMjQ4NTZ9.c__rv6NXknnAEhR122Sbbe9ADXOn_wCys6b-NCnVPfw";
  const cp = 3312;
  const fetchApiData = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/takeinfo_insrc`, {
        token: token,
        cl_com: cp,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  console.log(apiData?.tax_list);

  console.log(
    apiData?.tax_list?.map((item) => {
      item.TinhluongFormSalary;
    })
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newCard = {
      policyName: policyName,
      policyDescription: policyDescription,
      policyRecipeName: policyRecipeName,
      policyRecipeDescription: policyRecipeDescription,
    };

    if (editingIndex !== null) {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[editingIndex] = newCard;
        return updatedCards;
      });
    } else {
      setCards((prevCards) => [...prevCards, newCard]);
    }

    setIsModalOpen(false);
    setEditingIndex(null);
    setPolicyName("");
    setPolicyDescription("");
    setPolicyRecipeName("");
    setPolicyRecipeDescription("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPolicyName("");
    setPolicyDescription("");
  };

  //chỉnh sửa

  const showModalEditConfirm = (key) => {
    console.log(key);
    setIsModalOpen(true);
    setPolicyName(cards[key].policyName);
    setPolicyDescription(cards[key].policyDescription);
    setPolicyRecipeName(cards[key].policyRecipeName);
    setPolicyRecipeDescription(cards[key].policyRecipeDescription);
  };
  // usestate xóa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalDeleteConfirm = (index) => {
    setSelectedCardIndex(index);
    setIsModalDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCardIndex !== null) {
      setCards((prevCards) =>
        prevCards.filter((_, index) => index !== selectedCardIndex)
      );
      setSelectedCardIndex(null);
      setIsModalDeleteOpen(false);
    }
  };

  //index dropdown
  const [editingIndex, setEditingIndex] = useState(null);
  const handleDropdownClick = (key, index) => {
    if (key === "1") {
      showModalAddConfirm();
    }
    if (key === "2") {
      showModalEmployeeConfirm();
    }
    if (key === "3") {
      showModalEditConfirm(index);
      setEditingIndex(index);
    }
    if (key === "4") {
      showModalDeleteConfirm(index);
    }
  };
  const handleDropdownFixClick = (key) => {
    if (key === "1") {
      showModalAddConfirm();
    }
    if (key === "2") {
      showModalEmployeeConfirm();
    }
  };
  //usestate công thức
  const [isModalRecipeOpen, setIsModalRecipeOpen] = useState(false);
  const [policyRecipeName, setPolicyRecipeName] = useState("");
  const [policyRecipeDescription, setPolicyRecipeDescription] = useState("");

  const handleModalRecipe = () => {
    setIsModalRecipeOpen(true);
  };

  const handleRecipeOk = () => {
    setIsModalRecipeOpen(false);
  };
  const handleRecipeCancel = () => {
    setIsModalRecipeOpen(false);
    setPolicyRecipeName("");
    setPolicyRecipeDescription("");
  };

  //modal thêm nhân viên
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAddConfirm = () => {
    setIsModalAddOpen(true);
  };
  const hanleModalAddCancer = () => {
    setIsModalAddOpen(false);
  };

  //thời gian áp dụng
  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const showModalTimeConfirm = () => {
    setIsModalTimeOpen(true);
    setIsModalAddOpen(false);
  };
  const hanleModalTimeCancer = () => {
    setIsModalTimeOpen(false);
    setIsModalAddOpen(true);
  };
  //radio
  const [value, setValue] = useState();
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  //danh sách nhân viên
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);
  const showModalEmployeeConfirm = () => {
    setIsModalEmployeeOpen(true);
  };
  const showModalAddEmployeeConfirm = () => {
    setIsModalAddOpen(true);
    setIsModalEmployeeOpen(false);
  };
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false);
  };
  const [selectionType, setSelectionType] = useState("checkbox");

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <h3 className={styles.employee_h3}>Bảo hiểm mới </h3>
            <p className={styles.employee_p}>Danh sách nhân viên</p>
          </div>
          <div>
            <Button
              type="primary"
              onClick={showModalAddEmployeeConfirm}
              className={styles.btn_employee}
            >
              Thêm nhân viên
            </Button>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Button type="primary" onClick={showModal} className={styles.btn}>
            Thêm mới
          </Button>

          <div className={`${styles.all_modal} modal_one`}>
            <Card
              key=""
              title="Nhập tiền bảo hiểm"
              extra={
                <Dropdown
                  overlay={
                    <Menu onClick={({ key }) => handleDropdownFixClick(key)}>
                      {itemsFix.map((item) => (
                        <Menu.Item key={item.key}>{item.name}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Image
                        alt="/"
                        src={"/deta.png"}
                        width={15}
                        height={18}
                        className={styles.deta}
                      />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              }
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <div>
                <div>
                  <p className={styles.write}>
                    <Image
                      alt="/"
                      src={"/write.png"}
                      width={15}
                      height={18}
                      className={styles.pen}
                    />{" "}
                    Miêu tả
                  </p>
                  <p>Nhập tiền bảo hiểm cho nhân viên</p>
                </div>
                <div>
                  <button
                    onClick={showModalAddEmployeeConfirm}
                    className={styles.button_add}
                  >
                    Nhập tiền bảo hiểm
                  </button>
                </div>
              </div>
            </Card>
            <Card
              key=""
              title="BHXH tính theo lương cơ bản"
              extra={
                <Dropdown
                  overlay={
                    <Menu onClick={({ key }) => handleDropdownFixClick(key)}>
                      {itemsFix.map((item) => (
                        <Menu.Item key={item.key}>{item.name}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Image
                        alt="/"
                        src={"/deta.png"}
                        width={15}
                        height={18}
                        className={styles.deta}
                      />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              }
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <div>
                <div>
                  <p className={styles.write}>
                    <Image
                      alt="/"
                      src={"/write.png"}
                      width={15}
                      height={18}
                      className={styles.pen}
                    />{" "}
                    Miêu tả
                  </p>
                  <p>
                    Bảo hiểm xã hội được tính theo mức lương cơ bản mà công ty
                    chi trả cho cá nhân đó.
                  </p>
                </div>
                <div>
                  <p className={styles.write}>
                    <Image
                      alt="/"
                      src={"/code.png"}
                      width={15}
                      height={18}
                      className={styles.pen}
                    />{" "}
                    Cách tính
                  </p>
                  <p>Lương cơ bản * 10,5%</p>
                </div>
              </div>
            </Card>
            <Card
              key=""
              title="BHXH tính theo lương Nhập vào"
              extra={
                <Dropdown
                  overlay={
                    <Menu onClick={({ key }) => handleDropdownFixClick(key)}>
                      {itemsFix.map((item) => (
                        <Menu.Item key={item.key}>{item.name}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Image
                        alt="/"
                        src={"/deta.png"}
                        width={15}
                        height={18}
                        className={styles.deta}
                      />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              }
              bordered={false}
              style={{
                width: 300,
              }}
            >
              <div>
                <div>
                  <p className={styles.write}>
                    <Image
                      alt="/"
                      src={"/write.png"}
                      width={15}
                      height={18}
                      className={styles.pen}
                    />{" "}
                    Miêu tả
                  </p>
                  <p>
                    Bảo hiểm xã hội sẽ tính theo mức lương của từng cá nhân do
                    công ty nhập vào (có thể là mức tối thiểu vùng)
                  </p>
                </div>
                <div>
                  <p className={styles.write}>
                    <Image
                      alt="/"
                      src={"/code.png"}
                      width={15}
                      height={18}
                      className={styles.pen}
                    />{" "}
                    Cách tính
                  </p>
                  <p>Lương cơ bản * 10,5%</p>
                </div>
              </div>
            </Card>
            {apiData?.tax_list?.map((card, index) => (
              <Card
                key={index}
                title={card.cl_name}
                extra={
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={({ key }) => handleDropdownClick(key, index)}
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
                      <Space>
                        <Image
                          alt="/"
                          src={"/deta.png"}
                          width={15}
                          height={18}
                          className={styles.deta}
                        />
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                }
                bordered={false}
                style={{
                  width: 300,
                }}
              >
                <div>
                  <div>
                    <p className={styles.write}>
                      <Image
                        alt="/"
                        src={"/write.png"}
                        width={15}
                        height={18}
                        className={styles.pen}
                      />{" "}
                      Miêu tả
                    </p>
                    <p className={styles.text}>
                      {card?.TinhluongFormSalary?.map((item) => {
                        item.fs_name;
                      })}
                    </p>
                  </div>
                  <div>
                    <p className={styles.write}>
                      <Image
                        alt="/"
                        src={"/code.png"}
                        width={15}
                        height={18}
                        className={styles.pen}
                      />{" "}
                      Cách tính
                    </p>
                    <p className={styles.text}>
                      {card?.TinhluongFormSalary?.map((item) => {
                        item.fs_repica;
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className={styles.video}>
            <iframe
              className="video_hd"
              style={{ borderRadius: 15 }}
              width={680}
              height={430}
              src="https://www.youtube.com/embed/qrcnNI2-184"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            />
          </div>
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
                  columns={columns}
                  dataSource={data}
                  scroll={{
                    y: 240,
                  }}
                />
              </div>
              <div className={styles.modal_add_content}>
                <Button
                  type="primary"
                  className={styles.btn_add}
                  onClick={showModalTimeConfirm}
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          </Modal>
        </div>

        <div className="modal_time">
          <Modal
            className={styles.modal_time}
            title="Thời gian áp dụng"
            open={isModalTimeOpen}
            onCancel={hanleModalTimeCancer}
            footer={null}
          >
            <div className={styles.time_body}>
              <div className={styles.select_p}>
                <p>Áp dụng từ tháng</p>
                <DatePicker picker="month" className={styles.time_month} />
              </div>
              <div className={styles.select_p}>
                <p>Đến hết tháng(không bắt buộc)</p>
                <DatePicker picker="month" className={styles.time_month} />
              </div>
            </div>
            <div className={styles.modal_time_body}>
              <Button
                type="primary"
                onClick={hanleModalTimeCancer}
                className={styles.btn_time_cancer}
              >
                Quay lại
              </Button>
              <Button type="primary" className={styles.btn_save}>
                Lưu lại
              </Button>
            </div>
          </Modal>
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
            className={styles.modal_recipe}
            style={{ display: "flex", flexDirection: "column" }}
            title="      "
            open={isModalRecipeOpen}
            onCancel={handleRecipeCancel}
            footer={null}
          >
            <div className={styles.modalRecipe_body}>
              <div className={styles.add_recipe}>
                <p>Thêm công thức</p>
              </div>
              <div className={styles.flex}>
                <div className={styles.modalRecipe_left}>
                  <div className={styles.input_after}>
                    <input
                      type="text"
                      id="policyRecipe-name"
                      className={styles.input}
                      placeholder="Thêm tên chính sách bảo hiểm"
                      value={policyRecipeName}
                      onChange={(e) => setPolicyRecipeName(e.target.value)}
                      prefix={<MenuOutlined />}
                    />
                  </div>
                  <div className={styles.radio}>
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={1}>Công thức</Radio>
                      <Radio value={2}>Hằng số</Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <textarea
                      id="policyRecipe-description"
                      rows="8"
                      className={styles.input}
                      value={policyRecipeDescription}
                      onChange={(e) =>
                        setPolicyRecipeDescription(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className={styles.modalRecipe_right}>
                  <div className={styles.modalRecipe_right_content}>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>luong_co_ban</h3>
                      <p className={styles.payroll_p}>Mức lương cơ bản</p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>cong_chuan</h3>
                      <p className={styles.payroll_p}>Số công chuẩn</p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>phu_thuoc</h3>
                      <p className={styles.payroll_p}>số người phụ thuộc</p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>dong_gop</h3>
                      <p className={styles.payroll_p}>Các khoản đóng góp</p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>cong_thuc</h3>
                      <p className={styles.payroll_p}>Số công thực tế</p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>cong_sau_phat</h3>
                      <p className={styles.payroll_p}>
                        Số công thực tế còn lại sau phạt
                      </p>
                    </div>
                    <div className={styles.payroll}>
                      <h3 className={styles.payroll_h3}>luong_bao_hiem</h3>
                      <p className={styles.payroll_p}>
                        Mức lương đóng bảo hiểm thực tế
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className={styles.btn_recipe}
                  type="primary"
                  onClick={handleRecipeOk}
                >
                  Thêm công thức
                </Button>
              </div>
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
                <Table
                  className={styles.table_add}
                  columns={columnsEmployee}
                  dataSource={dataEmployee}
                  scroll={{
                    y: 240,
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>

        <div className="myModal">
          <Modal
            className={styles.my_modal}
            style={{ display: "flex", flexDirection: "column" }}
            title="Thêm mới chính sách bảo hiểm"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.modal_body}>
              <label className={styles.p}>Tên chính sách bảo hiểm:</label>
              <input
                type="text"
                id="policy-name"
                placeholder="Nhập tên chính sách bảo hiểm"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />

              <label className={styles.p}>Miêu tả chính sách:</label>
              <textarea
                id="policy-description"
                rows="5"
                placeholder="Nhập miêu tả"
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
              <p className={styles.recipe} onClick={handleModalRecipe}>
                Thiết lập công thức{" "}
                <Image alt="/" src={"/stmt.png"} width={15} height={13} />
              </p>

              <div>
                <Button
                  className={styles.myBtn}
                  type="primary"
                  onClick={handleOk}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Chinhsachbaohiem;
