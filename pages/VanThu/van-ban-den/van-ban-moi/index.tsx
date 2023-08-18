import React, { useState } from "react";
import Day_top from "@/components/VanThu/components/day_top/Day_top";
import styles from "./doc_new.module.scss";
import Table from "@/components/VanThu/components/incoming_doc_table/Table";
import Head from "next/head";
import { parse } from "cookie";
import { fetchData } from "@/utils/BaseApi";
import { listStatus } from "@/components/VanThu/comp_detail/listStatus";

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
    <>
      <Head>
        <title> Văn bản mới </title>
        <meta name="keywords" content="Van bản mới" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          menuItems={listStatus}
          from_to_date={true}
          url="van-ban-moi"
          api="/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanMoi"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
        />
        <Table
          listdocs={isSearch ? dataArray : data?.listVanBanMoi}
          href_url="van-ban-moi"
        />
      </div>
    </>
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
      "/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanMoi"
    );
    // console.log(data.data.message);

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
