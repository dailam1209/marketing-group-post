import React, { useState } from "react";
import Head from "next/head";
import styles from "./vanbanchoduyet.module.css";
import { fetchData } from "@/utils/BaseApi";
import { parse } from "cookie";
import Table_vanbandi from "@/components/VanThu/components/incoming_doc_table/Table_vanbandi";
import Day_top from "@/components/VanThu/components/day_top/Day_top";

const Index = ({ data }: any) => {
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const handleDataArrayChange = (newDataArray: string[]) => {
    setDataArray(newDataArray);
  };

  const resetArray = () => {
    setIsSearch(true);
    setDataArray([]);
  };
  return (
    <div>
      <Head>
        <title> Văn bản đi chờ duyệt </title>
        <meta name="keywords" content="Văn bản đi chờ duyệt" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          from_to_date={true}
          api="/api/vanthu/guiNhanCongVan/vanBanDi/getListVanBanDiDaGui"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
          url="van-ban-di-cho-duyet"
        />
        <Table_vanbandi
          listdocs={isSearch ? dataArray : data?.listVanBanDi}
          href_url="van-ban-di-cho-duyet"
        />
      </div>
    </div>
  );
};

export default Index;

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
      "/api/vanthu/guiNhanCongVan/vanBanDi/getListVanBanDiDaGui"
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
