"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import ChanceAddInfo from "@/components/crm/customer/chance/add_chance";
import Head from "next/head";

export default function AddChance() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Cơ hội / Thêm mới`);
    setShowBackButton(true);
    setCurrentPath(`/customer/chance/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự
          động
        </title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
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
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
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

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div ref={mainRef} className={styleHome.main}>
        <ChanceAddInfo />
      </div>
    </>
  );
}
