import { useState } from "react";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

export default function PotentialFooterAddFiles({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Làm mới
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => setModal1Open(true)}
      >
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
          link="#"
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
