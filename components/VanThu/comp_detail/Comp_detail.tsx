
import Report_left from "@/components/VanThu/send_and_receive/reports/Report_left";
import Report_right from "@/components/VanThu/send_and_receive/reports/Report_right";
import Box_bottom_right from "@/components/VanThu/send_and_receive/reports/components/box_bottom_right";
import Box_children_bottom_right from "@/components/VanThu/send_and_receive/reports/components/box_children_bottom_right";
import Box_top_right from "@/components/VanThu/send_and_receive/reports/components/box_top_right";
import Image from "next/image";
import styles from "./Comp_detail.module.css";
import Link from "next/link";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import Modal_forward from "@/components/VanThu/send_and_receive/modal/Modal_forward";
import Modal_internal_save from "@/components/VanThu/send_and_receive/modal/Modal_ internal_save";
import Modal_feedback from "@/components/VanThu/send_and_receive/modal/Modal_feedback";
import { handleDelete } from "@/utils/BaseApi";
import { useRouter } from "next/router";
import Report from "../send_and_receive/reports/Report";
export default function Comp_detail({ Itemtext, href, api }: any) {
  // Chuyển tiếp
  const [modalOpen, setModalOpen] = useState(true);
  const handleOpenModal1 = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // Lưu nội bộ công ty
  const [modalOpen2, setModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };
  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };
  // trả lời
  const [OpenModal_Feedback, setOpenModal_Feedback] = useState(false);
  const handleOpenModal_Feedback = () => {
    setOpenModal_Feedback(true);
  };
  const handleCloseModal_Feedback = () => {
    setOpenModal_Feedback(false);
  };
  const textContent: any = new DOMParser().parseFromString(
    Itemtext?.des_vb,
    "text/html"
  ).documentElement.textContent;
  const lowercaseText = textContent.toLowerCase();

  const router = useRouter();
  // delete
  const handleDeleteItem = async (id: number) => {
    router.push(href);
    try {
      await handleDelete(api, {
        id_vb: id,
      });
      alert(`Đã xóa thành công ${Itemtext?.title_vb}`);
    } catch (error) {
      alert(`Xóa thất bại ${Itemtext?.title_vb}`);
    }
  };

  return (
    <Report>
      <Report_left href_back={href} title={Itemtext?.title_vb}>
        <div className={styles.content}>
          <h3
            style={{
              color: "#4C5BD4",
              padding: "0 0 10px 0",
            }}
          >
            Thông tin văn bản
          </h3>
          <span style={{ fontWeight: "bold" }}>Tên văn bản: </span>
          <span> {Itemtext?.title_vb}</span>
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Số văn bản: </span>
          <span>{Itemtext?.so_vb}</span>
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Loại văn bản: </span>
          <span>Biên bản</span>
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Năm: </span>
          <span>2023</span>
        </div>
        <div className={styles.content}>
          <span style={{ fontWeight: "bold" }}>Trích yếu văn bản: </span>
          <span>{lowercaseText}</span>
        </div>
        <div className={styles.content}>
          <span style={{ fontWeight: "bold" }}>Ngày tạo: </span>
          <span>5:49 pm - 28-02-2023</span>
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Ngày đến: </span>
          <span>5:49 pm - 28-02-2023</span>
          <br />
          <br />
          <span style={{ fontWeight: "bold" }}>Ngày ban hành: </span>
          <span>28-02-2023</span>
        </div>
        <div className={styles.content}>
          <span style={{ fontWeight: "bold" }}>Người gửi văn bản </span>
          <div className={styles.info_user}>
            <Image width={60} height={60} src="/logo_com.png" alt="" />
            <div style={{ margin: "auto 0" }}>
              <p style={{ fontWeight: "bold", color: "#4C5BD4" }}>
                Vũ Thị Phượng:{" "}
              </p>
              <p>ID: 5664</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <span style={{ fontWeight: "bold" }}>Người ký duyệt: </span>
          <div className={styles.info_user}>
            <Image width={60} height={60} src="/logo_com.png" alt="" />
            <div style={{ margin: "auto 0" }}>
              <p style={{ fontWeight: "bold", color: "#4C5BD4" }}>
                Vũ Thị Phượng
              </p>
              <p>
                <span>Chức vụ: </span>
                <span>Chức vụ: PHÓ TỔ TRƯỞNG</span>
              </p>
              <p>ID: 5664</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <span style={{ fontWeight: "bold" }}>Phiếu trình văn bản: </span>
          <div
            className={styles.info_user}
            style={{
              justifyContent: "space-between",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <div className={styles.info_user}>
              <Image src={"/icon/img_wo.png"} width={36} height={36} alt="" />
              <div style={{ marginLeft: "12px" }}>
                <p>{Itemtext?.file_vb}</p>
                <span>24869 bytes </span>
                <span>7:31 pm - 2023-03-28</span>
              </div>
            </div>

            <Link
              style={{ margin: "auto 0", fontSize: "18px" }}
              href={"/test.docx"}
            >
              <AiOutlineArrowDown />
            </Link>
          </div>
        </div>

        <div className={styles.flex}>
          <button className={styles.btn_rep} onClick={handleOpenModal_Feedback}>
            Trả lời
          </button>
          <button
            className={styles.btn_delete}
            onClick={() => handleDeleteItem(Itemtext?._id)}
          >
            Xóa
          </button>
        </div>
      </Report_left>
      <Report_right>
        {true ? (
          <Box_top_right href="/quanly-cong-van">
            Văn bản được thông qua
          </Box_top_right>
        ) : (
          <>
            <Box_children_bottom_right>
              <span> Đã nhận</span>
            </Box_children_bottom_right>
          </>
        )}

        <Box_bottom_right>
          <Box_children_bottom_right onClick={handleOpenModal1}>
            <Image
              src={"/icon/img_abc3.png"}
              width={24}
              height={24}
              alt=""
              className={styles.img_forward}
            />
            <span>Chuyển tiếp</span>
          </Box_children_bottom_right>
          <Box_children_bottom_right onClick={handleOpenModal2}>
            <span> Lưu nội bộ công ty</span>
          </Box_children_bottom_right>
        </Box_bottom_right>
      </Report_right>
      <Modal_forward
        isOpen={modalOpen}
        onClose={handleCloseModal}
        _id={Itemtext?._id}
      />
      <Modal_internal_save
        isOpen={modalOpen2}
        onClose={handleCloseModal2}
        so_vb={Itemtext?.so_vb}
        _id={Itemtext?._id}
      />
      <Modal_feedback
        isOpen={OpenModal_Feedback}
        onClose={handleCloseModal_Feedback}
        _id={Itemtext?._id}
      />
    </Report>
  );
}
