import React from "react";
import Schedule_proposal from "./schedule_proposal/schedule_proposal";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title> Đề xuất lịch làm việc </title>
        <meta name="keywords" content="Đề xuất lịch làm việc" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <Schedule_proposal/>
    </>
  );
};

export default index;
