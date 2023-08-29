import React from "react";
import styles from "./index.module.css";

const MenuNav = () => {
   return (
      <>
         <div className={styles.header_nav_none}>
            <div>
               <div className={styles.btn_login}>
                  <button href="/dang-nhap-nhan-vien.html" className={styles.btn_sign}>
                     Đăng nhập
                  </button>
                  <button href={"/dang-ky-nhan-vien.html"} className={styles.btn_regi}>
                     Đăng ký
                  </button>
               </div>
               <ul className={styles.nav_none}>
                  <li>
                     <a className={styles.nav_a} href={"https://tinhluong.timviec365.vn/"}>
                        Trang chủ lương 365
                     </a>
                  </li>
                  <li>
                     <a className={styles.nav_a} href={"https://tinhluong.timviec365.vn/huong-dan.html"}>
                        Hướng dẫn
                     </a>
                  </li>
                  <li>
                     <a
                        className={styles.nav_a}
                        target={"_blank"}
                        style={{
                           display: "inline-block",
                           color: "#fff",
                           cursor: "pointer",
                        }}>
                        Chuyển đổi số
                     </a>
                  </li>
                  <li>
                     <a className={styles.nav_a}>Tin tức</a>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
};
export default MenuNav;
