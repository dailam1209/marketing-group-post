import React, { useState, useEffect } from "react";
import styles from "./table_text.module.css";
import Image from "next/image";
import Modal_del from "../model-dispatch/Model_del";
import Modal_read from "../model-dispatch/Model_read";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import Modal_Update_dispatch from "../model-dispatch/Model_Update_dispatch";
import Modal_dis_update_go from "../model-dispatch/Model_Update_dispatch_go";
interface ItemTextTo {
  _id: string;
  cv_phong_soan?: string;
  cv_id_book?: any;
  cv_name?: string;
  cv_so?: string;
  cv_trich_yeu?: any;
  cv_date: string;
  sending_place?: string;
  cv_user_save?: string;
}
type ModalProps = {
  isOpen?: boolean;
  onOpen?: () => void;
  listTexts?: ItemTextTo[];
  href: string;
};
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const Table_text: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  listTexts,
  href,
}) => {
  let stt = 0;
  const router = useRouter();
  const { pathname } = router;
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [idItem, setIdItem] = useState<any>(null);
  const [showModalDel, setShowModalDel] = useState(false);
  //Modal update
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
  // Modal read
  const [showModalRead, setShowModalRead] = useState(false);

  //del
  const closeModal = () => {
    setShowModalDel(false);
  };
  const handleClickDel = (item: any) => {
    setSelectedItem(item);
    setShowModalDel(true);
  };
  // update
  const handleCloseModal = () => {
    setModalOpenUpdate(false);
  };
  const handleClickUpdate = async (item: any) => {
    setIdItem(item?._id);
    if (item?._id) {
      const response = await fetchData(
        token,
        "/api/vanthu/listVanBan/getDetail",
        { id: item?._id }
      );
      setSelectedItem(response?.data?.data);
    }
    setModalOpenUpdate(true);
  };
  // read
  const closeModalRead = () => {
    setShowModalRead(false);
  };
  const handleClickRead = (item: any) => {
    setSelectedItem(item);
    setShowModalRead(true);
  };
  function convertEpochStringToDateString(
    epochTimestampString: string
  ): string {
    const epochTimestamp = parseInt(epochTimestampString, 10);
    if (isNaN(epochTimestamp)) {
      return ""; // Trả về giá trị rỗng nếu chuỗi không hợp lệ
    }
    const date = new Date(epochTimestamp * 1000);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  }
  const ListText = listTexts
    ? listTexts?.map((item: any, index: any) => {
        let date = item?.cv_date;
        const textContent: any = new DOMParser().parseFromString(
          item?.cv_trich_yeu,
          "text/html"
        ).documentElement.textContent;
        const lowercaseText = textContent.toLowerCase();
        stt++;
        return (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>{stt}</td>
            <td>{item?.cv_so}</td>
            <td>
              <p className={styles.detail_trichyeu}>{item?.cv_name} </p>
              <span
                style={{
                  color: "#4C5BD4",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
                onClick={() => {
                  router.push(`${href}${item?._id}`);
                }}
              >
                Xem chi tiết
              </span>
            </td>
            <td> {item?.name_book} </td>
            <td>
              <div className={styles.detail_trichyeu}>
                <p>{lowercaseText}</p>

                <p>&nbsp;</p>
              </div>
              <span
                style={{ color: "#4C5BD4", cursor: "pointer" }}
                onClick={() => handleClickRead(item)}
              >
                {" "}
                (Xem thêm)
              </span>
            </td>
            <td className="">{convertEpochStringToDateString(date)}</td>
            <td>{item?.location}</td>
            <td>
              <p>
                {item?.name_user_save} <br />{" "}
                <span style={{ fontSize: "14px" }}>({item?.location})</span>
              </p>
            </td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"/icon/management_dispatch/edit.png"}
                  width={24}
                  height={24}
                  alt="Sửa"
                  onClick={() => handleClickUpdate(item)}
                />
                <Image
                  src={"/icon/management_dispatch/del.png"}
                  width={24}
                  height={24}
                  alt="Xóa"
                  onClick={() => handleClickDel(item)}
                />
              </div>
            </td>
          </tr>
        );
      })
    : [];
  return (
    <table className={styles.table_vb}>
      {/* thead */}
      <thead className={styles.thead}>
        <tr>
          <th className="text_c">STT</th>
          <th>Số văn bản</th>
          <th>Tên văn bản</th>
          <th>Sổ văn bản</th>
          <th>Trích yếu</th>
          <th>Ngày nhận</th>
          <th>Nơi gửi</th>
          <th>Người lưu trữ</th>
          <th></th>
        </tr>
      </thead>
      {/* tbody */}
      <tbody className={styles.tbody}>{ListText}</tbody>
      {showModalDel && selectedItem && (
        <Modal_del item={selectedItem} closeModal={closeModal} href={href} />
      )}
      <Modal_read
        isOpen={showModalRead}
        item={selectedItem}
        closeModal={closeModalRead}
        title="Trích yếu văn bản đến"
      />
      {pathname.includes("vb-den") && (
        <Modal_Update_dispatch
          href={pathname}
          isOpen={modalOpenUpdate}
          item={selectedItem}
          title="Chỉnh sửa văn bản đến"
          feature="Cập nhật"
          onClose={handleCloseModal}
        />
      )}
      {pathname.includes("vb-di") && (
        <Modal_dis_update_go
          href={pathname}
          isOpen={modalOpenUpdate}
          item={selectedItem}
          title="Chỉnh sửa văn bản đến"
          feature="Cập nhật"
          onClose={handleCloseModal}
        />
      )}
    </table>
  );
};

export default Table_text;
