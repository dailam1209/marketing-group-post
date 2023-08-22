import React, { useState, useEffect } from "react";
import Avartar from "./avatar/Avartar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/reducers";
import styles from "./Layout.module.css";
import Header_main from "./header_main/Header_main";
import { fetch_com_info, fetch_infor_account } from "@/utils/ShareApi";
import Sidebar_dexuat_admin from "./company_sidebar/Sidebar_dexuat_admin";
import Sidebar_quanlycongvan_admin from "./company_sidebar/Sidebar_quanlycongvan_admin";
import Sidebar_admin from "./company_sidebar/Sidebar_send_admin";
import { getCookie } from "cookies-next";
import Cookies from "js-cookie";
import Image from "next/image";

interface ParentComponentProps {
  id?: string | undefined | null;
}
const ParentComponent: React.FC<ParentComponentProps> = ({ id }) => {
  let renderedComponent;
  if (id === "1") {
    renderedComponent = <Sidebar_quanlycongvan_admin />;
  } else if (id === "2") {
    renderedComponent = <Sidebar_admin />;
  } else if (id === "3") {
    renderedComponent = <Sidebar_dexuat_admin />;
  }

  return <>{renderedComponent}</>;
};
let idNavBar: any;
const Layout_admin = ({ children,info }: any) => {
  idNavBar = useSelector((state: RootState) => state?.navbar?.activeNavbarId);
  const isOpen = useSelector((state: RootState) => state?.sidebar?.isOpen);
  const router = useRouter();
  const { pathname } = router;

  let componentToRender = null;

  if (
    pathname.includes("/van-thu-luu-tru/trang-quan-ly-de-xuat") ||
    pathname === "/van-thu-luu-tru/tao-de-xuat"
  ) {
    componentToRender = <Sidebar_dexuat_admin />;
  } else if (
    pathname.includes("/van-thu-luu-tru/quanly-cong-van") ||
    pathname.includes("/van-thu-luu-tru/van-ban-den") ||
    pathname.includes("/van-thu-luu-tru/van-ban-di") ||
    pathname === "/van-thu-luu-tru/"
  ) {
    componentToRender = <Sidebar_admin />;
  } else if (
    pathname.includes("/van-thu-luu-tru/trang-chu-quan-ly-cong-van") ||
    pathname.includes("/van-thu-luu-tru/ds-van-ban") ||
    pathname.includes("/van-thu-luu-tru/ds-hop-dong")
  ) {
    componentToRender = <Sidebar_quanlycongvan_admin />;
  }
  const [com,setCom] = useState<any>()
  useEffect(()=>{
    const token = Cookies.get('token_base365')
    const fetch = async ()=>{
      if (token){
        const res = await fetch_com_info(token)
        setCom(res?.data.data)
      }
    }
    fetch()
  },[router.pathname])
  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.side_bar} ${isOpen ? styles.visible : ""}`}>
        <div className={`${styles.general_management}`}>
          <div className={`${styles.profile}`}>
            <img src={com && com?.avatarUser ? com?.avatarUser : "/avatar.jpg"} width={50} height={50} alt="Avatar" />
            <div className={`${styles.profile_content}`}>
              <p>{com?.userName}</p>
            </div>
          </div>
          <>
            {idNavBar === "" ? (
              componentToRender
            ) : (
              <ParentComponent id={idNavBar} />
            )}
          </>
        </div>
      </div>
      <div className={`${styles.main_right}`}>
        <Header_main />
        <>{children}</>
      </div>
    </div>
  );
};

export default Layout_admin;
