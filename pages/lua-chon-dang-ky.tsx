import React, { useEffect } from "react";
import Head from "next/head";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import styles from "@/styles/lua-chon-dang-ky.module.css"
import { useRouter } from "next/router";

export default function ChooseRegister() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Type"
          content="text/html;charset=utf-8"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="robots" content="noindex,nofollow"></meta>
        <title>Lựa chọn đăng ký</title>
        <link
          href="https://phanmemnhansu.timviec365.vn/assets/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://phanmemnhansu.timviec365.vn/assets/css/login.css"
          rel="stylesheet"
        ></link>
        <link
          href="https://phanmemnhansu.timviec365.vn/assets/css/footer.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.logo}`}>
          <div className={`${styles.logo_logo1}`}>
            <Image className={`${styles.logo_logo1_img}`} src="/logo_login.png" width={421} height={556} alt=""></Image>
          </div>
        </div>
        <div className={`${styles.forms}`}>
          <div className={`${styles.forms_forms_div}`}>
            <div className={`${styles.forms_forms_div1}`}>
              <a onClick={handleBack} className={`${styles.back}`}>
                <Image src="/back (1).png" width={8} height={14} alt="" style={{ marginRight: 10 }}></Image>Trở về
              </a>
              <div className={`${styles.forms_forms_login}`}>
                <div className={`${styles.forms_forms_title}`}>
                  <h2>Lựa chọn đăng ký</h2>
                  <p>Để tiếp tục bạn vui lòng chọn loại tài khoản.</p>
                </div>
                <div className={`${styles.forms_forms_main}`}>
                  <div className={`${styles.forms_forms_choose}`}>
                    <a href="" rel="nofollow">
                      <div className={`${styles.forms_forms_choose1}`}>
                        <p className={`${styles.names}`}>Công ty</p>
                        <p className={`${styles.accounts}`}>Tài khoản công ty</p>
                      </div>
                      <div className={`${styles.forms_forms_choose2}`}>
                        <Image style={{ marginTop: 20, verticalAlign: "middle" }} src="/right-blue.png" width={20} height={20} alt=""></Image>
                      </div>
                    </a>
                  </div>
                  <hr />
                  <div className={`${styles.forms_forms_choose}`}>
                    <a href="" rel="nofollow">
                      <div className={`${styles.forms_forms_choose1}`}>
                        <p className={`${styles.names}`}>Nhân viên</p>
                        <p className={`${styles.accounts}`}>Tài khoản nhân viên hay các cá nhân trong hệ thống</p>
                      </div>
                      <div className={`${styles.forms_forms_choose2}`}>
                        <Image src="/right-blue.png" width={20} height={20} alt="back"></Image>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.clearfix}`} style={{ marginBottom: 20 }}></div>
      <iframe width="800" height="420" className={`${styles.video_hd}`} src="https://www.youtube.com/embed/OEUuAFY7g6M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
      <div className={`${styles.clearfix}`} style={{ marginBottom: 20 }}></div>
      <link
        rel='stylesheet'
        href='https://timviec365.vn/css/footer_new.css?v=2'
      />
      <Footer></Footer>
    </>
  );
}
