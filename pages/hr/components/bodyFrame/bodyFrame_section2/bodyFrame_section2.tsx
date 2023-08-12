import React, { useEffect, useState } from "react";
import styles from "./bodyFrame_section2.module.css";
import { format, addSeconds } from "date-fns";
import { enGB } from "date-fns/locale";
import Weather from "../weather/Weather";

export interface BodyFrameSection2 {}

export default function BodyFrameSection2({ dataHome }: any) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  

  useEffect(() => {
    if (typeof window == "object") {
      const interval = setInterval(() => {
        setCurrentDate(new Date());
        setCurrentTime((prevTime) => addSeconds(prevTime, 1));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    const formattedDay = format(currentDate, "EEEE", { locale: enGB });
    const formattedMonth = format(currentDate, "MMMM", { locale: enGB });
    setCurrentDay(formattedDay);
    setCurrentMonth(formattedMonth);
  }, [currentDate]);

  const formattedDate = format(currentDate, "dd/MM/yyyy");
  const formattedTime = format(currentTime, "HH:mm:ss");

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.item_left}`}>
          <div className={`${styles.item_content_top}`}>
            <div className={`${styles.item_content} ${styles.content_number}`}>
              <div className={`${styles.contennt_text}`}>Tổng số nhân viên</div>
              <div className={`${styles.content_number1}`}>
                {dataHome?.totalEmployee}
              </div>
            </div>
            <div className={`${styles.item_content}`}>
              <div className={`${styles.contennt_text} `}>
                Số thành tích trong tháng
              </div>
              <div
                className={`${styles.content_number2} ${styles.content_number}`}
              >
                {dataHome?.totalAchievement}
              </div>
            </div>
            <div className={`${styles.item_content} ${styles.content_number}`}>
              <div className={`${styles.contennt_text}`}>
                Số vi phạm trong tháng
              </div>
              <div className={`${styles.content_number3}`}>
                {dataHome?.totalInfringe}
              </div>
            </div>
          </div>
          <div className={`${styles.item_content_top}`}>
            <div className={`${styles.item_content} ${styles.content_number}`}>
              <div className={`${styles.contennt_text}`}>Tổng số ứng viên</div>
              <div className={`${styles.content_number1}`}>
                {dataHome?.totalCandidateGetJob}
              </div>
            </div>
            <div className={`${styles.item_content}`}>
              <div className={`${styles.contennt_text} `}>
                Số ứng viên đến phỏng vấn
              </div>
              <div
                className={`${styles.content_number2} ${styles.content_number}`}
              >
                {dataHome?.totalCandidateInterview}
              </div>
            </div>
            <div className={`${styles.item_content} ${styles.content_number}`}>
              <div className={`${styles.contennt_text}`}>
                Số ứng viên hẹn đi làm
              </div>
              <div className={`${styles.content_number3}`}>
                {dataHome?.totalCandi}
              </div>
            </div>
          </div>
        </div>

        <Weather></Weather>

        <div className={`${styles.item_right}`}>
          <div className={`${styles.month}`}>{currentMonth}</div>
          <div className={`${styles.time_image}`}>
            <img
              className={`${styles.image}`}
              src={`/img_time.svg`}
              alt="thoitiet"
            />
          </div>
          <div className={`${styles.flex}`}>
            <div className={`${styles.time}`} suppressHydrationWarning>
              {formattedTime}
            </div>
          </div>
          <div className={`${styles.days}`}>
            {currentDay} {formattedDate}
          </div>
        </div>
      </div>
    </>
  );
}
