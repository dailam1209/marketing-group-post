import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Dropdown,
  Menu,
  Space,
  Radio,
  Table,
  Input,
} from "antd";
import { DownOutlined, MenuOutlined, AudioOutlined } from "@ant-design/icons";

import styles from "./NhomLamViec1st.module.css";
import Image from "next/image";
import axios from "axios";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../api/BaseApi";

//Todo: Chinh dau 3 cham thanh (handleDropDown), Nút thêm nhân viên cursor pointer => Done
//todo: Tao chuc nang insert, chinh sua cua nhom lam viec => Done

//* Card de hien thi card
//*

export default function NhomLamViec1st({ selected1, handleSelected }) {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  //* Data cho them nhan vien
  const columns = [
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
  //* Data cho Danh sach nhan vien
  // const columnsEmployee = [
  //   {
  //     title: "Họ và tên",
  //     dataIndex: "name",
  //     width: "25%",
  //     render: (name) => (
  //       <div className={styles.render}>
  //         <div>
  //           <Image
  //             alt="/"
  //             src={"/tien.png"}
  //             width={50}
  //             height={50}
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           <p>{name}</p>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Phòng ban",
  //     dataIndex: "room",
  //     width: "25%",
  //   },
  //   {
  //     title: "Số điện thoại",
  //     dataIndex: "time",
  //     width: "25%",
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "timeEnd",
  //     width: "25%",
  //   },
  // ];
  // const dataEmployee = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     room: "Phòng 13",
  //     time: "10/2022",
  //     timeEnd: "10/2023",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     room: "Phòng 13",
  //     time: "10/2022",
  //     timeEnd: "10/2023",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     room: "Phòng 13",
  //     time: "10/2022",
  //     timeEnd: "10/2023",
  //   },
  // ];

  const items1 = [
    {
      key: "1",
      name: "Thêm nhân viên",
    },
    // {
    //   key: "2",
    //   name: "Danh sách nhân viên",
    // },
    {
      key: "3",
      name: "Chỉnh sửa",
    },
    {
      key: "4",
      name: "xóa",
    },
  ];

  //* List Phòng ban, nhân viên, ca làm việc
  const [allEmployee, setAllEmployee] = useState([]);

  // selected để chọn trang, isModalOpen là để mở modal thêm mới, groupName là tên nhóm, description để nhập nội dung

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  //usestate xoa
  const [isModalDeteleOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [apiData, setApiData] = useState([]);

  //* function phụ
  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.lgr_id === id) {
        console.log("index: ", i);
        return i; // Return the index if id is found
      }
    }
    return -1; // Return -1 if id is not found
  }

  const handleOkGeneral = () => {
    if (isEdit) {
      handleEdit(seletectedId);
    } else handleOk();
  };

  //*Modal danh sách nhân viên
  // const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);

  // const showModalEmployee = () => {
  //   setIsModalEmployeeOpen(true);
  // };
  // const handleOkModalEmployee = () => {
  //   setIsModalEmployeeOpen(true);
  // };

  // const handleCancelModalEmployee = () => {
  //   setIsModalEmployeeOpen(false);
  // };

  // const title = () => {
  //   return (
  //     <>
  //       <div className={styles.employee_flex}>
  //         <div className={styles.employee_text}>
  //           <h3 className={styles.employee_h3}>Lịch làm việc 1 </h3>
  //           <p className={styles.employee_p}>Danh sách nhân viên</p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  //* modal thêm nhân viên
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAddConfirm = (id) => {
    //*đã truyền thành công id vào đây
    setIsModalAddOpen(true);
  };
  const hanleModalAddCancer = () => {
    setIsModalAddOpen(false);
  };
  const handleOkThemNhanVien = () => {
    setIsModalAddOpen(false);
  };

  const apiUrl = `${domain}/api/tinhluong/congty/takedata_group_com`;
  const postDataToGetCard = {
    lgr_id_com: cp,
    token: token,
  };

  // * Hàm lấy API data
  const getInfoOfAllNhomLamViec = () => {
    axios
      .post(apiUrl, postDataToGetCard)
      .then((response) => {
        setApiData(response.data.listGroup);
        console.log("Data: ", response.data.listGroup);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleClick = (c) => {
    handleSelected(c);
  };

  // * Modal Tạo mới
  const [isInsert, setIsInsert] = useState(false);
  const apiInsertGroupUrl = `${domain}/api/tinhluong/congty/insert_group`;

  const showModal = () => {
    setIsInsert(true);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setGroupName("");
    setDescription("");
    setIsEdit(false);
    setIsInsert(false);
  };
  const handleOk = () => {
    axios.post(apiInsertGroupUrl, {
      lgr_id_com: cp,
      lgr_name: groupName,
      lgr_note: description,
      token: token,
    });
    setIsModalOpen(false);
    setGroupName("");
    setDescription("");
    setIsInsert(false);
    console.log("is in Ok");
  };

  //* Modal Delete Confirm

  const showModalDeleteConfirm = (id) => {
    setSelectedCardIndex(id);
    setIsModalDeleteOpen(true);
  };
  //* id ở đây là lgr_id. key =1 là thêm nhân viên, =3 là chỉnh sửa, =4 là xóa
  const handleDropdownClick = (key, id) => {
    if (key === "4") {
      showModalDeleteConfirm(id);
    }
    if (key === "1") {
      showModalAddConfirm(id);
    }

    if (key === "3") {
      let index = findIndexById(apiData, id);

      console.log("indexTest: ", index);
      setGroupName(apiData[index]?.lgr_name);
      setDescription(apiData[index]?.lgr_note);
      setIsEdit(true);
      setSelectedID(id);
      showModal();
    }
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  //* Thay bang goi API de xoa

  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const apiUrlDelete = `${domain}/api/tinhluong/congty/delete_group_com`;

  const handleConfirmDelete = async (id) => {
    await setIsModalDeleteOpen(false);

    axios
      .post(apiUrlDelete, {
        lgr_id: id,
        token: token,
      })
      .then((response) => {
        console.log("Data: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    setIsDeleteDone(!isDeleteDone);
  };
  //* Chinh sua
  const EditUrl = `${domain}/api/tinhluong/congty/update_group_com`;

  const [isEdit, setIsEdit] = useState(false);
  const [seletectedId, setSelectedID] = useState(0);
  const handleEdit = (id) => {
    axios
      .post(EditUrl, {
        lgr_id: id,
        lgr_name: groupName,
        lgr_note: description,
        token: token,
      })
      .then((response) => {
        console.log("EditedData: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    setIsModalOpen(false);
    setIsEdit(false);
    console.log("handle edit with id : ", id);
  };

  const [selectionType, setSelectionType] = useState("checkbox");
  const [searchedData, setSearchedData] = useState(data); // Initialize with the initial data
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

  //Search
  const { Search } = Input;
  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //     }}
  //   />
  // );
  const onSearch = (value) => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedData(filteredData);
  };

  useEffect(getInfoOfAllNhomLamViec, [isDeleteDone, isEdit, isInsert]);

  console.log("GroupName: ", groupName);
  console.log("Description: ", description);
  console.log("isEdit: ", isEdit);
  return (
    <div>
      <div className={styles.tax_one} onClick={showModal}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)} className={styles.active}>
            Nhóm làm việc 1
          </p>
          <p onClick={() => handleClick(2)}>D/s nhân viên chưa nhóm 1</p>
          <p onClick={() => handleClick(3)}>D/s nhân viên các nhóm 1</p>
          <p onClick={() => handleClick(4)}>Hướng dẫn 1</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={`${styles.tax_ct_pr} card_distance`}>
            {apiData.map((item, index) => (
              <Card
                title={
                  <>
                    <div className={styles.tax_ct_tx}>
                      <h3>{item?.lgr_name}</h3>
                      <p>(11 Thành viên)</p>
                    </div>
                  </>
                }
                key={1}
                extra={
                  <div>
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={({ key }) =>
                            handleDropdownClick(key, item?.lgr_id)
                          }
                        >
                          {items1.map((item) => (
                            <Menu.Item key={item.key}>{item.name}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Space>
                        <Image
                          alt="/"
                          src={"/tinhluong/deta.png"}
                          width={15}
                          height={18}
                          className={styles.deta}
                        />
                      </Space>
                    </Dropdown>
                  </div>
                }
              >
                <div>
                  <div className={styles.tax_ct_tow}>
                    <div className={styles.frame_lgr_th}>{item?.lgr_note}</div>
                  </div>
                  <div
                    className={styles.tax_ct_button}
                    onClick={showModalAddConfirm}
                  >
                    <img src="/tinhluong/user-plus.png" alt="" />
                    <p>Thêm nhân viên</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="Tien_Modal_Themmoi_NhomLamViec">
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
              id="policy-name"
              placeholder="Nhập tên nhóm"
              className={styles.input}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <label className={styles.description}>Mô tả</label>
            <textarea
              id="policy-description"
              rows="5"
              placeholder="Nhập mô tả"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div>
              <Button
                className={styles.myBtn}
                type="primary"
                onClick={handleOkGeneral}
              >
                {isEdit ? "Cập nhật" : " Lưu lại"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          className="modal_delete_tien"
          title="Bạn chắc chắn muốn xóa ?? "
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
              onClick={() => handleConfirmDelete(selectedCardIndex)}
              className={styles.btn_delete}
            >
              Xóa
            </Button>
          </div>
        </Modal>
      </div>
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
                dataSource={searchedData}
                scroll={{
                  y: 240,
                }}
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
      {/* <Modal
        className="Tien_modal_employee"
        title={title()}
        open={isModalEmployeeOpen}
        onCancel={handleCancelModalEmployee}
        footer={null}
      >
        <div className={styles.modal_add_body}>
          <div>
            <Table
              className="Tien_Danh_sach_nhan_vien"
              columns={columnsEmployee}
              dataSource={dataEmployee}
              scroll={{
                y: 240,
              }}
            />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
