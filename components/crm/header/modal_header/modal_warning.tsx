import { warning_header_box } from "../../ultis/consntant";
import style from "../header.module.css";
export default function WarningModal() {
  return (
    <div className={style.help_open} style={{ display: "block" }}>
      <p className={style.title_help}>Nhắc nhở</p>
      <div className={style.help_box}>
        {warning_header_box.map((item: any, i: any) => (
          <a className={style.item_help} key={i}>
            <div className={style.div_help}>
              <img src={item.img} alt="hungha365.com" />
              <div className={style.content_help}>
                <p className={style.text_help}>
                  <span className={style.text_help_special}>{item.name}</span>
                  {item.content}
                </p>
                <p className={style.time_help}>{item.timestamp}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className={style.accept_all}>
        <button className={style.accept_button_all}>Xác nhận tất cả</button>
      </div>
    </div>
  );
}
