"use client"
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import NotifyModal from "./modal_header/modal_notify";
export default function NotifyButtonHeader() {

    const {isOpen, toggleModal} = useModal(style.notice_open, [style.notify_icon_1,style.notify_icon_2])
  return (
    <>
      <Image
        className={style.notify_icon_1}
        width= {28}
        height= {28}
        alt=".."
        onClick={toggleModal}
        src="https://crm.timviec365.vn/assets/icons/notice.svg"
      />
      <Image
        className={style.notify_icon_2}
        width= {28}
        height= {28}
        alt=".."
        onClick={toggleModal}
        src="https://crm.timviec365.vn/assets/icons/icon-notice-1024.svg"
      />

      {isOpen && <NotifyModal />}
    </>
  );
}
