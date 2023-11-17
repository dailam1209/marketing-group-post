import React, { useContext, useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Modal, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { MTextArea } from "@/components/commodity/input";
import { axiosCRM } from "@/utils/api/api_crm";
import { useFormData } from "../../context/formDataContext";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { MCancelModal } from "@/components/commodity/modal";

const NoteActionDropDown: React.FC<any> = ({ record }: any) => {
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalUpdateNoti, setIsOpenModalUpdateNoti] = useState(false);
  const [formUpdate, setFormUpdate] = useState(record);
  const { handleRecall } = useContext(useFormData);
  const items: MenuProps["items"] = [
    {
      key: "4",
      label: (
        <button
          style={{ display: "flex", gap: 5, fontSize: 15, fontWeight: 900 }}
          onClick={() => setIsOpenModalUpdateNoti(true)}
        >
          <i className="bi bi-pencil-square"></i> <p>Chỉnh sửa</p>
        </button>
      ),
    },
    {
      key: "5",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalDel(true)}
        >
          <Image width={16} height={16} src="/crm/del.svg" alt="check" />
          Xoá
        </button>
      ),
    },
  ];
  const handleDelete = () => {
    axiosCRM
      .post("/potential/deleteNotePotential", { id: record?.id })
      .then((res) => {
        setIsOpenModalDel(false);
        handleRecall();
      })
      .catch((err) => notifyError());
  };
  const handleUpdateNote = () => {
    axiosCRM
      .post("/potential/updateNoteForPotential", formUpdate)
      .then((res) => {
        setIsOpenModalUpdateNoti(false);
        handleRecall();
      })
      .catch((err) => notifyError());
  };
  return (
    <>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            className="custom_dropdown_product "
          >
            <button className="action_table">
              <img src="/crm/3_cham.png" />
              Thao tác
            </button>
          </Dropdown>
        </Space>
      </Space>

      <MCancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        updateData={handleDelete}
        content={"Bạn có chắc chắn muốn xóa ghi chú?"}
        title={"Xóa ghi chú"}
      />
      <Modal
        title={"Sửa ghi chú"}
        centered
        open={isOpenModalUpdateNoti}
        onOk={handleUpdateNote}
        onCancel={() => {
          setFormUpdate(record);
          setIsOpenModalUpdateNoti(false);
        }}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <MTextArea
            value={formUpdate?.content}
            setFormData={setFormUpdate}
            name="content"
            label="Ghi chú"
            placeholder="Nhập ghi chú"
          />
        </div>
      </Modal>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default NoteActionDropDown;
