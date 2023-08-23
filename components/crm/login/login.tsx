import React from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import Link from "next/link";
import FooterHomePage from "../../../components/footer/Footer";
import { Helmet } from "react-helmet";
import HeaderHomePage from "./header";
import { checkHomeIfLoggedIn } from "../ultis/checkLogin";
const HomePageLogin: React.FC = () => {
  return (
    <>
    {checkHomeIfLoggedIn() ? null : (
    <div className={styles.main}>
      <Helmet>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
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

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
        <script src="https://code.jquery.com/jquery-latest.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/css/home.css" />
        <link rel="stylesheet" href="/assets/css/home_page.css?v=63" />

        {/* Google Tag Manager */}
        <script async>{/* Script content */}</script>
        {/* End Google Tag Manager */}

        {/* JSON-LD */}
        <script type="application/ld+json">{/* JSON-LD content */}</script>
      </Helmet>
      <HeaderHomePage />
      <div className={styles.banner}>
        <div className={styles["banner-left"]}>
          <div className={styles["text-top"]}>
            <h1 className={styles["title_banner"]}>Phần mềm CRM 365</h1>
            <p className={styles["title_content_banner"]}>
              Công ty gắn kết khách hàng với doanh nghiệp
            </p>
            <p className={styles["title_content_banner_02"]}>
              Giải pháp giúp doanh nghiệp của bạn tối ưu toàn bộ chi phí, tăng
              trưởng doanh thu thần tốc, và tiết kiệm thời gian xử lý công việc.
            </p>
          </div>
          <div className={styles.href}>
            <Link href="#" rel="nofollow" className={styles.first}>
              Trải nghiệm miễn phí
            </Link>
            <Link
              rel="nofollow"
              href="/lua-chon-dang-ky.html"
              target="_blank"
              className={styles.sec}
            >
              Đăng ký ngay
            </Link>
          </div>
          <div className={styles.download_app_pc}>
            <p className={styles.download_app_tit}>
              Tải App CRM 365 dành cho PC
            </p>
            <div className={styles.download_app_Image}>
              <Link
                href="https://Linkpp.timviec365.vn/Download/CRM/setup.exe"
                rel="nofollow"
                download=""
              >
                <img src="/crm/dl_app_pc2.png" alt="App" />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["banner-right"]}>
          <img src="/crm/images-banners.png" alt="Phần mềm CRM miễn phí" />
        </div>
      </div>
      <div className={styles["content-body"]}>
        <div className={styles["box-01"]}>
          <div className={styles["right-01"]}>
            <div className={styles["text-01"]}>
              <h2 className={styles["title-box"]}>
                Tính năng quản lý toàn diện
              </h2>
              <p className={styles["title_content_box1"]}>
                Phần mềm CRM365 hỗ trợ doanh nghiệp có góc nhìn toàn diện về
                khách hàng, đưa ra những giải pháp tối ưu trong quá trình thu
                thập và quản lý thông tin khách hàng, gia tăng doanh thu vượt
                trội.
              </p>
            </div>
            <div className={styles["href"]}>
              <Link href="#" rel="nofollow" className={styles["first"]}>
                Trải nghiệm miễn phí
              </Link>
              <Link
                href="/lua-chon-dang-ky.html"
                rel="nofollow"
                target="_blank"
                className={styles["sec"]}
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
          <div className={styles["left-01"]}>
            <Image
              src="/crm/circle.png"
              alt="tính năng quản lý toàn diện"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "%", height: "auto" }}
            />
          </div>
        </div>
        <div className={styles["box-02"]}>
          <div className={styles["text-02"]}>
            <h2
              className={`${styles["title_box"]} ${styles["title_box_special"]}`}
            >
              Tại sao doanh nghiệp của bạn nên chọn nền tảng CRM 365 ?
            </h2>
          </div>
          <div className={styles["item"]}>
            <div className={`${styles["item-01"]} ${styles["item-child"]}`}>
              <h3
                className={`${styles["title_item"]} ${styles["title_item_01"]}`}
              >
                Quản trị dữ liệu khách hàng tốt hơn
              </h3>
              <p className={styles["text_box"]}>
                Dữ liệu khách hàng tập trung. Thông tin khách hàng đồng bộ và
                nhất quán.
              </p>
            </div>
            <div className={`${styles["item-02"]} ${styles["item-child"]}`}>
              <h3
                className={`${styles["title_item"]} ${styles["title_item_02"]}`}
              >
                Tăng doanh thu bán hàng thần tốc
              </h3>
              <p className={styles["text_box"]}>
                Gia tăng tỷ lệ đơn hàng. Đáp ứng yêu cầu khách hàng tức thời
                bằng công cụ hỗ trợ bán hàng chuyên nghiệp. Tỷ lệ quay lại mua
                hàng cao.
              </p>
            </div>
            <div className={`${styles["item-03"]} ${styles["item-child"]}`}>
              <h3
                className={`${styles["title_item"]} ${styles["title_item_03"]}`}
              >
                Giảm thiểu tối đa chi phí marketing
              </h3>
              <p className={styles["text_box"]}>
                Xây dựng chiến dịch phù hợp với từng phân khúc khách hàng. Đo
                lường và đánh giá hiệu quả chiến dịch một cách toàn diện. Tiết
                kiệm tối đa chi phí tiếp thị và thu hút khách hàng.
              </p>
            </div>
            <div className={`${styles["item-04"]} ${styles["item-child"]}`}>
              <h3
                className={`${styles["title_item"]} ${styles["title_item_04"]}`}
              >
                Dễ dàng theo dõi báo cáo mọi lúc mọi nơi
              </h3>
              <p className={styles["text_box"]}>
                Hệ thống báo cáo đầy đủ, rõ ràng và chi tiết. Quản trị tổng quan
                tình hình doanh thu một cách chính xác. Dễ dàng giám sát được
                năng suất và hiệu quả làm việc.
              </p>
            </div>
          </div>
        </div>
        <div className={styles["box-03"]}>
          <div className={styles["video"]}>
            <iframe
              src="https://www.youtube.com/embed/UssNzo6m1p8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className={styles["right-03"]}>
            <div className={styles["text-03"]}>
              <h3
                className={`${styles["title_box"]} ${styles["title_box_03"]}`}
              >
                CRM 365 hỗ trợ doanh nghiệp toàn diện
              </h3>
              <p className={styles["title_content_box_03"]}>
                Trải nghiệm ngay giải pháp công nghệ hàng đầu CRM365 để không bỏ
                lỡ cơ hội giúp doanh nghiệp của bạn tối ưu toàn bộ chi phí, tăng
                trưởng doanh thu thần tốc, và tiết kiệm thời gian xử lý công
                việc.
              </p>
            </div>
            <div className={styles["href"]}>
              <Link href="#" rel="nofollow" className={styles["first"]}>
                Trải nghiệm miễn phí
              </Link>
              <Link
                href="/lua-chon-dang-ky.html"
                rel="nofollow"
                target="_blank"
                className={styles["sec"]}
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["box-04"]}>
          <div className={styles["text-04"]}>
            <h2 className={styles["title_box"]}>
              Download Phần Mềm CRM 365 miễn phí
            </h2>
          </div>
          <div className={styles["app"]}>
            <div className={styles["store"]}>
              <Link
                target="_blank"
                className={styles["icon_app"]}
                rel="nofollow"
                href="https://Linkpp.timviec365.vn/Download/CRM/setup.exe"
              >
                <img
                  src="/crm/app-store.png"
                  alt="Download ứng dụng CRM trên Appstore"
                  sizes="100vw"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["box-05"]}>
          <div className={styles["text-05"]}>
            <h2 className={`${styles["title_box"]} ${styles["title_box_05"]}`}>
              CRM 365 được tin dùng bởi
              <span style={{ color: "#FFA800" }}>1000+</span> đối tác trên khắp
              cả nước
            </h2>
            <div className={styles["icon-company"]}>
              <img src="/crm/icon-01.png" alt="icon" />
              <img src="/crm/icon-02.png" alt="icon" />
              <img src="/crm/icon-03.png" alt="icon" />
              <img src="/crm/icon-04.png" alt="icon" />
              <img src="/crm/icon-05.png" alt="icon" />
              <img src="/crm/icon-06.png" alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://timviec365.vn/css/footer_new.css?v=2"
      />
      ;
      <FooterHomePage />
    </div>
      )}
      </>
  );
};
export default HomePageLogin;
