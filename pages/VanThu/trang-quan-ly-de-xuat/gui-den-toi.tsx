import React from "react";
import Head from "next/head";
import Send_to_me from "./send_to_me/send_to_me";

const Receive = () => {
  return(
    <>
      <Head>
        <title> Gửi đến tôi </title>
        <meta name="keywords" content="Gửi đến tôi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <Send_to_me />
    </>
  );
  
};

export default Receive;
