import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const { recordId, listRecordId, setShouldFetchData, listRecordName, recordName } = useContext(QuoteContext)
  const quoteName = allkey?.length > 0 ? listRecordName.join(', ') : recordName
  const router = useRouter();

  const deleteQuote = async (id: Number) => {
    await axiosCRMCall
    .post('/quote/delete', {id: id})
    .then((res) => {

    })
    .catch((err) => console.log(err))
  }
  
  const handleOK = () => {
    if (allkey?.length > 0) {
      allkey.map((id) => {
        deleteQuote(id)
      })
    } else {
      deleteQuote(recordId)
    }
    setIsModalCancel(false);
    // showModalWithTimeout(setIsMdalSuccess, 2000);
    setIsMdalSuccess(true);
    setTimeout(() => {
      setIsMdalSuccess(false)
      setShouldFetchData(true)
      router.push("/quote/list")
    }, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa báo giá"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa báo giá <strong>{`${quoteName}`}</strong></div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Xóa báo giá ${quoteName} thành công!`}
        link={"/quote/list"}
      />
    </>
  );
};

export default DelActionModal;
