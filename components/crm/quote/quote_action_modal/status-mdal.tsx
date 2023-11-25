import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteFilterContext } from "../quoteFilterContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}

const StatusModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const {allAvailableStatusString, statusNumberFromString, recordId, listRecordId, setShouldFetchData} = useContext(QuoteFilterContext);
  const [value, setValue] = useState('Bản thảo')

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  const updateStatus = async (id: Number, status: Number) => {
    await axiosCRMCall
    .post('/quote/updateStatus', {id: id, status: status})
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => console.log(err))
  }

  const handleOK = () => {
    const status = statusNumberFromString(value);
    if (allkey?.length > 0) { // Nếu là sửa nhiều
      // listRecordId.map((id) => {
      //   updateStatus(id, status)
      // })
      // console.log(allkey)
      allkey.map((id) => {
        updateStatus(id, status)
      })
    } else { // Sửa 1
      updateStatus(recordId, status)
    }

    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
      setShouldFetchData(true)
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Cập nhật tình trạng"}
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
            <label className={`${styles.form_label} required`}>
              {"Tình trạng"}
            </label>
            <PotentialSelectBoxStep value={value} placeholder="Chọn" data={() => allAvailableStatusString()} setValue={setValue}/>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Cập nhật tình trạng ${record} thành công`}
        link={"/quote/list"}
      />
    </>
  );
};

export default StatusModal;
