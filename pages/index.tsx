import React from "react";
import styles from "../components/crm/login/login.module.css";
import {
    checkAndRedirectToHomeIfNotLoggedIn,
    checkHomeIfLoggedIn,
} from "../components/crm/ultis/checkLogin";
import SideBar from "@/components/crm/login/sidebar";
import HeaderHomePage from "@/components/crm/login/header";
import TableOfContents from "@/components/crm/login/TableOfContent";
import Footer from "@/components/crm/login/Footer";
import Head from "next/head";
import HomePage from "@/components/crm/home/home_page";
const HomePageLogin: React.FC = () => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width"
                    initial-scale="1"
                />
                <meta name="robots" content="index,follow" />
                <link
                    rel="icon"
                    href="https://hungha365.com/favicon/HH365.ico"
                    sizes="any"
                />
                <meta
                    name="google-site-verification"
                    content="q4vBfRDO92RvPdYuA-xEEalSufKbzQiQQYpUBGTOqC4"
                />
                <title>
                    Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách
                    hàng tự động
                </title>
                <meta
                    name="description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta property="og:url" content="https://hungha365.com/crm" />

                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
                />
                <meta
                    property="og:description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    property="og:image"
                    content="https://hungha365.com/img/HH365.svg"
                />

                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    name="twitter:title"
                    content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
                />
                <link rel="canonical" href="https://hungha365.com/crm" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL3KDJW5');
`,
                    }}
                ></script>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-6LT1XMTDC3"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6LT1XMTDC3');
`,
                    }}
                ></script>

                {/* CSS */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
                ></script>
            </Head>

            {checkAndRedirectToHomeIfNotLoggedIn() ? null : (
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
            {checkHomeIfLoggedIn() ? null : <HomePage />}
        </>
    );
};
export default HomePageLogin;
