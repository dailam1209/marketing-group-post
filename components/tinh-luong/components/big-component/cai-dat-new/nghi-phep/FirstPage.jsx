import styles from "./FirstPage.module.css";
import { useEffect, useState } from "react";
import { Card, Dropdown, Menu, Space, Modal, Button } from "antd";
import Image from "next/image";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import axios from "axios";
export default function FirstPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const card123 = [
    { leaveName: "Xin Chao 1 ", description: "noi dung 1" },
    { leaveName: "Xin Chao 2 ", description: "noi dung 2" },
  ];

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    axios
      .post(`${domain}/api/tinhluong/congty/lay_thong_tin_nghi_phep`, {
        pc_com: cp,
        token: token,
      })
      .then((res) => {
        // console.log("Các Chính sách nghỉ phép: ", res.data);
        setApiData(res.data);
      });
  }, []);
  console.log("Các Chính sách nghỉ phép: ", apiData);
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)} className={styles.active}>
            Chính sách nghỉ phép
          </p>
          <p onClick={() => handleClick(2)}>Nghỉ sai quy định</p>
          <p onClick={() => handleClick(3)}>
            Nghỉ vào ngày không được phép nghỉ
          </p>
          <p onClick={() => handleClick(4)}>Theo dõi nghỉ phép</p>
          <p onClick={() => handleClick(5)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={`${styles.tax_ct_pr} card_distance`}>
            {apiData?.list_np?.map((item, index) => (
              <Card
                title={
                  <>
                    <div className={styles.tax_ct_tx}>
                      <h3>{item.of_name}</h3>
                    </div>
                  </>
                }
                key={index}
              >
                <div>
                  <div className={styles.tax_ct_tow}>
                    <h4 className={styles.tax_ct_tow_h4}>Miêu tả</h4>
                    <p>{item.of_note}</p>
                    <span
                      className={styles.see_more_one_btx}
                      onClick={showModal}
                    >
                      (Xem thêm)
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="           "
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className={styles.modal_hd_tax}>
          <div className={styles.modal_body}>
            <div className={styles.cr_popup_tax}>
              <p>Miêu tả</p>
              <div>
                <p className={styles.nd_xem_them}>
                  là nghỉ phép trong 1 số trường hợp đặc biệt đã được quy định
                  trong bộ luật lao động, 1 năm thông thường có 12 ngày nghỉ
                  phép có lương hoặc hơn
                </p>
                <button
                  type="button"
                  className={styles.close_modal}
                  onClick={handleOk}
                >
                  {" "}
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
