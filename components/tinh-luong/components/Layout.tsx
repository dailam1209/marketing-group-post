import React, { createContext, useEffect, useState } from "react";
import Footer from "./footer/Footer";

import LeftNav from "./left-nav/leftNav";
import LeftNavCongty from "./left-nav-cong-ty";
import { useRouter } from "next/router";

export default function Layout_Tinh_Luong({ children }: any, idQLC: any) {
  const [hasBanner, setHasBanner] = useState(true);
  const [isCompanyUrl, setIsCompanyUrl] = useState(false);
  const [isProductUrl, setIsProductUrl] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("quan-ly")) {
      setIsProductUrl(true);
    } else {
      setIsProductUrl(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.pathname.includes("cong-ty")) {
      setIsCompanyUrl(true);
    } else {
      setIsCompanyUrl(false);
    }
  }, [router.pathname]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        {isCompanyUrl ? <LeftNavCongty /> : null}
        {isProductUrl ? <LeftNav /> : null}
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

// First comment
