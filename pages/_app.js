import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/hr/Layout";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckLogIn, SignIn } from "./hr/api/Home/HomeService";
import LoadingSpinner from "@/components/hr/loading/index";
import "../styles/globals.css";
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

  console.log("Current route:", router.pathname);
  return (
    <div>
      {router.pathname.includes("hr") ? (
        <Layout>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
          </DndProvider>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
