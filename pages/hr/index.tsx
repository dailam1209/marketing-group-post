
import BodyFrameSection1 from "./components/bodyFrame/bodyFrame_section1/bodyFrame_section1";
import BodyFrameSection2 from "./components/bodyFrame/bodyFrame_section2/bodyFrame_section2";
import BodyFrameSection3 from "./components/bodyFrame/bodyFrame_section3/bodyFrame_section3";
import BodyFrameFooter from "./components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import styles from "./components/bodyFrame/bodyFrame.module.css";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { getHomeData } from "./api/Home/HomeService";
import Head from "next/head";

export default function Home() {
  const [dataHome, setDataHome] = useState<any>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = getCookie("user_365");
        if (token) {
          const response = await getHomeData();
          setDataHome(response?.data.data);
        } else {
          const interval = setInterval(() => {
            const updatedToken = getCookie("user_365");
            if (updatedToken) {
              clearInterval(interval);
              fetchHomeData();
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <Head>
        <title>Quản lý chung - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.wrapper}`}>
        <BodyFrameSection1></BodyFrameSection1>
        <BodyFrameSection2 dataHome={dataHome}></BodyFrameSection2>
        <BodyFrameSection3></BodyFrameSection3>
        <BodyFrameFooter src="https://www.youtube.com/embed/2wS-x1li7QQ"></BodyFrameFooter>
      </div>
    </>
  );
}
