import { useState } from "react";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";

export default function CustomomerFooterAddFile({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
  formData,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIyNTg4OTEsImV4cCI6MTY5MjM0NTI5MX0.KCMDnnZEk-pIsgd6yP0obVzsF30aTa7_McjgEr9lqwE";
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://210.245.108.202:3007/api/crm/customer/addCustomer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
