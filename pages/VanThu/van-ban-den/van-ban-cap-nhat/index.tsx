import Day_top from "@/components/VanThu/components/day_top/Day_top";
import styles from "./update.module.scss";
import React, { useState } from "react";
import Table from "@/components/VanThu/components/incoming_doc_table/Table";

import Head from "next/head";
import { parse } from "cookie";
import { fetchData } from "@/utils/BaseApi";
const Update_doc = ({ data }: any) => {
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
        <title> Văn bản cập nhật </title>
        <meta name="keywords" content="Văn bản cập nhật" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={`${styles.body_general_management}`}>
        <Day_top
          from_to_date={true}
          url="van-ban-cap-nhat"
          api="/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanCapNhat"
          onDataArrayChange={handleDataArrayChange}
          onResetArray={resetArray}
        ></Day_top>
        <Table
          listdocs={isSearch ? dataArray : data?.listVanBanCapNhat}
          href_url="van-ban-cap-nhat"
        />
      </div>
    </>
  );
};

export default Update_doc;
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
      "/api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanCapNhat",
      {
        type_thu_hoi: 1,
      }
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
