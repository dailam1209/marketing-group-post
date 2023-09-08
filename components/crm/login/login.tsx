import React from "react";

import styles from "../login/login.module.css";
import HeaderHomePage from "./header";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
import Sidebar from "./sidebar";
import FooterQLC from "@/components/footerQLC/FooterQLC.jsx";
import TableOfContents from "@/components/table-of-content/TableOfContent.jsx";
const HomePageLogin: React.FC = () => {
  return (
    <>
      {checkHomeIfLoggedIn() ? null : (
        <>
          <div className={styles.main}>
            <Sidebar />
            <div className={styles.content}>
              <HeaderHomePage />
              <TableOfContents />
            </div>
          </div>
          <FooterQLC />
        </>
      )}
    </>
  );
};
export default HomePageLogin;
