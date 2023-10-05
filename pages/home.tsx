import HomePage from "@/components/crm/home/home_page";
import { checkHomeIfLoggedIn } from "@/components/crm/ultis/checkLogin";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width"
                    initial-scale="1"
                />
                <meta name="robots" content="noindex,nofollow" />
                <link
                    rel="icon"
                    href="https://timviec365.vn/favicon.ico"
                    sizes="any"
                />

                <title>
                    Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách
                    hàng tự động{" "}
                </title>
                <meta
                    name="description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />

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
                    content="https://timviec365.vn/favicon.ico"
                />

                <meta name="twitter:card" content="summary" />
                <meta property="og:url" content="https://hungha365.com/crm" />

                <meta
                    name="twitter:description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    name="twitter:title"
                    content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
                />
                <link rel="canonical" href="https://hungha365.com/crm" />

                {/* CSS */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
                ></script>
            </Head>
            {checkHomeIfLoggedIn() ? null : <HomePage />}
        </>
    );
}
