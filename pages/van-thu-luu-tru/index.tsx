"use client";
import Head from "next/head";
import React from "react";
import Home from "./quanly-cong-van";
import { fetch_infor_account } from "@/utils/ShareApi";

const index = () => {
  // let storedData;
  // if (typeof window !== "undefined") {
  //   storedData = sessionStorage.getItem("link");
  //   console.log(storedData);
  // }
  // const userData = storedData ? JSON.parse(storedData) : null;
  // if (userData) {
  //   console.log("Username:", userData.username);
  //   console.log("Email:", userData.email);
  //   // console.log("count:", userData.count);
  // }
  // fetch_infor_account();
  return (
    <>
      <Head>
        <title> Quản lý công văn</title>
        <meta name="keywords" content="Home" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default index;
