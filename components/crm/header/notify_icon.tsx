"use client";
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import NotifyModal from "./modal_header/modal_notify";
import { useEffect } from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
export default function NotifyButtonHeader() {
  const { isOpen, toggleModal } = useModal(style.notice_open, [
    style.notify_icon_1,
    style.notify_icon_2,
  ]);
  const decodeToken: any = jwtDecode(getToken("token_base365"));
  const userId = decodeToken?.data?.idQLC;
  useEffect(() => {
    // Tạo kết nối đến máy chủ Socket.IO

    const socket = io.connect("http://localhost:4000", {
      secure: true,
      enabledTransports: ["wss"],
      transports: ["websocket", "polling"],
    });
    // Đoạn mã xử lý sự kiện và giao tiếp với máy chủ Socket.IO
    // socket.emit("JoinRoom", socket.id);
    socket.emit("Login", userId);

    socket.on("personLogin", (message) => console.log("messagee", message));
  }, []);
  return (
    <>
      <Image
        className={style.notify_icon_1}
        width={28}
        height={28}
        alt=".."
        onClick={toggleModal}
        src="/crm/notice.svg"
      />
      <Image
        className={style.notify_icon_2}
        width={28}
        height={28}
        alt=".."
        onClick={toggleModal}
        src="/crm/icon-notice-1024.svg"
      />

      {isOpen && <NotifyModal />}
    </>
  );
}
