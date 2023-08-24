import Day_top from "@/components/van-thu-luu-tru/components/day_top/Day_top";
import styles from "./doc_new.module.scss";
import React, { useState } from "react";
import Table from "@/components/van-thu-luu-tru/components/incoming_doc_table/Table";
import Head from "next/head";
import { fetchData } from "@/utils/BaseApi";
import { parse } from "cookie";
import { listStatus } from "@/components/van-thu-luu-tru/comp_detail/listStatus";
const Been_processed = ({ data }: any) => {
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
    <>
      <Head>
        <title> Văn bản đã được xử lý </title>
        <meta name="keywords" content="Van ban moi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          menuItems={listStatus}
          from_to_date={true}
          url="van-ban-da-xu-ly"
          api="api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanDaXuLy"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
        />
        <Table
          listdocs={isSearch ? dataArray : data?.listVanBanDaXuLy}
          href_url="van-ban-da-xu-ly"
        />
      </div>
    </>
  );
};

export default Been_processed;

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
      "api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanDaXuLy"
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
