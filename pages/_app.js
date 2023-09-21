import React, { useEffect, useState } from "react";
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
import Seo from "@/components/head";
import { TongDaiContext } from "@/components/crm/context/tongdaiContext";
import { store } from "@/components/crm/redux/store";
import { checkAndRedirectToHomeIfNotLoggedIn } from "../components/crm/ultis/checkLogin";
import Cookies from "js-cookie";
import { base_url } from "@/components/crm/service/function";


export const LoadingComp = () => {
  return (
    <Spin
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
    router?.pathname?.includes("/crm/") ? false : true
  );
  
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
      router?.pathname?.includes("/crm/")     ) {
    } else {
      doLoading();
    }
  }, []);

  useEffect(() => {
    if (!router.pathname.includes("/crm/")) {
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

  const [com_auth, setCom_auth] = useState("")
  const [employee_auth, setEmployee_auth] = useState("")
  const role =parseInt(Cookies.get("role"))

  const getInfoLoginCompany = async () => {
    try {
      const res = await fetch(
        `${base_url }/api/qlc/company/info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      setCom_auth(parseInt(data?.data.data.com_authentic))
    } catch (error) { }
  };


  const getInfoLoginEmployee = async () => {
    try {
      const res = await fetch(
        `${base_url }/api/qlc/employee/info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      setEmployee_auth(parseInt(data?.data.data.authentic))
    } catch (error) { }
  };

  useEffect(()=>{
    getInfoLoginCompany();
    getInfoLoginEmployee();
    if (role === 1 && com_auth !== 1 && com_auth !== "" ){
      router.push(`https://hungha365.com/xac-thuc-ma-otp-cong-ty.html`) ;
    }
  
    if (role === 2 && employee_auth !== 1 && employee_auth !== "") {
      router.push(`https://hungha365.com/xac-thuc-ma-otp-nhan-vien.html`) ;    
      }
  
  },[role,com_auth,employee_auth])





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
          <Provider store={store}>
            <AccessContextComponent>
              <UpdateTLKDComponent>
                <SidebarResize>
                  <NavigateContextComponent>
                  {checkAndRedirectToHomeIfNotLoggedIn() ? (
                      <>
                        <Header toggleModal={toggleModal} />
                        <Sidebar isOpened={isOpen} />
                        <ChatBusiness />
                      </>
                      ):null }    
                    <TitleHeaderMobile />
                    <TongDaiContext>

                      <Component {...pageProps} />
                    </TongDaiContext>
                  </NavigateContextComponent>
                </SidebarResize>
              </UpdateTLKDComponent>
            </AccessContextComponent>
          </Provider>
         
        </ConfigProvider>
      ) : (
        <LoadingComp />
      )}
       
    </>
  );
}