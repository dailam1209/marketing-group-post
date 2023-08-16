// import "@/pages/hr/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/hr/Layout";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { CheckLogIn } from "./api/Home/HomeService";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/hr/loading";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const checkLoginAndRedirect = async () => {
      const currentCookie = await CheckLogIn();
      console.log(currentCookie);
      if (currentCookie) {
        setLoading(true)
      } else {
        setLoading(false);
        router.push(
          "https://hungha365.com/lua-chon-dang-nhap.html"
        );
      }
    };
    checkLoginAndRedirect();
  }, []);

  // useEffect(() => {
  //   SignIn()
  // }, [])
  return (
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
  );
}
