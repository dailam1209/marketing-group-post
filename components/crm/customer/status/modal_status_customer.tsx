import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "../../potential/potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ModalCompleteStep from "@/components/crm/setting/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  updateData?: any;
  name?: any;
  id?: any;
}

const EditStatusCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  updateData,
  name,
  id,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [dataUpdate, setdataUpdate] = useState("");
  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    if (dataUpdate != "") {
      updateData(
        "http://210.245.108.202:3007/api/crm/customerStatus/update",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIxNTY1MTksImV4cCI6MTY5MjI0MjkxOX0.1M55PZxSpovkNVmdGkd10pz-a7D0ApuqLOmsmBghh7w",
        "POST",
        { stt_name: `${dataUpdate}`, stt_id: id }
      );
    }
    setdataUpdate("");
  };
  return (
    <>
      <Modal
        title={"Chỉnh sửa tình trạng khách hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => (setIsModalCancel(false), setdataUpdate(""))}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <div>Tên tình trạng</div>
            <Input
              value={dataUpdate}
              placeholder={name}
              onChange={(e: any) => setdataUpdate(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật thành công!"}
        link={"#"}
      />
    </>
  );
};

export default EditStatusCustomerModal;
