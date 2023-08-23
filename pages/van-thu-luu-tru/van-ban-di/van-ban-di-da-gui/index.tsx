import React, { useState } from "react";
import Head from "next/head";
import styles from "./vanbanchoduyet.module.css";
import { fetchData } from "@/utils/BaseApi";
import { parse } from "cookie";
import Day_top from "@/components/van-thu-luu-tru/components/day_top/Day_top";
import Table_vanbandi from "@/components/van-thu-luu-tru/components/incoming_doc_table/Table_vanbandi";
import { listStatus } from "@/components/van-thu-luu-tru/comp_detail/listStatus";

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
        <title> Văn bản đi đã gửi </title>
        <meta name="keywords" content="Văn bản đi đã gửi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          menuItems={listStatus}
          from_to_date={false}
          dataArray={dataArray}
          url="van-ban-di-da-gui"
          api="api/vanthu/guiNhanCongVan/vanBanDi/getListVanBanDiDaGui"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
        />
        <Table_vanbandi
          listdocs={isSearch ? dataArray : data?.listVanBanDi}
          href_url="van-ban-di-da-gui"
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
      "api/vanthu/guiNhanCongVan/vanBanDi/getListVanBanDiDaGui"
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
