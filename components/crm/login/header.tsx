import React, { useEffect, useState } from "react";
import styles from "../login/header.module.css";
import MenuBar from "./menu-bar";
import Link from "next/link";
import ModalRegsiter from "@/components/modal/ModalRegsiter";
import ModalLogin from "@/components/modal/ModalLogin";
import Cookies from "js-cookie";
import { getServerSideProps } from "@/utils/function";
export { getServerSideProps };

const HeaderHomePage: React.FC = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [hasTokens, setHasTokens] = useState(false);
  const [userRole1, setUserRole1] = useState(0);

  useEffect(() => {
    const accToken = Cookies.get("token_base365");
    const rfToken = Cookies.get("rf_token");
    const userRole = Cookies.get("role");

    if (accToken && rfToken && userRole) {
      setHasTokens(true);
      setUserRole1(+userRole);
    }
  }, []);

  const handleOpenRegisterModal = () => {
    setOpenModalRegister(true);
  };
  const handleOpenLoginModal = () => {
    setOpenModalLogin(true);
  };
  return (
    <>
      <div className={`${styles["tasbar"]}`}>
        <div className={`${styles["menu-nav"]}`}>
          <MenuBar />
        </div>
        <Link href="https://timviec365.vn/" target="_blank">
          <img src="/crm/logo.png" alt="timviec365.vn" />
        </Link>
        <div className={`${styles["menu"]}`}>
          <Link href="/crm">Trang Chủ</Link>
          <Link href="#">Hướng Dẫn</Link>
          <Link href="https://timviec365.vn/blog/c242/quan-ly-quan-he-khach-hang">
            Tin Tức
          </Link>
          <Link href="/">Chuyển đổi số</Link>
          <div className={`${styles["login_create"]}`}>
            <button
              className={`${styles["dk"]} ${styles.button_login}`}
              onClick={handleOpenRegisterModal}
            >
              Đăng ký
            </button>
            <span className={`${styles["center"]}`}>/</span>
            <button
              className={`${styles["dn"]} ${styles.button_login}`}
              id="login"
              onClick={handleOpenLoginModal}
            >
              Đăng Nhập
            </button>
          </div>
        </div>
      </div>

      {openModalRegister && (
        <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
      )}
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
    </>
  );
};

export default HeaderHomePage;
