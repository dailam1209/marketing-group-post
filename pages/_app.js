import React, { useEffect, useState } from "react";
// import "@/styles/globals.css";
import { AccessContextComponent } from "@/components/crm/context/accessContext";
import { SidebarResize } from "@/components/crm/context/resizeContext";
import Header from "@/components/crm/header/header";
import useModal from "@/components/crm/hooks/useModal";
import Sidebar from "@/components/crm/sidebar/sidebar";
import { ConfigProvider, Spin } from "antd";
import { useRouter } from "next/router.js";
import ChatBusiness from "@/components/crm/chat/chat";
import { NavigateContextComponent } from "@/components/crm/context/navigateContext";
import { UpdateTLKDComponent } from "../components/crm/context/updateTlkd";
import TitleHeaderMobile from "@/components/crm/header/title_header_mobile";
import styles from "@/components/crm/sidebar/sidebar.module.css";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { setCookie } from "cookies-next";
import Seo from "@/components/head";
import { TongDaiContext } from "@/components/crm/context/tongdaiContext";
import { store } from "@/components/crm/redux/store";

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
  const { updateTlkd, setUpdateTLKD } = useState(false)
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(
    router?.pathname?.includes("/phan-mem-nhan-su/") ? false : true
  );
  // const [firstLoad, setFirstLoad] = useState(false);
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
    if (
      router?.pathname?.includes("/phan-mem-nhan-su/") ||
      router?.pathname?.includes("/phan-mem-nhan-su")
    ) {
    } else {
      doLoading();
    }
  }, []);

  useEffect(() => {
    if (!router.pathname.includes("/phan-mem-nhan-su/")) {
      const timeout = setTimeout(() => {
        setFirstLoad(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [router?.pathname]);

  const importGlobalStyles = () => {
    if (router.pathname?.includes("/")) {
      import("../styles/crm/stylecrm.css");
      import("../styles/crm/styles.css");
      import("../styles/crm/hight_chart.css");
    }
  };

  useEffect(() => {
    importGlobalStyles();
  }, [router.pathname]);

  const role = Cookies.get("role");
  const VanThu_token = Cookies.get("token_base365");
  if (VanThu_token) {
    const user_infor = jwtDecode(VanThu_token);
    sessionStorage.setItem("token", VanThu_token);
    const halfLength = Math.ceil(VanThu_token?.length / 2);
    const firstHalf = VanThu_token?.slice(0, halfLength);
    const secondHalf = VanThu_token?.slice(halfLength);
    setCookie("token_first", firstHalf, { maxAge: 60 * 60 * 1 });
    setCookie("token_hafl", secondHalf, { maxAge: 60 * 60 * 1 });
    setCookie("userName", user_infor?.data.userName);
    setCookie("userID", user_infor?.data.idQLC);
    setCookie("com_id", user_infor?.data.com_id);
  }
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
          {/* { router.pathname?.includes("") ? ( */}
          <Provider store={store}>
            <AccessContextComponent>
              <UpdateTLKDComponent>
                <SidebarResize>
                  <NavigateContextComponent>
                    <>
                      <Header toggleModal={toggleModal} />
                      <Sidebar isOpened={isOpen} />
                      <ChatBusiness />
                    </>
                    <TitleHeaderMobile />
                    <TongDaiContext>
                      <Component {...pageProps} />
                    </TongDaiContext>
                  </NavigateContextComponent>
                </SidebarResize>
              </UpdateTLKDComponent>
            </AccessContextComponent>
          </Provider>
          {/* )  */}
          {/* :  (
            <Component {...pageProps} />
          )} */}
        </ConfigProvider>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}
