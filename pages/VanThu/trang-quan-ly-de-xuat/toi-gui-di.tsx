
import Head from "next/head";
import My_send from "./my_send/my_send";

const Send = () => {
  return(
    <>
      <Head>
        <title> Tôi gửi đi </title>
        <meta name="keywords" content="Tôi Gửi Đi" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <My_send />
    </>
  );
  
};

export default Send;
