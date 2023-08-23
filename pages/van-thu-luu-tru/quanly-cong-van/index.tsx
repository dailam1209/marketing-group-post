import React, { useState, useEffect } from "react";
import styles from "./Archival_recorders.module.css";
import Today_dispatch from "@/components/van-thu-luu-tru/main/today_dispatch/Today_dispatch";
import Recent_dispatch from "@/components/van-thu-luu-tru/main/recent_dispatch/Recent_dispatch";
import { parse } from "cookie";
import { fetchData } from "@/utils/BaseApi";

interface ItemTemp {
  id: number;
  num: number;
  nametemp: string;
  temp: number;
}
interface Data {
  tong_so_vb: any;
  vanbanden: any;
  vanbandi: any;
  vanbanchoduyet: any;
  vanbancanduyet: any;
  cong_van_gan_day: any;
}
const Home = ({ data }: any) => {
  const [dataHomeSend_receive, setdataHomeSend_receive] = useState<Data | null>(
    null
  );
  const listTemps: ItemTemp[] = dataHomeSend_receive
    ? [
        {
          id: 1,
          num: dataHomeSend_receive.tong_so_vb,
          nametemp: "Tổng số văn bản",
          temp: dataHomeSend_receive.tong_so_vb,
        },
        {
          id: 2,
          num: dataHomeSend_receive.vanbanden,
          nametemp: "Văn bản đến",
          temp: dataHomeSend_receive.vanbanden,
        },
        {
          id: 3,
          num: dataHomeSend_receive.vanbandi,
          nametemp: "Văn bản gửi đi",
          temp: dataHomeSend_receive.vanbandi,
        },
        {
          id: 4,
          num: dataHomeSend_receive.vanbanchoduyet,
          nametemp: "Đang chờ duyệt",
          temp: dataHomeSend_receive.vanbanchoduyet,
        },
      ]
    : [];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const fetchGetDataStaff = async () => {
        try {
          const response = await fetchData(
            token,
            "api/vanthu/guiNhanCongVan/home/getTotalVanBan"
          );
          response
            ? setdataHomeSend_receive(response?.data)
            : setdataHomeSend_receive(data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      };
      fetchGetDataStaff();
    }
  }, [data]);
  return (
    <>
      <div className={`${styles.body_main_content}`}>
        {/* Today's Dispatch */}
        <div className={`${styles.body_row}`}>
          <Today_dispatch
            dataArray={listTemps}
            vanbancanduyetStaff={dataHomeSend_receive?.vanbancanduyet}
            tempStaff={dataHomeSend_receive?.vanbancanduyet}
          />
        </div>
        {/* Recent Dispatches */}
        <div className={`${styles.body_row}`}>
          <Recent_dispatch
            dataArray={
              data
                ? data.cong_van_gan_day
                : dataHomeSend_receive?.cong_van_gan_day
            }
          />
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
    if (!token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const data = await fetchData(
      token,
      "api/vanthu/guiNhanCongVan/home/getTotalVanBan"
    );
    return {
      props: {
        data: data?.data ? data?.data : null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
