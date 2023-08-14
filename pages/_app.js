import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./hr/components/Layout";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckLogIn, SignIn } from "./hr/api/Home/HomeService";
import LoadingSpinner from "./hr/components/loading";
import "../styles/globals.css";

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
  //     } else {
  //       setLoading(false);
  //       router.push("https://hungha365.com/lua-chon-dang-nhap.html");
  //     }
  //   };
  //   checkLoginAndRedirect();
  // }, []);

  useEffect(() => {
    SignIn();
  }, []);

  console.log("Current route:", router.pathname);
  return (
    <div>
      {router.pathname.includes("hr") ? (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Layout>
              <DndProvider backend={HTML5Backend}>
                <Component {...pageProps} />
              </DndProvider>
            </Layout>
          )}
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
