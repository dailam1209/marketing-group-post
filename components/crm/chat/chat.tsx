import styles from "./chat.module.css";
import useModal from "../hooks/useModal";
import { useRef } from "react";
import NewChatBusinessBody from "./chat_body_tlkd";

export default function ChatBusiness() {
  const chatRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleModal } = useModal(null, [null]);
  const handleOpenChatBody = () => {
    toggleModal();
    if (isOpen) {
      chatRef.current?.classList.remove("active_open_chat");
    } else {
      chatRef.current?.classList.add("active_open_chat");
    }
  };

  return (
    <>
      <div ref={chatRef} className={styles.business_assistant}>
        <div
          className={styles.business_assistant_header}
          onClick={handleOpenChatBody}
        >
          <span style={{ color: "white" }}>Trợ lý kinh doanh</span>
          <div>
            <button id={styles.business_assistant_close}></button>
          </div>

        </div>
        {isOpen ? (
          <NewChatBusinessBody handleOpenChatBody={handleOpenChatBody} />
        ) : null}
      </div>
    </>
  );
}
