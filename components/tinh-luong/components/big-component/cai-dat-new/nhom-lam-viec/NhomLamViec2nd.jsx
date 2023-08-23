import { useEffect, useState } from "react";
import { Select } from "antd";
import { Space, Table, Tag, Modal, Button } from "antd";
import styles from "./NhomLamViec2nd.module.css";
import axios from "axios";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../api/BaseApi";

//! Chú ý : ID:{record?.idTimViec365} Cái này là điền ID Quản lý chung hay ID 365 ?
export default function NhomLamViec2nd({
  selected1,
  resetPage3,
  setResetPage3,
  handleSelected,
}) {
  //* Function phụ
  function findIndexById(array, id) {
    return array.findIndex((item) => item?.idQLC === id);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterDepartment = (id) => {
    return id;
  };

  const handleClick = (c) => {
    handleSelected(c);
  };

  const [formData, setFormData] = useState({});
  const [userNoGroup, setUserNoGroup] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [allDep, setAllDep] = useState([]);
  const [userNoGroupSelected, setUserNoGroupSelected] = useState();
  const [groupThietLapSelected, setGroupThietLapSelected] = useState();
  const [isInsert, setIsInsert] = useState(false);
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  // Modal Thiet Lap

  const [isModalOpenThietLap, setIsModalOpenThietLap] = useState(false);
  const showModalThietLap = (id) => {
    setUserNoGroupSelected(id);
    setIsModalOpenThietLap(true);
  };
  const handleCancelThietLap = () => {
    setIsModalOpenThietLap(false);
  };
  const handleOkThietLap = (id, groupId) => {
    axios
      .post(`${domain}/api/tinhluong/congty/add_people_group`, {
        gm_id_group: groupId,
        gm_id_user: id,
        gm_id_com: cp,
        token: token,
      })
      .then((res) => {
        console.log("Response sau khi thêm người dùng vào nhóm : ", res);
      })
      .catch((err) => {
        console.log("Error sau khi thêm người dùng vào nhóm : ", err);
        alert("Bạn đã thêm nhân viên thất bại");
      });
    setResetPage3(!resetPage3);
    setIsInsert(!isInsert);
    setIsModalOpenThietLap(false);
  };

  //Modal Tạo mới
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ TenNhom: "", Mota: "" });
  };
  const handleOk = () => {
    axios
      .post(`${domain}/api/tinhluong/congty/insert_group`, {
        lgr_id_com: cp,
        lgr_name: formData.TenNhom,
        lgr_note: formData.Mota,
        token: token,
      })
      .then((res) => {
        console.log(" Response sau khi post ở Nhóm làm việc 2nd: ", res);
      })
      .catch((err) => {
        console.log("Error sau khi post ở nhóm làm việc 2nd: ", err);
      });
    setIsModalOpen(false);
    setFormData({ TenNhom: "", Mota: "" });
  };

  const columns = [
    {
      title: "     ",

      key: "name",
      width: "50%",
      render: (record) => (
        <div className={styles.tax_tb_avt}>
          <div className={styles.tax_avt_one}>
            <img src="/add.png" alt="" />
          </div>
          <div className={styles.tax_avt_tow}>
            <h4>{record?.userName}</h4>
            <p>ID:{record?.idQLC}</p>
            <p>{filterDepartment(record?.Department?.dep_name)}</p>
          </div>
        </div>
      ),
    },
    {
      title: "     ",

      key: "age",
      width: "50%",
      render: (record) => (
        <p
          className={styles.btn_towselectgroup}
          onClick={() => showModalThietLap(record?.idQLC)}
        >
          <p>Thiết lập</p>
        </p>
      ),
    },
  ];

  useEffect(() => {
    axios
      .post(
        "http://210.245.108.202:3009/api/tinhluong/congty/takeinfo_member_group_com",
        {
          com_id: cp,
          token: token,
        }
      )
      .then((res) => {
        setListGroup(res.data.listGroup);
        setUserNoGroup(res.data.listUserNoGroup);
      })
      .catch((err) => {
        console.log("err ở API takeinfo_member_group_com", err);
      });
  }, [isInsert]);

  useEffect(() => {
    axios
      .post(
        "http://210.245.108.202:3000/api/qlc/department/list",
        {
          com_id: cp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAllDep(res.data.data.data);
      });
  }, []);

  console.log("formData ở nhóm làm việc 2nd: ", formData);
  console.log("UserNoGroup Nhom lam viec 2nd: ", userNoGroup);
  console.log("All Department : ", allDep);
  console.log("ListGroup ở nhóm làm việc 2nd", listGroup);

  console.log(
    "Danh sách nhân viên chưa nhóm ở ô tìm kiếm",
    userNoGroup.map((item, index) => ({
      value: "jack",
      label: `${item?.userName}`,
    }))
  );

  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new} onClick={showModal}>
          Tạo mới
        </p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Nhóm làm việc</p>
          <p onClick={() => handleClick(2)} className={styles.active}>
            D/s nhân viên chưa nhóm
          </p>
          <p onClick={() => handleClick(3)}>D/s nhân viên các nhóm</p>
          <p onClick={() => handleClick(4)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          {/* Thanh select ten nguoi */}
          <div className={styles.sl_thanh}>
            <Select
              showSearch
              placeholder="Nhập tên nhân viên cần tìm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={userNoGroup.map((item, index) => ({
                value: "jack",
                label: `(${item?.idTimViec365})${item?.userName}`,
              }))}
            />
          </div>

          {/* Bang Danh Sach */}
          <div className={styles.tax_tb}>
            <Table
              className="CustomTable2ndNhomLamViec"
              dataSource={userNoGroup}
              columns={columns}
            />
          </div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpenThietLap}
        footer={null}
        onCancel={handleCancelThietLap}
      >
        <div className={styles.modal_hd_tax_thietlap}>
          <div className={styles.modal_body_thietlap}>
            <div className={styles.cr_popup_tax_thietlap}>
              <form>
                <div className={styles.cr_popup_tax_avt_thietlap}>
                  <div className={styles.cr_avt_one_thietlap}>
                    <img src="/add.png" alt="" />
                    <span>
                      <h4>
                        {
                          userNoGroup[
                            findIndexById(userNoGroup, userNoGroupSelected)
                          ]?.userName
                        }
                      </h4>
                      <p>
                        {
                          userNoGroup[
                            findIndexById(userNoGroup, userNoGroupSelected)
                          ]?.idQLC
                        }
                      </p>
                    </span>
                  </div>
                </div>
                <div className={styles.form_group_thietlap}>
                  <label htmlFor="">Chọn nhóm </label>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    name=""
                    onChange={(e) => setGroupThietLapSelected(e.target.value)}
                  >
                    <option value="all">Tất cả các nhóm</option>
                    {listGroup.map((item, index) => (
                      <option value={item.lgr_id}>{item.lgr_name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleOkThietLap(userNoGroupSelected, groupThietLapSelected)
                  }
                  className={styles.btn_sv_Thietlap}
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
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className={styles.modal_body}>
          <label className={styles.description}>Tên Nhóm</label>
          <input
            type="text"
            name="TenNhom"
            placeholder="Nhập tên nhóm"
            value={formData?.TenNhom}
            onChange={(e) => handleChange(e)}
            className={styles.input}
          />

          <label className={styles.description}>Mô tả</label>
          <textarea
            name="Mota"
            rows="5"
            placeholder="Nhập mô tả"
            className={styles.input}
            value={formData?.Mota}
            onChange={(e) => handleChange(e)}
          />

          <div>
            <Button className={styles.myBtn} type="primary" onClick={handleOk}>
              Tạo nhóm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
