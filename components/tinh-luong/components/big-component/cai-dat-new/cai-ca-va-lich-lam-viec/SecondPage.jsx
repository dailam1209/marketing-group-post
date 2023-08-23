//Todo : Copy Cac Style trong: Columns Employee, Title, Table
//Todo: Set Onclick Cho Cai danh sach Nhan Vien

//! Chu y: Mọi thứ cop từ Hoàng State đặt ở Modal Them Moi 3

import styles from "./SecondPage.module.css";
import {
  Dropdown,
  Select,
  Modal,
  Table,
  Radio,
  Input,
  Button,
  Form,
  Menu,
} from "antd";
import Image from "next/image";
import { DownOutlined, MenuOutlined, AudioOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ModalThemCa } from "./modal/modal-them-ca";
import {
  ModalThemLichLamViec,
  ModalTiepTuc,
} from "./modal-them-lich/moda-them-lich-lam-viec";
import { POST } from "../../../api/BaseApi";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { domain, domainQLC } from "../../../api/BaseApi";

export default function FirstPage({ handleSelected }) {
  checkCookie();

  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  console.log("token_base365 at CaiCaVaLichLamViec", token);
  //* Function phụ
  function convertToVietnameseMonthFormat(utcDateString) {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const utcDate = new Date(utcDateString);
    const vietnamTimezoneOffset = 7 * 60; // UTC+7 offset in minutes
    const vietnamTime = new Date(
      utcDate.getTime() + vietnamTimezoneOffset * 60 * 1000
    );

    const month = months[vietnamTime.getMonth()];
    const year = vietnamTime.getFullYear();

    return `${month}-${year}`;
  }
  //! key=1 onClick={showModalAddConfirm}, key =2 onClick={showModalEmployeeConfirm},
  const handleDropdownClick = (e, id) => {
    // Handle the dropdown click based on the selected key
    console.log("cy_id nhận được từ dropdown click", id);
    console.log("Đã phi vào handle DropDown Click và giá trị của key: ");
    if (e.key === "1") {
      showModalAddConfirm();
    }
    if (e.key === "2") {
      showModalEmployeeConfirm();
    }
    if (e.key === "3") {
      alert("Chỉnh Sửa");
    }
    if (e.key === "4") {
      alert("Sao chép lịch làm việc");
    }
    if (e.key === "5") {
      showModalDelete();
    }
  };

  const arrayTest = [1, 2];
  const handleClick = (c) => {
    handleSelected(c);
  };
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const YearData = [
    {
      value: 2022,
      label: "2022",
    },
    {
      value: 2023,
      label: "2023",
    },
    {
      value: 2024,
      label: "2024",
    },
  ];

  const MonthData = [
    {
      value: 1,
      label: "Tháng 1",
    },
    {
      value: 2,
      label: "Tháng 2",
    },
    {
      value: 3,
      label: "Tháng 3",
    },
    {
      value: 4,
      label: "Tháng 4",
    },
    {
      value: 5,
      label: "Tháng 5",
    },
    {
      value: 6,
      label: "Tháng 6",
    },
    {
      value: 7,
      label: "Tháng 7",
    },
    {
      value: 8,
      label: "Tháng 8",
    },
    {
      value: 9,
      label: "Tháng 9",
    },
    {
      value: 10,
      label: "Tháng 10",
    },
    {
      value: 11,
      label: "Tháng 11",
    },
    {
      value: 12,
      label: "Tháng 12",
    },
  ];

  //* Modal xóa
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleOkDelete = () => {
    setIsModalOpenDelete(false);
  };

  //* Modal Them Moi 1
  const [isModalOpenThemMoi, setIsModalOpenThemMoi] = useState(false);
  const showModalThemMoi = async () => {
    await setIsModalOpenThemMoi(true);
  };
  const handleCancelThemMoi = async () => {
    await setIsModalOpenThemMoi(false);
  };
  const handleOkThemMoi = async () => {
    await setIsModalOpenThemMoi(false);
    await showModalCaiLichLamViec();
  };

  // * Modal them moi 2
  const [isModalOpenCaiLichLamViec, setIsModalOpenCaiLichLamViec] =
    useState(false);
  const showModalCaiLichLamViec = () => {
    setIsModalOpenCaiLichLamViec(true);
  };
  const handleCancelCaiLichLamViec = () => {
    setIsModalOpenCaiLichLamViec(false);
  };
  const handleOkCaiLichLamViec = () => {
    setIsModalOpenCaiLichLamViec(false);
  };

  //* Modal Them Moi 3
  const [listCalendar, setListCalendar] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalCa, setModalCa] = useState(false);
  const [modelSaoChep, setModalSaoChep] = useState(false);
  const [totalData, setTotalData] = useState(listCalendar?.data);
  const [InitialAllCheck, setInitilAllCheck] = useState({});
  const [allSchedule, setAllSchedule] = useState([]);
  const [selectedCyId, setSelectedCyId] = useState(0);

  console.log("allSchedule", allSchedule);

  // const [data, setData] = useState(
  //   listCalendar?.data.filter(
  //     (item) => item.apply_month.substring(0, 7) === "2023-06"
  //   )
  // );
  const [cySelected, setCySelected] = useState(Object());
  const [dateFilter, setDateFilter] = useState("2023-06");
  const router = useRouter();

  const [form] = Form.useForm();

  //! form trong handleSubmit nay chi dung de validate
  const handleSubmitAddCy = () => {
    form.validateFields().then((value) => {
      POST(`${domainQLC}/api/qlc/cycle/create`, {
        cy_name: form.getFieldValue("cy_name"),
        apply_month: form.getFieldValue("apply_month"),
        cy_detail: JSON.stringify(form.getFieldValue("cy_detail")),
      }).then((res) => {
        if (res?.result === true) {
          router.replace(router.asPath);
        }
      });
    });
  };

  useEffect(() => {
    if (totalData) {
      const dateForSearch =
        form.getFieldValue("year") + "-" + form.getFieldValue("month");
      setData(
        totalData?.filter(
          (item) => item.apply_month.substring(0, 7) === dateForSearch
        )
      );
    }
  }, [totalData]);

  //! Day la useEffect cua minh
  const getListDataAPIUrl = `${domainQLC}/api/qlc/cycle/list`;
  useEffect(() => {
    const unfollow = () => {
      axios
        .post(
          getListDataAPIUrl,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setListCalendar(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    unfollow();
  }, []);

  //* Lấy tất cả lịch làm việc
  useEffect(() => {
    axios
      .post(
        `${domainQLC}/api/qlc/cycle/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("Các ca lịch việc là: ", res.data.data.data);
        setAllSchedule(res.data.data.data);
      })
      .catch((err) => {
        console.log(
          "error ở API : http://210.245.108.202:3000/api/qlc/cycle/list",
          err
        );
      });
  }, []);
  const showModalThemMoi3 = () => {
    setIsModalThemMoi3(true);
    setIsModalOpenCaiLichLamViec(false);
  };
  const handleCancelModalThemMoi3 = () => {
    setIsModalThemMoi3(false);
  };
  const handleOkModalThemMoi3 = () => {
    setIsModalThemMoi3(false);
  };

  //* modal thêm nhân viên
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAddConfirm = () => {
    setIsModalAddOpen(true);
  };
  const hanleModalAddCancer = () => {
    setIsModalAddOpen(false);
  };
  const handleOkThemNhanVien = () => {
    setIsModalAddOpen(false);
  };
  //* danh sách nhân viên
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

  //* Data Danh sach Nhan Vien
  const columnsEmployee = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: "25%",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "room",
      width: "25%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "time",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "timeEnd",
      width: "25%",
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

  const title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <h3 className={styles.employee_h3}>Lịch làm việc 1 </h3>
            <p className={styles.employee_p}>Danh sách nhân viên</p>
          </div>
        </div>
      </>
    );
  };
  const [selectionType, setSelectionType] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  // console.log("isModalOpenCaiLichLamViec:", isModalOpenCaiLichLamViec);

  //! key=1 onClick={showModalAddConfirm}, key =2 onClick={showModalEmployeeConfirm},
  const items = [
    {
      key: 1,
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/tinhluong/add_member.png" alt="" />
          <p>Thêm Nhân viên</p>
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/tinhluong/list_cycle.png" alt="" />
          <p>Danh sách nhân viên</p>
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/tinhluong/edit_cycle.png" alt="" />
          <p>Chỉnh sửa</p>
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/tinhluong/copy_cycle.png" alt="" />
          <p>Sao chép lịch làm việc</p>
        </div>
      ),
    },
    {
      key: 5,
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/tinhluong/delete_cycle.png" alt="" />
          <p>Xóa lich làm việc</p>
        </div>
      ),
    },
  ];

  const ListItemsCaiLichLam = [
    "Ca sáng",
    "Ca trưa",
    "Ca kinh doanh",
    "Ca đêm",
    "Ca tối",
    "Ca 30k",
  ];

  //Search
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  const onSearch = (value) => console.log(value);

  //* Data cho them moi Nhan Vien
  const columns = [
    {
      title: "Nhân viên",
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
  const dataThemMoiNhanVien = [
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
  // console.log("Initial All Check: ", InitialAllCheck);
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Sao chép lịch</p>
        <p className={styles.btn_new} onClick={() => setModalAdd(true)}>
          Thêm lịch
        </p>
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
      </div>

      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Ca làm việc</p>
          <p onClick={() => handleClick(2)} className={styles.active}>
            Lịch Làm Việc
          </p>
          <p onClick={() => handleClick(3)}>Cài đặt Công Chuẩn</p>
          <p onClick={() => handleClick(4)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.tax_calendarwork}>
            <p>Lịch làm việc chung</p>
            {allSchedule.map((item, index) => (
              <div className={styles.tax_items}>
                <div className={styles.tax_bg1}>
                  <div className={styles.tax_top}>
                    <div className={styles.tax_setting}>
                      <Dropdown
                        overlay={
                          <Menu
                            onClick={(e) => handleDropdownClick(e, item?.cy_id)}
                          >
                            {items.map((item1) => (
                              <Menu.Item key={item1.key}>
                                {item1.label}
                              </Menu.Item>
                            ))}
                          </Menu>
                        }
                        placement="bottomLeft"
                        trigger={["click"]}
                      >
                        <p>
                          <img
                            className={styles.imgthreedots}
                            src="/tinhluong/Group 7508.png"
                            alt=""
                          />
                        </p>
                      </Dropdown>
                    </div>
                    <div className={styles.tax_title}>{item?.cy_name}</div>
                  </div>
                </div>
                <div className={styles.tax_bottom}>
                  <div className={styles.tax_bottom_1}>
                    <img src="/tinhluong/clock.png" />
                    <p>
                      Áp dụng:{" "}
                      {convertToVietnameseMonthFormat(item?.apply_month)}
                    </p>
                  </div>
                  <div className={styles.tax_bottom_2}>
                    <img src="/tinhluong/user.png" alt="" />
                    <p>Nhân viên: {item?.is_personal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpenThemMoi}
        footer={null}
        onCancel={handleCancelThemMoi}
      >
        <div className={styles.modal_hd_tax_ThemMoi}>
          <div className={styles.modal_body_ThemMoi}>
            <div className={styles.cr_popup_tax_ThemMoi}>
              <form>
                <div className={styles.form_group_ThemMoi}>
                  <label htmlFor="">Chọn nhóm </label>
                  <span style={{ color: "red" }}>*</span>
                  <select name="" id="">
                    <option value="">Chọn nhóm</option>
                    <option value="">Nhóm 1</option>
                    <option value="">Nhóm 2</option>
                  </select>
                </div>
                <div className={styles.form_group_ThemMoi}>
                  <label htmlFor="">Chọn lịch làm việc </label>
                  <span style={{ color: "red" }}>*</span>
                  <select name="" id="">
                    <option value="">Thứ 2- thứ 6</option>
                    <option value="">Thứ 2- thứ 7</option>
                    <option value="">Thứ 2- CN</option>
                  </select>
                </div>

                <div className={styles.form_group_ThemMoi}>
                  <label htmlFor="">Tháng áp dụng </label>
                  <input
                    type="month"
                    name="month"
                    min="2022-01"
                    max="2024-01"
                  ></input>
                </div>
                <div className={styles.form_group_ThemMoi}>
                  <label htmlFor="">Tháng áp dụng </label>
                  <input type="date" name="date" id="date" />
                </div>

                <button
                  type="button"
                  onClick={handleOkThemMoi}
                  className={styles.btn_sv_ThemMoi}
                >
                  Lưu lại
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpenCaiLichLamViec}
        footer={null}
        onCancel={handleCancelCaiLichLamViec}
      >
        <div className={styles.form_tab_ThemMoi}>
          <div className={styles.form_section_ThemMoi}>
            <div className={styles.form_group_ThemMoi}>
              <label>Chọn ca làm việc</label>

              {ListItemsCaiLichLam.map((item, index) => (
                <div className={styles.form_item_checkbox} key={index}>
                  <input
                    type="checkbox"
                    class="shitf"
                    key={index}
                    value="2236"
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <button type="button" className={styles.previous_btn_cycle_left}>
              <p>Quay lại</p>
            </button>
            <button
              type="button"
              className={styles.continue_btn_cycle}
              onClick={showModalThemMoi3}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <Modal
          title="Thêm nhân viên"
          className="modal_add_tien"
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
                dataSource={dataThemMoiNhanVien}
                // scroll={{
                //   y: 240,
                // }}
              />
            </div>
            <div className={styles.modal_add_content}>
              <Button
                type="primary"
                className={styles.btn_add}
                onClick={handleOkThemNhanVien}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          className="Tien_modal_employee"
          title={title()}
          open={isModalEmployeeOpen}
          onCancel={hanleModalEmployeeCancer}
          footer={null}
        >
          <div className={styles.modal_add_body}>
            <div>
              <Table
                className="Tien_Danh_sach_nhan_vien"
                columns={columnsEmployee}
                dataSource={dataEmployee}
              />
            </div>
          </div>
        </Modal>
      </div>
      <Modal
        title="Thêm nhân viên"
        className="modal_add_tien"
        open={false}
        onCancel={handleCancelModalThemMoi3}
        footer={null}
      >
        <div className={styles.box_calendar}>
          <div className={styles.calendar}>
            {/* <div className={styles.header}>Tháng 07/2023</div>
            <div className={styles.days}></div> */}
          </div>
        </div>
      </Modal>

      <Modal
        className="tien_modal_delete_lich_lam_viec"
        title="Basic Modal"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {ModalThemLichLamViec(
        modalAdd,
        setModalAdd,
        setModalNext,
        totalData,
        setTotalData,
        setCySelected,
        form
      )}
      {ModalTiepTuc(
        modalNext,
        setModalNext,
        setModalAdd,
        setModalCa,
        form,
        setInitilAllCheck
      )}
      {ModalThemCa(
        modalCa,
        setModalCa,
        setModalNext,
        form,
        handleSubmitAddCy,
        "T2T7",
        InitialAllCheck
      )}
    </div>
  );
}
