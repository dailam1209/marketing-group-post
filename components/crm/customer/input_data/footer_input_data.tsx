import { useState } from "react";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import Cookies from "js-cookie";
import ModalCompleteStepADDInput from "../../potential/potential_steps/complete_nhap_lieu";
import { notification } from "antd";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";

export default function PotentialFooterAddFiles({
  link,
  title,
  contentCancel,
  titleCancel,
  dataAdd,
  setDataAdd,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const router = useRouter();
  const handleAddInput = async () => {
    if (dataAdd.name) {
      setModal1Open(true),
        await fetch(
          `${base_url}/api/crm/customer/addCustomer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
            body: JSON.stringify(dataAdd),
          }
        );
    } else {
      notification.error({ message: "Tên khách hàng là bắt buộc" });
    }
  };
  return (
    <div className={styles.main__footer}>
      <button
        type="button"
        onClick={() => (
          setDataAdd(""),
          notification.success({ message: "Làm mới thành công" }),
          router.push("/crm/customer/input/add")
        )}
      >
        Làm mới
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => handleAddInput()}
      >
        Lưu
      </button>

      <ModalCompleteStepADDInput
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
      />
    </div>
  );
}
