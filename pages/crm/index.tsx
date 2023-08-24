import HomePageLogin from "@/components/crm/login/login";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <title>Phần mềm CRM 365 - Quản lý Quan hệ khách hàng miễn phí</title>
        <meta
          name="description"
          content="Phần mềm CRM 365 giúp quản lý quan hệ khách hàng miễn phí. Tham khảo và download ngay phần mềm CRM miễn phí, tốt nhất hiện nay"
        />
        <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM 365 - Phần mềm Quản lý Quan hệ khách hàng miễn phí"
        />
        <meta
          property="og:description"
          content="Phần mềm CRM 365 giúp quản lý quan hệ khách hàng miễn phí. Tham khảo và download ngay phần mềm CRM miễn phí, tốt nhất hiện nay"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="Phần mềm CRM 365 giúp quản lý quan hệ khách hàng miễn phí. Tham khảo và download ngay phần mềm CRM miễn phí, tốt nhất hiện nay"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM 365 - Phần mềm Quản lý Quan hệ khách hàng miễn phí"
        />
        <link rel="canonical" href="https://crm.timviec365.vn/" />
        <script src="https://code.jquery.com/jquery-latest.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Phần mềm CRM 365",
              description:
                "Phần mềm CRM 365 giúp quản lý quan hệ khách hàng miễn phí. Tham khảo và download ngay phần mềm CRM miễn phí, tốt nhất hiện nay",
              url: "https://crm.timviec365.vn/",
              additionaltype: [
                "https://vi.wikipedia.org/wiki/Qu%E1%BA%A3n_l%C3%BD_quan_h%E1%BB%87_kh%C3%A1ch_h%C3%A0ng",
              ],
            }),
          }}
        />
      </Head>
      <HomePageLogin />
    </>
  );
}
