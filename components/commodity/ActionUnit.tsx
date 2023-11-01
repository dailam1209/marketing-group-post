import styles from "@/components/commodity/potential2.module.css";
import Image from "next/image";
import {
  MAddModal,
  MCancelModal,
  MEditModal,
  MModalCompleteStep,
} from "./modal";
import { useState } from "react";
import { axiosCRM } from "@/utils/api_crm";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function ActionUnit({ record, setRecall }) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [formData, setFormData] = useState(record);
  const handleDeleteProduct = () => {
    axiosCRM
      .post("/product/del-product-unit", { unit_id: record.unit_id })
      .then((res) => setOpenComplete(true))
      .catch((err) => notifyError("Đã có lỗi xảy ra vui lòng thử lại sau!"));
  };
  const handleUpdate = () => {
    axiosCRM
      .post("/product/edit-product-unit", formData)
      .then((res) => {
        setRecall((prev) => !prev);
        setOpenEditModal(false);
      })
      .catch((err) => notifyError());
  };
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100px" }}
      >
        {" "}
        <div
          className={styles.table_sua}
          onClick={() => setOpenEditModal(true)}
        >
          <Image width={16} height={16} alt="/" src="/crm/sua.png" /> Sửa
        </div>{" "}
        <div className={styles.table_xoa} onClick={() => setOpenDelete(true)}>
          {" "}
          <Image width={16} height={16} alt="/" src="/crm/xoa.png" />
          Xóa
        </div>
      </div>
      <MEditModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        label="Đơn vị tính"
        value={formData.unit_name}
        handleUpdate={handleUpdate}
        setFormEdit={setFormData}
        name="unit_name"
        description={formData.description}
        title="Sửa đơn vị tính"
      />
      <MCancelModal
        updateData={() => {
          handleDeleteProduct();
          setOpenDelete(false);
        }}
        isModalCancel={openDelete}
        setIsModalCancel={setOpenDelete}
        title="Xóa đơn vị tính"
        content={
          <p>
            Bạn muốn xóa{" "}
            <span style={{ fontWeight: "700", fontSize: "18px" }}>
              {record.unit_name}
            </span>{" "}
            khỏi danh sách Đơn vị tính?
          </p>
        }
      />
      <MModalCompleteStep
        modal1Open={openComplete}
        setModal1Open={setOpenComplete}
        title="Xóa thành công!"
        setRecall={setRecall}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default ActionUnit;
