import { useState } from "react";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
const Cookies = require('js-cookie')
export default function CustomomerFooterAddFile({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
  formData,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://210.245.108.202:3007/api/crm/customer/addCustomer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ name: formData.name }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log("Data successfully submitted!");
      } else {
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => (setModal1Open(true), handleSubmit())}
      >
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
          link="/potential/list"
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
        link={link}
      />
    </div>
  );
}
