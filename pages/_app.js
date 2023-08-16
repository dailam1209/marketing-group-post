import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/hr/Layout";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckLogIn, SignIn } from "./hr/api/Home/HomeService";
import LoadingSpinner from "@/components/hr/loading/index";
import { ConfigProvider, Spin } from "antd";
import Bodyframe from "@/components/bodyFrameNs/bodyFrame.tsx";
// import "../styles/globals_hr.css";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  useEffect(() => {}, []);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const checkLoginAndRedirect = async () => {
  //     const currentCookie = await CheckLogIn();
  //     console.log(currentCookie);
  //     if (currentCookie) {
  //       setLoading(true);
  //       console.log(currentCookie);
  //     } else {
  //       setLoading(false);
  //       window.location.href = "/";
  //     }
  //   };
  //   checkLoginAndRedirect();
  // }, []);

  // useEffect(() => {
  //   SignIn();
  // }, []);

  useEffect(() => {
    const doLoading = () => {
      const start = () => {
        setLoading(true);
      };
      const end = () => {
        setLoading(false);
      };
      setTimeout(() => {
        router.events.on("routeChangeStart", start);
      }, 200);
      setTimeout(() => {
        router.events.on("routeChangeComplete", end);
      }, 200);
      router.events.on("routeChangeError", end);
      return () => {
        router.events.off("routeChangeStart", start);
        router.events.off("routeChangeComplete", end);
        router.events.off("routeChangeError", end);
      };
    };
    if (router.pathname.includes("hr")) {
    } else {
      doLoading();
    }
  }, []);

  const LoadingComp = () => {
    return (
      <Spin
        // indicator={<LoadingOutlined rev={null} />}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      />
    );
  };

  const importGlobalStyles = () => {
    if (router.pathname?.includes("hr")) {
      import("../styles/globals_hr.css");
    } else {
      import("@/styles/globals.css");
    }
  };

  useEffect(() => {
    importGlobalStyles();
  }, [router.pathname]);

  console.log("Current route:", router.pathname);

  return !loading ? (
    <ConfigProvider
      theme={{
        token: {
          screenLG: 1025,
          screenLGMin: 1025,
          screenLGMax: 1025,
          screenMD: 769,
          screenMDMin: 769,
        },
      }}
    >
      {router.pathname?.includes("quan-ly-nhan-luc") ? (
        <Bodyframe>
          <Component {...pageProps} />
        </Bodyframe>
      ) : router.pathname?.includes("hr") ? (
        <Layout>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
          </DndProvider>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ConfigProvider>
  ) : (
    <div>
      <LoadingComp />
    </div>
  );
}
