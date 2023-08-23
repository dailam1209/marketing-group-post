import React, { useState } from "react";
import { Button, Modal, Table, Card } from "antd";
import styles from "../index.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Profit = () => {
  const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState(false);
  const showModalAdd = () => {
    setIsModalEmployeeOpen(true);
  };
  const hanleModalEmployeeCancer = () => {
    setIsModalEmployeeOpen(false);
  };
  const router = useRouter();
  const [tables, setTables] = useState([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editRevenue, setEditRevenue] = useState("");

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleModalEditCancer = () => {
    setIsModalEditOpen(false);
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
    setIsModalEditOpen(true);
    setEditingIndex(key);
    setEditName(tables[key]?.editName);
    setEditRevenue(tables[key]?.editRevenue);
  };

  const handleOk = () => {
    const newTable = {
      editName: editName,
      editRevenue: editRevenue,
    };

    if (editingIndex !== null) {
      console.log("Updating data with key:", editingIndex);
      handleEditData(editingIndex, newTable); // Gọi hàm handleEditData để cập nhật dữ liệu
    } else {
      console.log("Adding new data:", newTable);
      handleAddData(newTable); // Gọi hàm handleAddData để thêm mới dữ liệu
    }

    setIsModalEditOpen(false);
    setEditingIndex(null);
    setEditName("");
    setEditRevenue("");
  };

  // ...

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

  //title
  const Title = () => {
    return (
      <>
        <div className={styles.employee_flex}>
          <div className={styles.employee_text}>
            <p className={styles.employee_p}>Cài đặt hoa hồng lợi nhuận</p>
          </div>
          <div>
            <Button
              type="primary"
              className={styles.btn_employee}
              onClick={showModalEdit}
            >
              Thêm mới
            </Button>
          </div>
        </div>
      </>
    );
  };

  const columnsEmployee = [
    {
      title: "STT",
      dataIndex: "key",
      render: () => (
        <div>
          <p className={styles.p_style}>1</p>
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "editName",
      render: (editName) => (
        <div>
          <p className={styles.p_style}>{editName}</p>
        </div>
      ),
    },
    {
      title: "Hoa hồng (VNĐ)",
      dataIndex: "editRevenue",
      render: (editRevenue) => (
        <div>
          <p className={styles.p_style}>{editRevenue}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      render: () => (
        <button className={styles.button_edit} onClick={showModalEditConfirm}>
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

      render: () => (
        <button className={styles.button_edit} onClick={showModalDeleteConfirm}>
          <Image
            alt="/"
            src={"/tinhluong/delete-icon.png"}
            width={15}
            height={15}
          />
        </button>
      ),
    },
  ];

  return (
    <>
      <Card
        key=""
        title="Hoa hồng lợi nhuận"
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
                src={"/tinhluong/write.png"}
                width={15}
                height={18}
                className={styles.pen}
              />{" "}
              Miêu tả
            </p>
            <p className={styles.p_card}>
              Là phần chênh lệch giữa chi phí bỏ ra để tạo ra 1 sản phẩm, dịch
              vụ với doanh thu thu lại khi bán sản phẩm dịch vụ đó.
            </p>
          </div>
          <div className={styles.button_flex}>
            <button className={styles.button_top}>
              <Image
                alt="/"
                src={"/tinhluong/setting1.png"}
                width={20}
                height={20}
                className={styles.pen}
                onClick={showModalAdd}
              />
            </button>
            <button
              className={styles.button_bottom}
              onClick={() =>
                router.push(
                  "/tinh-luong/cong-ty/du-lieu-tinh-luong/hoa-hong/hoahongloinhuan"
                )
              }
            >
              Thêm
            </button>
          </div>
        </div>
      </Card>
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
          title="Thêm mới hoa hồng lợi nhuận"
          open={isModalEditOpen}
          onCancel={handleModalEditCancer}
          footer={null}
        >
          <div className={styles.modalRecipe_body}>
            <div>
              <label className={styles.p_edit}>Tên sản phẩm *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nhập tên sản phẩm"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.p_edit}>Hoa hồng (VNĐ)*</label>
              <input
                type="number"
                className={styles.input}
                placeholder="Nhập tiền"
                value={editRevenue}
                onChange={(e) => setEditRevenue(e.target.value)}
              />
            </div>

            <div>
              <Button
                className={styles.btn_recipe}
                type="primary"
                onClick={handleOk}
              >
                Lưu
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
            <div>
              <Table
                className={styles.table_add}
                columns={columnsEmployee}
                dataSource={tables}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Profit;
