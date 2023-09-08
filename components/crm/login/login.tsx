import React from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import Link from "next/link";
import FooterHomePage from "../../../components/footer/Footer";
import HeaderHomePage from "./header";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
import Sidebar from "./sidebar";
const HomePageLogin: React.FC = () => {
  return (
    <>
      {checkHomeIfLoggedIn() ? null : (
        <div className={styles.main}>
          <HeaderHomePage />

          <Sidebar />
        </div>
      )}
    </>
  );
};
export default HomePageLogin;
