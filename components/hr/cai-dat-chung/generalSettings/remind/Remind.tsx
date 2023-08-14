import React, { useEffect, useState } from "react";
import styles from "./Remind.module.css";

export default function Remind() {

    const [isFollowReminderEnabled, setIsFollowReminderEnabled] = useState(false);
    const [isContentReminderEnabled, setIsContentReminderEnabled] = useState(false);
  
    const handleFollowReminderChange = () => {
      setIsFollowReminderEnabled(!isFollowReminderEnabled);
    };
  
    const handleContentReminderChange = () => {
      setIsContentReminderEnabled(!isContentReminderEnabled);
    };
  return (
    <>
      <div
        className={`${styles.l_thongtincongty_item}`}
        style={{ marginTop: 6 }}
      >
        <div
          className={`${styles.l_top}`}
          style={{ borderBottom: "1px dotted gray", paddingBottom: 16 }}
        >
          <div className={`${styles.l_top_left}`}>
            <p>Nhắc nhở khi các nội dung tôi theo dõi đến hạn/quá hạn</p>
          </div>

          <div className={`${styles.l_top_right}`}>
            <label className={`${styles.switch}`}>
              <input type="checkbox"  checked={isFollowReminderEnabled} onChange={handleFollowReminderChange}/>
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>

        <div className={`${styles.l_top}`} style={{ marginTop: 20 }}>
          <div className={`${styles.l_top_left}`}>
            <p>Nhắc nhở khi có các nội dung tôi tạo ra đến hạn/quá hạn</p>
          </div>

          <div className={`${styles.l_top_right}`}>
            <label className={`${styles.switch}`}>
              <input type="checkbox" checked={isContentReminderEnabled} onChange={handleContentReminderChange} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
