import React from "react";
import styles from "../components/crm/login/login.module.css";
import { checkHomeIfLoggedIn } from "../components/crm/ultis/checkLogin";
import SideBar from "@/components/crm/login/sidebar";
import HeaderHomePage from "@/components/crm/login/header";
import TableOfContents from "@/components/crm/login/TableOfContent";
import Footer from "@/components/crm/login/Footer";
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
