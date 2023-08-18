import React, { useEffect, useState } from "react";
// import "@/styles/globals.css";
import { AccessContextComponent } from "@/components/crm/context/accessContext";
import { SidebarResize } from "@/components/crm/context/resizeContext";
import Header from "@/components/crm/header/header";
import useModal from "@/components/crm/hooks/useModal";
import Sidebar from "@/components/crm/sidebar/sidebar";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConfigProvider, Spin } from "antd";
import Bodyframe from "@/components/bodyFrameNs/bodyFrame.tsx";
import { useRouter } from "next/router.js";
import ChatBusiness from "@/components/crm/chat/chat";
import { NavigateContextComponent } from "@/components/crm/context/navigateContext";
import TitleHeaderMobile from "@/components/crm/header/title_header_mobile";
import styles from "@/components/crm/sidebar/sidebar.module.css";
// import "@/styles/crm/stylecrm.css";
// import "@/styles/crm/styles.css"
// import "@/styles/crm/hight_chart.css"
import Layout from "@/components/hr/Layout";
import Head from "next/head";
import Seo from "@/components/head";

export const LoadingComp = () => {
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

export default function App({ Component, pageProps }) {
  const { isOpen, toggleModal } = useModal("icon_menu_nav", [styles.sidebar]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
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
    if (!router.pathname.includes("hr")) {
      doLoading();
    } else {
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstLoad(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const importGlobalStyles = () => {
    if (router.pathname?.includes("hr")) {
      import("../styles/globals_hr.css");
    } else if (router.pathname?.includes("crm")) {
      import("../styles/crm/stylecrm.css");
      import("../styles/crm/styles.css");
      import("../styles/crm/hight_chart.css");
    } else if (router.pathname.includes("/quan-ly-nhan-luc")) {
      import("@/styles/globals.css");
    }
  };

  useEffect(() => {
    importGlobalStyles();
  }, [router.pathname]);

  return (
    <>
      <Seo />
      {loading ? (
        <LoadingComp />
      ) : !firstLoad ? (
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
          ) : router.pathname?.includes("crm") ? (
            <AccessContextComponent>
              <SidebarResize>
                <NavigateContextComponent>
                  <Header toggleModal={toggleModal} />
                  <Sidebar isOpened={isOpen} />
                  <ChatBusiness />
                  <TitleHeaderMobile />
                  <Component {...pageProps} />
                </NavigateContextComponent>
              </SidebarResize>
            </AccessContextComponent>
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
        <LoadingComp />
      )}
    </>
  );
}
