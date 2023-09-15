import React, { useRef, useState } from "react";
import { Modal, Select } from "antd";
import styles from "../../potential/potential.module.css";
import styleCustomer from "../customer.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import type { SelectProps } from "antd";
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const SharingCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [valueSharing, setValueSharing] = useState("");
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const options: SelectProps["options"] = [];

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Chia sẻ khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Chia sẻ với"}
            </label>
            <select
              onChange={(e) => setValueSharing(e.target.value)}
              className={styleCustomer.input_control}
            >
              <option value="">Chọn đối tượng chia sẻ</option>
              <option value={"staff"}>Nhân viên</option>
              <option value="department">Phòng ban</option>
              <option value="all">Phòng ban & Nhân viên</option>
            </select>
          </div>

          {valueSharing === "department" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Phòng ban được chia sẻ"}
              </label>
              <PotentialSelectBoxStep
                value="Phòng ban được chia sẻ"
                placeholder="Please select"
              />
            </div>
          ) : valueSharing === "staff" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Nhân viên được chia sẻ"}
              </label>
              <PotentialSelectBoxStep
                value="Nhân viên được chia sẻ"
                placeholder="Please select"
              />
            </div>
          ) : valueSharing === "all" ? (
            <>
              <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  {"Phòng ban được chia sẻ"}
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={options}
                />
              </div>
              <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  {"Nhân viên được chia sẻ"}
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={options}
                />
              </div>
            </>
          ) : null}

          <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Quyền sử dụng"}
            </label>
            <select className={styleCustomer.input_control}>
              <option>Toàn quyền</option>
              <option>Sửa</option>
              <option value="2">Xem</option>
            </select>
          </div>

          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        link={"/customer/list"}
      />
    </>
  );
};

export default SharingCustomerModal;
