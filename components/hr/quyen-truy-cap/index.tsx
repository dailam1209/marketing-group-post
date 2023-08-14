import React, { useEffect, useState } from "react";
import styles from "../bodyFrame/bodyFrame_section1/bodyFrame_section1.module.css";
import { format, addSeconds } from "date-fns";
import { enGB } from "date-fns/locale";
interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
}
export default function PageAuthenticator() {
  const [latitude, setLatitude] = useState<null | number>(null);
  const [longitude, setLongitude] = useState<null | number>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {}
        );
      } else {
      }
    };

    if (typeof window !== "undefined") {
      getLocation();
    }
  }, []);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        if (latitude && longitude) {
          const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
          const API_URL = process.env.NEXT_PUBLIC_WEATHER_API;

          const currentWeatherFetch = fetch(
            `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          Promise.all([currentWeatherFetch]).then(async (response) => {
            const weatherResponse = await response[0].json();
            setWeatherData(weatherResponse);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherData();
  }, [latitude, longitude]);

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
          <div className={`${styles.item_left_text}`}>
            <div className={`${styles.item_left_text1}`}>Xin Chào!</div>
            <div className={`${styles.item_left_text2}`}>
              Chúc bạn một ngày làm việc hiệu quả!
            </div>
          </div>
          <div className={`${styles.item_left_img}`}>
            <picture>
              <img src={`/xinchao.png`} alt="xinchao" />
            </picture>
          </div>
        </div>

        {weatherData && latitude && longitude && (
          <div className={`${styles.item_right_weather}`}>
            <div className={`${styles.right_top}`}>
              <div className={`${styles.city_home}`}>
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className={`${styles.weather}`}>
                <div>
                  <picture>
                    <img
                      className={`${styles.weather_image}`}
                      src={`../icon_weather/${weatherData.weather[0].icon}.png`}
                      alt=""
                    />
                  </picture>
                </div>
                <div className={`${styles.weather_flex}`}>
                  <div className={`${styles.temperature}`}>
                    {Math.round(weatherData.main.temp)}
                  </div>
                  <div className={`${styles.weather_sign}`}>
                    <picture>
                      <img src={`/doC.svg`} alt="thoitiet" />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    <div className={`${styles.body} `}>
    <div className={`${styles.l_body_content} ${styles.t_role}`} style={{width: '69%', margin: '22px 0 0 10px', paddingLeft: 18}}>
        <picture>
          <img src={`${"/role_warning.svg"}`} alt="Quyền truy cập" />
        </picture>
        <span>
          Bạn chưa được phân quyền trên phần mềm quản trị nhân sự 365. Vui lòng
          liên hệ quản trị viên để biết thêm chi tiết!
        </span>
      </div>

      <div className={`${styles.item_right}`} style={{width:"19%", marginRight:8, height: 'auto'}}>
        <div className={`${styles.month}`}>{currentMonth}</div>
        <div className={`${styles.time_image}`}>
          <picture>
            <img
              className={`${styles.image}`}
              src={`/img_time.svg`}
              alt="thoitiet"
            />
          </picture>
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
