import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./hr/components/Layout";
export default function App({ Component, pageProps }) {
  useEffect(() => {}, []);
  const router = useRouter();
  console.log("Current route:", router.pathname);
  const link = router.asPath.split("/").pop();
  console.log(link);
  return (
    <div>
      {link.includes("hr/pages") ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
