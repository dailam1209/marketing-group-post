"use client"
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import WarningModal from "./modal_header/modal_warning";
export default function WarningBtnHeader() {
    const { isOpen, toggleModal } = useModal(style.help_open, [style.warning_icon_1,style.warning_icon_2]);

  return (
    <>
      <Image
        className={style.warning_icon_1}
        width= {28}
        height= {28}
        alt=".."
        onClick={toggleModal}
        src="https://crm.timviec365.vn/assets/icons/help.svg"
      />
      <Image
        className={style.warning_icon_2}
        width= {28}
        height= {28}
        onClick={toggleModal}
        alt=".."
        src="https://crm.timviec365.vn/assets/icons/icon-help-1024.svg"
      />

    {isOpen && <WarningModal />}
      
    </>
  );
}
