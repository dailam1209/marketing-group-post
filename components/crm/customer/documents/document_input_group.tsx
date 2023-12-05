import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import { useRouter } from "next/router";
import CancelModalChance from "../../chance/modals/cancel_modal";

const DocumentActionDropDown = ({ record, fetchApi }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const fetchAPIDel = async () => {
    await fetchApi(
      "http://localhost:3007/api/crm/chance/delete-attachment-chance",
      record?.id
    );
  };

  const downloadFile = async () => {
    const fileUrl = record?.linkFile;

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        console.log("Error to dowload");
        alert("Đã có lỗi xảy ra trong quá trình tải xuống");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = record?.file_name || "downloaded-file";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={async () => {
            await downloadFile();
            setIsOpenModalUpdateStatus(true);
          }}
        >
          <i className="bi bi-download"></i>
          Tải xuống
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

      <CancelModalChance
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xóa tài liệu đính kèm"}
        title={"Xóa tài liệu đính kèm"}
        link={`#`}
        fetchApi={fetchAPIDel}
      />
    </>
  );
};

export default DocumentActionDropDown;
