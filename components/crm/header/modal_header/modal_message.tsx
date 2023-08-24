import { messages_data_box } from "../../ultis/consntant";
import style from "../header.module.css";

export default function MessageModal({ isOpen, closeModal }: any) {
  return (
    <div className={style.modal_message}>
      <div className={style.top}>
        <div className={style.title_message_modal}>Tin nhắn</div>
        <div className={style.top_right}>
          <button className={style.btn_tab}>
            <img
              src="https://crm.timviec365.vn/assets/icons/icon-zoom.svg"
              alt="..."
            />
          </button>
          <div className={style.closeBtn} onClick={closeModal}>
            <img
              src="https://crm.timviec365.vn/assets/icons/icon-close-black.svg"
              alt="..."
            />
          </div>
        </div>
      </div>

      <div className={style.search_on_chat}>
        <input type="text" className={style.input_search} />
        <img
          className="img_search"
          src="/crm/search.svg"
          alt=""
        />
      </div>

      <div className={style.title_content}>Trò chuyện gần đây</div>

      <ul className={style.messages_box}>
        {messages_data_box?.map((item, index) => (
          <li className={style.mess_item} key={index}>
            <a className={style.mess_item_a} href="">
              <span className={style.avatar_mess}>
                <img src={item.img} alt="logo" />
              </span>
              <div className={style.information_messenges}>
                <div className={style.infor_left}>
                  <span className={style.sender}>{item.name}</span>
                  <p className={style.content_messenges}>{item.message}</p>
                </div>
                <p className={style.date_right}>{item.timestamp}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
