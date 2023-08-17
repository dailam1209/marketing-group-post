import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "../../potential/potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ModalCompleteStep from "@/components/crm/setting/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  updateData: any;
}

const AddStatusCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  updateData,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [sttName, setsttName] = useState("");
  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    updateData(
      "http://210.245.108.202:3007/api/crm/customerStatus/create",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIxNTY1MTksImV4cCI6MTY5MjI0MjkxOX0.1M55PZxSpovkNVmdGkd10pz-a7D0ApuqLOmsmBghh7w",      "POST",
      { stt_name: `${sttName}` }
    );
    setsttName("")
  };
  return (
    <>
      <Modal
        title={"Thêm tình trạng khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.choose_obj}>
          Tên tình trạng
          <Input
            placeholder="Tên tình trạng"
            value={sttName}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setsttName(e.target.value)}
          />
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bạn đã thêm trạng thái khách hàng thành công!"}
        link={"#"}
      />
    </>
  );
};

export default AddStatusCustomerModal;
