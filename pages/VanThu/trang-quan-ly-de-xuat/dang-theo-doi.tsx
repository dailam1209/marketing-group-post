import React from "react";
import Head from "next/head";
import In_track from "./in_track/in_track";

const Watching = () => {
  return(
    <>
      <Head>
        <title> Đang theo dõi </title>
        <meta name="keywords" content="Đang theo dõi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <In_track />
    </>
  );
};

export default Watching;
