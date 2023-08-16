import React, { useRef, useState } from "react";
import { Modal, Select, SelectProps } from "antd";
import styles from "../../../potential/potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import InputText from "@/components/crm/potential/potential_add_files/input_text";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ModalUpdateResultChance: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const options: SelectProps["options"] = [
    {
      label: "abc",
      value: "cds",
    },
  ];

  const handleChange = () => {};

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
        title={"Cập nhật kết quả"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <InputText label="Người nhận công việc" require={true} />
          </div>

          <div className={styles.choose_obj}>
            <InputText
              label="Giai đoạn"
              placeholder="Kết thúc thành công"
              bonus="disabled"
            />
          </div>

          <div className={styles.choose_obj}>
            <div>
              <InputText
                label="Ngày kỳ vọng/kết thúc"
                require={true}
                placeholder="08/08/2023"
                bonus="disabled"
              />
            </div>
          </div>

          <div className={styles.choose_obj}>
            <div className={`${styles.form_label} required`}>
              {"Lý do thắng"}
            </div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", maxWidth: "509px" }}
              placeholder="Please select"
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
        link={""}
      />
    </>
  );
};

export default ModalUpdateResultChance;
