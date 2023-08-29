import React, { useEffect, useState } from "react";
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
  InputNumber,
  Form,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { MenuOutlined, AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavResCongTy from "../../../../components/tinh-luong/components/big-component/head-nav-res-cong-ty";
import styles from "./index.module.css";
import Allowance from "./allowance";
import AllowanceSkip from "./allowanceSkip";
import Contribute from "./Contribute";
import { useRouter } from "next/router";
import axios from "axios";

import { error } from "next/dist/build/output/log";
import dayjs from "dayjs";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";

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
  const dateFormat = "DD/MM/YYYY";
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [insurancePremium, setInsurancePremium] = useState("");
  const [reason, setReason] = useState("");
  const [decisionBase, setDecisionBase] = useState("");
  const [policyTime, setPolicyTime] = useState(null);

  const [tables, setTables] = useState([]);
  const [dataUser, setDataUser] = useState();
  const [dataSalary, setDataSalary] = useState();
  const [reload, setReload] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  console.log("DataSalary", dataSalary);
  const fetchApiData = () => {
    axios
      .post(`${domain}/api/tinhluong/nhanvien/qly_ho_so_ca_nhan`, {
        token: token,
        ep_id: id,
        cp: cp,
      })
      .then((response) => {
        setDataUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const apiSalary = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/take_salary_em`, {
        token: token,
        ep_id: id,
      })
      .then((response) => {
        setDataSalary(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    apiSalary();
  }, [reload]);
  const handleDelete = async (sb_id) => {
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/delete_basic_salary`,
        {
          token: token,
          sb_id: sb_id,
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
    setIsModalOpen(true);
    setPolicyName("");
    setPolicyDescription("");
    setInsurancePremium("");
    setPolicyTime(null);
    setReason("");
    setDecisionBase("");
  };

  const handleOk = async () => {
    const newTable = {
      sb_id_user: +id,
      sb_id_com: dataSalary?.data_salary?.[0].sb_id_com,
      sb_salary_basic: policyName,
      sb_salary_bh: policyDescription,
      sb_pc_bh: insurancePremium,
      sb_time_up: policyTime?.format("YYYY-MM-DD HH:mm:ss"),
      sb_lydo: reason,
      sb_quyetdinh: decisionBase,
      token: token,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/insert_basic_salary`,
        newTable
      );
      console.log("Thêm mới thành công:", response);
      setIsModalOpen(false);
      setReload(!reload);
    } catch (err) {
      console.error("Lỗi khi thêm mới:", error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // sửa
  const handleEdit = async () => {
    const newTable = {
      sb_id: +id,
      sb_salary_basic: policyName,
      sb_salary_bh: policyDescription,
      sb_pc_bh: insurancePremium,
      sb_time_up: policyTime?.format("YYYY-MM-DD HH:mm:ss"),
      sb_lydo: reason,
      sb_quyetdinh: decisionBase,
      token: token,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/update_basic_salary`,
        newTable
      );
      console.log("Sửa thành công:", response);
      setModalOpen(false);
      setReload(!reload);
    } catch (err) {
      console.error("Lỗi khi sửa:", error);
    }
  };
  const cancelModalEdit = () => {
    setModalOpen(false);
  };

  const openModalEdit = (record) => {
    setEditingData(record);
    setPolicyName(record.sb_salary_basic);
    setPolicyDescription(record.sb_salary_bh);
    setInsurancePremium(record.sb_pc_bh);
    setPolicyTime(dayjs(record.sb_time_up));
    setReason(record.sb_lydo);
    setDecisionBase(record.sb_quyetdinh);
    setModalOpen(true);
  };

  //table thêm mới
  const columns = [
    {
      title: "Lương cơ bản",
      render: (record) => (
        <div className={styles.add_flex}>
          <p className={styles.p_style}>
            {record?.sb_salary_basic
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: "Lương đóng bảo hiểm",
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.sb_salary_bh
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: "Phụ cấp đóng bảo hiểm",
      render: (record) => (
        <div>
          <p className={styles.p_red}>
            {record?.sb_pc_bh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VNĐ
          </p>
        </div>
      ),
    },
    {
      title: "Tăng / giảm lương",
      render: (record) => (
        <div>
          <div>
            <p className={styles.p_red}>{"0 VNĐ"}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Thời gian áp dụng",
      render: (record) => (
        <div>
          <p>{new Date(record?.sb_time_up).toLocaleDateString("en-GB")}</p>
        </div>
      ),
    },
    {
      title: "Sửa",
      render: (record) => (
        <button
          className={styles.button_style}
          onClick={() => {
            openModalEdit(record);
          }}
        >
          <Image alt="/" src={"/add-icon.png"} width={15} height={15} />
        </button>
      ),
    },
    {
      title: "Xóa",
      render: (record) => (
        <Tooltip title="Xóa">
          <Popconfirm
            placement="right"
            title={"Xác nhận xoá?"}
            okText="Có"
            cancelText="Không"
            onConfirm={() => {
              handleDelete(record?.sb_id);
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

  const user = dataUser;

  const handleEditUser = async () => {
    const tableUser = {
      ep_name: nameUser,
      ep_birthday: date,
      ep_gender: gender === "Nữ" ? 2 : 1,
      ep_married: married === "Độc Thân" ? 1 : 0,
      ep_address: address,
      phone: phone,
      email: email,
      start_salary: "",
      bank: bank,
      bank_account: bankAccount,
      ep_id: id,
      token: token,
    };
    try {
      const response = await axios.post(
        `${domain}/api/tinhluong/congty/edit_detail_inforuser`,
        tableUser
      );
      console.log("Sửa thành công:", response);
      setIsClose(true);
      setIsEditOpen(false);
      setReload(!reload);
    } catch (err) {
      console.error("Lỗi khi sửa:", error);
    }
  };

  const [isIntroduceOpen, setIsIntroduceOpen] = useState(false);
  const openIntroduce = () => {
    setIsIntroduceOpen(true);
  };
  const closeIntroduce = () => {
    setIsIntroduceOpen(false);
  };

  const [isClose, setIsClose] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const openEdit = () => {
    setIsClose(false);
    setNameUser(user?.info_dep_com?.user?.userName);
    setGender(
      user?.info_dep_com?.user?.inForPerson?.account.gender === 1 ? "Nam" : "Nữ"
    );
    setDate(
      dayjs.unix(user?.info_dep_com?.user?.inForPerson?.account?.birthday)
    );
    setIdQlC(user?.info_dep_com?.user?.idQLC);
    setMarried(
      user.info_dep_com?.user?.inForPerson?.account.married === 1
        ? "Độc thân"
        : "Đã kết hôn"
    );
    setAddress(user.info_dep_com?.user?.address);
    setPhone(user.info_dep_com?.user?.phone);
    setEmail(user.info_dep_com?.user?.email);
    setBank(user?.info_emp_start?.st_bank);
    setBankAccount(user?.info_emp_start?.st_stk);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsClose(true);
    setIsEditOpen(false);
  };
  const [nameUser, setNameUser] = useState("");
  const [gender, setGender] = useState();
  const [date, setDate] = useState();
  const [idQlC, setIdQlC] = useState();
  const [married, setMarried] = useState();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  return (
    <>
      <div className={styles.container_index}>
        <div>
          <HeadNav title="Hồ sơ nhân viên" />
          <HeadNavResCongTy></HeadNavResCongTy>
        </div>
        <div className={styles.content_top}>
          <div className={styles.content}>
            <div>
              <div className={styles.name_content}>
                <div>
                  <div className={styles.name}>
                    <div>
                      <Image
                        alt="/"
                        src={"/add.png"}
                        width={110}
                        height={110}
                        style={{ borderRadius: "50%" }}
                      />
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={27}
                        height={27}
                        style={{ marginLeft: "-11px" }}
                      />
                    </div>
                    <div className={styles.name_flex}>
                      <p>{dataUser?.info_dep_com?.user?.userName}</p>
                      <p>{dataUser?.info_dep_com?.postion?.description}</p>
                    </div>
                  </div>
                  <button className={styles.name_button}>
                    Thay đổi lịch làm việc
                  </button>
                </div>
              </div>

              <div className={styles.introduce_container}>
                <div className={styles.introduce}>
                  <p>Giới thiệu</p>
                  <Image
                    alt="/"
                    src={"/edit.png"}
                    width={27}
                    height={27}
                    onClick={openIntroduce}
                  />
                </div>
                <div>
                  <p className={styles.p_gt}>
                    {
                      dataUser?.info_dep_com?.user?.inForPerson?.employee
                        ?.ep_description
                    }
                  </p>
                </div>
                {isIntroduceOpen && (
                  <div>
                    <textarea
                      type="text"
                      rows={8}
                      className={styles.textarea}
                      placeholder="Thêm ghi chú"
                    >
                      {
                        dataUser?.info_dep_com?.user?.inForPerson?.employee
                          ?.ep_description
                      }
                    </textarea>
                    <div className={styles.btn_user}>
                      <button
                        className={styles.input_cancer}
                        onClick={closeIntroduce}
                      >
                        Hủy
                      </button>
                      <button className={styles.input_submit}>
                        Lưu thông tin
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.information_user}>
                <p>Thông tin cá nhân</p>
                <Image
                  alt="/"
                  src={"/edit.png"}
                  width={27}
                  height={27}
                  onClick={openEdit}
                />
              </div>
              {isClose && (
                <div className={styles.information}>
                  <div>
                    <p className={styles.information_p}>
                      Họ và tên: {dataUser?.info_dep_com?.user?.userName}
                    </p>
                    <p className={styles.information_p}>
                      Ngày sinh:{" "}
                      {new Date(
                        dataUser?.info_dep_com?.user?.inForPerson?.account
                          ?.birthday * 1000
                      ).toLocaleDateString("en-GB")}
                    </p>
                    <p className={styles.information_p}>
                      Phòng ban: {dataUser?.info_dep_com?.department?.dep_name}
                    </p>
                    <p className={styles.information_p}>
                      Địa chỉ: {dataUser?.info_dep_com?.user?.address}
                    </p>
                    <p className={styles.information_p}>
                      Số điện thoại: {dataUser?.info_dep_com?.user?.phone}
                    </p>
                    <p className={styles.information_p}>
                      Ngân hàng nhận lương:{" "}
                      {dataUser?.info_emp_start?.st_bank
                        ? dataUser?.info_emp_start?.st_bank
                        : "Chưa cập nhật"}
                    </p>
                    <p className={styles.information_p}>
                      Hồ sơ nhân viên: Xem chi tiết
                    </p>
                  </div>
                  <div>
                    <p className={styles.information_p}>
                      Giới tính:{" "}
                      {dataUser?.info_dep_com?.user?.inForPerson?.account
                        ?.gender === 1
                        ? "Nam"
                        : dataUser?.info_dep_com?.user?.inForPerson?.account
                            ?.gender === 2
                        ? "Nữ"
                        : "Khác"}
                    </p>
                    <p className={styles.information_p}>
                      Mã nhân viên: {dataUser?.info_dep_com?.user?.idQLC}
                    </p>
                    <p className={styles.information_p}>
                      Chức vụ:{" "}
                      {dataUser?.info_dep_com?.user?.postion?.description
                        ? dataUser?.info_dep_com?.user?.postion?.description
                        : "Chưa cập nhật"}
                    </p>
                    <p className={styles.information_p}>
                      Ngày bắt đầu làm:{" "}
                      {new Date(
                        dataUser?.info_dep_com?.user?.inForPerson?.employee
                          ?.start_working_time * 1000
                      ).toLocaleDateString("en-GB")}
                    </p>
                    <p className={styles.information_p}>
                      Email: {dataUser?.info_dep_com?.user?.email}
                    </p>
                    <p className={styles.information_p}>
                      Số tài khoản ngân hàng:{" "}
                      {dataUser?.info_emp_start?.st_stk
                        ? dataUser?.info_emp_start?.st_stk
                        : "Chưa cập nhật"}
                    </p>
                    <p className={styles.information_p}>
                      Bắt đầu tính lương: Từ ngày bắt đầu làm việc
                    </p>
                  </div>
                </div>
              )}
              {isEditOpen && (
                <div className={styles.information_flex}>
                  <div className={styles.render}>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Họ và tên:</label>
                      <input
                        value={nameUser}
                        type="text"
                        placeholder="Họ và tên"
                        className={styles.input}
                        onChange={(e) => setNameUser(e.target.value)}
                      />
                    </div>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Giới tính</label>
                      <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn giới tính"
                        optionFilterProp="children"
                        value={gender}
                        onChange={(value) => setGender(value)}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "Nam",
                            label: "Nam",
                          },
                          {
                            value: "Nữ",
                            label: "Nữ",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className={styles.render}>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Ngày sinh</label>
                      <DatePicker
                        value={date}
                        format={dateFormat}
                        className={styles.times_month}
                      />
                    </div>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Mã nhân viên</label>
                      <Input value={idQlC} disabled />
                    </div>
                  </div>
                  <div className={styles.render}>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Tình trạng hôn nhân:</label>
                      <Select
                        className={styles.seclected}
                        placeholder=""
                        defaultValue="Chọn tình trạng hôn nhân:"
                        optionFilterProp="children"
                        value={married}
                        onChange={(value) => setMarried(value)}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "Độc thân",
                            label: "Độc thân",
                          },
                          {
                            value: "Đã kết hôn",
                            label: "Đã kết hôn",
                          },
                        ]}
                      />
                    </div>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Địa chỉ:</label>
                      <input
                        value={address}
                        type="text"
                        placeholder="Nhập địa chỉ"
                        className={styles.input}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.render}>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Số điện thoại:</label>
                      <input
                        value={phone}
                        type="number"
                        placeholder="Nhập số điện thoại"
                        className={styles.input}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Địa chỉ:</label>
                      <input
                        value={email}
                        type="email"
                        placeholder="Nhập email"
                        className={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.render}>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>Ngân hàng nhận lương:</label>
                      <input
                        value={bank}
                        type="text"
                        placeholder="Nhập ngân hàng"
                        className={styles.input}
                        onChange={(e) => setBank(e.target.value)}
                      />
                    </div>
                    <div className={styles.flex_input}>
                      <label className={styles.p}>
                        Số tài khoản ngân hàng:
                      </label>
                      <input
                        value={bankAccount}
                        type="number"
                        placeholder="Nhập số tài khoản ngân hàng"
                        className={styles.input}
                        onChange={(e) => setBankAccount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.btn_top}>
                    <button className={styles.input_cancer} onClick={closeEdit}>
                      Hủy
                    </button>
                    <button
                      className={styles.input_submit}
                      onClick={handleEditUser}
                    >
                      Lưu thông tin
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.header}>
              <div className={styles.h3_container}>
                <h3 className={styles.header_h3}>Lương cơ bản</h3>
              </div>
              <Button
                type="primary"
                onClick={showModal}
                className={`${styles.btn} customButton`}
              >
                Thêm lương
              </Button>
            </div>
            <div className={styles.table_style}>
              <Table
                className={"tablePage"}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                columns={columns}
                dataSource={dataSalary?.data_salary}
                rowClassName="editable-row"
              />
            </div>
          </div>
        </div>
        <div className={styles.content_center}>
          <AllowanceSkip id={id} />
        </div>
        <div className={styles.content_footer}>
          <Allowance />
        </div>
        <div className={styles.content_footer}>
          <Contribute />
        </div>
        {/*thêm*/}
        <div className="modal_times">
          <Modal
            className={`${styles.modal_times} modal_add_tien`}
            title="Thêm lương mức cơ bản"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <div className={styles.times_body}>
              <label className={styles.p}>Lương cơ bản *</label>
              <input
                type="number"
                placeholder="Nhập lương cơ bản"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
              <label className={styles.p}>Lương đóng bảo hiểm</label>
              <input
                type="number"
                placeholder="Nhập lương đóng bảo hiểm"
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
              <label className={styles.p}>Phụ cấp đóng bảo hiểm</label>
              <input
                type="number"
                placeholder="Nhập tiền phụ cấp đóng bảo hiểm"
                className={styles.input}
                value={insurancePremium}
                onChange={(e) => setInsurancePremium(e.target.value)}
              />

              <p className={styles.p}>Thời gian áp dụng *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTime}
                onChange={(date) => setPolicyTime(date)}
              />

              <label className={styles.p}>Lý do:</label>
              <input
                type="text"
                placeholder="Lý do(nếu có)"
                className={styles.input}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <label className={styles.p}>Căn cứ quyết định:</label>
              <input
                type="text"
                placeholder="Căn cứ quyết định(nếu có)"
                className={styles.input}
                value={decisionBase}
                onChange={(e) => setDecisionBase(e.target.value)}
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
        <div>
          <Modal
            className={styles.modal_times}
            title="Sửa lương mức cơ bản"
            visible={modalOpen}
            onCancel={cancelModalEdit}
            footer={null}
          >
            <div className={styles.times_body}>
              <label className={styles.p}>Lương cơ bản *</label>
              <input
                type="number"
                placeholder="Nhập lương cơ bản"
                className={styles.input}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
              <label className={styles.p}>Lương đóng bảo hiểm</label>
              <input
                type="number"
                placeholder="Nhập lương đóng bảo hiểm"
                className={styles.input}
                value={policyDescription}
                onChange={(e) => setPolicyDescription(e.target.value)}
              />
              <label className={styles.p}>Phụ cấp đóng bảo hiểm</label>
              <input
                type="number"
                placeholder="Nhập tiền phụ cấp đóng bảo hiểm"
                className={styles.input}
                value={insurancePremium}
                onChange={(e) => setInsurancePremium(e.target.value)}
              />

              <p className={styles.p}>Thời gian áp dụng *</p>
              <DatePicker
                format={dateFormat}
                className={styles.times_month}
                value={policyTime}
                onChange={(date) => setPolicyTime(date)}
              />

              <label className={styles.p}>Lý do:</label>
              <input
                type="text"
                placeholder="Lý do(nếu có)"
                className={styles.input}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <label className={styles.p}>Căn cứ quyết định:</label>
              <input
                type="text"
                placeholder="Căn cứ quyết định(nếu có)"
                className={styles.input}
                value={decisionBase}
                onChange={(e) => setDecisionBase(e.target.value)}
              />
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

export default App;
