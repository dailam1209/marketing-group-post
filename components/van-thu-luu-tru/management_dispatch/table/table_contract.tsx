import React, { useState, useEffect } from "react";
import styles from "./table_contract.module.css";
import Image from "next/image";
import Link from "next/link";
import Modal_del_contract from "../modal_contract/Model_del";
import Modal_read_contract from "../modal_contract/Model_read";
import Modal_Update_contract from "../modal_contract/Model_contract_update";
import { useRouter } from "next/router";
import Modal_Update_contract_go from "../modal_contract/Modal_Update_contract_go";

type tableProps = {
  isOpen?: boolean;
  onOpen?: () => void;
  listContracts?: any[];
  href: string;
};

const Table_contract: React.FC<tableProps> = ({
  isOpen,
  onOpen,
  listContracts,
  href,
}) => {
  // Modal update
  const [openModelUpdate, setOpenModalUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleUpdate = (item: any) => {
    setSelectedItem(item);
    setOpenModalUpdate(true);
  };
  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };
  // Modal read
  const [showModalRead, setShowModalRead] = useState(false);
  const closeModalRead = () => {
    setShowModalRead(false);
  };
  const handleClickRead = (item: any) => {
    setSelectedItem(item);
    setShowModalRead(true);
  };
  // Modal del
  const [showModalDel, setShowModalDel] = useState(false);
  const closeModal = () => {
    setShowModalDel(false);
  };
  const handleClickDel = (item: any) => {
    setSelectedItem(item);
    setShowModalDel(true);
  };
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  let stt = 0;
  const ListContracts = listContracts?.map((item, index) => {
    const textContent: any = new DOMParser().parseFromString(
      item?.cv_trich_yeu,
      "text/html"
    ).documentElement.textContent;
    const lowercaseText = textContent.toLowerCase();
    stt++;
    return (
      <tr key={index}>
        <td>{stt}</td>
        <td>{item?.cv_so}</td>
        <td>
          <p>{item?.cv_name}</p>
          <Link
            style={{ color: "#4C5BD4", fontSize: "14px" }}
            href={`${href}${item?._id}`}
          >
            Xem chi tiết
          </Link>
        </td>
        <td>{item?.name_book} </td>
        <td>
          <p>{lowercaseText}</p>
          <span
            style={{ color: "#4C5BD4", fontSize: "14px" }}
            onClick={() => handleClickRead(item)}
          >
            (Xem thêm)
          </span>
        </td>
        <td style={{ color: "#FF3333", fontSize: "14px" }}>
          {(item?.cv_money).toLocaleString("en-US") + " VNĐ"}
        </td>
        <td>{formatDate(item?.cv_date)}</td>
        <td>{item?.location}</td>
        <td>
          <p>{item?.name_user_save}</p>
          <p>({item?.location})</p>
        </td>
        <td style={{ color: "#FFA800", fontSize: "13px" }}>
          {item?.cv_status_hd}
        </td>
        <td>
          <button>
            <Image
              src={"/icon/exit.png"}
              width={21}
              height={21}
              alt=""
              onClick={() => {
                handleUpdate(item);
              }}
            />
          </button>
          <button>
            <Image
              src={"/icon/img_xoa.png"}
              width={21}
              height={21}
              alt=""
              onClick={() => handleClickDel(item)}
            />
          </button>
        </td>
      </tr>
    );
  });
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className={styles.pagination}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Số hợp đồng</th>
            <th>Tên hợp đồng</th>
            <th>Sổ văn bản</th>
            <th>Trích yếu</th>
            <th>Tổng tiền hợp đồng</th>
            <th>Ngày nhận/gửi</th>
            <th>Nơi gửi/nhận</th>
            <th>Người lưu trữ</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ListContracts}</tbody>
      </table>

      <Modal_read_contract
        isOpen={showModalRead}
        item={selectedItem}
        closeModal={closeModalRead}
        title="Trích yếu hợp đồng đến"
      />
      {showModalDel && selectedItem && (
        <Modal_del_contract
          item={selectedItem}
          closeModal={closeModal}
          href={href}
        />
      )}
      {pathname.includes("hop-dong-den") && (
        <Modal_Update_contract
          href={href}
          title="Chỉnh sửa hợp đồng đến"
          onClose={closeModalUpdate}
          item={selectedItem}
          isOpen={openModelUpdate}
          feature="Cập nhật"
        />
      )}
      {pathname.includes("hop-dong-di") && (
        <Modal_Update_contract_go
          href={href}
          title="Chỉnh sửa hợp đồng đến"
          onClose={closeModalUpdate}
          item={selectedItem}
          isOpen={openModelUpdate}
          feature="Cập nhật"
        />
      )}
    </div>
  );
};

export default Table_contract;
