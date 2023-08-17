"use client"
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import SettingModal from "./modal_header/modal_setting";
export default function SettingButtonHeader() {
    const { isOpen, toggleModal, closeModal } = useModal(style.setting_open,[ style.setting_icon_1, style.setting_icon_2]);

  return (
    <>
      <Image
        className={style.setting_icon_1}
        width= {28}
        height= {28}
        alt=".."
        onClick={toggleModal}
        src="https://crm.timviec365.vn/assets/icons/setter.svg"
      />
      <Image
        className={style.setting_icon_2}
        width= {28}
        height= {28}
        onClick={toggleModal}
        alt=".."
        src="https://crm.timviec365.vn/assets/icons/icon-setting-1024.svg"
      />

      {isOpen && <SettingModal/>}
    </>
  );
}
