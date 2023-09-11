import React from "react";
import styles from "../login/login.module.css";
import HeaderHomePage from "./header";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
import Footer from "./Footer";
import TableOfContents from "./TableOfContent";
import SideBar from "./sidebar";
const HomePageLogin: React.FC = () => {
  return (
    <>
      {checkHomeIfLoggedIn() ? null : (
        <>
          <div className={styles.main}>
            <SideBar />

            <div className={styles.content}>
              <HeaderHomePage />
              <TableOfContents />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default HomePageLogin;
